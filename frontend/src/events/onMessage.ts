import { MessageInput } from "backend/src/typings/socket"

export default function onMessage(message: MessageInput) {
  console.log(message, "onMessage")
}
