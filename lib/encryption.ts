import crypto, {Decipher, Cipher, Hmac, randomBytes} from 'crypto';

const ALGORITHM = 'aes-192-cbc';

function randomString() {
    return randomBytes(20).toString('hex');
}

function decipher(passkey: string, encryptedText: string): string {
    const key: Buffer = crypto.scryptSync(passkey, 'salt', 24);
    const iv: Buffer = Buffer.alloc(16, 0);

    const decipher: Decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    let decrypted: string = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function encrypt(passkey: string, content: string): string {
    const key: Buffer = crypto.scryptSync(passkey, 'salt', 24);
    const iv: Buffer = Buffer.alloc(16, 0);

    const cipher: Cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted: string = cipher.update(content, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function hashPasskey(content: string, secret: string): string {
    const hash: Hmac = crypto.createHmac('sha256', secret);
    hash.update(content);
    return hash.digest('hex');
}

function checkHash(content: string, passkeyHash: string, secret: string): boolean {
    const hash: Hmac = crypto.createHmac('sha256', secret);
    hash.update(content);
    return passkeyHash === hash.digest('hex');
}

export {randomString, decipher, encrypt, hashPasskey, checkHash};