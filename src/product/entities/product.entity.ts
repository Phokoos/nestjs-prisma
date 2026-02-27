import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReviewEntity } from '../../review/entities/review.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';
import { ProductPosterEntity } from '../dto/poster.entity';

export enum Manufacturer {
  NATIONAL = 'national',
  OUTSIDE = 'outside',
}

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
  })
  title: string;

  @Column({
    name: 'is_available',
    default: true,
  })
  isAvailable: boolean;

  @Column({
    type: 'decimal',
    scale: 2,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: true,
    unsigned: true,
  })
  discount: number;

  @Column({
    type: 'enum',
    enum: Manufacturer,
    default: Manufacturer.NATIONAL,
  })
  manufacturer: Manufacturer;

  @Column({
    name: 'release_date',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  releaseDate: Date;

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews: ReviewEntity[];

  @ManyToMany(() => CustomerEntity, (customer) => customer.products, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'product_customer',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'customer_id',
      referencedColumnName: 'id',
    },
  })
  customers: CustomerEntity[];

  @Column({
    name: 'poster_id',
    type: 'uuid',
    nullable: true,
  })
  posterId: string;

  @OneToOne(() => ProductPosterEntity, (poster) => poster.product, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'poster_id',
  })
  poster: ProductPosterEntity | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
