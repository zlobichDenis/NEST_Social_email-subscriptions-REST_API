import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    await app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: {
            port: configService.get('PORT'),
        },
    })

    app.startAllMicroservices();
}

bootstrap();
