// NOTE: 2023-04-13
// Until NextJS supports implicit 404 pages (i.e. 404 pages not invoked by `notFound()`), this
// catch-all route will have to be used.
//
// SEE: https://github.com/vercel/next.js/issues/45834#issuecomment-1427525831

import { notFound } from 'next/navigation';

export default function NotFoundCatchAll() {
    notFound();
}
