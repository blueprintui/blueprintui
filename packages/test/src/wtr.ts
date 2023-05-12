import { startTestRunner, TestRunner } from '@web/test-runner';

// https://github.com/modernweb-dev/web/issues/1951
// https://raw.githubusercontent.com/lit/lit/main/packages/tests/src/run-web-tests.ts

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

process.on('SIGINT', () => stop());
process.on('exit', () => stop());

function stop() {
  if (currentRunner === undefined) {
    process.exit(1);
  } else {
    currentRunner?.stop();
  }
}

let port = 8000;
let currentRunner: TestRunner | undefined;

async function startWithNextAvailablePort() {
  if (port >= 9000) {
    throw new Error(`No ports available`);
  }

  currentRunner = await startTestRunner({
    autoExitProcess: false,
    config: { port }
  });

  port++;
  currentRunner?.on('stopped', passed => process.exit(passed ? 0 : 1));
}

await startWithNextAvailablePort();
