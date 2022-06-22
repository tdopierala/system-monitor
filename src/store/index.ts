import { createStore } from 'vuex';
import Axios from 'axios';

import { MonitorData, MonitorDataMock } from '@/shared/interfaces/monitorData.model';

export default createStore({
	state: {
		monitorData: MonitorDataMock as MonitorData,
	},
	getters: {
		allErrors: state => state.monitorData.Errors,
		allWarnings: state => state.monitorData.Warnings,
		allOperations: state => state.monitorData.Operations,

		avgErrors: state => Math.round(state.monitorData.Errors.reduce((total, curr, _, arr) => total + curr.Value / arr.length, 0)),
		avgWarnings: state => Math.round(state.monitorData.Warnings.reduce((total, curr, _, arr) => total + curr.Value / arr.length, 0)),
		avgOperations: state => Math.round(state.monitorData.Operations.reduce((total, curr, _, arr) => total + curr.Value / arr.length, 0)),

		lastHourErrors: state => state.monitorData.Errors[0].Value,
		lastHourWarnings: state => state.monitorData.Warnings[0].Value,
		lastHourOperations: state => state.monitorData.Operations[0].Value,

		name: state => state.monitorData.Name,
		url: state => state.monitorData.Url,

		avgResponseTime: state => state.monitorData.AvgResponseTime,
		avgResponseTimeWarningLimit: state => state.monitorData.AvgResponseTimeWarningLimit,
		avgResponseTimeAlertLimit: state => state.monitorData.AvgResponseTimeAlertLimit,

		dailyErrorCount: state => state.monitorData.DailyErrorCount,
		lastSync: state => state.monitorData.LastSyncStr,
		lastError: state => state.monitorData.LastErrorStr,
	},
	mutations: {
		initData(state, data: MonitorData) {
			state.monitorData = data;
		},
	},
	actions: {
		async getData() {
			await Axios.get('https://visualsoft.com.pl/rekrutacja/202009/dane')
				.then(response => {
					this.commit('initData', response.data);
				})
				.catch(err => console.error(err.message));
		},
	},
	modules: {},
});
