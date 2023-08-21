<script>
    import LogOutModal from "./LogOutModal.svelte";
    import { user } from '$lib/userStore';
    let notificationCount = 2;
    let isAdmin = true;
</script>

<details class="dropdown dropdown-end dropdown-bottom">
    <summary class="m-1 btn btn-square btn-circle">
        <img src={$user?.user_metadata.avatar_url} alt={"Profile Picture of " + ($user ? $user.user_metadata.full_name : "User")} class="h-full w-full rounded-full" />
    </summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li><a href="/account"><span class="material-symbols-outlined">
            person
            </span> Account</a></li>
        <li><a href="/notifications"><span class="material-symbols-outlined">
            notifications
            </span> Notifications <span class="badge badge-error text-xs">{notificationCount}</span></a></li>
        <li><a href="/settings"><span class="material-symbols-outlined">
            settings
            </span> Settings</a></li>
        <li><a href="/help"><span class="material-symbols-outlined">
            help
            </span> Help & Support</a></li>
            {#if isAdmin}
            <li><a href="/admin"><span class="material-symbols-outlined">
                shield_person
                </span> Admin</a></li>
            {/if}
        <li class="dropdown-divider"></li>
        <LogOutModal />
    </ul>
</details>
