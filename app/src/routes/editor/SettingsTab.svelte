<script lang="ts">
	import { persisted } from '$lib/localstorage';
	let settings = persisted('workspace');
	let showSecrets = [];
	let secrets = JSON.stringify($settings.settings.secrets);
	let changeSecret = [];
	let oldSecret = null;
	const toggleVisibility = (i) => {
		showSecrets[i] = !showSecrets[i];
	};
	function calculateUsage() {
		let blocks = 0;
		let files = 0;
		for (const [key, value] of Object.entries($settings)) {
			if (key.endsWith('.dsc')) {
				files += 1;
				blocks += value?.blocks?.blocks?.length || 0;
			}
		}
		return {
			files: files,
			blocks: blocks,
			size: roughSizeOfObject($settings)
		};
	}
	function roughSizeOfObject(object) {
		let objectList = [];
		let stack = [object];
		let bytes = 0;

		while (stack.length) {
			let value = stack.pop();

			if (typeof value === 'boolean') {
				bytes += 4;
			} else if (typeof value === 'string') {
				bytes += value.length * 2;
			} else if (typeof value === 'number') {
				bytes += 8;
			} else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
				objectList.push(value);

				for (let i in value) {
					stack.push(value[i]);
				}
			}
		}
		return (bytes / 1024).toFixed(1);
	}
	function SecretsDelete(key) {
		settings.update((s) => {
			delete s.settings.secrets[key];
			return s;
		});
		secrets = JSON.stringify($settings.settings.secrets);
	}
	function updateEnv(index) {
		if (index === -1) {
			changeSecret = ['', ''];
		} else changeSecret = Object.entries($settings.settings.secrets)[index];
		oldSecret = changeSecret[0];
		changeenv.showModal();
	}
	function editEnv() {
		if (changeSecret[0] === '') return;
		settings.update((s) => {
			s.settings.secrets[changeSecret[0]] = changeSecret[1];
			if (oldSecret !== changeSecret[0]) {
				delete s.settings.secrets[oldSecret];
			}
			return s;
		});
		changeSecret = [];
		secrets = JSON.stringify($settings.settings.secrets);
		changeenv.close();
	}
	function copyText(text) {
		navigator.clipboard.writeText(text);
	}
	function saveSecrets() {
		$settings.settings.secrets = JSON.parse(secrets);
		settings.set($settings);
	}
	function testParse(text) {
		try {
			JSON.parse(text);
			return true;
		} catch (error) {
			return false;
		}
	}
</script>

