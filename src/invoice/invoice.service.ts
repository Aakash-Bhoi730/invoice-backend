import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { InvoiceItem } from './entities/invoice-item.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly itemRepository: Repository<InvoiceItem>,
  ) {}
  async create(invoiceData: CreateInvoiceDto): Promise<Invoice> {
    const { items, ...invoiceDetails } = invoiceData;

    const totalAmount = items.reduce(
      (sum, item) => sum + item.qty * item.rate,
      0,
    );

    const invoice = this.invoiceRepository.create({
      ...invoiceDetails,
      total_amount: totalAmount,
      items: items.map((item) =>
        this.itemRepository.create({
          ...item,
          total: item.qty * item.rate,
        }),
      ),
    });

    return this.invoiceRepository.save(invoice);
  }

  async findAll(sort: 'ASC' | 'DESC' = 'ASC'): Promise<Invoice[]> {
    return this.invoiceRepository.find({
      relations: ['items'],
      order: {
        invoice_date: sort,
      },
    });
  }

  async findOne(id: number): Promise<Invoice | null> {
    return this.invoiceRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }

  async searchInvoices(search: string, sort: 'ASC' | 'DESC' = 'ASC') {
    const queryBuilder = this.invoiceRepository.createQueryBuilder('invoice');

    if (search) {
      console.log('Searching for term: ', search);

      if (search.startsWith('INV')) {
        queryBuilder.andWhere('invoice.invoice_number = :search', { search });
      } else {
        queryBuilder.andWhere(
          '(invoice.from_name LIKE :search OR invoice.to_name LIKE :search)',
          { search: `%${search}%` },
        );
      }
    }

    console.log('Search Criteria:', search);

    queryBuilder.orderBy('invoice.invoice_date', sort);

    const invoices = await queryBuilder.getMany();

    return invoices;
  }
}
