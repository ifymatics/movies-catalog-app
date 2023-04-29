/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movie')
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    year: number;

    @Column()
    rating: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
