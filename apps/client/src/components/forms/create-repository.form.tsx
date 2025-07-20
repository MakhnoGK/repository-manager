import { useForm } from 'react-hook-form';
import { useCreateRepositoryMutation } from '@/api/mutations/repositories/useCreateRepositoryMutation.ts';
import { Button } from '@/components/ui/button.tsx';
import { Form, FormField, FormMessage } from '@/components/ui/form.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '../ui/input';

type CreateRepositoryFormModel = {
    fullName: string;
};

export default function CreateRepositoryForm() {
    const createRepositoryMutation = useCreateRepositoryMutation();
    const form = useForm<CreateRepositoryFormModel>({
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
                        <>
                            <Label htmlFor="fullName">Repository:</Label>
                            <Input id="fullName" type="text" placeholder="octocat/Spoon-Knife" {...field} />
                            <FormMessage />
                        </>
                    )}
                />
            </Form>

            <Button type="submit">Add</Button>
        </form>
    );
}
