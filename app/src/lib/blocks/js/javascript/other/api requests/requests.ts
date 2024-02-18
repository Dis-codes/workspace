import { BlockShape, InputShape, OutputType } from "$lib/utils/blockRegistryTool";

class RequestsBlocks {
	getRegistry() {
		return {
			id: "requests",
			name: "API Requests",
			color: "#4b9afb",
			blocks: [
				{
					func: "request",
					text: [
						"send request to [URL] using method [METHOD] with headers\n",
						"data\n",
						"response\n",
						"on error\n"
					],
					branches: 4,
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						URL: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						METHOD: {
							type: InputShape.MENU,
							options: [
								["GET", "GET"],
								["POST", "POST"],
								["PUT", "PUT"],
								["DELETE", "DELETE"],
								["PATCH", "PATCH"],
								["HEAD", "HEAD"],
								["OPTIONS", "OPTIONS"]
							]
						}
					}
				},
				{
					func: "header",
					text: "header [NAME] with value [VALUE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: "body",
					text: "body data section\n",
					shape: BlockShape.STATEMENT,
					branches: 1
				},
				{
					func: "body_data",
					text: "data [NAME] with [VALUE]",
					shape: BlockShape.STATEMENT,
					inline: true,
					arguments: {
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						},
						VALUE: {
							type: InputShape.VALUE
						}
					}
				},
				{
					func: "response",
					text: "get [NAME] from response data",
					output: OutputType.ANY,
					inline: true,
					arguments: {
						NAME: {
							type: InputShape.VALUE,
							check: OutputType.STRING
						}
					}
				},
				{
					func: "response_status",
					text: "response status code",
					output: OutputType.NUMBER,
					inline: true
				},
				{
					func: "all",
					text: "get all data from response",
					output: OutputType.ANY,
					inline: true
				}
			]
		};
	}

	header(args: any) {
		return `header('${args.NAME}', '${args.VALUE}')`;
	}

	body(args: any) {
		return `body({${args.Branch1}})`;
	}

	body_data(args: any) {
		return `'${args.NAME}': ${args.VALUE}`;
	}

	response(args: any) {
		return `response.data.${args.NAME}`;
	}

	response_status(args: any) {
		return `response.status`;
	}

	request(args: any) {
		let code = `fetch('${args.URL}', {method: '${args.METHOD}'`;
		if (args.BRANCH1) {
			code += `, headers: {${args.BRANCH1}}`;
		}
		if (args.BRANCH2) {
			code += `, body: {${args.BRANCH2}}`;
		}
		code += `})`;
		if (args.BRANCH3) {
			code += `.then(response => {${args.BRANCH3}})`;
		}
		if (args.BRANCH4) {
			code += `.catch(err => {${args.BRANCH4}})`;
		}
		return code;
	}

	all(args: any) {
		return `response.data`;
	}
}

export default RequestsBlocks;
