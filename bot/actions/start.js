const showView = require('./showView')
const { Markup } = require('telegraf')

module.exports = async (ctx) => {
  await showView(ctx)

  return ctx.replyWithHTML(
    ctx.i18n.t('start.text'),
    Markup.inlineKeyboard([
      Markup.webAppButton(ctx.i18n.t('webApp'), { url: process.env.DOMAIN })
    ]).extra()
  )
}
