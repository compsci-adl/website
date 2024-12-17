import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { useSetJoinUsHeading } from '../store';

export default function StepOne() {
    useSetJoinUsHeading({
        title: 'Join Us',
        description: 'Create your account',
    });

    return (
        <div>
            <div className="mt-8">
                <Button
                    colour="orange"
                    width="w-full"
                    onClick={() => signIn('keycloak')}
                    size="small"
                >
                    Sign Up
                </Button>
            </div>
        </div>
    );
}
