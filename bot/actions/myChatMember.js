const User = require('../models/user')
const Group = require('../models/group')

module.exports = async (ctx) => {
  console.log(
    `${new Date().toLocaleString('ru')} @${ctx.botInfo.username} ${
      ctx.updateType
    } | ${ctx.from?.id || 'noUserId'} | ${ctx.chat?.id || 'noChatId'}`
  )

  const status = !['left', 'kicked'].includes(
    ctx.myChatMember.new_chat_member.status
  )

  if (ctx.chat?.type === 'private')
    return User.updateOne({ id: ctx.from.id }, { alive: status })
  else {
    if (ctx.myChatMember.new_chat_member.status === 'member')
      await ctx.replyWithHTML(ctx.i18n.t('greating'))

    return Group.updateOne({ id: ctx.chat.id }, { alive: status })
  }
}
