import { Column, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'repositories' })
@Unique('UNIQUE_REPOSITORY_PER_AUTHOR', ['fullName', 'createdBy'])
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
