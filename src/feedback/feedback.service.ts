import { Injectable } from '@nestjs/common';
import { ObjectId } from 'typeorm';

// @@ Dtos
import { CreateFeedbackDto } from './dto/create-feedback.dto';

// @@ DAL
import { FeedbackDal } from './feedback.dal';

// @@ Schemas
import { Feedback } from './feedback.schema';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackDal: FeedbackDal) {}
  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedback =
      await this.feedbackDal.createFeedback(createFeedbackDto);

    return newFeedback;
  }

  async findAllForGym(gymId: string) {
    const allFeedbacks = await this.feedbackDal.findAllForGym(
      new ObjectId(gymId),
    );

    return allFeedbacks;
  }

  async findOne(id: string) {
    return await this.feedbackDal.findById(id);
  }

  async remove(id: string) {
    return await this.feedbackDal.findByIdAndDelete(id);
  }
}
