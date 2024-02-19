import extended from "./extended";

interface Category {
	kind: "category";
	id: string;
	name: string,
	color: string,
	weight: number,
	contents?: Category;
  }
function transformPathToCategory(path: string, blocks, push: boolean = true, category): Category {
    let parts = (path.replaceAll('./', "").split('/'));
    let isBlockFile = parts.at(-1)?.endsWith(".ts");
    if (isBlockFile) { parts.pop(); }

    let existingCategory = categories.find(category => category.id === parts[0]);

    if (existingCategory) {
        if (parts.length > 1) {
            const subcategory = transformPathToCategory(parts.slice(1).join('/'), blocks, false, category);

            // Check for existing subcategories
            const existingSubcategory = existingCategory.contents.find(sub => sub.id === subcategory.id);

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
		let result = { kind: "category", id: parts[0], name: textToTitleCase(textToTitleCase(parts[0])), color: "#5b80a5" };
		let ext = extended?.category[parts[0]]
		if (ext){
			result.name = ext.name
			result.extended = ext.extended
			result.colour = ext.colour
			result.weight = ext.weight

		}
		if (parts.length > 1) {
            const subcategory = transformPathToCategory(parts.slice(1).join('/'), blocks, false, category);
			result.contents = [subcategory];
        } else {
			result = category || result
            result.contents = blocks;
        }

        if (push) categories.push(result);
        return result;
    }
}

function textToTitleCase(str) {
	return str.replace(/\S+/g,
		function(txt:string) {
			return txt[0].toUpperCase() + txt.substring(1);
		});
}
function sortCategoriesRecursively(categories: Category[]): Category[] {
	return categories.sort((a, b) => {
	  const weightA = a.weight !== undefined ? a.weight : Number.POSITIVE_INFINITY;
	  const weightB = b.weight !== undefined ? b.weight : Number.POSITIVE_INFINITY;
	  return weightA - weightB;
	}).map(category => {
	  if (category.contents && category.contents.length > 0) {
		category.contents = sortCategoriesRecursively(category.contents);
	  }
	  return category;
	});
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
	
	if (!registry || !registry.id || registry.hidden) continue
	let genBlocks = []
	for (const genBlock of registry.blocks){
	if(genBlock.hidden) continue
	genBlocks.push({
		kind: genBlock.func? "block" : "label",
		type: registry.id + "_" + genBlock.func
	})
	}
	if (extended[registry.id]) {
		genBlocks = extended[registry.id].concat(genBlocks)
	}
	const category = {
		id: registry.id,
		kind: "category",
		name: registry.name || textToTitleCase(registry.id),
		colour: registry.color || "#5b80a5", 
	}
	if (registry.custom) category.custom = registry.custom
	category.weight = registry.weight || 100

	transformPathToCategory(path.replaceAll('./js/', ""), genBlocks, true, category)
	  
	}
	return sortCategoriesRecursively(categories);;
  };

  const blocks = await importBlocks();
  export default blocks;