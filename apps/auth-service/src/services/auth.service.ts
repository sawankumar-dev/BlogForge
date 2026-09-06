import bcrypt from "bcryptjs";
import { db } from "../prisma/db";

export const registerUser = async (name: string, email: string, password: string) => {
    // find If User already Exists
    const isUserAlreadyExists = await db.orm.public.User.where({ email }).first();
    if(isUserAlreadyExists) {
        throw new Error("User with this email is already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await db.orm.public.User.create({
        name,
        email,
        password: hashedPassword
    })
    return {    
        message: "User registered successfully",
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
    }
}