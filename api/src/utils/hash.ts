import crypto from "crypto"

export const hashPassword = (pwd: string): string => {
    return crypto.createHash('md5').update(pwd).digest('hex')
};
