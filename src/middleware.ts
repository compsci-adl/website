// import { authConfig } from '@/auth.config';
// import { DEFAULT_REDIRECT, PRIVATE_ROUTES, ROOT } from '@/lib/routes';
// import NextAuth from 'next-auth';
// import { NextResponse } from 'next/server';

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//     const { nextUrl } = req;

//     const isAuthenticated = !!req.auth;
//     console.log('isAuthenticated', isAuthenticated);
//     const isPrivateRoute = PRIVATE_ROUTES.includes(nextUrl.pathname); // Check for private routes

//     // Redirect unauthenticated users trying to access private routes
//     if (!isAuthenticated && isPrivateRoute) {
//         return Response.redirect(new URL(ROOT, nextUrl));
//     }

//     // Allow access to public routes for unauthenticated users
//     return NextResponse.next();
// });

// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };

export { auth as middleware } from '@/auth';
