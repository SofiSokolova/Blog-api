import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  confirmed: boolean;

  @Prop({ required: true })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  const user = this;
  if (user.passwordHash) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.passwordHash, salt, (err, hash) => {
        if (err) return next(err);

        user.salt = salt;
        user.passwordHash = hash;
        next();
      });
    });
  }
});

export interface User extends Document {
  passwordHash: string;
}

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.passwordHash);
};
