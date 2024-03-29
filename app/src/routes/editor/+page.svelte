<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import Workspace from "./workspace.svelte";
	import { persisted } from "$lib/localstorage";
	import SettingsTab from "./SettingsTab.svelte";
	import { WarningMessages } from "../../lib/utils/data";
	import { WarningType } from "$lib/interfaces";

	let settings = persisted("workspace");
	let sidebarOpen = true;
	let files = ["index.dsc"]; // Array of file names
	let activeFileIndex = 0; // Index of the active file
	let commands = [];
	let page;
	let event;
	let errorIndex;
	let errorTxt;
	for (const [key, value] of Object.entries($settings)) {
		if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
			commands = [...commands, key];
		}
	}
	let addCommandText = "";
	function setActiveFile(file) {
		page = undefined;
		if (files.includes(file)) {
			activeFileIndex = files.indexOf(file);
		} else {
			files = [...files, file];
			activeFileIndex = files.length - 1;
		}
	}
	function closeFile(index) {
		files = files.filter((_, i) => i !== index);
		if (activeFileIndex >= index) {
			activeFileIndex = Math.max(0, activeFileIndex - 1);
		}
	}
	async function addCommand() {
		if (addCommandText.length > 0 && addCommandText.length < 16) {
			commands = [...commands, `${addCommandText}.dsc`];
			addCommandText = "";
			addcommand.close();
		}
	}
	function downloadCmd(command) {
		const data = JSON.stringify($settings[command]);

		const blob = new Blob([data], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const fileName = command;

		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		a.click();

		URL.revokeObjectURL(url);
	}
	function deleteCmd(command) {
		if (files.includes(command)) {
			closeFile(files.indexOf(command));
		}
		commands = commands.filter((cmd) => cmd !== command);
		settings.update((s) => {
			s[command] = undefined;
			return s;
		});
	}
	function openFile() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".dsc";
		input.onchange = (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = (readerEvent) => {
				const content = readerEvent.target.result;
				const json = JSON.parse(content);
				const name = file.name === "index.dsc" ? "index2.dsc" : file.name;
				if (json?.settings?.botName) {
					errorIndex = 0;
					errorTxt = "Invalid command, This looks like a bot file";
					return errors.showModal();
				}

				if (commands.includes(name) || (name === "index.dsc" && commands.includes("index2.dsc"))) {
					errorIndex = 1;
					errorTxt = "Invalid command, This command already exists";
					return errors.showModal();
				}
				if (!json?.blocks?.blocks?.length || json?.blocks?.blocks?.length === 0) {
					errorIndex = 1;
					errorTxt = "Invalid command, This file is empty";
					return errors.showModal();
				}
				settings.update((s) => {
					s[name] = json;
					return s;
				});
				commands = [...commands, name];
				setActiveFile(name);
			};
		};
		input.click();
	}
	async function replaceWorkspace() {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".dsc";
		input.onchange = (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = (readerEvent) => {
				const content = readerEvent.target.result;
				const json = JSON.parse(content);
				const name = file.name;
				if (!json?.settings?.botName) {
					errorIndex = 0;
					errorTxt = "Invalid command, This looks like a command file";
					return errors.showModal();
				}
				settings.set(json);
				commands = [];
				for (const [key, value] of Object.entries(json)) {
					if (key && key !== "index.dsc" && key.endsWith(".dsc")) {
						commands = [...commands, key];
					}
				}
				setActiveFile("index.dsc");
			};
		};
		input.click();
	}
	function setPage(pageName) {
		if (page === pageName) return (page = undefined);
		page = pageName;
	}
	function setEvent(eventName) {
		if (event === eventName) event = undefined;
		event = eventName;
	}
	function FindBlockAndCenter() {
		let d = WarningMessages[WarningType.RequiredParent];
		let id = "";
		for (const dKey in d) {
			id = d;
		}
	}
</script>

