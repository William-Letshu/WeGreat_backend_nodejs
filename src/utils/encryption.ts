import * as crypto from 'crypto';

require("dotenv").config();

const algorithm: string = process.env.ENCRYPTION_ALGORITHM as string;
const secretKey: string = process.env.ENCRYPTION_SECRET_KEY as string;

export const encrypt = (text: string) => {
    console.log(algorithm)
    console.log(secretKey)
    console.log(crypto.randomBytes(32))
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

export const decrypt = (hash: {iv: string, content: string}) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
    return decrpyted.toString();
};

