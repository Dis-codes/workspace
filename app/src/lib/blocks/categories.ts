import extended from "./extended";

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
//   DELIM: {
// 	shadow: {
// 		kind: "block",
// 		type: "text",
// 		fields: {
// 			TEXT: ","
// 		}
// 	}
// }
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
