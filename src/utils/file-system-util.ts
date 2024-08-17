import fs from "fs";

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
}
