import { IUser, User } from "@database/user"

export async function findUser(id: IUser["id"]) {
  return User.findOne({ id })
}
