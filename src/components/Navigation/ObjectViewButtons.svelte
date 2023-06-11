<script>
	import { objectView } from '../../store/store';

	const toggleCardView = () => {
		objectView.set('card');
	};

	const toggleTwoUpGrid = () => {
		objectView.set('two-up');
	};

	const toggleRowView = () => {
		objectView.set('row');
	};
</script>

<div class="flex flex-row gap-4 mr-4 mt-4 md:mt-0">
	<button on:click={toggleCardView}>
		<i
			class={`fa-solid fa-table-cells fa-xl ${
				$objectView === 'card' ? 'text-blue-400' : 'text-gray-400'
			}`}
		/>
	</button>

	<button on:click={toggleTwoUpGrid}>
		<i
			class={`fa-solid fa-table-cells-large fa-xl ${
				$objectView === 'two-up' ? 'text-blue-400' : 'text-gray-400'
			}`}
		/>
	</button>
	<button on:click={toggleRowView}>
		<i
			class={`fa-solid fa-list fa-xl ${$objectView === 'row' ? 'text-blue-400' : 'text-gray-400'}`}
		/>
	</button>
</div>
