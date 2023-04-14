import { Controller, Post, Body } from '@nestjs/common';
import { TelegramBotService } from '../bot/telegram.bot';
import { MercadoLibreService } from '../services/mercado-libre.service';

@Controller('callback')
export class CallbackController {
  constructor(
    private readonly telegramBotService: TelegramBotService,
    private readonly mercadoLibreService: MercadoLibreService,
  ) {}

  @Post()
  async handleCallback(@Body() body: any) {
    const bot = this.telegramBotService.getBot();

    if (body.message) {
      // Aquí podrías implementar la lógica para manejar los mensajes entrantes
    }

    if (body.shipment) {
      // Aquí podrías implementar la lógica para manejar las actualizaciones de envío
      const shipment = body.shipment;

      const text = `El envío ${shipment.id} cambió de estado a ${shipment.status}.`;

      bot.sendMessage(shipment.chatId, text);
    }

    return 'OK';
  }
}
