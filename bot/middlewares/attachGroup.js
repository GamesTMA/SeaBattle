const Group = require('../models/group')
const convertChars = require('../helpers/convertChars')
const saveModifier = require('../helpers/saveModifier')

module.exports = async (ctx, next) => {
  if (
    ['group', 'supergroup'].includes(ctx?.chat?.type) &&
    ((ctx.message && (ctx.message?.text || ctx.message?.migrate_to_chat_id)) ||
      ctx.callbackQuery)
  ) {
    let group = {}

    if (ctx.message?.migrate_from_chat_id)
      group = await Group.findOne({ id: ctx.message.migrate_from_chat_id })
    else group = await Group.findOne({ id: ctx.chat.id })

    if (!group) {
      group = new Group({
        id: ctx.chat.id,
        name: convertChars(ctx.chat.title),
        username: ctx.chat.username,
        lastMessage: Date.now(),
        membersCount: await ctx.telegram.getChatMemberCount(ctx.chat.id)
      })

      await saveModifier(group)

      ctx.freshChat = true
    }

    ctx.group = group
    if (ctx.message?.migrate_to_chat_id)
      ctx.group.id = ctx.message.migrate_to_chat_id
  }

  await next()

  return saveModifier(ctx.group)
}
