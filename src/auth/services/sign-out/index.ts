import type { SignOutPayload } from "@/auth/interfaces"
import { Users } from "@/auth/model/user.model"
import { HttpStatus, type Context } from "@/core"
import { AppMessages } from "@/core//common"

class SignOut {
    constructor(private readonly dbUsers: typeof Users) {}

    /**
     * @description Destroys user session
     * @param {Context<SignOutPayload>} payload
     * @returns { code: string, message: string } response
     */
    public handle = async ({ user }: Context<SignOutPayload>) => {
        await this.dbUsers.update({ refreshToken: "", refreshTokenExp: undefined }, { where: { id: user.id } })

        return {
            code: HttpStatus.NO_CONTENT,
            message: AppMessages.SUCCESS.LOGOUT,
            headers: {
                "Set-Cookie": [`accessToken=; Path=/; HttpOnly`, `refreshToken=; Path=/; HttpOnly`],
            },
        }
    }
}

export const signOut = new SignOut(Users)
