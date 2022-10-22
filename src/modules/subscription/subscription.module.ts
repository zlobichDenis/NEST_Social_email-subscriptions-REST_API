import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionService } from './subscription.service';
import { SubscriberEntity } from './entities/subscriber.entity';
import { SubscriptionController } from './subscription.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([SubscriberEntity])
    ],
    providers: [SubscriptionService],
    controllers: [SubscriptionController],
})
export class SubscriptionModule {}
