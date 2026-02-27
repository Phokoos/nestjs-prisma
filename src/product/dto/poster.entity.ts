import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

@Entity({
  name: 'product_poster',
})
export class ProductPosterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @OneToOne(() => ProductEntity, (product) => product.poster)
  product: ProductEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
