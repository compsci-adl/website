import * as React from 'react';

interface HtmlConditionalCommentProps {
    children: React.ReactNode;
    comment: string;
    msoOnly?: boolean;
}

// Helper component for Outlook conditional rendering
export function HtmlConditionalComment({
    children,
    comment,
    msoOnly,
}: HtmlConditionalCommentProps) {
    return msoOnly ? (
        <>
            <div data-comment-mso-start={comment} />
            {children}
            <div data-comment-mso-end="endif" />
        </>
    ) : (
        <>
            <div data-comment-start={comment} />
            {children}
            <div data-comment-end="endif" />
        </>
    );
}
