import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
    createdAt: Date;
}
