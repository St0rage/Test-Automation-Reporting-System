import fs from "fs";

export class FileSystem {
  static createFolder(path: string): void {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        throw Error(`Failed to create folder ${path}`);
      }
    });
  }

  static deleteFile(pathToFile: string): void {
    fs.unlink(pathToFile, (err) => {
      if (err) {
        throw Error(`Failed to delete ${pathToFile}`);
      }
    });
  }
}
