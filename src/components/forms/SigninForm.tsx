'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod'; // form validation
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn, isClerkAPIResponseError, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
// shdnUI components
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

// Form validation schema
const FormValidation = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters long',
    }),
});

// Form values type
type FormValues = z.infer<typeof FormValidation>;

const SignInForm = () => {
    // Clerk's SignIn object. See more at https://clerk.com/docs/reference/clerk-react/usesignin
    const { isLoaded, signIn, setActive } = useSignIn();
    const { signOut } = useClerk();
    const router = useRouter();
    // react-hook-form
    const form = useForm<FormValues>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // Handle form submission using Clerk
    const handleSignIn = async (data: FormValues) => {
        if (!isLoaded) return;
        try {
            const response = await signIn.create({
                identifier: data.email,
                password: data.password,
            });
            if (response.status === 'complete') {
                console.log(response);
                router.push(`${window.location.origin}/`);
                console.log('User signed in');
            } else {
                console.log(response);
                console.log('User not signed in');
            }
        } catch (error) {
            if (error.errors[0].code === 'session_exists') {
                console.log('User already signed in');
            }
        }
    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(handleSignIn)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-base font-bold leading-6 text-gray-900">
                                    {' '}
                                    Email{' '}
                                </FormLabel>
                                <div className="mt-2">
                                    <FormControl>
                                        <Input
                                            className="rounded-none border-2 border-zinc-900"
                                            htmlFor="email"
                                            placeholder="john@exmaple.com"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-base font-bold leading-6 text-gray-900">
                                    {' '}
                                    Password{' '}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="rounded-none border-2 border-zinc-900"
                                        htmlFor="password"
                                        type="password"
                                        placeholder="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex h-auto w-full justify-center pt-6">
                        <Button className="bg-accent-highlight px-5 py-2 text-sm font-bold lg:px-6 lg:py-3 lg:text-base">
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SignInForm;
