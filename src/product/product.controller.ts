import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import { Controller, Get, Post, Res, HttpStatus, Body, Delete, Param, NotFoundException, Query, Put } from '@nestjs/common';


@Controller('product')
export class ProductController {
    
    constructor(private service: ProductService){}

    @Post("/create")
    async createProduct(@Res() res, @Body() createPDTO: CreateProductDTO) {
        const product = await this.service.createProduct(createPDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product 
        });
    }

    @Get("/")
    async getProducts(@Res() res){
        const products = await this.service.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const product = await this.service.getProduct(productID);
        if(!product){
            throw new NotFoundException("Product does not exists");
        }
        return res.status(HttpStatus.OK).json({
            product
        });
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID ){
        const product = await this.service.deleteProduct(productID);
        if(!product){
            throw new NotFoundException("Product does not exists");
        }
        return res.status(HttpStatus.OK).json({
            message: 'Delete succefully'
        });
    }

    @Put("/update")
    async updateProduct(@Res() res, @Body() createPDTO: CreateProductDTO, @Query('productID') productID){
        const product = await this.service.updateProduct(productID, createPDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Update prod',
            product
        });
    }
}
