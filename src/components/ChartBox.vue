<template>
	<div class="chart-box">
		<Bar
			:chart-options="chartOptions"
			:chart-data="chartData"
			:chart-id="chartId"
			:dataset-id-key="datasetIdKey"
			:css-classes="cssClasses"
			:styles="styles"
			:width="width"
			:height="height" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default defineComponent({
	name: 'ChartBox',
	components: { Bar },

	props: {
		chartId: {
			type: String,
			default: 'bar-chart',
		},
		width: {
			type: Number,
			default: 200,
		},
		height: {
			type: Number,
			default: 100,
		},
		cssClasses: {
			default: '',
			type: String,
		},
		styles: {
			type: Object as PropType<Partial<CSSStyleDeclaration>>,
			default: () => {
				// empty
			},
		},
		chartData: {
			type: Object,
			default: () => {
				return {
					labels: ['January', 'February', 'March'],
					datasets: [{ data: [40, 20, 12] }],
				};
			},
		},
		chartOptions: {
			type: Object,
			default: () => {
				return {
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						legend: { display: false },
					},
					scales: {
						x: {
							display: true,
							grid: { display: false },
						},
						y: {
							display: false,
							grid: { display: false },
						},
					},
				};
			},
		},
	},
});
</script>

<style lang="scss" scoped>
.chart-box {
	div {
		height: 10vh;
	}
}
</style>
