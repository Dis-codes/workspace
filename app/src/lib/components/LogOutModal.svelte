<button class="btn btn-neutral" on:click={() => window.logoutModal.showModal()}>Log Out</button>
<dialog id="logoutModal" class="modal">

    <form method="dialog" class="modal-box">
        <h3 class="font-bold text-xl">Log out?</h3>
        <p class="py-4 text-lg">Are you sure you want to log out?</p>
        <p class="text-warning text-lg">All Unsaved data will be lost!</p>
        <div class="modal-action">
        <a class="btn btn-error" href="/logout">Log Out</a>
        <button class="btn">Cancel</button>
        </div>
    </form>
</dialog>