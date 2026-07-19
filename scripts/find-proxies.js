import fs from 'fs';
import net from 'net';
import path from 'path';
import tls from 'tls';

const PROXY_LIST_URL =
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/http.txt';
const TARGET_HOST = 'csclub.org.au';
const TARGET_PORT = 443;
const TIMEOUT_MS = 5000;
const CONCURRENCY = 50;

function testProxy(proxyHost, proxyPort) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const socket = net.connect({
            host: proxyHost,
            port: parseInt(proxyPort, 10),
        });

        socket.setTimeout(TIMEOUT_MS);

        socket.on('connect', () => {
            socket.write(
                `CONNECT ${TARGET_HOST}:${TARGET_PORT} HTTP/1.1\r\nHost: ${TARGET_HOST}:${TARGET_PORT}\r\n\r\n`
            );
        });

        let buffer = '';
        socket.on('data', (data) => {
            buffer += data.toString();
            if (buffer.includes('\r\n\r\n')) {
                if (buffer.startsWith('HTTP/1.1 200') || buffer.startsWith('HTTP/1.0 200')) {
                    // Connection established! Now wrap in TLS.
                    const tlsSocket = tls.connect({
                        socket: socket,
                        servername: TARGET_HOST,
                        rejectUnauthorized: false,
                    });

                    tlsSocket.setTimeout(TIMEOUT_MS);

                    tlsSocket.on('secureConnect', () => {
                        tlsSocket.write(
                            `GET / HTTP/1.1\r\nHost: ${TARGET_HOST}\r\nConnection: close\r\n\r\n`
                        );
                    });

                    let responseBuffer = '';
                    tlsSocket.on('data', (resData) => {
                        responseBuffer += resData.toString();
                    });

                    tlsSocket.on('end', () => {
                        const statusLine = responseBuffer.split('\r\n')[0];
                        const duration = Date.now() - startTime;
                        if (
                            statusLine &&
                            (statusLine.includes('200') ||
                                statusLine.includes('301') ||
                                statusLine.includes('302'))
                        ) {
                            resolve(duration);
                        } else {
                            reject(new Error(`Bad status: ${statusLine}`));
                        }
                    });

                    tlsSocket.on('error', (err) => reject(err));
                    tlsSocket.on('timeout', () => {
                        tlsSocket.destroy();
                        reject(new Error('TLS Timeout'));
                    });
                } else {
                    socket.destroy();
                    reject(new Error(`Proxy rejected CONNECT: ${buffer.split('\r\n')[0]}`));
                }
            }
        });

        socket.on('error', (err) => reject(err));
        socket.on('timeout', () => {
            socket.destroy();
            reject(new Error('Socket Timeout'));
        });
    });
}

async function main() {
    console.log(`Fetching proxy list from ${PROXY_LIST_URL}...`);
    const response = await fetch(PROXY_LIST_URL);
    if (!response.ok) {
        throw new Error(`Failed to fetch proxy list: ${response.statusText}`);
    }
    const text = await response.text();
    const proxies = text
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    console.log(`Loaded ${proxies.length} proxies. Testing for working ones...`);

    const workingProxies = [];
    let index = 0;
    let finished = false;

    async function worker() {
        while (index < proxies.length && !finished) {
            const proxy = proxies[index++];
            const [host, port] = proxy.split(':');
            if (!host || !port) continue;

            try {
                const duration = await testProxy(host, port);
                if (duration <= TIMEOUT_MS && !finished) {
                    console.log(`[SUCCESS] Proxy ${proxy} responded in ${duration}ms`);
                    workingProxies.push(proxy);
                    if (workingProxies.length >= 3) {
                        finished = true;
                        const outputPath = path.join(process.cwd(), 'working-proxies.txt');
                        fs.writeFileSync(outputPath, workingProxies.join('\n'));
                        console.log(`\nWorking proxies found:`, workingProxies);
                        console.log(`Saved working proxies to ${outputPath}`);
                        process.exit(0);
                    }
                }
            } catch (err) {
                // Suppress individual proxy errors to keep output clean
            }
        }
    }

    // Launch workers in parallel
    const workers = Array.from({ length: CONCURRENCY }, () => worker());
    await Promise.all(workers);

    if (workingProxies.length < 3) {
        console.error(`Could only find ${workingProxies.length} working proxies.`);
        process.exit(1);
    }
}

main().catch((err) => {
    console.error('Error finding proxies:', err);
    process.exit(1);
});
