import fs from "fs/promises";

export class FileSystem {
  static async createFolder(path: string): Promise<void> {
    await fs.mkdir(path, { recursive: true });
  }
}
