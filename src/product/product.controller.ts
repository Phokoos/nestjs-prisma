import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(): any {
    return this.productService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<any> {
    return this.productService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CreateProductDto,
  ): Promise<any> {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.productService.delete(id);
  }
}
