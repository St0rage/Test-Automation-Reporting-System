import bcrypt from "bcrypt";

export class UserUtil {
  static generatePassword(length: number = 12): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  static async hashPassword(password: string, saltRound: number = 8): Promise<string> {
    return await bcrypt.hash(password, saltRound);
  }
}
