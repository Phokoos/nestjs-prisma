import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductResponse } from './dto/product-response';

@ApiTags('All Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    summary: 'Get all products',
    description: 'Get all products from the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The products have been successfully retrieved.',
  })
  @Get()
  getAll(): any {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get product by id',
    description: 'Get product by id from the database',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The product has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The id of the product',
  })
  @ApiQuery({
    name: 'isActive',
    type: Boolean,
    required: false,
  })
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.productService.findById(id);
  }

  @ApiOperation({
    summary: 'Create a new product',
    description: 'Create a new product in the database',
  })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: ProductResponse,
  })
  // @ApiCreatedResponse({
  //   description: 'The product has been successfully created.',
  //   example: {
  //     id: 1,
  //     title: 'Orange',
  //     price: 2.26,
  //     isActive: true,
  //     discount: 2,
  //     posterUrl: 'https://example.com',
  //     customerIds: [1, 2, 3],
  //   },
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       id: { type: 'number' },
  //       title: { type: 'string' },
  //       price: { type: 'number' },
  //       isActive: { type: 'boolean' },
  //       discount: { type: 'number' },
  //       posterUrl: { type: 'string' },
  //       customerIds: { type: 'array', items: { type: 'number' } },
  //     },
  //   },
  // })
  // @ApiBadRequestResponse({
  //   description: 'Invalid input data.',
  //   example: {
  //     statusCode: 'number',
  //     message: 'string',
  //     error: 'string',
  //   },
  // })
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
