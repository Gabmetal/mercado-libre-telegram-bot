import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StartController } from './controllers/start.controller';
import { ShipmentController } from './controllers/shipment.controller';
import { CallbackController } from './controllers/callback.controller';
import { MercadoLibreService } from './services/mercado-libre.service';
import { TelegramBotService } from './bot/telegram.bot';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [StartController, ShipmentController, CallbackController],
  providers: [MercadoLibreService, TelegramBotService],
})
export class AppModule {}
