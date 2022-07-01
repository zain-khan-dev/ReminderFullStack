import jwt from "jsonwebtoken"

export const getJWTToken = (id:number, email:string) => {

    const token = jwt.sign(
        { user_id: id, email },
        process.env.TOKEN_KEY as string,
        {
          expiresIn: "5h",
        }
    )
    return token
}