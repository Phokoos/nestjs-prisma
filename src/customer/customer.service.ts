import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  public constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
  ) {}

  public async create(dto: CreateCustomerDto): Promise<CustomerEntity> {
    const { name } = dto;

    const customer = this.customerRepo.create({
      name,
    });

    return this.customerRepo.save(customer);
  }
}
