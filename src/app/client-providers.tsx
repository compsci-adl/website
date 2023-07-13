'use client';

import { ClerkProvider } from '@clerk/nextjs/app-beta/client';

export function ClientProviders(props: { children: React.ReactNode }) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? ''}>
            {props.children}
        </ClerkProvider>
    );
}
