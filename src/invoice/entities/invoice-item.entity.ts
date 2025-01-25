import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Invoice } from './invoice.entity';

@Entity()
export class InvoiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  item_name: string;

  @Column()
  qty: number;

  @Column()
  rate: number;

  @Column()
  total: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.items)
  invoice: Invoice;
}
