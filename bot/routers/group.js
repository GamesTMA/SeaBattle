const { Router } = require('telegraf')

const router = new Router(async (ctx) => {
  if (!ctx.message.text) return

  const split = ctx.message.text.split(' ')
  if (split[1] === 'start') return

  const command = split[0]
    .replace('/', '')
    .toLowerCase()
    .replace(`@${process.env.BOT_USERNAME}`, '')

  return { route: command, state: split.splice(1, split.length) }
})

module.exports = router
