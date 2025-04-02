import { Router, Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";


class ItemController implements Controller {
    public path = '/items';
    public router = Router();
    private items: any[] = [];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createItem);
        this.router.get(this.path, this.getAllItems);
        this.router.get(`${this.path}/:id`, this.getItemById);
        this.router.put(`${this.path}/:id`, this.updateItem);
        this.router.delete(`${this.path}/:id`, this.deleteItem);
    }

    private createItem = (req: Request, res: Response) => {
        const { name } = req.body;
        const newItem = { id: this.items.length + 1, name };
        this.items.push(newItem);
        res.status(201).json(newItem);
    };

    private getAllItems = (req: Request, res: Response) => {
        res.json(this.items);
    };

    private getItemById = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const item = this.items.find(i => i.id === id);
        item ? res.json(item) : res.status(404).json({ message: 'Item not found' });
    };

    private updateItem = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        const itemIndex = this.items.findIndex(i => i.id === id);
        if (itemIndex !== -1) {
            this.items[itemIndex].name = name;
            res.json(this.items[itemIndex]);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    };

    private deleteItem = (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        this.items = this.items.filter(i => i.id !== id);
        res.json({ message: 'Item deleted' });
    };
}

export default ItemController;
