import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubscriberEntity } from './entities/subscriber.entity';
import { SubscriptionResponse, CreateSubscriptionDto } from './dto';

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriberEntity)
        private readonly subscriptionRepository: Repository<SubscriberEntity>,
    ) {}

    static entitiesToResponse = (entities: SubscriberEntity[]) => {
        return entities.map((entity) => new SubscriptionResponse(entity));
    };

    async getAllSubscribers(): Promise<SubscriptionResponse[]> {
        const subscriberEntities = await this.subscriptionRepository.find();

        return SubscriptionService.entitiesToResponse(subscriberEntities);
    }

    async addSubscriber(dto: CreateSubscriptionDto): Promise<SubscriptionResponse> {
        const newSubscriber = await this.subscriptionRepository.create(dto);
        await this.subscriptionRepository.save(newSubscriber);

        return  new SubscriptionResponse(newSubscriber);
    }
}
