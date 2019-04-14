import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn() id!: number;

  @Column() text!: string;
  @Column() author!: User;
}
