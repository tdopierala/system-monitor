<template>
	<div class="monitor-box">
		<div class="monitor-header">
			<div class="monitor-info">
				<h1>{{ name }}</h1>
				<p>{{ url }}</p>
			</div>
			<div class="chart-data">
				<p
					:class="{
						warning: avgResponseTime > avgResponseTimeWarningLimit && avgResponseTime < avgResponseTimeAlertLimit,
						alert: avgResponseTime > avgResponseTimeAlertLimit,
					}">
					{{ avgResponseTime }}
				</p>
				<span class="data-sup">Average response time</span>
			</div>
		</div>
		<div class="chart-container errors">
			<chart-box :chartData="errorsData"></chart-box>
			<div class="chart-data">
				<h3>{{ lastHourErrors }}</h3>
				<p>({{ avgErrors }})</p>
				<span class="data-sup">Errors in last hour</span>
			</div>
		</div>

		<div class="chart-container warnings">
			<chart-box :chartData="warningsData"></chart-box>
			<div class="chart-data">
				<h3>{{ lastHourWarnings }}</h3>
				<p>({{ avgWarnings }})</p>
				<span class="data-sup">Warnings in last hour</span>
			</div>
		</div>

		<div class="chart-container operations">
			<chart-box :chartData="operationsData"></chart-box>
			<div class="chart-data">
				<h3>{{ lastHourOperations }}</h3>
				<p>({{ avgOperations }})</p>
				<span class="data-sup">Operations in last hour</span>
			</div>
		</div>

		<div class="monitor-footer">
			<div>Last error: {{ lastError }}</div>
			<div>Since last sync: {{ timer }} s</div>
			<div>Daily error count: {{ dailyErrorCount }}</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import { MonitorDataElement } from '@/shared/interfaces/monitorDataElement.model';

import ChartBox from '@/components/ChartBox.vue';

export default defineComponent({
	name: 'MonitorBox',
	components: { ChartBox },

	data() {
		return {
			dataInterval: 0,
			timerInterval: 0,

			timer: 0,

			errorsData: {
				labels: ['1', '2', '3'],
				datasets: [{ data: [0, 0, 0], backgroundColor: '#e23333' }],
			},
			warningsData: {
				labels: ['1', '2', '3'],
				datasets: [{ data: [0, 0, 0], backgroundColor: '#cb9b47' }],
			},
			operationsData: {
				labels: ['1', '2', '3'],
				datasets: [{ data: [0, 0, 0], backgroundColor: '#2699fb' }],
			},
		};
	},

	computed: {
		...mapGetters([
			'name',
			'url',
			'allErrors',
			'allWarnings',
			'allOperations',
			'avgErrors',
			'avgWarnings',
			'avgOperations',
			'lastHourErrors',
			'lastHourWarnings',
			'lastHourOperations',
			'avgResponseTime',
			'avgResponseTimeWarningLimit',
			'avgResponseTimeAlertLimit',
			'lastError',
			'lastSync',
			'dailyErrorCount',
		]),
	},

	watch: {
		allErrors(newData: MonitorDataElement[]) {
			const data: MonitorDataElement[] = newData;
			this.errorsData.datasets[0].data = data.map(el => el.Value);
			this.errorsData.labels = data.map(el => el.Date.toString().substring(11, 13));
		},
		allWarnings(newData: MonitorDataElement[]) {
			const data: MonitorDataElement[] = newData;
			this.warningsData.datasets[0].data = data.map(el => el.Value);
			this.warningsData.labels = data.map(el => el.Date.toString().substring(11, 13));
		},
		allOperations(newData: MonitorDataElement[]) {
			const data: MonitorDataElement[] = newData;
			this.operationsData.datasets[0].data = data.map(el => el.Value);
			this.operationsData.labels = data.map(el => el.Date.toString().substring(11, 13));
		},
	},

	methods: {
		...mapActions(['getData']),

		refreshData() {
			clearInterval(this.dataInterval);
			this.dataInterval = setInterval(() => {
				this.getData();
				this.timer = 0;
			}, 20000);
		},

		setTimer() {
			clearInterval(this.timerInterval);
			this.timerInterval = setInterval(() => {
				this.timer++;
			}, 1000);
		},
	},

	mounted() {
		this.getData();
		this.refreshData();
		this.setTimer();
	},

	beforeUnmount() {
		clearInterval(this.dataInterval);
		clearInterval(this.timerInterval);
	},
});
</script>

<style lang="scss" scoped>
.monitor-box {
	margin: 10px;
	padding: 10px;
	background-image: linear-gradient(180deg, rgba(14, 43, 59, 0.32) 0%, rgba(0, 0, 0, 0.24) 100%);

	.data-sup {
		font-size: 11px;
	}

	.monitor-header {
		margin: 20px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.monitor-info {
			h1 {
				text-transform: uppercase;
			}

			p {
				color: #777780;
			}
		}

		.chart-data {
			width: 20vw;
			margin: 0 10px;
			text-align: center;
			font-size: 25px;
			color: #777780;

			.warning {
				color: #cb9b47;
			}

			.alert {
				color: #e23333;
			}
		}
	}

	.chart-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.chart-box {
			width: 80vw;
		}

		.chart-data {
			width: 20vw;
			margin: 0 10px;
			text-align: center;
			font-size: 15px;

			h3 {
				font-size: 33px;
			}
		}
	}

	.chart-container.errors {
		color: #e23333;
	}

	.chart-container.warnings {
		color: #cb9b47;
	}

	.chart-container.operations {
		color: #2699fb;
	}

	.monitor-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 11px;
		color: #8e8ec1;

		div {
			margin: 5px 15px;
		}
	}
}
</style>
