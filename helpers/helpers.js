import bcrypt from 'bcrypt';

export function hashPassword(string) {
    const salt =  bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, 10);
}