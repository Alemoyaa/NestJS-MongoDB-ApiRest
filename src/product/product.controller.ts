import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import { Controller, Get, Post, Res, HttpStatus, Body, Delete } from '@nestjs/common';


@Controller('product')
export class ProductController {
    
    constructor(private service: ProductService){}

    @Post("/create")
    async createPost(@Res() res, @Body() createPDTO: CreateProductDTO) {
        const product = await this.service.createProduct(createPDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product: product
        });
    }

    @Get("/show")
    showPost(@Res() res){
        this.service.getProduct();
        return res.status(HttpStatus.OK).json({
            message: 'received',
            product: product
        });
    }

    @Delete("/delete")
    deletePost(@Res() res){
        return res.status(HttpStatus.OK).json({
            message: 'Delete'
        });
    }

    @Post("/update")
    async updatePost(@Res() res, @Body() createPDTO: CreateProductDTO){
        const product = await this.service.createProduct(createPDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Update prod',
            product: product
        });
    }
}
