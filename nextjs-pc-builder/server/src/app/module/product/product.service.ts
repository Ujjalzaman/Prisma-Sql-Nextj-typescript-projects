import { IProducts } from './product.interface';
import { ProductModel } from './product.model';

const createProduct = async (payload: IProducts): Promise<IProducts | null> => {
    const result = await ProductModel.create(payload);
    return result;
}

const getAllProducts = async (): Promise<IProducts[] | null> => {
    const result = await ProductModel.find({});
    return result;
}

const deleteByIdProduct = async (id: string): Promise<IProducts | null> => {
    const result = await ProductModel.findOneAndDelete({ _id: id })
    return result;
}

const getByIdProduct = async (payload: string): Promise<IProducts | null> => {
    const result = await ProductModel.findOne({ _id: payload });
    return result;
}

const getProductByCategories = async (payload:string | null): Promise<IProducts[] | null> => {
    const result = await ProductModel.find({category: payload});
    return result;
}
export const ProductService = {
    getByIdProduct,
    deleteByIdProduct,
    getAllProducts,
    createProduct,
    getProductByCategories
}