<svelte:head>
	<title>Why Growth Factor Matters</title>
</svelte:head>

<script>
	import Chart from 'svelte-frappe-charts';

	let cases = 5;
	let factor = 1.2;

	let data = {
		labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
		datasets: [
			{
				values: [10, 12, 3, 9, 8, 15, 9]
			}
		]
	};
</script>

<p>This is the number of cases worldwide since December 31, 2019.</p>

<Chart data={data} type="line" />

<p>But that doesn't tell the full story.</p>

<p>In exponential growth, ...</p>
