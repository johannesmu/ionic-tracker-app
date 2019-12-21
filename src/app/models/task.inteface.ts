import { Category } from '../models/category.interface';
export interface Task {
    name: string;
    start: number;
    stop: number;
    category: Category;
}
