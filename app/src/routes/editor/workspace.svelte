<script lang="ts">
	//Components
	import { persisted } from "$lib/localstorage";
	import { onMount } from "svelte";
	import { workspaceToSvg_ } from "./workspaceImage";
	// Blockly
	import "blockly/blocks";

	import BlocklyComponent from "$lib/components/Blockly.svelte";
	import { Blockly, config, en } from "$lib/blockly/defaultWorkspace";
	import { indexJs, packageJson } from "$lib/blockly/defaults";
	import { test } from "$lib/blockly/examples";
	import javascriptGenerator from "$lib/blockly/javascript.js";
	import type { Abstract } from "blockly/core/events/events_abstract";
	import "./blockRegister";
	// better code export
	import JSZip from "jszip";
	import { WarningMessages } from "../../lib/utils/data";
	import * as prettier from "prettier";
	import * as prettierPluginBabel from "prettier/plugins/babel";
	import * as prettierPluginEstree from "prettier/plugins/estree";
	import * as prettierPluginHtml from "prettier/plugins/html";
	import Prism from "prismjs";

	export let file = "index.dsc";
	export let event = undefined;
	let previousFile = file;
	let init = false;
	let storage = persisted("workspace");
	let refreshValue: any = undefined;
	let saveEnabled = true;
	$: {
		if (init) {
			if (previousFile && previousFile !== file) {
				console.log("saving workspace", previousFile);
				saveWorkspace(previousFile);
			}
			if (previousFile && file && previousFile !== file) {
				previousFile = file;
				workspace?.clear();
				loadWorkspace();
			}
		}
		if (event) {
			switch (event) {
				case "open":
					openFile();
					break;
				case "save":
					saveWorkspace(file);
					break;
				case "export":
					saveWorkspace(file);
					ShowBlockErrorDialog("showjs");
					break;
				case "download":
					saveWorkspace(file);
					ShowBlockErrorDialog("download");
					break;
				case "copy":
					saveWorkspace(file);
					copyCode();
					break;
				case "delete":
					deleteUnusedBlocks();
					break;
				case "example":
					openExample(test);
					break;
				default:
					break;
			}
			event = undefined;
		}
	}
	let generatedCode = "";
	let workspace: Blockly.WorkspaceSvg;

	function registerNewContextMenu() {
		try {
			Blockly.ContextMenuRegistry.registry.register({
				displayText: "Delete unused blocks",
				callback: deleteUnusedBlocks,
				weight: 100,
				scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
				id: "delete_unused_blocks",
				preconditionFn: function(e) {
					const allBlocks = workspace.getAllBlocks(true);
					for (const block of allBlocks) {
						if (!block.isEnabled()) {
							return "enabled";
						}
					}
				}
			});
			Blockly.ContextMenuRegistry.registry.register({
				displayText: "Download Workspace Image",
				preconditionFn: function() {
					//check if workspace is empty
					const allBlocks = workspace.getAllBlocks(true);
					for (const block of allBlocks) {
						if (block.isEnabled()) {
							return "enabled";
						}
					}
				},
				callback: function() {
					workspaceToSvg_(workspace, (datauri) => {
						let a = document.createElement("a");
						a.download = "screenshot.png";
						a.target = "_self";
						a.href = datauri;
						document.body.appendChild(a);
						a.click();
						a.parentNode.removeChild(a);
					});
				},
				scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
				id: "image",
				weight: 100
			});
		} catch (error) {}
	}
	onMount(() => {
		registerNewContextMenu();
		function checkUrl() {
			const urlParams = new URLSearchParams(window.location.search);
			if (urlParams.get("open") === "true") {
				openFile();
				window.history.replaceState({}, document.title, "/" + "editor");
			} else {
				loadWorkspace();
			}
		}
		checkUrl();
		init = true;
		window.onbeforeunload = (event: BeforeUnloadEvent) => {
			if (refreshValue !== undefined) {
				saveWorkspace(file);
				refreshValue = undefined;
			}
		};
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
	});
	async function loadWorkspace() {
		if ($storage[file]?.blocks?.blocks && $storage[file]?.blocks.blocks.length > 0) {
			console.log("workspace found");
			Blockly.serialization.workspaces.load($storage[file], workspace);
		} else {
			console.log("no workspace found");
		}
	}
	async function saveWorkspace(currentFile) {
		if (!saveEnabled) return;
		if (!currentFile) return;
		const state = Blockly.serialization.workspaces.save(workspace);
		storage.update((s) => {
			s[currentFile] = state;
			return s;
		});
		console.log("workspace saved");
		refreshValue = undefined;
	}

	async function copyCode() {
		navigator.clipboard.writeText(await generateCode());
	}
	function openExample(example: any) {
		Blockly.serialization.workspaces.load(example, workspace);
	}
	function openFile() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".dsc, .zip";
		input.onchange = (event: any) => {
			if (event.target.files[0].name.endsWith(".zip")) {
				const file = event.target.files[0];
				const reader = new FileReader();
				reader.onload = async(event: any) => {
					const contents = event.target.result;
					try {
						const zip = await JSZip.loadAsync(contents);
						const workspaceFile = await zip.file("workspace.dsc")?.async("string");
						if (workspaceFile) {
							storage.set(JSON.parse(workspaceFile));
							window.location.reload();
						} else {
							console.error("Error loading workspace: no workspace file found");
						}
					} catch (error) {
						console.error("Error loading workspace:", error);
					}
				};
				reader.readAsArrayBuffer(file);
				return;
			}
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onload = (event: any) => {
				const contents = event.target.result;
				try {
					const workspaceFile = JSON.parse(contents);
					if (workspaceFile && workspaceFile["index.dsc"]) {
						storage.set(workspaceFile);
						window.location.reload();
					} else {
						console.error("Error loading workspace: no workspace file found");
					}
				} catch (error) {
					console.error("Error loading workspace:", error);
				}
			};
			reader.readAsText(file);
		};
		input.click();
	}
	function saveFile() {
		const state = Blockly.serialization.workspaces.save(workspace);
		const data = JSON.stringify(state);
		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const fileName = "workspace.dsc";

		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		a.click();

		URL.revokeObjectURL(url);
	}

	async function updatePackage() {
		const allBlocks = workspace.getAllBlocks();
		for (const block of allBlocks) {
			switch (block.type) {
				case "blockname":
					packageJson.dependencies["moment"] = "^2.29.1";
					continue;
				default:
					continue;
			}
		}
	}
	async function generateCode(f = "index.dsc") {
		file = f;
		await loadWorkspace();
		await updatePackage();
		let code = "";
		switch (f) {
			case "index.dsc":
				code = "//default imports\n";
				for (const [key, value] of Object.entries($storage)) {
					if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
						code += `const ${key.slice(0, -4)} = require("./commands/${key.slice(0, -4)}.js");\n`;
					}
				}
				if (code === "default imports") {
					code = "";
				}
				code += indexJs + javascriptGenerator.workspaceToCode(workspace);
				break;
			default:
				code = `//${f}\n${javascriptGenerator.workspaceToCode(workspace)}`;
				break;
		}
		try {
			code = await prettier.format(code, {
				semi: true,
				parser: "babel",
				plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginHtml]
			});
		} catch (error) {
			code = `\nError exporting code: ${error.message}`; // TODO: show this in a dialog
		}
		return code;
	}
	async function exportJS() {
		generatedCode = await generateCode(file);
		const dialog: any = document.getElementById("showjs");
		dialog.showModal();
	}
	async function downloadFiles() {
		await saveWorkspace(file);
		let fileBeforeDownload = file;
		saveEnabled = false;
		console.log("downloading files");
		const zip = new JSZip();
		zip.file("index.js", await generateCode("index.dsc"));
		for (const [key, value] of Object.entries($storage)) {
			if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
				//remove .dsc from filename and add .js
				zip.file(`commands/${key.slice(0, -4)}.js`, await generateCode(key));
			}
		}
		zip.file("package.json", JSON.stringify(packageJson, null, 2));
		zip.file(
			"README.md",
			"# Bot created with DisCodes Blockly\n ## How to use\n 1. Install the dependencies with `npm install`\n 2. Run the bot with `node index \n ## You can also use run.bat instead of using the first metheod \n ## Help \n If you need help, join our [Discord server](https://discord.gg/TsQPMrNyBv)\n ## Credits \n This bot was created with [DisCodes](https://www.discodes.xyz)"
		);
		zip.file("workspace.dsc", JSON.stringify($storage, null, 2));
		if ($storage.settings.secrets) {
			let env = "";
			for (const [key, value] of Object.entries($storage.settings.secrets)) {
				env += `${key}=${value}\n`;
			}
			if (env) {
				zip.file(".env", env);
				alertEnv.showModal();
			}
		}
		const content = await zip.generateAsync({ type: "blob" });
		const url = URL.createObjectURL(content);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${$storage.settings.botName}.zip`;
		a.click();
		URL.revokeObjectURL(url);
		file = fileBeforeDownload;
		saveEnabled = true;
	}
	function deleteUnusedBlocks() {
		const allBlocks = workspace.getAllBlocks(true);
		for (const block of allBlocks) {
			if (!block.isEnabled()) {
				block.dispose(false, true);
			}
		}
	}
	interface ErrMsg {
		type: string;
		msg: string[];
	}
	let errMessages: ErrMsg[] = [];
	let actionToPerform1: string;

	function ShowBlockErrorDialog(actionToPerform: string) {
		actionToPerform1 = actionToPerform;
		let wMsgKeys = Object.keys(WarningMessages);
		errMessages = [];
		for (const wType of wMsgKeys) {
			if (!Blockly.getMainWorkspace().getBlockById(wType)) {
				delete WarningMessages[wType];
				continue;
			}
			let text: string[] = [];
			for (const errsKey of Object.keys(WarningMessages[wType])) {
				console.log(workspace.getBlockById(wType));
				text.push(`${workspace.getBlockById(wType)?.type} - ${WarningMessages[wType][errsKey]}`);
			}
			errMessages.push({
				type: wType,
				msg: text
			});
		}
		if (errMessages.length === 0) return warningClose(actionToPerform);
		blockErrors.showModal();
	}
	function warningClose(action) {
		blockErrors.close();
		switch (action) {
			case "showjs":
				exportJS();
				break;
			case "download":
				downloadFiles();
				break;
		}
	}
	async function showBlock(val) {
		blockErrors.close();
		workspace.centerOnBlock(val);
		workspace.highlightBlock(val, true);
		await new Promise((resolve) => setTimeout(resolve, 700));
		workspace.highlightBlock(val, false);
	}
</script>

<div class="flex flex-col items-center justify-center h-full">
	<div class="w-full h-full">
		<BlocklyComponent {config} locale={en} bind:workspace />
	</div>
</div>

<dialog id="alertEnv" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-red-500">Your bot contains secrets!</h3>
		<p>
			Please be carefull with these, as anyone can see them if you share them (even in the
			workspace.dsc file). If you don´t want to export secrets, remove them in the settings!
		</p>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
<dialog id="showjs" class="modal scroll">
	<div class="modal-box max-w-full h-full">
		<h3 class="font-bold text-3xl text-white">JavaScript code of your bot</h3>
		<div class="bg-gray-300 w-full mt-4 h-full max-h-[43rem] rounded-md p-4 overflow-auto">
			<pre><code>
            {@html Prism.highlight(generatedCode, Prism.languages["javascript"])}
        </code> </pre>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-primary" on:click={copyCode}>Copy Code to Clipboard</button>
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
<dialog id="blockErrors" class="modal scroll">
	<div class="modal-box max-w-full h-full">
		<h3 class="font-bold text-3xl text-center mb-5">Your bot's code contains some errors!</h3>
		<div id="listOfErrors" class="overflow-y-scroll max-h-[67vh]">
			<div class="grid place-items-center">
				{#each errMessages as val}
					<div class="flex place-items-center border-b-2 border-[#5d646e] mb-2">
						<div class="mr-2 text-red-500">
							{#each val.msg as msg}
								{msg}
								<br />
							{/each}
						</div>
						<button class="btn mb-2" on:click={() => showBlock(val.type)}>Show block</button>
					</div>
				{/each}
			</div>
		</div>

		<div class="absolute bottom-0 left-0 right-0 p-5 bg-white-removed flex justify-center">
			<button on:click={() => warningClose(actionToPerform1)} class="btn btn-error mr-4"
				>Proceed</button
			>
			<form method="dialog" class="ml-4">
				<button class="btn btn-success">Close</button>
			</form>
		</div>
	</div>
</dialog>
