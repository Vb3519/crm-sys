import './styles/style.scss';

import AppModel from './src/Model';
import AppView from './src/View';
import AppController from './src/Controller';

const appModel = new AppModel();
const appView = new AppView();
const appController = new AppController(appModel, appView);

console.log('контроллер приложения:', appController);
