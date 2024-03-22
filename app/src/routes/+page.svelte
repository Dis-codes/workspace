<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";
	import SideBar from "$lib/components/SideBar.svelte";
	import { persisted } from "$lib/localstorage";
	let settings = persisted("workspace");
	function formatDate(dateString: string): string {
		const options: Intl.DateTimeFormatOptions = {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		};

		const formattedDate = new Date(dateString).toLocaleString(undefined, options);

		const [date, time] = formattedDate.split(", ");
		const [day] = date.split(".");
		const [hour, minute] = time.split(":");

		return `${day} - ${hour}:${minute}`;
	}
	function checkBotExists() {
		if ($settings["index.dsc"]?.blocks?.blocks?.length > 0) {
			botexists.showModal();
		} else {
			window.location.href = "editor";
		}
	}
</script>
<body class="bg-[#0c111a] min-h-screen">

<NavBar />
	<div class="ml-40 mt-40">
		<h2 class="text-4xl font-bold">Home</h2>
	</div>
	<div class="border border-gray-800 bg-[#111827] shadow-xl mx-40 rounded-xl mt-10 h-auto justify-end">
	<div class="p-8">
	<div class="flex-auto card card-compact mx-auto w-80 bg-[#10141d] border border-black duration-[500ms] hover:shadow-2xl hover:border-[#334fdb]">
    <figure><img src="/Images/image2x.png" alt="Loading..." /></figure>
    <div class="card-body">
      <h2 class="card-title">New file</h2>
      <p>Create a new blockly file, the discord.js library is installed by default.</p>
      <div class="card-actions justify-end">
	<button on:click={checkBotExists} class="bg-[#283b9b] text-white px-4 py-2 rounded-xl shadow-xl hover:bg-[#334fdb]">
		Create a new bot
	</button>
      </div>
    </div>
  </div>
  <div class="mt-auto mb-7">
	<a href="editor?open=true" class="btn border-black hover:border-[#334fdb] btn-sm fixed right-52">Open file</a>
	</div>
  </div>
  </div>

<dialog id="botexists" class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-3xl text-white">You are trying to create a new bot</h3>
		<p>You already have a bot <span class="font-bold">
			{$settings.settings.botName}
		</span> saved locally,are you sure you want to overwrite it?
		</p>
		<div class="modal-action">
			<form method="dialog">
				<a class="btn btn-primary" href="editor">Yes, continue</a>
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
</body>