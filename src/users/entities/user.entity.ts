import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
    IsEmail,
    Length
} from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 100
    })
    firstName: string

    @Column({
        length: 100
    })
    lastName: string

    @Column({
        unique: true,
        length: 15
    })
    userName: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    @Length(6)
    password: string

    @Column({ 
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP' 
    })
    createdAt: Date
}