import { Schema, model } from "mongoose";
import { IProductModel, IProducts } from "./product.interface";

const ProductSchema = new Schema<IProducts, IProductModel>({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    productName: {
        type: String,
    },
    shortTitle: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: String,
    },
    status: {
        type: String,
        enum: ["In Stock", "Out of stock"]
    },
    rating: {
        type: String,
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})
export const ProductModel = model<IProducts, IProductModel>('products', ProductSchema);