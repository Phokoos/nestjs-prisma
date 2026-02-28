import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from '../../generated/prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateCustomerDto): Promise<Customer> {
    const { name } = dto;

    return this.prismaService.customer.create({
      data: { name },
    });
  }
}
