import { BadRequestError, HttpStatus, hashData, logger, sequelize, type Context } from "@/core"
import { AppMessages } from "@/core/common"
import { Auth, UserRoles } from "@/auth/model"
import { SingleOrBulkUserPayload } from "@/users/interfaces"
import { User } from "@/users/model"
import { Op } from "sequelize"

class BulkUserCreate {
    constructor(private readonly dbUser: typeof User, private readonly dbUserRoles: typeof UserRoles, private readonly dbAuth: typeof Auth) { }
    handle = async ({ input }: Context<SingleOrBulkUserPayload>) => {
        const usersData = Array.isArray(input) ? input : [input];
        const dbTransaction = await sequelize.transaction();
        try {
            for (const userData of usersData) {
                const { email, password, phoneNumber, roleIds } = userData;
                const conditions: Record<string, string>[] = [{ email }];

                if (phoneNumber) {
                    conditions.push({ phoneNumber });
                }
                const userExists = await this.dbAuth.findOne({
                    where: {
                        [Op.or]: conditions,
                    },
                });
                if (userExists) throw new BadRequestError(AppMessages.FAILURE.EMAIL_EXISTS)
                const hashPassword = await hashData(password);

                const newUser = await this.dbUser.create(
                    {
                        email,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                    },
                    { transaction: dbTransaction }
                );
                await this.dbAuth.create(
                    { email, userId: newUser.id, password: hashPassword },
                    { transaction: dbTransaction }
                );
                const payload = roleIds.map((roleId: any) => ({
                    userId: newUser.id,
                    roleId,
                    active: true,
                }));
                await this.dbUserRoles.bulkCreate(payload, { transaction: dbTransaction });

                logger.info(`User with ID ${newUser.id} created successfully`);
            }
            await dbTransaction.commit()
            return {
                code: HttpStatus.OK,
                message: AppMessages.SUCCESS.BULK_CREATE_SUCCESS,
            };
        } catch (error: any) {
            dbTransaction.rollback();

            logger.error(error?.message || "Transaction failed, rolled back all operations");

            throw new Error("Error while bulk creating users. Please make sure data is correct and retry.");
        }
    }
}

export const bulkCreate = new BulkUserCreate(User, UserRoles, Auth)