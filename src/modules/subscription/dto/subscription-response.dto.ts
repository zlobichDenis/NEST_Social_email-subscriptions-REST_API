import { SubscriberEntity } from '../entities/subscriber.entity';

export class SubscriptionResponse {
    id: number;
    email: string;
    name: string;

    constructor(subscriber: SubscriberEntity) {
        this.id = subscriber.id;
        this.email = subscriber.email;
        this.name = subscriber.name;
    }
}