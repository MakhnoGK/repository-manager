import { Fragment } from 'react';
import { ArrowRight, Bug, GitFork, Star } from 'lucide-react';
import { useRepositoriesListQuery } from '@/api/queries/useRepositoriesListQuery.ts';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import styles from './repository-list.module.css';

export default function RepositoriesList() {
    const repositoriesQuery = useRepositoriesListQuery();
    return (
        <div>
            {repositoriesQuery.isLoading && <div>Loading...</div>}
            {!repositoriesQuery.data?.length && !repositoriesQuery.isLoading && <p>No repositories added...</p>}

            {repositoriesQuery.data?.map((repository) => {
                const [author, name] = repository.fullName.split('/');
                return (
                    <Fragment key={repository.id}>
                        <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                            <div className="order-2 flex items-center gap-2 md:order-none">
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">{name}</h3>

                                    <p className="text-sm text-muted-foreground">by {author}</p>
                                </div>
                            </div>

                            <div className="order-1 flex gap-8 md:order-none md:col-span-2">
                                <div className={styles.itemStatisticsContainer}>
                                    <Star />
                                    {repository.stars}
                                </div>

                                <div className={styles.itemStatisticsContainer}>
                                    <GitFork />
                                    {repository.forks}
                                </div>

                                <div className={styles.itemStatisticsContainer}>
                                    <Bug />
                                    {repository.issues}
                                </div>
                            </div>

                            <Button variant="outline" asChild>
                                <a className="order-3 ml-auto w-fit gap-2 md:order-none" href={repository.url}>
                                    <span>View on Github</span>
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                        <Separator />
                    </Fragment>
                );
            })}
        </div>
    );
}
