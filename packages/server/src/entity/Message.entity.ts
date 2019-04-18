import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { User } from "./User.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn() id!: number;

  @Column() text!: string;
  @ManyToOne(type => User, user => user.messages) author!: Promise<User>;
}
