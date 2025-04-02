import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import { IData } from '../modules/models/data.model';

class DataController implements Controller {
    public path = '/api/data';
    public router = Router();
    private dataService = new DataService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/get`, this.getAll);
        this.router.post(`${this.path}/add`, this.addData);
        this.router.delete(`${this.path}/delete/:id`, this.deleteData);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.dataService.getAllData();
            res.json(data);
        } catch (error) {
            next(error);
        }
    };

    private addData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newData: IData = req.body;
            const createdData = await this.dataService.addData(newData);
            res.status(201).json(createdData);
        } catch (error) {
            next(error);
        }
    };

    private deleteData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.dataService.deleteData(id);
            res.status(200).json({ message: 'Data deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default DataController;
