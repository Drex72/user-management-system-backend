import { HttpStatus } from "@/core";
import { User } from "@/users/model";

class ViewUsers {
    constructor(private readonly dbUser: typeof User) { }
    handle = async () => {
        const allUsers = await this.dbUser.findAll()

        return {
            code: HttpStatus.OK,
            message: "Users Retreived Successfully",
            data: allUsers
        }
    }
}

export const viewUsers = new ViewUsers(User)