import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateRepositoryMutation } from '@/api/mutations/repositories/useCreateRepositoryMutation.ts';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormField, FormMessage } from '@/components/ui/form.tsx';
import { Label } from '@/components/ui/label.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';

type CreateRepositoryFormModel = {
    fullName: string;
};

const createRepositoryFormSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Repository full name is required')
        .regex(/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/, 'Invalid repository full name format'),
});

export default function CreateRepositoryForm() {
    const createRepositoryMutation = useCreateRepositoryMutation();
    const form = useForm<CreateRepositoryFormModel>({
        resolver: zodResolver(createRepositoryFormSchema),
        defaultValues: {
            fullName: '',
        },
    });

    const doCreateRepository = async (data: CreateRepositoryFormModel) => {
        await createRepositoryMutation.mutateAsync(data);
        form.reset();
    };

    return (
        <form onSubmit={form.handleSubmit(doCreateRepository)} noValidate>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="fullName" className="text-nowrap">
                                Add new repository:
                            </Label>

                            <div className="flex gap-2 items-center">
                                <Input
                                    id="fullName"
                                    type="text"
                                    className="flex-auto"
                                    placeholder="octocat/Spoon-Knife"
                                    {...field}
                                />

                                <Button type="submit">Add</Button>
                            </div>
                            <FormMessage />
                            {createRepositoryMutation.isError && (
                                <div className="text-red-500 text-sm font-bold">
                                    {createRepositoryMutation.error.message}
                                </div>
                            )}
                        </div>
                    )}
                />
            </Form>
        </form>
    );
}