<div class=" w-full h-screen">
	<div class="flex flex-row mt-16 p-10 gap-10">
		<div class="bg-gray-700 w-60 h-96 rounded-2xl p-6">
			<h2 class="font-bold text-xl">Bot Information</h2>
			<p>Bot Name:</p>
			<input
				type="text"
				class="input input-bordered w-full max-w-xs"
				bind:value={$settings.settings.botName}
				maxlength="20"
			/>
			<p>Bot Description:</p>
			<textarea
				class="textarea textarea-bordered w-full h-52 resize-none overflow-auto"
				placeholder="Description"
				bind:value={$settings.settings.botDescription}
				maxlength="140"
			/>
		</div>
		<div class="bg-gray-700 w-fit h-96 rounded-2xl p-6 overflow-auto">
			<div class=" w-full h-full">
				<div class="flex flex-row justify-between">
					<h3 class="font-bold text-2xl">Secrets</h3>
					<div class="flex gap-2">
						<button on:click={() => editenv.showModal()} class="btn btn-neutral btn-sm"
							><span class="material-symbols-outlined">data_object</span>Edit as JSON</button
						>
						<a href="https://discodes.xyz/help" class="btn btn-neutral btn-sm"
							><span class="material-symbols-outlined">menu_book</span>Docs</a
						>
						<button
							on:click={() => updateEnv(-1)}
							class="btn btn-neutral bg-blue-500 text-white btn-sm"
							><span class="material-symbols-outlined">add</span>new Secret</button
						>
					</div>
				</div>
				<div class="mt-4 grid grid-cols-1 gap-2">
					{#if $settings?.settings?.secrets && Object.keys($settings?.settings?.secrets).length > 0}
						{#each Object.entries($settings?.settings?.secrets) as [key, value], index (key)}
							<div class="flex flex-row justify-between gap-2 items-center">
								<div class="flex flex-row gap-2 w-full">
									<div class="rounded-lg px-1 py-2 flex gap-2 bg-[#1d232a]">
										<button on:click={copyText(key)} class="flex items-center"
											><span class="material-symbols-outlined">content_copy</span></button
										>
										<input
											type="text"
											class="font-bold bg-[#1d232a] w-24"
											bind:value={key}
											disabled
										/>
									</div>
									<div class=" w-full rounded-lg p-1 flex gap-2 justify-between bg-[#1d232a]">
										<div class="flex gap-2">
											<button on:click={copyText(value)} class="flex items-center"
												><span class="material-symbols-outlined">content_copy</span></button
											>
											{#if showSecrets[index]}
												<input type="text" class="font-bold bg-[#1d232a]" bind:value disabled />
											{:else}
												<input type="password" class="font-bold bg-[#1d232a]" bind:value disabled />
											{/if}
										</div>
										<label for="toggle{index}" class="flex items-center cursor-pointer select-none"
											><span class="material-symbols-outlined"
												>{showSecrets[index] ? 'visibility_off' : 'visibility'}</span
											></label
										>
										<input
											id="toggle{index}"
											class="hidden"
											type="checkbox"
											on:click={() => toggleVisibility(index)}
										/>
									</div>
								</div>
								<div class="flex gap-2">
									<button on:click={() => updateEnv(index)} class="btn btn-neutral btn-sm"
										><span class="material-symbols-outlined">edit</span></button
									>
									<button on:click={() => SecretsDelete(key)} class="btn btn-neutral btn-sm"
										><span class="material-symbols-outlined">delete</span></button
									>
								</div>
							</div>
							<div class="divider divider-horizontal" />
						{/each}
					{/if}
				</div>
			</div>
		</div>
		{#await calculateUsage() then usage}
			<div class="bg-gray-700 w-60 h-96 rounded-2xl p-6">
				<h2 class="font-bold text-2xl">Bot Usage</h2>
				<p>Files: {usage.files}</p>
				<p>Blocks: {usage.blocks}</p>
				<p>File size: {usage.size} KB</p>
			</div>
		{/await}
	</div>
</div>

<dialog id="changeenv" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-white">Change key and value of your secret</h3>
		<div class="flex justify-center mt-4 gap-4">
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Key</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={changeSecret[0]}
				/>
			</div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Token</span>
				</label>
				<input
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={changeSecret[1]}
				/>
			</div>
		</div>
		<div class="modal-action">
			<form method="dialog">
				{#if $settings.settings.secrets[changeSecret[0]] === undefined}
					<button class="btn btn-primary" on:click={() => editEnv()}>Submit</button>
					<button class="btn">Close</button>
				{:else}
					<div class="flex flex-row gap-1">
						<div class="alert alert-error h-12 flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							<span>This secret already exists, do you want to update it?</span>
						</div>
						<div class="flex flex-row gap-1">
							<button class="btn btn-primary" on:click={() => editEnv()}>Submit</button>
							<button class="btn">Cancel</button>
						</div>
					</div>
				{/if}
			</form>
		</div>
	</div>
</dialog>

<dialog id="editenv" class="modal scroll">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-white">Raw Secrets Editor</h3>
		<p>Secrets are specified in JSON. Values must be strings.</p>
		<textarea
			class="mt-4 resize-none w-full rounded-md p-2 overflow-auto h-fit"
			placeholder="Write your envs here"
			bind:value={secrets}
		/>
		<div class="modal-action">
			<form method="dialog">
				{#if testParse(secrets)}
					<button on:click={saveSecrets} class="btn btn-primary">Save</button>
					<button class="btn">Close</button>
				{:else}
					<div class="flex flex-row gap-1">
						<div class="alert alert-error h-12 flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
							<span>Invalid JSON</span>
						</div>
						<div class="flex flex-row gap-1">
							<button class="btn btn-primary" disabled>Save</button>
							<button class="btn">Close</button>
						</div>
					</div>
				{/if}
			</form>
		</div>
	</div>
</dialog>
