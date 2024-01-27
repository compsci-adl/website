import { authMiddleware } from '@clerk/nextjs';

const authRoutes = ['/api/payment', '/dashboard', '/settings'];

export default authMiddleware({
    publicRoutes: (req) => {
        return !authRoutes.includes(req.nextUrl.pathname);
    },
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
