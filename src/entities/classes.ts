import { Module } from "./modules";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

@Entity("classes")
export class Class {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  image: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Module, module => module.classes , {onDelete: 'CASCADE'})
  module: Module;
}
