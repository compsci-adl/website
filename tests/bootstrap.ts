import nextEnv from '@next/env';
import { JSDOM } from 'jsdom';

const { loadEnvConfig } = nextEnv;

// Inject mock environment variables inline for tests
process.env.SKIP_ENV_VALIDATION = 'true';
process.env.DATABASE_URL = 'file:dev.sqlite';
process.env.DATABASE_AUTH_TOKEN = 'test-token';
process.env.SQUARE_ACCESS_TOKEN = 'test-token';
process.env.SQUARE_LOCATION_ID = 'test-location';
process.env.REDIS_URI = 'redis://localhost:6379';
process.env.NEXT_PUBLIC_DRIVE_LINK = 'https://example.com/drive';
process.env.NEXT_PUBLIC_PAYLOAD_URI = 'https://example.com/payload';

// Load default local environment configurations (if any)
loadEnvConfig(process.cwd());

// Setup a global JSDOM instance to support rendering React components
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost/',
    pretendToBeVisual: true,
});

// Bind JSDOM window properties and constructors to globalThis
// This makes constructors like Element, HTMLElement, Node, etc. available to libraries like HeadlessUI
const windowProps = Object.getOwnPropertyNames(dom.window);
for (const prop of windowProps) {
    if (!Object.prototype.hasOwnProperty.call(globalThis, prop)) {
        Object.defineProperty(globalThis, prop, {
            value: (dom.window as any)[prop],
            configurable: true,
            writable: true,
        });
    }
}

// Make sure window, document, and navigator are explicitly set
Object.defineProperty(globalThis, 'window', {
    value: dom.window,
    configurable: true,
    writable: true,
});
Object.defineProperty(globalThis, 'document', {
    value: dom.window.document,
    configurable: true,
    writable: true,
});
Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    configurable: true,
    writable: true,
});

// Mock basic browser APIs
globalThis.requestAnimationFrame = (callback) => setTimeout(callback, 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
const animId = globalThis.requestAnimationFrame(() => {});
globalThis.cancelAnimationFrame(animId);

class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
globalThis.ResizeObserver = MockResizeObserver as any;

// Quiet down some React console warnings about not using act() if they occur
const originalError = console.error;
console.error = (...args) => {
    if (/act\(\.\.\.\)/.test(args[0])) return;
    originalError(...args);
};
