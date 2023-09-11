import { User } from "@database/user"

export async function findUser(id: number) {
  return User.findOne({ id })
}
