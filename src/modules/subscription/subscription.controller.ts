import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';

import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto';

@Controller('subscription')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService,
    ) {}

    @MessagePattern({ cmd: 'get-all-subscribers' })
    getAllSubscriptions() {
        return this.subscriptionService.getAllSubscribers();
    }

    @EventPattern({ cmd: 'add-subscriber' })
    addSubscriber(dto: CreateSubscriptionDto) {
        return this.subscriptionService.addSubscriber(dto);
    }
}
