<script lang="ts">
	import { fade } from 'svelte/transition';

	export let onClose: (e: any) => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="relative z-50"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
	on:click|stopPropagation={onClose}
	in:fade|global={{ duration: 300 }}
	out:fade|global={{ duration: 300 }}
>
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<div
			class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
			id="close-modal-root"
		>
			<div
				class="relative transform overflow-hidden rounded-sm bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
			>
				<slot />
			</div>
		</div>
	</div>
</div>
