<script lang="ts">
	import LogOutModal from './LogOutModal.svelte';
	import { user } from '../userStore';

	import { GetUserRoles } from '$lib/utils/utils';
	import { onMount } from 'svelte';
	let notificationCount = 2;
</script>

<details class="dropdown dropdown-end dropdown-bottom">
	<summary class="m-1 btn btn-square btn-circle">
		<img
			src={$user?.user_metadata?.avatar_url}
			alt={'Profile Picture of ' + ($user ? $user.user_metadata.full_name : 'User')}
			class="h-full w-full rounded-full"
		/>
	</summary>
	<ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
		<li>
			<a href="https://www.discodes.xyz/account"
				><span class="material-symbols-outlined"> person </span> Account</a
			>
		</li>
		<li>
			<a href="https://www.discodes.xyz/account/notifications"
				><span class="material-symbols-outlined"> notifications </span> Notifications
				<span class="badge badge-error text-xs">{notificationCount}</span></a
			>
		</li>
		<li>
			<a href="https://www.discodes.xyz/account"
				><span class="material-symbols-outlined"> settings </span> Settings</a
			>
		</li>
		<li>
			<a href="https://www.discodes.xyz/help"
				><span class="material-symbols-outlined"> help </span> Help & Support</a
			>
		</li>
		<li>
			<a href="https://www.discodes.xyz/user/{$user.user_metadata.full_name}"
				><span class="material-symbols-outlined"> account_box </span> Profile</a
			>
		</li>
		<li class="dropdown-divider" />
		<LogOutModal />
	</ul>
</details>
