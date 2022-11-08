import { classToClassFromExist } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Class } from "./classes";

@Entity("modules")
export class Module {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    image: string
  
    @Column({ length: 50 })
    name: string;

    @Column({ length: 200 })
    description: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Class, classes => classes.module, { cascade: true })
    classes : Class[]

}