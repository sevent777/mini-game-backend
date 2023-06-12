import { execSync } from 'child_process';
import fs from 'fs';

const filePath = 'src/types/swagger.ts'; // 替换为实际的文件路径
const codeToAdd = `/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */`;

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const updatedCode = `${codeToAdd}\n${data}`;
  fs.writeFileSync(filePath, updatedCode, 'utf8');
  console.log('Code added successfully.');
  execSync(`eslint --fix ./src/types/swagger.ts`);
  process.exit(0);
} catch (err) {
  console.error('Error:', err);
}
