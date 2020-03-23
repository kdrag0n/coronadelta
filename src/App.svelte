<script>
	import { onMount } from "svelte";
	import Chart from "chart.js";

	export let name;

	onMount(async () => {
		//const response = await fetch("")
	});
	function renderChart() {
		var ctx = document.getElementById("myChart").getContext("2d");
		var chart = new Chart(ctx, {
			type: "line",
			data: {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "My First dataset",
						backgroundColor: "rgb(255, 99, 132)",
						borderColor: "rgb(255, 99, 132)",
						data: [0, 10, 5, 2, 20, 30, 45]
					}
				]
			},
			options: {}
		});
	}
</script>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<button on:click={renderChart}>Load</button>
	<canvas id="myChart"></canvas>
</main>
