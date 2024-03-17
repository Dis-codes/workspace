<script lang="ts">
	import { NavBar } from "$lib/components/Components";
	import { onMount } from "svelte";

	import BlocklyTool from "$lib/utils/blockRegistryTool";

	import javascriptGenerator from "$lib/blockly/javascript.js";
	import BlocklyComponent from "$lib/components/Blockly.svelte";
	import { BlockShape, InputShape, OutputType } from "$lib/utils/constants";

	import Blockly from "blockly/core";
	import type { Abstract } from "blockly/core/events/events_abstract";

	import { config, _en as en, toolbox } from "./WorkspaceConfig";

	const BlockRegistryTool = new BlocklyTool();

	let workspace: Blockly.WorkspaceSvg;
	let functionName = "myfunction";

	onMount(() => {
		// dont close out instantly if changes were made
		let refreshValue: string | undefined = undefined;

		window.onbeforeunload = () => refreshValue;
		// according to blockly, event is type Abstract
		workspace.addChangeListener((event: Abstract) => {
			switch (event.type) {
				case Blockly.Events.BLOCK_FIELD_INTERMEDIATE_CHANGE:
				case Blockly.Events.BLOCK_CREATE:
				case Blockly.Events.BLOCK_DELETE:
				case Blockly.Events.BLOCK_CHANGE:
				case Blockly.Events.BLOCK_DRAG:
				case Blockly.Events.BLOCK_MOVE:
					// empty string disables reloading
					refreshValue = "";
					break;
			}
		});
		reloadBlock();
	});

	type OutputKeyType = keyof typeof OutputType;
	type BlockShapeType = keyof typeof BlockShape;
	type InputShapeType = keyof typeof InputShape;

	// Define variables for selector values
	let selectedOutputType: OutputKeyType;
	let selectedBlockShape: BlockShapeType;
	let selectedInputShape: InputShapeType;

	let text: string = "Hello [ARGUMENT1] World!";
	let inline: boolean = true;
	let arguments_block: string[] = text.match(/\[(.*?)\]/g) || [];
	let arguments_data: string[] = arguments_block.map((arg) => {
		return `{
            type: InputShape.${selectedInputShape},
            check: OutputType.${selectedOutputType}
        }`;
	});

	let functionCode: string = 'return args.ARGUMENT1 + " World!";';
	let generatedBlock: string = "{}";

	class Block {
		getRegistry() {
			return {
				id: "test",
				color: "%{BKY_VARIABLES_HUE}",
				blocks: [
					{
						func: functionName,
						text: text,
						inline: inline,
						output: OutputType[selectedOutputType],
						shape: BlockShape[selectedBlockShape],
						arguments: {
							ARGUMENT1: {
								type: InputShape[selectedInputShape]
							}
						}
					}
				]
			};
		}
		constructor() {
			this.getRegistry = this.getRegistry.bind(this);
		}
	}
	BlockRegistryTool.registerFromBlockset(new Block());

	function GenerateCode() {
		code = javascriptGenerator.workspaceToCode(workspace);
		console.log(code);
	}

	function reloadBlock() {
		arguments_block = [...new Set(text.match(/\[(.*?)\]/g))] || [];
		arguments_data = arguments_block.map((arg) => {
			return `{
        type: InputShape.${selectedInputShape},
        check: OutputType.${selectedOutputType}
        }`;
		});
		generatedBlock = `
			{
				func: "${functionName}",
				text: "${text}",
				inline: ${inline},${
					selectedOutputType == null ? "" : "\noutput: OutputType.STRING,"
				}${selectedBlockShape == null ? "" : "\nshape: BlockShape.STATEMENT,"}
					${
						arguments_block.length == 0
							? ""
							: `arguments: { ${arguments_block
									.map((arg) => {
										const argName = arg.slice(1, -1);
										return `${argName}: {
            	type: InputShape.VALUE,
            	check: OutputType.${selectedOutputType}
            }}`;
									})
									.join(",\n")} 
    	}`
					}
	}`;
		BlockRegistryTool.registerFromBlockset(new Block());
		workspace.updateToolbox(toolbox);
	}
	let code = "//Code here";
</script>

<NavBar />
<div class="flex flex-row h-screen">
	<div class="mt-[64px] w-full flex">
		<div class="w-full h-full">
			<BlocklyComponent {config} locale={en} bind:workspace />
		</div>
		<div class="w-full">
			<h3 class="text-2xl font-bold">Selector</h3>
			<div>
				<label for="functionName">Function Name:</label>
				<input
					type="text"
					id="functionName"
					name="functionName"
					bind:value={functionName}
					on:change={reloadBlock}
				/>
			</div>
			<div>
				<label for="text">Text:</label>
				<input type="text" id="text" name="text" bind:value={text} on:change={reloadBlock} />
			</div>
			<div>
				<label for="inline">Inline:</label>
				<input
					type="checkbox"
					id="inline"
					name="inline"
					bind:checked={inline}
					on:change={reloadBlock}
				/>
			</div>
			<div>
				<label for="functionCode">Function Code:</label>
				<textarea
					id="functionCode"
					name="functionCode"
					bind:value={functionCode}
					on:change={reloadBlock}
				/>
			</div>
			<div>
				<label for="outputType">Output Type:</label>
				<select
					id="outputType"
					name="outputType"
					bind:value={selectedOutputType}
					on:change={reloadBlock}
				>
					<option value="none">None</option>
					{#each Object.keys(OutputType) as outputType}
						<option value={outputType}>{OutputType[outputType]}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="blockShape">Block Shape:</label>
				<select
					id="blockShape"
					name="blockShape"
					bind:value={selectedBlockShape}
					on:change={reloadBlock}
				>
					<option value="none">None</option>
					{#each Object.keys(BlockShape) as blockShape}
						<option value={blockShape}>{BlockShape[blockShape]}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="inputShape">Input Shape:</label>
				<select
					id="inputShape"
					name="inputShape"
					bind:value={selectedInputShape}
					on:change={reloadBlock}
				>
					<option value="none">None</option>
					{#each Object.keys(InputShape) as inputShape}
						<option value={inputShape}>{inputShape.toLowerCase()}</option>
					{/each}
				</select>
			</div>
			<!-- You can add more selectors as needed -->
			<h3 class="text-2xl font-bold">Block JSON</h3>
			<div>
				<div>
					<pre>
                        {generatedBlock}

                    </pre>
				</div>
				<h3 class="text-2xl font-bold">Function</h3>
				<pre>{`${functionName}(args: any) 
{
    ${functionCode}
}`}</pre>
			</div>
			<h3 class="text-2xl font-bold">Generated code</h3>
			<div>
				<button on:click={GenerateCode}>Generate Code</button>
				<pre>{code}</pre>
			</div>
		</div>
	</div>
</div>
