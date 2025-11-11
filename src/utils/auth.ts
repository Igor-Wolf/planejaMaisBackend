import jwt from "jsonwebtoken"; /// gerar token

export const auth = async (data: string | undefined) => {
    
    const secret = process.env.SECRET_KEY
    let decoded
    
    if (data && secret) {

        try {
    
            console.log(data)
            const token = data.split(" ")[1];
            decoded = jwt.verify(token, secret)
            console.log(decoded)
    
        } catch {
            return null
        }
        return decoded
        
    }

}