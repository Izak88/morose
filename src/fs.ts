import * as fs from 'fs';
import * as utils from './utils';

export function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  });
}

export function writeFile(filePath: string, data: string): Promise<null> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, 'utf8', (err: NodeJS.ErrnoException) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

export function ensureDirectory(dirPath: string): Promise<null> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync) {
      resolve();
    }

    fs.mkdir(dirPath, (err: NodeJS.ErrnoException) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
}

export function writeJsonFile(filePath: string, data: any = {}): Promise<null> {
  return writeFile(filePath, JSON.stringify(data, null, 2));
}

export function readJsonFile(filePath: string): Promise<string> {
  return readFile(filePath).then(data => JSON.parse(data));
}

export function existsSync(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function exists(filePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.exists(filePath, (exists: boolean) => resolve(exists));
  });
}
