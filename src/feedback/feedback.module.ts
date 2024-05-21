import { Module } from '@nestjs/common';

// @@ Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// @@ Service
import { FeedbackService } from './feedback.service';

// @@ Controllers
import { FeedbackController } from './feedback.controller';

// @@ DAL
import { FeedbackDal } from './feedback.dal';

// @@ Schemas
import { Feedback, FeedbackSchema } from './feedback.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Feedback.name, schema: FeedbackSchema },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackDal],
})
export class FeedbackModule {}
