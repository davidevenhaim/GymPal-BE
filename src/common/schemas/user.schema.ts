// @@ Mongoose
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

// @@ Typeorm
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ObjectId,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from '@nestjs/class-validator';

// @@ Schemas
import { Workout } from '../schemas/workout.schema';

// @@ Constants
import { MAX_STRING_LENGTH } from '../utils/constants';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @PrimaryGeneratedColumn('uuid')
  _id: ObjectId;

  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(MAX_STRING_LENGTH)
  username: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(MAX_STRING_LENGTH)
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(MAX_STRING_LENGTH)
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Prop({
    type: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', default: [] },
    ],
  })
  workouts: Workout[];
}

export const UserSchema = SchemaFactory.createForClass(User);
