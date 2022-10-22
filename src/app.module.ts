import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { SubscriptionModule } from './modules/subscription/subscription.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    SubscriptionModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
          POSTGRES_HOST: Joi.string().required(),
          POSTGRES_PORT: Joi.number().required(),
          POSTGRES_USER: Joi.string().required(),
          POSTGRES_PASSWORD: Joi.string().required(),
          POSTGRES_DB: Joi.string().required(),
          PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
