
import bcrypt from 'bcrypt'



export const hashedPass = async (data: string ) => {
    
    const saltRounds = 10; // complexidade
    const hashedPass = await bcrypt.hash(data, saltRounds)
    
    return hashedPass



}