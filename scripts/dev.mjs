import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const port = portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || '3000';
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '0.0.0.0', '--port', port], { stdio: 'inherit' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
