import extended from "./extended";
import { BlockShape, InputShape, MutatorType, OutputType } from "$lib/utils/constants";
import { WarningType } from "$lib/interfaces";
let warningOnly = true;
interface Category {
	kind: "category";
	id: string;
	name: string;
	color: string;
	weight: number;
	contents?: Category;
}
function transformPathToCategory(path: string, blocks, push: boolean = true, category): Category {
	const parts = path.replaceAll("./", "").split("/");
	const isBlockFile = parts.at(-1)?.endsWith(".ts");
	if (isBlockFile) {
		parts.pop();
	}

	const existingCategory = categories.find((category) => category.id === parts[0]);

	if (existingCategory) {
		if (parts.length > 1) {
			const subcategory = transformPathToCategory(
				parts.slice(1).join("/"),
				blocks,
				false,
				category
			);

			// Check for existing subcategories
			const existingSubcategory = existingCategory.contents.find(
				(sub) => sub.id === subcategory.id
			);

			if (existingSubcategory) {
				// Merge existing subcategory with the new one
				existingSubcategory.contents.push(...subcategory.contents);
			} else {
				existingCategory.contents.push(subcategory);
			}
		} else {
			existingCategory.contents = blocks;
		}
		return existingCategory;
	} else {
		let result = {
			kind: "category",
			id: parts[0],
			name: textToTitleCase(textToTitleCase(parts[0])),
			color: "#5b80a5"
		};
		const ext = extended?.category[parts[0]];
		if (ext) {
			result.name = ext.name;
			result.extended = ext.extended;
			result.colour = ext.colour;
			result.weight = ext.weight;
		}
		if (parts.length > 1) {
			const subcategory = transformPathToCategory(
				parts.slice(1).join("/"),
				blocks,
				false,
				category
			);
			result.contents = [subcategory];
		} else {
			result = category || result;
			result.contents = blocks;
		}

		if (push) categories.push(result);
		return result;
	}
}

function textToTitleCase(str) {
	return str.replace(/\S+/g, (txt: string) => {
		return txt[0].toUpperCase() + txt.substring(1);
	});
}
function sortCategoriesRecursively(categories: Category[]): Category[] {
	return categories
		.sort((a, b) => {
			if (a.weight === b.weight) return 1;
			const weightA = a.weight !== undefined ? a.weight : 100;
			const weightB = b.weight !== undefined ? b.weight : 100;
			return weightA - weightB;
		})
		.map((category) => {
			if (category.contents && category.contents.length > 0) {
				category.contents = sortCategoriesRecursively(category.contents);
			}
			return category;
		});
}
let pattern = /[a-zA-Z_]/g;
let patternText = /[a-zA-Z_0-9\[\]]/g;
let patternBrackets = /.*\[.*\].*/;

function checkArray(check, property){
	if (!Array.isArray(check)) {
        return Object.values(check).includes(property)
    }
	return check.every((value) => Object.values(check).includes(value))
}

