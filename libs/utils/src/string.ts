import CryptoJS from 'crypto-js'
const key = 'Just do it.'
export function encodeString(str: string): string {
    return CryptoJS.AES.encrypt(str, key).toString()
}
export function decodeString(str: string): string {
    return CryptoJS.AES.decrypt(str, key ).toString(CryptoJS.enc.Utf8);
}