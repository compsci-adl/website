import 'node:test';

declare module 'node:test' {
    interface MockModuleOptions {
        exports?: Record<string, unknown>;
    }
}
