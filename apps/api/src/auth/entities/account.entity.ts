import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique('email', ['email'])
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 32 })
    password: string;
}
