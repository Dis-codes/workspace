<div class="flex flex-row">
    <!-- sidebar -->
    <div class="bg-base-200 w-60 h-screen">
        <ul class="mt-20 menu items-center gap-3">
        <li><a href="/editor/blockly">Home</a></li>
        <li><a href="blockly/templates">Templates</a></li>
        <li><a href="blockly/examples">Examples</a></li>
        <li><a href="blockly/shared">Shared Code</a></li>
        <li><a href="https://www.discodes.xyz/search/marketplace">Marketplace</a></li>
        <div class="divider">LINKS</div>
        <li><a href="https://www.discodes.xyz/" target="_blank">Main page</a></li>
        <li><a href="https://discord.gg/TsQPMrNyBv" target="_blank">Discord</a></li>
        <li><a href="https://github.com/Dis-codes" target="_blank">GitHub</a></li>
        <li><a href="https://www.discodes.xyz/help" target="_blank">Help</a></li>
        <li><a href="https://docs.discodes.xyz" target="_blank">Documentation</a></li>
        <li><a href="https://status.discodes.xyz" target="_blank">Status</a></li>
        </ul>
    </div>
    <!-- main content -->
    <div class="h-full mt-16">
        <slot />
    </div>
</div>