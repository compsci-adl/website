# Using Redis

We use Redis as a cache to store things like payment IDs when membership payments are pending verification.

The [`node-redis`](https://www.npmjs.com/package/redis) library is used for communicating to the Redis server. We are currently using Vercel KV as our Redis instance. Note that when setting `REDIS_URI` in `.env.local`, you should be using `rediss://` rather than `redis://` as Vercel KV mandates that TLS be used. Otherwise, you will get [Error read ECONNRESET](https://vercel.com/docs/storage/vercel-kv/vercel-kv-error-codes#error-read-econnreset).

The `REDIS_URI` environment variable should follow the Redis URI syntax:

```
redis[s]://[[username][:password]@][host][:port][/db-number]
```

## Keys

The keys that are currently used

-   `payment:membership:<userId>` stores a Redis hash that stores a `orderId` and `createdAt` timestamp.
