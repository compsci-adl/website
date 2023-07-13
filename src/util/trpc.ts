// Gets the base URL for the current environment
function getBaseUrl() {
    if (process.env.NODE_ENV !== 'production')
        return `http://localhost:${process.env.PORT ?? 3000}`;
    return `https://${process.env.PROD_URL ?? 'compsci-adl.github.io'}`;
}

// Gets the URL for the TRPC API
function getApiUrl() {
    return `${getBaseUrl()}/api/trpc`;
}

export { getBaseUrl, getApiUrl };
