import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramBotService.name);

  constructor(private configService: ConfigService) {
    const telegramApiToken = configService.get<string>('TELEGRAM_API_TOKEN');
    this.bot = new TelegramBot(telegramApiToken, { polling: true });

    this.bot.on('message', (message) => {
      console.log(`Received message: ${message.text} from ${message.chat.id}`);
    });

    this.bot.onText(/\/start/, (message) => {
      this.bot.sendMessage(
        message.chat.id,
        '¡Hola! Este es un bot de seguimiento de envíos de Mercado Libre. Para agregar un nuevo envío, envíame el número de seguimiento.'
      );
    });
  }

  public getBot(): TelegramBot {
    return this.bot;
  }
}
