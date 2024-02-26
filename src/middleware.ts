import { authMiddleware } from '@clerk/nextjs';

const authRoutes = ['/settings', '/admin'];

export default authMiddleware({
    publicRoutes: (req) => !authRoutes.includes(req.url),
});

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
