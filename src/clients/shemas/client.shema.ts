import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Définition du type Client pour TypeScript
export type ClientDocument = Client & Document;

@Schema({
  timestamps: true, // Ajoute automatiquement createdAt et updatedAt
})
export class Client {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  company: string;

  @Prop({ default: true })
  isActive: boolean;
}

// Créer le schéma Mongoose
export const ClientSchema = SchemaFactory.createForClass(Client);