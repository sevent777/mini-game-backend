import fs from 'fs';
import http from 'http';

const url = 'http://localhost/api-json';
const outputFile = 'swagger.json';

http
  .get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      fs.writeFileSync(outputFile, data);
      console.log('Data written to', outputFile);
    });
  })
  .on('error', (err) => {
    console.error('Error fetching data:', err);
  });
