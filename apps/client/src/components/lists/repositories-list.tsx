import { Fragment } from 'react';
import { ArrowRight, Bug, GitFork, Star } from 'lucide-react';
import { useDeleteRepositoryMutation } from '@/api/mutations/repositories/useDeleteRepositoryMutation.ts';
import { useUpdateRepositoryMutation } from '@/api/mutations/repositories/useUpdateRepositoryMutation.ts';
import { useRepositoriesListQuery } from '@/api/queries/useRepositoriesListQuery.ts';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import styles from './repository-list.module.css';

export default function RepositoriesList() {
    const repositoriesQuery = useRepositoriesListQuery();

    const updateRepositoryMutation = useUpdateRepositoryMutation();
    const deleteRepositoryMutation = useDeleteRepositoryMutation();

    return (
        <div>
            {repositoriesQuery.isLoading && <div>Loading...</div>}
            {!repositoriesQuery.data?.length && !repositoriesQuery.isLoading && <p>No repositories added...</p>}

            {repositoriesQuery.data?.map((repository) => {
                const [author, name] = repository.fullName.split('/');

                const doRepositoryUpdate = async () => {
                    await updateRepositoryMutation.mutateAsync(repository.fullName);
                };

                const doRepositoryDelete = async () => {
                    if (confirm(`Are you sure you want to delete the repository ${repository.fullName}?`)) {
                        await deleteRepositoryMutation.mutateAsync(repository.id);
                    }
                };

                return (
                    <Fragment key={repository.id}>
                        <div className="flex justify-between items-center py-2 px-4">
                            <div>
                                <div className="flex flex-col gap-1">
                                    <h3 className="font-semibold">{name}</h3>

                                    <p className="text-sm text-muted-foreground">by {author}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
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

                            <div>
                                <div className="flex gap-2">
                                    <Button variant="outline" type="button" onClick={doRepositoryUpdate}>
                                        Update info
                                    </Button>

                                    <Button variant="destructive" type="button" onClick={doRepositoryDelete}>
                                        Delete
                                    </Button>

                                    <Button variant="link" asChild>
                                        <a href={repository.url} target="_blank" rel="noopener noreferrer">
                                            <span>View on Github</span>
                                            <ArrowRight className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>

                                <div className="text-xs text-right mt-2 text-gray-500">
                                    Last update: {repository.updatedAt}
                                </div>
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                );
            })}
        </div>
    );
}
