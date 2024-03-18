const importBlocks = async() => {
	const modules = import.meta.glob("./js/**/**/*.ts");

	const blocks = [];
	for (const path in modules) {
		const module = await modules[path]();
		blocks.push(module.default || module);
	}

	return blocks;
};
const blocks = await importBlocks();
export default blocks;
