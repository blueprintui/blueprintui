// https://github.com/modernweb-dev/web/issues/1951
// https://raw.githubusercontent.com/lit/lit/main/packages/tests/src/run-web-tests.ts

import { startTestRunner, TestRunner } from '@web/test-runner';

process.on('uncaughtException', error => {
  if ((error as Error & { code?: string }).code === 'EADDRINUSE') {
    currentRunner?.stop();
    startWithNextAvailablePort();
  } else {
    console.error(`uncaughtException: ${error}`);
    if (error?.stack !== undefined) {
      console.error(error.stack);
    }
    process.exit(1);
  }
});

const stop = () => {
  if (run && currentRunner === undefined) {
    process.exit(1);
  } else {
    currentRunner?.stop();
  }
};

process.on('SIGINT', stop);
process.on('exit', stop);

const PORTS = [
  2000, 2001, 2020, 2109, 2222, 2310, 3000, 3001, 3010, 3030, 3210, 3333, 4000, 4001, 4201, 4040, 4321, 4502, 4503,
  4567, 5000, 5001, 5002, 5050, 5432, 6000, 6001, 6060, 6666, 6543, 7000, 7070, 7774, 7777, 8000, 8001, 8003, 8031,
  8080, 8081, 8443, 8765, 8777, 8888, 9000, 9001, 9031, 9080, 9081, 9090, 9191, 9876, 9877, 9999, 49221, 55001
];

let currentPortIndex = 0;
let currentRunner: TestRunner | undefined;

async function startWithNextAvailablePort() {
  if (currentPortIndex === PORTS.length) {
    throw new Error(`No available ports. Ports tried: ${JSON.stringify(PORTS)}`);
  }
  const port = PORTS[currentPortIndex];
  currentPortIndex++;
  currentRunner = await startTestRunner({ config: { port }, autoExitProcess: false });
  currentRunner?.on('stopped', passed => process.exit(passed ? 0 : 1));
}

const run = process.env.RUN_BROWSER_TESTS?.toLowerCase() !== 'false';

if (run) {
  await startWithNextAvailablePort();
} else {
  process.exit(0);
}
