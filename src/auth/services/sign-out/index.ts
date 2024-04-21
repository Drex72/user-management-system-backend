import type { SignOutPayload } from "@/auth/interfaces"
import { User } from "@/users/model"
import { HttpStatus, type Context } from "@/core"
import { AppMessages } from "@/core//common"

class SignOut {
    constructor(private readonly dbUsers: typeof User) {}

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

export const signOut = new SignOut(User)
