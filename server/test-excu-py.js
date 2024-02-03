const { spawn, exec } = require('child_process');
const ls = spawn('python3', ['main7.py'], { stdio: [ 'inherit', 'pipe', 'pipe'] });

process.stdout.write('$ ');
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
}); 