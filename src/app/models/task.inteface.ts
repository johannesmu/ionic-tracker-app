import { Category } from './category.class';
export interface Task {
    name: string;
    start: number;
    stop: number;
    category: Category;
}
