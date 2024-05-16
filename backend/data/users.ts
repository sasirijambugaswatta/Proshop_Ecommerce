import * as bcrypt from "bcrypt";
import User from "../models/user.model.js";

interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

const userData = [
    {
        name: 'Sasiri Jambugaswaththa',
        email: 'jambugaswattasasiri@gmail.com',
        password: '123456',
        isAdmin: true
    },
    {
        name: 'John cena',
        email: 'johncena@gmail.com',
        password: 'abcd',
        isAdmin: false
    },
    {
        name: 'Philip Samuel',
        email: 'pilipSamuel@gmail.com',
        password: 'qwer!@#',
        isAdmin: false
    }
];


async function createUsers(userData: User[]){
    const SALT_ROUNDS = 10;
    try {
        return await Promise.all(
            userData.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
                return {...user, password: hashedPassword}; // Spread operator for clarity
            })
        );
    } catch (error) {
        console.error("Error hashing passwords:", error);
        // Handle errors appropriately, e.g., throw an exception
    }
}

export default async function saveUsers() {
    return await createUsers(userData);

}

