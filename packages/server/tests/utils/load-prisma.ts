import { spawnSync } from 'node:child_process';

spawnSync('bun', ['run', 'db:gen'], {
  stdio: 'inherit',
});
