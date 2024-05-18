function generateRandomString(length: number, characters: string) {
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}

export function generatePassword(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];,.';
    return generateRandomString(length, characters)
}

export function generatePin(length: number = 6) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return generateRandomString(length, characters)
}

export function encodeCredentials(owner: string, password: string) {
    return Buffer.from(`${owner}:${password}`).toString('base64');
}

export function decodeCredentials(credentials: string) {
    const decoded = Buffer.from(credentials, 'base64').toString('utf8');
    const [owner, password] = decoded.split(':');
    return { owner, password };
}