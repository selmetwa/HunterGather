<script lang="ts">
  export let onClose: () => boolean;
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <i class="fa-solid fa-xmark absolute top-5 right-5 text-2xl text-gray-400" on:click={onClose}></i>
        <slot />
      </div>
    </div>
  </div>
</div>