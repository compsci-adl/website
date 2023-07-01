interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <div className="flex h-screen w-screen">{children}</div>;
}
