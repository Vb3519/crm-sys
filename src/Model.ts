import { MediaplansData_Type } from './data/mediaplansData';
import { ReportsData_Type } from './data/reportsData';

class AppModel {
  isReportsDataLoaded: boolean;
  isMediaplansDataLoaded: boolean;
  chatMessages: string[];
  mediaplansList: MediaplansData_Type[];
  isMediaplansListOpened: boolean;
  isReportsListOpened: boolean;
  reportsList: ReportsData_Type[];
  loadTimer: number;

  constructor() {
    this.isReportsDataLoaded = false;
    this.isMediaplansDataLoaded = false;
    this.mediaplansList = [];
    this.isMediaplansListOpened = true;
    this.isReportsListOpened = true;
    this.reportsList = [];
    this.chatMessages = [];
    this.loadTimer = 2000;
  }

  setMediaplansListOpened(value: boolean) {
    this.isMediaplansListOpened = value;
  }

  setReportsListOpened(value: boolean) {
    this.isReportsListOpened = value;
  }

  // добавление в состояние данных по отчетам:
  setIsReportsDataLoaded(value: boolean) {
    this.isReportsDataLoaded = value;
  }

  addDataToReportsList(companyInfo: ReportsData_Type) {
    this.reportsList.push(companyInfo);
  }

  // добавление в состояние данных по медиапланам:
  setIsMediaplansDataLoaded(value: boolean) {
    this.isMediaplansDataLoaded = value;
  }

  addDataToMediaplansList(companyInfo: MediaplansData_Type) {
    this.mediaplansList.push(companyInfo);
  }
}

export default AppModel;
