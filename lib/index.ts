import DataController from './controllers/Data.Controller';
import App from './app';
import IndexController from "./controllers/index.controller";
import ItemController from "./controllers/item.controller";

const app: App = new App([
    new ItemController(),
    new IndexController(),
    new DataController()
]);

app.listen();