async function checkBlock(block: any, id: string) {
	if (!id) return `invalid category`;
	id = id + "_"
    if (!block || !block.func || block.func === id) return `invalid block in ${id}`;
    if (block.func.length < 3) return `block ${block.func} is short, in ${id}`;
	if (!block.func.match(pattern)) return `${block.func} doesn't match pattern ${pattern}`;
	if (!block.text) return `${block.func} missing property "text"`;
	const text = Array.isArray(block.text) ? block.text.join(" ") : block.text;
	if (!text.match(patternText)) return `${block.func} doesn't match pattern ${patternText}`;
	if (block.inline && typeof block.inline !== "boolean") return `${id + block.func} has invalid property "inline"`;
	if (block.shape === undefined && block.output === undefined ) return `${id + block.func} must contain at least one property "shape" or "output"`;
	if (block.shape ==! undefined && block.output ==! undefined ) return `${id + block.func} must contain only one property "shape" or "output"`
	//if (block.shape && !Object.values(BlockShape).includes(block.shape)) return `${id +  block.func} has invalid property "shape"`;
	if (block.shape && !checkBlock(BlockShape,block.shape)) return `${id +  block.func} has invalid property "shape"`;
	//if (block.output && !Object.values(OutputType).includes(block.output)) return `${id + block.func} has invalid property "output"`;
	if (block.output && !checkBlock(OutputType,block.output)) return `${id + block.func} has invalid property "output"`;
	if (block.branches && (block.branches <= 0 || block.branches >= 10)) return `${id + block.func} has invalid property "branches"`;
	if (block.label && (typeof block.label!== "string" || block.label.length < 5 || block.label > 255 )) return `${id + block.func} has invalid property "label"`;
	if (!block.arguments && text.match(patternBrackets)) return `${id + block.func} "text" has arguments, but block doesn't have any "arguments"`;
	if (block.arguments && !text.match(patternBrackets)) return `${id + block.func} "text" has no arguments, but block have "arguments"`;
	if (block.arguments) {
		if (typeof block.arguments !== "object") return `${id + block.func} has invalid property "arguments"`;
        for (const argName in block.arguments) {
			const arg = block.arguments[argName];
            if (!arg.type) return `${id + block.func} is missing type in "arguments"`;
			if (!checkBlock(InputShape,arg.type)) return `${id + block.func} has invalid type in "arguments"`;
			if (arg.check && !checkBlock(OutputType,arg.check)) return `${id + block.func} has invalid property "check"`;
			if (!arg.check && checkArray(OutputType, arg.check)) return `${id + block.func} has invalid property "check"`;
			if (arg.type === InputShape.MENU && !arg.options) return `${id + block.func} "options" is mandatory when using "menu"`;
        }
	}
	if (block.warnings) {
		const w = block.warnings;
		if (!Array.isArray(w)) return `${id + block.func} has invalid property "warnings"`;
		for (const warning of w) {
			if (typeof warning!== "object") return `${id + block.func} has invalid property "warnings"`;
            if (warning.type === undefined) return `${id + block.func} has invalid property "warnings" type`;
            if (!warning.message) return `${id + block.func} has invalid property "warnings"`;
			switch (warning.type) {
				case WarningType.EmptyInput:
					if (!warning.inputName) return `${id + block.func} is missing inputName property in "warnings"`;
					break;
				case WarningType.RequiredParent:
					if (!warning.parentType) return `${id + block.func} is missing parentType property in "warnings"`;
					break;
				default:
					return `${id + block.func} has invalid property "warnings, warning type"`;
			}
        }

	}
	if (block.mutator && !block.mutatorData) return `${id + block.func} has invalid property "mutatorData"`;
	if (!block.mutator && block.mutatorData) return `${id + block.func} has invalid property "mutator"`;
	if (block.mutatorData) {
		const m = block.mutatorData;
		if (m.type !== undefined && !Object.values(MutatorType).includes(m.type)) return `${id + block.func} has invalid property "mutatorData.type"`;
		if (!m.inputs) return `${id + block.func} has invalid property "mutatorData.inputs"`;
		const i = m.inputs;
		if (!Array.isArray(i)) return `${id + block.func} has invalid property "mutatorData.inputs" not an array`;
		for (const input of i) {
			//not work
            if (!input.text || input.type === undefined ||!checkBlock(OutputType,input.type)) return `${id + block.func} has invalid property "mutatorData.inputs" not an array of objects`;
			if (!input.text.match(pattern)) return `${id + block.func} has invalid property "mutatorData.inputs" contains invalid text`;
			if (input.defaultValue && typeof input.defaultValue !== "boolean") return `${id + block.func} has invalid property "mutatorData.inputs.defaultValue" not an array of objects`;
			if (input.inputName && !input.inputName.includes(" ")) return `${id + block.func} has invalid property "mutatorData.inputs in inputName cannot contain spaces"`;
        }
    }
	return false
}
function genArgs(block: any) {
	const inputs = {};
	if (!block) return;
	for (const arg in block) {
		const argParm = block[arg];
		if (argParm.type !== "input_value") continue;
		if (argParm.check) {
			switch (argParm.check[0]) {
				case "String":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "text",
							fields: {
								TEXT: argParm.text || arg.toLowerCase()
							}
						}
					};
					break;
				case "Number":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "math_number",
							fields: {
								NUM: Math.floor(Math.random() * 256)
							}
						}
					};
					break;
				case "Server":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "server_get",
							inputs: {
								INPUT: {
									shadow: {
										kind: "block",
										type: "text",
										fields: {
											TEXT: "Server ID"
										}
									}
								}
							}
						}
					};
					break;
				case "Message":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "messageget_message"
						}
					};
					break;
				case "Boolean": // empty
					break;
				case "Role":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "role_get",
							inputs: {
								ID: {
									shadow: {
										kind: "block",
										type: "text",
										fields: {
											TEXT: "123"
										}
									}
								},
								SERVER: {
									shadow: {
										kind: "block",
										type: "server_get",
										inputs: {
											INPUT: {
												shadow: {
													kind: "block",
													type: "text",
													fields: {
														TEXT: "123"
													}
												}
											}
										}
									}
								}
							}
						}
					};
					break;
				case "Member":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "member_getmemberbyid",
							inputs: {
								ID: {
									shadow: {
										kind: "block",
										type: "text",
										fields: {
											TEXT: "123"
										}
									}
								}
							}
						}
					};
					break;
				case "Channel":
					inputs[arg] = {
						shadow: {
							kind: "block",
							type: "channel_get",
							inputs: {
								NAME: {
									shadow: {
										kind: "block",
										type: "text",
										fields: {
											TEXT: "123"
										}
									}
								}
							}
						}
					};
					break;
				default:
					console.log("input not found:", argParm.check[0]);
					break;
			}
		}
	}
	return inputs;
}
// importBlocks.ts
const categories: [] = [];
const importBlocks = async () => {
	const modules = import.meta.glob("./js/**/**/*.ts");
	for (const path in modules) {
		const module = await modules[path]();
		const blockClass = module.default || module;
		const blockInstance = new blockClass();
		const registry = blockInstance.getRegistry();

		if (!registry || !registry.id || registry.hidden) continue;
		const genBlocks = [];
		if (extended[registry.id]) {
			for (const extBlock of extended[registry.id]) {
				genBlocks.push({
					kind: "block",
					type: extBlock.type,
					weight: extBlock.weight,
					inputs: extBlock.inputs
				});
			}
		}
		for (const genBlock of registry.blocks) {
			const check = await checkBlock(genBlock, registry.id)
			if (check) {
				console.error(check)
				if (!warningOnly) continue	
			}
			if (genBlock.hidden || !genBlock.func) continue;
			if (genBlock.label) {
				genBlocks.push({
					kind: "label",
					text: genBlock.label,
					weight: genBlock.weight
				});
			}

			genBlocks.push({
				kind: "block",
				type: `${registry.id}_${genBlock.func}`,
				weight: genBlock.weight,
				inputs: genBlock.inputs || genArgs(genBlock.arguments)
			});
		}

		const category = {
			id: registry.id,
			kind: "category",
			name: registry.name || textToTitleCase(registry.id),
			colour: registry.color || "#5b80a5"
		};
		if (registry.custom) category.custom = registry.custom;
		category.weight = registry.weight || 100;

		transformPathToCategory(path.replaceAll("./js/", ""), genBlocks, true, category);
	}
	return sortCategoriesRecursively(categories);
};

const blocks = await importBlocks();
export default blocks;
