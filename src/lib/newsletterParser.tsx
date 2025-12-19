import parse, { domToReact } from 'html-react-parser';
import Image from 'next/image';
import React from 'react';
import sanitizeHtml from 'sanitize-html';

export function sanitizeAndParse(raw: string | undefined): React.ReactNode | null {
    if (!raw) return null;
    const sanitized = sanitizeHtml(raw || '', {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            'img',
            'table',
            'span',
            'thead',
            'tbody',
            'tr',
            'td',
            'th',
            'ul',
            'ol',
            'li',
            'center',
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
            a: ['href', 'rel', 'target', 'title'],
            table: ['class', 'style'],
            tr: ['class', 'style'],
            th: ['class', 'style'],
            td: ['class', 'style'],
            ul: ['class', 'style'],
            ol: ['class', 'style'],
            li: ['class', 'style'],
            p: ['class', 'style'],
            div: ['class', 'style'],
            span: ['class', 'style'],
        },
        allowedSchemesByTag: {
            img: ['http', 'https', 'data'],
        },
        allowedStyles: {
            '*': {
                'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
                'text-decoration': [/^(.*(?:underline|line-through|overline|none).*)$/],
            },
            img: {
                width: [/^\d+%?$/],
                height: [/^\d+%?$/],
                float: [/^left$/, /^right$/, /^none$/],
                display: [/^block$/, /^inline-block$/],
            },
            table: {
                width: [/^\d+%?$/],
            },
        },
    });

    const replaceNode = (domNode: any) => {
        const getAttribsAndStyle = (attribs: Record<string, unknown> | undefined) => {
            const attrs = { ...(attribs || {}) } as Record<string, unknown>;
            const styleString = attrs.style || '';
            delete attrs.style;
            const styleObj: Record<string, string> = {};
            if (styleString && typeof styleString === 'string') {
                styleString.split(';').forEach((s: string) => {
                    const [k, v] = s.split(':');
                    if (k && v) {
                        const key = k.trim();
                        const value = v.trim();
                        const camelKey = key.replace(/-([a-z])/g, (_m, p1) => p1.toUpperCase());
                        styleObj[camelKey] = value;
                    }
                });
            }
            return { attrs, styleObj: Object.keys(styleObj).length ? styleObj : undefined };
        };
        const safeGetClass = (attribs: Record<string, unknown> | undefined): string => {
            const v = attribs && (attribs as Record<string, unknown>).class;
            return typeof v === 'string' ? v : '';
        };
        const parseChildren = (children?: unknown[]) =>
            domToReact((children as any[]) || [], { replace: replaceNode });

        if (
            domNode?.type === 'tag' &&
            (domNode.name === 'div' || domNode.name === 'p' || domNode.name === 'td') &&
            domNode.children &&
            domNode.children.filter((ch: any) => ch && ch.type === 'tag' && ch.name === 'img')
                .length >= 2
        ) {
            const { attrs: attribsWrapper, styleObj: wrapperStyle } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const classStrWrapper = safeGetClass(attribsWrapper);
            const wrapperAlignAttr =
                attribsWrapper && (attribsWrapper as Record<string, unknown>).align;
            const justifyClass =
                (wrapperStyle as React.CSSProperties | undefined)?.textAlign === 'center' ||
                (typeof wrapperAlignAttr === 'string' && wrapperAlignAttr === 'center')
                    ? 'justify-center'
                    : '';
            return (
                <div
                    {...(attribsWrapper as Record<string, unknown>)}
                    className={`flex flex-wrap items-start gap-4 ${justifyClass} ${classStrWrapper}`}
                    style={wrapperStyle as React.CSSProperties}
                >
                    {parseChildren(domNode.children)}
                </div>
            );
        }

        // Replace <p> elements that contain block-level children (like <img>, <table>, <hr>, <div>)
        // with a <div> to avoid invalid HTML such as <p><div>...</div></p> which causes hydration errors.
        if (domNode?.type === 'tag' && domNode.name === 'p' && domNode.children) {
            const hasBlockChild = domNode.children.some(
                (ch: any) =>
                    ch && ch.type === 'tag' && ['img', 'table', 'hr', 'div'].includes(ch.name)
            );
            if (hasBlockChild) {
                const { attrs: attribsWithoutStyle, styleObj } = getAttribsAndStyle(
                    domNode.attribs || {}
                );
                const classStr = safeGetClass(attribsWithoutStyle);
                return (
                    <div
                        {...(attribsWithoutStyle as Record<string, unknown>)}
                        className={classStr}
                        style={styleObj as React.CSSProperties}
                    >
                        {parseChildren(domNode.children)}
                    </div>
                );
            }
        }

        if (domNode?.type === 'tag' && domNode.name === 'img') {
            const { attrs: attribsWithoutStyle, styleObj: inlineStyle } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const classStr = safeGetClass(attribsWithoutStyle);
            const attrs = attribsWithoutStyle as Record<string, unknown>;
            const src = String(attrs.src || '');
            const alt = String(attrs.alt || '');
            const widthAttr = attrs.width;
            const heightAttr = attrs.height;
            const alignAttr = (attrs.align as string | undefined) || undefined;

            const parseDimension = (val: unknown): number | undefined => {
                if (typeof val === 'number') return val;
                if (typeof val === 'string') {
                    const m = val.trim().match(/^(\d+)(px)?$/);
                    if (m) return parseInt(m[1], 10);
                    return undefined;
                }
                return undefined;
            };
            const widthNum = parseDimension(widthAttr || (inlineStyle as any)?.width);
            const heightNum = parseDimension(heightAttr || (inlineStyle as any)?.height);

            const floatStyle = (inlineStyle?.float as string | undefined) || undefined;
            let imgClass = classStr;
            const imgStyle: React.CSSProperties | undefined = inlineStyle as React.CSSProperties;
            // Prefer to render images as their own block and center them so inline text is above/below the image
            // Avoid float-left / float-right to prevent text wrapping beside images in our layout
            if (imgStyle) delete (imgStyle as unknown as Record<string, unknown>).float;
            // Apply mx-auto as a sensible default centering behaviour
            imgClass = `mx-auto ${imgClass}`.trim();
            if (floatStyle === 'left' || alignAttr === 'left') {
                // Respect the author margin hint but do not float
                imgClass = `${imgClass} mr-4`;
            } else if (floatStyle === 'right' || alignAttr === 'right') {
                imgClass = `${imgClass} ml-4`;
            }

            // Maintain previous centering logic based on parent alignments/margins when present
            {
                const parent = domNode.parent as any as
                    | { attribs?: Record<string, unknown>; name?: string }
                    | undefined;
                const parentStyleObj = parent?.attribs
                    ? getAttribsAndStyle(parent.attribs).styleObj
                    : undefined;
                const parentAlignAttr = parent?.attribs
                    ? (parent.attribs.align as string | undefined)
                    : undefined;
                const parentTextAlign =
                    (parentStyleObj?.textAlign as string | undefined) || parentAlignAttr;
                const inlineStyleObj = inlineStyle as Record<string, string> | undefined;
                const marginLeft = inlineStyleObj?.marginLeft as string | undefined;
                const marginRight = inlineStyleObj?.marginRight as string | undefined;
                const margin = inlineStyleObj?.margin as string | undefined;
                const marginsAuto =
                    (marginLeft === 'auto' && marginRight === 'auto') ||
                    (typeof margin === 'string' && margin.split(/\s+/).includes('auto'));
                const shouldCenter =
                    alignAttr === 'center' ||
                    parentTextAlign === 'center' ||
                    marginsAuto ||
                    parent?.name === 'center';
                if (shouldCenter && !imgClass.includes('mx-auto')) {
                    imgClass = `mx-auto ${imgClass}`.trim();
                } else if (
                    !imgClass.includes('mx-auto') &&
                    (imgStyle?.display === 'block' || imgStyle?.display === 'inline-block')
                ) {
                    imgClass = `${imgClass}`.trim();
                }
            }

            if (widthNum && heightNum && src && src.startsWith('/')) {
                return (
                    <div className="my-4 flex w-full items-center justify-center">
                        <Image
                            src={src}
                            alt={alt}
                            width={widthNum}
                            height={heightNum}
                            className={`block h-auto max-w-full ${imgClass}`}
                            style={imgStyle}
                        />
                    </div>
                );
            }
            // eslint-disable-next-line @next/next/no-img-element
            return (
                <div className="my-4 flex w-full items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        {...(attribsWithoutStyle as Record<string, unknown>)}
                        className={`block h-auto max-w-full ${imgClass}`}
                        style={imgStyle}
                        alt={alt || ''}
                    />
                </div>
            );
        }

        if (domNode?.type === 'tag' && domNode.name === 'hr') {
            return <hr className="my-6 border-t-2 border-black" />;
        }

        if (domNode?.type === 'tag' && domNode.name === 'a') {
            const attribs = domNode.attribs || {};
            const href = attribs.href || '#';
            return (
                <a
                    href={href}
                    className={`underline ${attribs.class || ''}`}
                    target={attribs.target || '_blank'}
                    rel={attribs.rel || 'noopener noreferrer'}
                >
                    {parseChildren(domNode.children)}
                </a>
            );
        }

        if (domNode?.type === 'tag' && domNode.name === 'table') {
            const { attrs: attribsWithoutStyle, styleObj } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const classStrTable = safeGetClass(attribsWithoutStyle);
            return (
                <div className="-mx-4 overflow-x-auto md:mx-0">
                    <table
                        {...(attribsWithoutStyle as Record<string, unknown>)}
                        className={`border-collapse border border-black ${classStrTable}`}
                        style={styleObj as React.CSSProperties}
                    >
                        {parseChildren(domNode.children)}
                    </table>
                </div>
            );
        }

        if (domNode?.type === 'tag' && (domNode.name === 'th' || domNode.name === 'td')) {
            const { attrs: attribsWithoutStyle, styleObj } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const Tag = domNode.name;
            const classStrCell = safeGetClass(attribsWithoutStyle);
            return (
                <Tag
                    {...(attribsWithoutStyle as Record<string, unknown>)}
                    className={`border border-black p-2 ${classStrCell}`}
                    style={styleObj as React.CSSProperties}
                >
                    {parseChildren(domNode.children)}
                </Tag>
            );
        }

        if (domNode?.type === 'tag' && domNode.name === 'ul') {
            const { attrs: attribsWithoutStyle, styleObj } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const classStrList = safeGetClass(attribsWithoutStyle);
            return (
                <ul
                    {...(attribsWithoutStyle as Record<string, unknown>)}
                    className={`ml-6 list-disc ${classStrList}`}
                    style={styleObj as React.CSSProperties}
                >
                    {parseChildren(domNode.children)}
                </ul>
            );
        }

        if (domNode?.type === 'tag' && domNode.name === 'ol') {
            const { attrs: attribsWithoutStyle, styleObj } = getAttribsAndStyle(
                domNode.attribs || {}
            );
            const classStrList2 = safeGetClass(attribsWithoutStyle);
            return (
                <ol
                    {...(attribsWithoutStyle as Record<string, unknown>)}
                    className={`ml-6 list-decimal ${classStrList2}`}
                    style={styleObj as React.CSSProperties}
                >
                    {parseChildren(domNode.children)}
                </ol>
            );
        }

        if (domNode?.type === 'tag' && domNode.attribs && domNode.attribs.style) {
            const styleString = String((domNode.attribs as Record<string, unknown>).style || '');
            const styleObj: Record<string, string> = {};
            styleString.split(';').forEach((s: string) => {
                const [k, v] = s.split(':');
                if (k && v) {
                    const key = k.trim();
                    const value = v.trim();
                    const camelKey = key.replace(/-([a-z])/g, (_m, p1) => p1.toUpperCase());
                    styleObj[camelKey] = value;
                }
            });
            const attribs = { ...(domNode.attribs || {}) };
            delete attribs.style;
            return React.createElement(
                domNode.name as string,
                { ...attribs, style: styleObj },
                parseChildren(domNode.children)
            );
        }
        return undefined;
    };

    const parsed = sanitized ? parse(sanitized, { replace: replaceNode }) : null;
    return parsed;
}

export function stripTemplatePlaceholders(raw?: string | null): string {
    if (!raw) return '';
    // Remove mustache-style placeholders like {{ ... }}
    return String(raw).replace(/\{\{[\s\S]*?\}\}/g, '');
}
