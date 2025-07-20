import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { User } from '~/users/entities/user.entity';

@Entity({ name: 'repositories' })
@Unique('fullName', ['fullName'])
export class GithubRepository {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    url: string;

    @Column()
    stars: number;

    @Column()
    forks: number;

    @Column()
    issues: number;

    @Column()
    createdBy: number;

    @Column()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
