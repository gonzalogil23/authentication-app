import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  address: string;

  @Prop()
  profilePicture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
