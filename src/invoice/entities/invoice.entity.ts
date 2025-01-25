import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoice_number: string;

  @Column()
  from_name: string;

  @Column()
  from_address: string;

  @Column()
  to_name: string;

  @Column()
  to_address: string;

  @Column('datetime')
  invoice_date: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total_amount: number;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];
}
