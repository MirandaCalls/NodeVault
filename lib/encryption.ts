import crypto, { Decipher, Cipher, Hmac } from 'crypto';

const ALGORITHM = 'aes-192-cbc';

function decipher( passphrase: string, encryptedText: string ): string {
    const key: Buffer = crypto.scryptSync( passphrase, 'salt', 24 );
    const iv: Buffer = Buffer.alloc( 16, 0 );

    const decipher: Decipher = crypto.createDecipheriv( ALGORITHM, key, iv );

    let decrypted: string = decipher.update( encryptedText, 'hex', 'utf8' );
    decrypted += decipher.final( 'utf8' );

    return decrypted;
}

function encrypt( passphrase: string, content: string ): string {
    const key: Buffer = crypto.scryptSync( passphrase, 'salt', 24 );
    const iv: Buffer = Buffer.alloc( 16, 0 );

    const cipher: Cipher = crypto.createCipheriv( ALGORITHM, key, iv );

    let encrypted: string = cipher.update( content, 'utf8', 'hex' );
    encrypted += cipher.final( 'hex' );
    
    return encrypted;
}

function hashPassphrase( content: string, secret: string ): string {
    const hash: Hmac = crypto.createHmac( 'sha256', secret );
    hash.update( content );
    return hash.digest( 'hex' );
}

function checkHash( content: string, passphraseHash: string, secret: string ): boolean {
    const hash: Hmac = crypto.createHmac( 'sha256', secret );
    hash.update( content );
    return passphraseHash === hash.digest( 'hex' );
}

module.exports = {
    decipher: decipher,
    encrypt: encrypt,
    hashPassphrase: hashPassphrase,
    checkHash: checkHash
}