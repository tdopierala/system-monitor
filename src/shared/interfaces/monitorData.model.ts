import { MonitorDataElement } from './monitorDataElement.model';

export interface MonitorData {
	Name: string;
	Url: string;
	AvgResponseTime: number;
	AvgResponseTimeWarningLimit: number;
	AvgResponseTimeAlertLimit: number;
	LastSyncStr: Date;
	DailyErrorCount: number;
	LastErrorStr: Date;
	Errors: MonitorDataElement[];
	Warnings: MonitorDataElement[];
	Operations: MonitorDataElement[];
}

export const MonitorDataMock: MonitorData = {
	Name: '',
	Url: '',
	AvgResponseTime: 0,
	AvgResponseTimeWarningLimit: 0,
	AvgResponseTimeAlertLimit: 0,
	LastSyncStr: new Date(),
	DailyErrorCount: 0,
	LastErrorStr: new Date(),
	Errors: [{ Date: new Date(), Value: 0 }] as MonitorDataElement[],
	Warnings: [{ Date: new Date(), Value: 0 }] as MonitorDataElement[],
	Operations: [{ Date: new Date(), Value: 0 }] as MonitorDataElement[],
};
