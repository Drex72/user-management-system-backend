import { config, type ITokenSignedPayload } from "@/core"
import { tokenService, type TokenService } from "../token"
import { IncomingHttpHeaders } from "http"

class AuthGuard {
    constructor(private readonly tokenService: TokenService) {}

    public guard = async (headers: IncomingHttpHeaders): Promise<false | ITokenSignedPayload> => {

        const authorization = headers["authorization"]

        if(!authorization) return false

        const token = authorization.split(" ")[1]

        if(!token) return false

        // const cookieAccessToken = cookies?.accessToken

        // if (!cookieAccessToken) return false

        const { accessTokenSecret } = config.auth

        const user = await this.tokenService.extractTokenDetails(token, accessTokenSecret)

        if (!user) return false

        return user as ITokenSignedPayload
    }
}

export const authGuard = new AuthGuard(tokenService)
