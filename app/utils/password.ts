import bcrypt from "bcrypt"

export async function hashPassword(plainText: string) {
    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(plainText, saltRound);
    return hashedPassword;
}

export async function verifyPassword(plainPassword: string, hashedPassword: string) {
    const result = await bcrypt.compare(plainPassword, hashedPassword);
    return result;
}
