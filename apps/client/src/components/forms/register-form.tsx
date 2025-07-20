import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Form, FormField, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type RegisterFormModel = {
    email: string;
    password: string;
};

type RegisterFormProps = {
    onSubmit?: (data: RegisterFormModel) => void;
    error?: string;
};

const registerFormSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 6 characters long'),
});

export default function RegisterForm({ error, onSubmit }: RegisterFormProps) {
    const form = useForm<RegisterFormModel>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const doSubmit = (data: RegisterFormModel) => {
        onSubmit?.(data);
    };

    return (
        <form onSubmit={form.handleSubmit(doSubmit)} noValidate>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create new account</CardTitle>
                    <CardDescription>You need an account to manage repositories</CardDescription>
                    <CardAction>
                        <Link to="/login">
                            <Button type="button" variant="link">
                                Login
                            </Button>
                        </Link>
                    </CardAction>

                    {error && <div className="text-red-500 font-bold text-sm mt-4">{error}</div>}
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <>
                                            <Input id="email" type="text" placeholder="m@example.com" {...field} />
                                            <FormMessage />
                                        </>
                                    )}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <>
                                            <Input id="password" type="password" {...field} />
                                            <FormMessage />
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </Form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Create account
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
