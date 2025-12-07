import crypto from "crypto";

//randomm string generation for share ID
export const GenerateID = (length = 32) =>{
    const chars = 'ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const buffer = crypto.randomBytes(length);
    return Array.from(buffer, b => chars[b % chars.length]).join('');
}

