import { encryptor } from "@/authentication/helpers/encryptor"
import { tokenService, type TokenService } from "@/authentication/helpers/token"
import type { RefreshTokenPayload } from "@/authentication/interfaces"
import { Users } from "@/authentication/model/user.model"
import { HttpStatus, UnAuthorizedError, config, convertArrayToObject, type Context } from "@/core"
import { AppMessages } from "@/core/common"

class RefreshToken {
    constructor(private readonly dbUser: typeof Users, private readonly tokenService: TokenService) {}

    // Need to work on handling empty types

    handle = async ({ headers }: Context<RefreshTokenPayload>) => {
        const cookiesArr = headers.cookie?.split("; ")

        if (!cookiesArr || cookiesArr.length <= 0) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const cookies = convertArrayToObject(cookiesArr)

        try {
            if (cookies?.accessToken) {
                const decryptedAccessToken = encryptor.decrypt(cookies?.accessToken)

                const isAccessTokenValid = this.tokenService._verifyToken(decryptedAccessToken, config.auth.accessTokenSecret)

                if (isAccessTokenValid) {
                    return {
                        code: HttpStatus.OK,
                        message: AppMessages.SUCCESS.TOKEN_REFRESHED,
                    }
                }
            }
        } catch (error) {}

        const refreshToken = cookies?.refreshToken

        if (!refreshToken) throw new UnAuthorizedError(AppMessages.FAILURE.INVALID_TOKEN_PROVIDED)

        const payload = await this.tokenService.extractTokenDetails(refreshToken, config.auth.refreshTokenSecret)

        const [newAccessToken, newRefreshToken] = await this.tokenService.getTokens({
            email: payload.email,
            id: payload.id,
            role: payload.role,
        })

        await this.dbUser.update({ refreshToken, refreshTokenExp: new Date() }, { where: { id: payload.id } })

        return {
            code: HttpStatus.OK,
            message: AppMessages.SUCCESS.TOKEN_REFRESHED,
            headers: {
                "Set-Cookie": [`accessToken=${newAccessToken}; Path=/; HttpOnly`, `refreshToken=${newRefreshToken}; Path=/; HttpOnly`],
            },
        }
    }
}

export const refreshToken = new RefreshToken(Users, tokenService)
