import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Query } from "@nestjs/common";
import { UsePipes } from "@nestjs/common/decorators";
import { ValidationPipe } from "@nestjs/common/pipes";
import { ThrottlerGuard } from "@nestjs/throttler/dist/throttler.guard";
import { Public } from "src/utils/is-public.decorator";
import { PaginationDto } from "src/utils/pagination.dto";
import { RegisterProductDto } from "./product.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Public()
    @Post(':cnic')
    @UseGuards(ThrottlerGuard)
    @UsePipes(ValidationPipe)
    registerProduct(@Param('cnic') cnic: string, @Body() productDto: RegisterProductDto) {
        return this.productService.registerProduct(cnic, productDto);
    }

    @Get()
    @UsePipes(ValidationPipe)
    getProducts(@Query() paginationDto: PaginationDto) {
        return this.productService.getProducts(paginationDto);
    }

    @Get('details')
    getProductsDetails() {
        return this.productService.getProductsDetails();
    }

    @Get('filter/:filter/:value')
    @UsePipes(ValidationPipe)
    filterProducts(@Query() paginationDto: PaginationDto, @Param('filter') filter: string, @Param('value') value: string) {
        return this.productService.filterProducts(paginationDto, filter, value);
    }

    @Get(':id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProduct(id);
    }

    @Patch(':id/status/:status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Param('status') status: string) {
        return this.productService.updateStatus(id, status);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }
}