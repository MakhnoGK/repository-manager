import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'users' })
@Unique('email', ['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 32 })
    password: string;
}
