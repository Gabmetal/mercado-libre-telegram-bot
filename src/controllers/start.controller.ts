import { Controller, Post, Body } from '@nestjs/common';
import { TelegramBotService } from '../bot/telegram.bot';

@Controller('start')
export class StartController {
  constructor(private readonly telegramBotService: TelegramBotService) {
    const bot = this.telegramBotService.getBot();

    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const text = '¡Hola! Bienvenido a mi bot de rastreo de envíos de Mercado Libre. ¿En qué puedo ayudarte?';

      bot.sendMessage(chatId, text);
    });
  }
}
