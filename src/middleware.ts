// import { authMiddleware } from '@clerk/nextjs';
// const authRoutes = ['/settings', '/admin'];
// export default authMiddleware({
//     publicRoutes: (req) => !authRoutes.includes(req.url),
// });
// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/settings(.*)', '/admin(.*)']);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/(.*)'],
};
