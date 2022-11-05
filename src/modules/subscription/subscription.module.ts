import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionService } from './subscription.service';
import { SubscriberEntity } from './entities/subscriber.entity';
import { SubscriptionController } from './subscription.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriberEntity])
    ],
    providers: [
        SubscriptionService,
        {
            provide: 'SUBSCRIBERS_SERVICE',
            useFactory: (configService: ConfigService) => {
                const user = configService.get('RABBITMQ_USER');
                const password = configService.get('RABBITMQ_PASSWORD');
                const host = configService.get('RABBITMQ_HOST');
                const queueName = configService.get('RABBITMQ_QUEUE_NAME');

                return ClientProxyFactory.create({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${user}:${password}@${host}`],
                        queue: queueName,
                        queueOptions: {
                            durable: true,
                        },
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
    controllers: [SubscriptionController],
})
export class SubscriptionModule {}