<div class="h-full w-full flex flex-col">
	<div>
		<NavBar links={false}>
			<div class="flex mx-2 flex-row gap-3 items-center">
				{#if !sidebarOpen}
					<button
						class="btn btn-square btn-neutral btn-sm"
						on:click={() => (sidebarOpen = !sidebarOpen)}
						><span class="material-symbols-outlined">menu</span></button
					>
				{/if}
			</div>
			<div class="flex ml-auto mx-2 flex-row gap-3 items-center">
				<button on:click={() => (event = "save")} class="btn btn-square btn-sm btn-neutral"
					><span class="material-symbols-outlined">save</span></button
				>
				<button on:click={() => setEvent("download")} class="btn btn-square btn-neutral btn-sm"
					><span class="material-symbols-outlined">download</span></button
				>
				<button on:click={() => setEvent("export")} class="btn btn-square btn-neutral btn-sm"
					><span class="material-symbols-outlined">javascript</span></button
				>
				<h2 class="text-2xl font-bold">{$settings.settings.botName}</h2>
				<button class="btn btn-square btn-accent btn-sm"
					><span class="material-symbols-outlined">play_arrow</span></button
				>
			</div>
		</NavBar>
	</div>

	<div class="flex flex-row h-screen">
		{#if sidebarOpen}
			<div class="bg-workspace h-screen">
				<div class="flex flex-col justify-between h-full">
					<div class="mt-16 w-64">
						<div class="mb-3 px-2 flex flex-row gap-3">
							<button
								class="btn btn-square btn-neutral btn-sm"
								on:click={() => (sidebarOpen = !sidebarOpen)}
								><span class="material-symbols-outlined">menu</span></button
							>
							<button on:click={() => setPage("settings")} class="btn btn-square btn-neutral btn-sm"
								><span class="material-symbols-outlined">settings</span></button
							>
						</div>
						<div class="mb-4 px-2 flex flex-row justify-between items-center">
							<h2 class="text-2xl font-bold">Files</h2>
							<div>
								<button on:click={() => openFile()} class="btn btn-square btn-sm btn-neutral"
									><span class="material-symbols-outlined">attach_file_add</span></button
								>
								<button
									on:click={() => addcommand.showModal()}
									class="btn btn-square btn-sm btn-neutral"
									><span class="material-symbols-outlined">note_add</span></button
								>
							</div>
						</div>
						<ul class="menu menu-sm max-w-xs w-full">
							<li class="flex flex-row items-center justify-between">
								<button on:click={() => setActiveFile("index.dsc")}>
									<span class="material-symbols-outlined"> deployed_code </span>
									index.dsc
								</button>
								<div class="dropdown btn-square btn-sm justify-center">
									<label tabindex="0"
										><span class="material-symbols-outlined mt-1">more_vert</span></label
									>
									<ul
										tabindex="0"
										class="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-52 ml-10"
									>
										<li><button on:click={() => downloadCmd("index.dsc")}>Download</button></li>
										<li>
											<button class="text-red-500" on:click={() => deleteCmd("index.dsc")}
												>Clear workspace</button
											>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<details open>
									<summary>
										<span class="material-symbols-outlined"> folder_open </span>
										commands
									</summary>
									<ul>
										{#each commands as command}
											<li class="flex flex-row items-center justify-between">
												<button on:click={() => setActiveFile(command)}>
													<span class="material-symbols-outlined">deployed_code</span>
													{command}
												</button>
												<div class="dropdown btn-square btn-sm justify-center">
													<label tabindex="0"
														><span class="material-symbols-outlined">more_vert</span></label
													>
													<ul
														tabindex="0"
														class="dropdown-content z-[99] menu p-2 shadow bg-base-100 rounded-box w-52 ml-10"
													>
														<li><button on:click={() => downloadCmd(command)}>Download</button></li>
														<li>
															<button class="text-red-500" on:click={() => deleteCmd(command)}
																>Delete</button
															>
														</li>
													</ul>
												</div>
											</li>
										{/each}
									</ul>
								</details>
							</li>
							<!-- <li><button>
					<span class="material-symbols-outlined">
						inventory_2
						</span>
				  package.json
				</button></li> -->
							<li>
								<button on:click={() => markdown.showModal()}>
									<span class="material-symbols-outlined"> markdown </span>
									notes.md
								</button>
							</li>
						</ul>
					</div>
					<div class="flex flex-col">
						<!-- <div class="bg-gray-600 w-full h-32 grid grid-cols-4 gap-2 p-4">
							
							 <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">bar_chart_4_bars</span></button>
							 <button class="btn btn-square btn-neutral"><span class="material-symbols-outlined">group</span></button>
						</div> -->
						<a href="https://discodes.xyz/help" class="btn">help</a>
					</div>
				</div>
			</div>
		{/if}
		<div class="w-full h-full flex flex-col overflow-hidden">
			{#if !page}
				{#if files.length > 0}
					<div class="mt-16 bg-gray-900 h-10 w-full flex items-center px-2">
						<div class="flex flex-row">
							{#each files as file, index (file)}
								<div
									class="flex flex-row w-fit max-w-[12rem] gap-2 p-0.5 px-2 rounded-xl {index ==
									activeFileIndex
										? 'bg-gray-800 text-gray-300'
										: ''}"
								>
									<button class="truncate" on:click={() => setActiveFile(file)}
										><h3 class="text-xl">
											{file}
										</h3></button
									>
									<button
										on:click={() => closeFile(index)}
										class="m-auto btn btn-square btn-ghost btn-xs my-auto"
									>
										<span class="material-symbols-outlined">close</span>
									</button>
								</div>
								<div class="divider divider-horizontal mx-0" />
							{/each}
						</div>
					</div>
				{/if}
				<div class="flex-1 {files.length > 0 ? '' : 'mt-[4rem]'}">
					<Workspace file={files[activeFileIndex]} {event} />
				</div>
			{:else if page === "settings"}
				<SettingsTab />
			{:else if page === "dashboard"}
				<p>dashboard</p>
			{:else if page === "coop"}
				<p>coop</p>
			{/if}
		</div>
	</div>
</div>

<dialog id="markdown" class="modal scroll">
	<div class="modal-box max-w-full h-full">
		<h3 class="font-bold text-3xl text-white">Your notes for your bot</h3>
		<textarea
			class="mt-4 h-full w-full resize-none rounded-md p-2 overflow-auto max-h-[43rem]"
			placeholder="Write your notes here"
			bind:value={$settings["notes"]}
			maxlength="2000"
		/>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>

<dialog id="addcommand" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-white">Give your new command a name</h3>
		<div class="flex justify-center mt-4">
			<input
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
				bind:value={addCommandText}
				maxlength="15"
			/>
		</div>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-primary" on:click={() => addCommand()}>Submit</button>
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
<dialog id="errors" class="modal scroll">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-white">An error occured!</h3>
		<p>{errorTxt}</p>
		<div class="modal-action">
			<form method="dialog">
				{#if errorIndex === 0}
					<button on:click={replaceWorkspace} class="btn btn-primary">ReplaceWorkspace</button>
					<button class="btn">Close</button>
				{:else}
					<button class="btn">Close</button>
				{/if}
			</form>
		</div>
	</div>
</dialog>
