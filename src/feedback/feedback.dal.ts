import { Injectable } from '@nestjs/common';

// @@ Mongoose
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// @@ Schemas
import { Feedback } from './feedback.schema';

// @@ Dtos
import { CreateFeedbackDto } from './dto/create-feedback.dto';

// @@ Types
import { ObjectId } from 'typeorm';

@Injectable()
export class FeedbackDal {
  constructor(
    @InjectModel(Feedback.name)
    private feedbackModel: Model<Feedback>,
  ) {}

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto,
  ): Promise<Feedback | undefined> {
    const newFeedback = new this.feedbackModel(createFeedbackDto);
    await newFeedback.save();

    return newFeedback;
  }

  findById(id: string): Promise<Feedback | undefined> {
    return this.feedbackModel.findById(id);
  }

  findAllForGym(gymId: ObjectId): Promise<Feedback | undefined> {
    return this.feedbackModel.findOne({ gym: gymId });
  }

  findByIdAndDelete(id: string) {
    return this.feedbackModel.findByIdAndDelete(id);
  }
}
