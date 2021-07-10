import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { client } from "../../prisma/client"

interface IRequest {
    username: string
    password: string
}

class AuthenticateUserUseCase {
    async execute({ username, password }: IRequest) {

        //Verificar se o usuario existe

        const userAlreadyExists = await client.user.findFirst({
            where: {
                username
            }
        })
        if(!userAlreadyExists){
            throw new Error("Usuario ou senha incorreta!")
        }
        //Se existe, verifica se a senha esta correta

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if(!passwordMatch){
            throw new Error("Usuario ou senha incorreta!")
        }

        //Gerar token do usuario
        const token = sign({}, "fbd2a02f-f62f-4af7-a74f-88274b96d833", {
            subject: userAlreadyExists.id,
            expiresIn: "20s"
        })

        return { token }
    }
}

export { AuthenticateUserUseCase }