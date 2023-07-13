import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/signin(.*)',
        '/signup(.*)',
        '/api(.*)',
        '/about',
        '/events(.*)',
        '/contact',
        '/sponsors',
        '/join',
    ],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
