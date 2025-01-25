import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('add')
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll(@Query('sort') sort: 'ASC' | 'DESC' = 'ASC') {
    return this.invoiceService.findAll(sort);
  }

  @Get('search')
  async searchInvoices(
    @Query('search') search: string,
    @Query('sort') sort: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.invoiceService.searchInvoices(search, sort);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const invoice = await this.invoiceService.findOne(id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
