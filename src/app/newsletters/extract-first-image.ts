export const extractFirstImage = (html: string): string | null => {
    if (!html) return null;
    const srcsetMatch = html.match(/<img[^>]+srcset=["']([^"']+)["']/i);
    if (srcsetMatch && srcsetMatch[1]) {
        // Srcset is comma-separated list of "url [descriptor]" entries
        const first = srcsetMatch[1].split(',')[0].trim().split(/\s+/)[0];
        if (!first) return null;
        let normalised = first.trim();
        if (normalised.startsWith('//')) normalised = 'https:' + normalised;
        if (normalised.startsWith('http://'))
            normalised = normalised.replace(/^http:\/\//i, 'https://');
        // Decode any HTML entities that may have been included in the attribute
        normalised = normalised.replace(/&amp;/g, '&');
        return normalised || null;
    }
    // Match src attribute that may use single or double quotes, or none
    const srcMatch = html.match(/<img[^>]+src=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i);
    if (srcMatch) {
        const match = srcMatch[1] || srcMatch[2] || srcMatch[3] || null;
        if (!match) return null;
        let normalised = (match as string).trim();
        if (normalised.startsWith('//')) normalised = 'https:' + normalised;
        if (normalised.startsWith('http://'))
            normalised = normalised.replace(/^http:\/\//i, 'https://');
        normalised = normalised.replace(/&amp;/g, '&');
        return normalised || null;
    }
    // Look for data-src or data-srcset used by some HTML emails
    const dataSrcMatch = html.match(/<img[^>]+data-src=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/i);
    if (dataSrcMatch) {
        const match = dataSrcMatch[1] || dataSrcMatch[2] || dataSrcMatch[3] || null;
        if (!match) return null;
        let normalised = (match as string).trim();
        if (normalised.startsWith('//')) normalised = 'https:' + normalised;
        if (normalised.startsWith('http://'))
            normalised = normalised.replace(/^http:\/\//i, 'https://');
        normalised = normalised.replace(/&amp;/g, '&');
        return normalised || null;
    }
    // Look for inline styles with url(...) such as background-image: url('...')
    const styleUrlMatch = html.match(/url\((?:"([^"]+)"|'([^']+)'|([^)]+))\)/i);
    if (styleUrlMatch) {
        const match = styleUrlMatch[1] || styleUrlMatch[2] || styleUrlMatch[3] || null;
        if (!match) return null;
        let normalised = (match as string).trim();
        if (normalised.startsWith('//')) normalised = 'https:' + normalised;
        if (normalised.startsWith('http://'))
            normalised = normalised.replace(/^http:\/\//i, 'https://');
        normalised = normalised.replace(/&amp;/g, '&');
        return normalised || null;
    }
    return null;
};
