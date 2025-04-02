import DataModel from '../schemas/data.schema';
import { IData } from '../models/data.model';

export default class DataService {
    public async getAllData() {
        try {
            return await DataModel.find();
        } catch (error) {
            throw new Error(`Query failed: ${error}`);
        }
    }

    public async addData(data: IData) {
        try {
            const newData = new DataModel(data);
            return await newData.save();
        } catch (error) {
            throw new Error(`Insertion failed: ${error}`);
        }
    }

    public async deleteData(id: string) {
        try {
            return await DataModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Deletion failed: ${error}`);
        }
    }
}
