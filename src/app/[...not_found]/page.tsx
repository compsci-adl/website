// NOTE: Next.js 13.3 is *supposed* to support implicit 404 pages but there is a bug where
// links (specifically next/link) do not work at all.
// Until this bug is fixed, the catch all route [...not_found] will have to remain.
//
// SEE: https://github.com/vercel/next.js/issues/48367

import { notFound } from 'next/navigation';

export default function NotFoundCatchAll() {
    notFound();
}
