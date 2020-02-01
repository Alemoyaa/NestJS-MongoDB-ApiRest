import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose' 

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

    async getProducts(): Promise<Product[]>{
        const Products = await this.productModel.find();
        return Products;
    }

    async getProduct(productID: string) : Promise<Product>{
        const product = await this.productModel.findById(productID)
        return product;
    }

    async createProduct(createPDTO: CreateProductDTO): Promise<Product>{
        const product = new this.productModel(createPDTO);
        return await product.save();
    }

    async deleteProduct(productID: String): Promise<Product>{
        const product = await this.productModel.findByIdAndDelete(productID);
        return product;
    }

    async updateProduct(productID: String, productNew: CreateProductDTO): Promise<Product>{
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, productNew, {new: true});
        return updateProduct;
    }
}
