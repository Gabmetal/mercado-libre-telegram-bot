import { Controller, Post, Body } from '@nestjs/common';
import { TelegramBotService } from '../bot/telegram.bot';
import { MercadoLibreService } from '../services/mercado-libre.service';

@Controller('shipment')
export class ShipmentController {
  private shipments: string[] = [];

  constructor(
    private readonly telegramBotService: TelegramBotService,
    private readonly mercadoLibreService: MercadoLibreService,
  ) {
    const bot = this.telegramBotService.getBot();

    bot.onText(/\/addshipment (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const shipmentId = match[1];

      try {
        const shipment = await this.mercadoLibreService.getShipment(shipmentId);

        this.shipments.push(shipment.id);

        const text = `Se agregó el envío ${shipment.id} a la lista. Estado actual: ${shipment.status}`;

        bot.sendMessage(chatId, text);
      } catch (error) {
        const text = `No se pudo agregar el envío ${shipmentId}. Por favor, asegúrate de que el ID de envío sea válido y vuelve a intentarlo.`;

        bot.sendMessage(chatId, text);
      }
    });

    bot.onText(/\/trackshipment (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const shipmentId = match[1];

      try {
        const shipment = await this.mercadoLibreService.getShipment(shipmentId);
        const text = `Estado actual del envío ${shipment.id}: ${shipment.status}`;

        bot.sendMessage(chatId, text);
      } catch (error) {
        const text = `No se pudo obtener la información del envío ${shipmentId}. Por favor, asegúrate de que el ID de envío sea válido y vuelve a intentarlo.`;

        bot.sendMessage(chatId, text);
      }
    });

    bot.onText(/\/removeshipment (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const shipmentId = match[1];

      const index = this.shipments.indexOf(shipmentId);

      if (index > -1) {
        this.shipments.splice(index, 1);

        const text = `El envío ${shipmentId} se eliminó correctamente de la lista.`;

        bot.sendMessage(chatId, text);
      } else {
        const text = `No se encontró el envío ${shipmentId} en la lista.`;

        bot.sendMessage(chatId, text);
      }
    });
  }
}
