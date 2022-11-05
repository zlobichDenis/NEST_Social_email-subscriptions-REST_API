import {
    Controller,
    UseInterceptors,
    ClassSerializerInterceptor,
    Inject,
} from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateSubscriptionDto } from './dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export default class SubscribersController {
    constructor(
        @Inject('SUBSCRIBERS_SERVICE')
        private readonly subscribersService: SubscriptionService,
    ) {}


    @MessagePattern({ cmd: 'add-subscriber' })
    async addSubscriber(@Payload() subscriber: CreateSubscriptionDto, @Ctx() context: RmqContext) {
        const newSubscriber = await this.subscribersService.addSubscriber(subscriber);

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        channel.ack(originalMsg);

        return newSubscriber;
    }
}
