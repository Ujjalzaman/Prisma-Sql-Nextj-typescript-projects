import { Model, SortOrder, Types } from "mongoose"

export interface IProducts {
    title: string;
    productName?:string;
    shortTitle?: string;
    category: string;
    price?: string;
    status?:"In Stock" | "Out of stock";
    rating?: string;
    image?:string;
}

export type IProductModel = Model<IProducts, Record<string, unknown>>