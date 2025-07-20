import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { GithubRepository } from '~/repositories/entities/github-repository.entity';

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
