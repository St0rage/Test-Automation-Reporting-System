import fs from "fs";
import { resolve } from "path";

export class FileSystem {
  static createFolder(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, { recursive: true }, (err) => {
        if (err) {
          return reject(new Error(`Failed to create folder ${path}`));
        } else {
          resolve();
        }
      });
    });
  }

  static deleteFile(pathToFile: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(pathToFile, (err) => {
        if (err) {
          return reject(new Error(`Failed to delete ${pathToFile}`));
        } else {
          resolve();
        }
      });
    });
  }

  static async getImageBinary(pathToFile: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, (err, data) => {
        if (err) {
          return reject(new Error(`Failed to read file ${pathToFile}`));
        } else {
          resolve(data);
        }
      });
    });
  }

  static async renameFile(oldPath: string, newPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return reject(
            new Error(`Failed to rename file ${oldPath} to ${newPath}`)
          );
        } else {
          resolve();
        }
      });
    });
  }
}
