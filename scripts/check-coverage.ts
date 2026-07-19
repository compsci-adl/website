import { spawn } from 'child_process';

const cmd = 'node';
const args = [
    '--experimental-test-coverage',
    '--experimental-test-module-mocks',
    '--import',
    'tsx',
    '--import',
    './tests/bootstrap.ts',
    '--test',
    'tests/unit/**/*.test.ts',
    'tests/unit/**/*.test.tsx',
];

console.log(`Running: ${cmd} ${args.join(' ')}`);

const child = spawn(cmd, args, { stdio: ['inherit', 'pipe', 'inherit'] });

let output = '';
child.stdout.on('data', (data) => {
    const str = data.toString();
    process.stdout.write(str);
    output += str;
});

child.on('close', (code) => {
    if (code !== 0) {
        console.error(`Tests failed with exit code ${code}`);
        process.exit(code);
    }

    console.log('\nChecking coverage requirements...');

    const lines = output.split('\n');
    let inCoverageReport = false;
    let inSrc = false;
    let failed = false;
    const failures: string[] = [];

    for (const line of lines) {
        if (line.includes('start of coverage report')) {
            inCoverageReport = true;
            continue;
        }
        if (line.includes('end of coverage report')) {
            inCoverageReport = false;
            continue;
        }

        if (!inCoverageReport) continue;

        // Matches lines starting with "ℹ "
        if (line.startsWith('ℹ ')) {
            const contentLine = line.substring(2);
            // Ignore separator lines
            if (contentLine.trim().startsWith('-')) continue;
            if (contentLine.trim().startsWith('file ')) continue;

            const parts = contentLine.split('|');
            if (parts.length < 4) continue;

            const nameCol = parts[0];
            const linePctCol = parts[1].trim();
            const branchPctCol = parts[2].trim();
            const funcPctCol = parts[3].trim();

            // Count leading spaces of name to determine hierarchy
            const leadingSpaces = nameCol.length - nameCol.trimStart().length;
            const name = nameCol.trim();

            if (leadingSpaces === 0) {
                inSrc = name === 'src';
            } else if (inSrc) {
                // If it has a line percentage value
                if (linePctCol && !isNaN(Number(linePctCol))) {
                    const linePct = Number(linePctCol);
                    const branchPct = Number(branchPctCol);
                    const funcPct = Number(funcPctCol);
                    if (linePct < 99 || branchPct < 99 || funcPct < 94) {
                        failed = true;
                        failures.push(
                            `${name}: Line: ${linePct}%, Branch: ${branchPct}%, Func: ${funcPct}% (Required: 99%, 99%, 94%)`
                        );
                    }
                }
            }
        }
    }

    if (failed) {
        console.error(
            '\n❌ Coverage validation failed: The following files do not have the required coverage (Line, Branch, and Func):'
        );
        for (const failure of failures) {
            console.error(`  - ${failure}`);
        }
        process.exit(1);
    } else {
        console.log(
            '\n✅ Coverage validation passed: All source files have the required Line, Branch, and Function coverage!'
        );
        process.exit(0);
    }
});
