import type { Metadata } from 'next';
import ForgotPassword from './ForgotPassword';

export const metadata: Metadata = {
    title: 'Forgot Password',
    robots: { index: false, follow: false },
};
export default function ForgotPasswordPage() {
    return <ForgotPassword />;
}
