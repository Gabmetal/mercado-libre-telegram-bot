import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class MercadoLibreService {
  private readonly api: AxiosInstance;
  private readonly logger = new Logger(MercadoLibreService.name);

  constructor(private readonly configService: ConfigService) {
    this.api = axios.create({
      baseURL: 'https://api.mercadolibre.com',
      headers: {
        Authorization: `Bearer ${this.configService.get('MERCADO_LIBRE_ACCESS_TOKEN')}`,
      },
    });
  }

  public async getShipment(shipmentId: string): Promise<any> {
    const response = await this.api.get(`/shipments/${shipmentId}`);
    this.logger.log(`Getting shipment data for tracking ID ${shipmentId}`);
    return response.data;
  }
}
