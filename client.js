const net = require('net');
const fs = require('fs');
const stdin = process.stdin;
stdin.setEncoding('utf8');
const conn = net.createConnection({
  host: 'localhost',
  port: 3000
});
conn.setEncoding('utf8');

conn.on('connect', () => {
});

let currentFile;

stdin.on('data', (key) => {
  key = key.slice(0, -1);
  currentFile = key;
  conn.write(key);
});

conn.on('data', (data) => {
  fs.writeFile(`./clientFiles/${currentFile}`, data, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${currentFile} succesfully retrieved.`);
  });
});