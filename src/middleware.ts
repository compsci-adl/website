import {authMiddleware} from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/', '/not-found', '/about', '/events', '/sponsors', '/contact', '/sign-in',
    '/join-us'
  ],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
