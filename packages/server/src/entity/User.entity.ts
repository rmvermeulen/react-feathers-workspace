import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Message } from "./Message.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @OneToMany(type => Message, message => message.author)
  messages!: Promise<Message[]>;
}
