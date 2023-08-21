/* eslint-disable no-redeclare */
/* eslint-disable no-var */
const User = require('../../models/user')
const Group = require('../../models/group')

const Markup = require('telegraf/markup')
const exportTemplate = {
  _id: '',
  id: '',
  name: '',
  username: '',
  state: '',
  lang: '',
  ban: '',
  langCode: '',
  alive: '',
  from: '',
  lastMessage: '',
  createdAt: '',
  updatedAt: ''
}
const exportTemplateGroup = {
  _id: '',
  id: '',
  title: '',
  username: '',
  ban: '',
  membersCount: '',
  lastMessage: '',
  alive: ''
}

module.exports = async (ctx) => {
  if (ctx.state[0]) {
    await ctx.answerCbQuery(`Экспортирование`, true)

    let content = []
    let contentUsers = []
    let contentGroups = []
    switch (ctx.state[0]) {
      case 'alive':
        var users = await User.find({ alive: true }, '-_id id').lean()

        contentUsers = users.map((value) => Object.values(value))
        break
      case 'all':
        var users = await User.find({}, '-_id id').lean()

        contentUsers = users.map((value) => Object.values(value))
        break
      case 'full':
        var users = await User.find(
          {},
          Object.keys(exportTemplate).join(' ')
        ).lean()

        contentUsers = [Object.keys(exportTemplate).join(';')]
        contentUsers.push(
          users.map((value) =>
            Object.values({ ...exportTemplate, ...value }).join(';')
          )
        )
        break
    }

    await ctx.replyWithDocument({
      source: Buffer.from(contentUsers.join('\n'), 'utf8'),
      filename: `users.csv`
    })
    content = content.concat(contentUsers)

    switch (ctx.state[0]) {
      case 'alive':
        var groups = await Group.find({ alive: true }, '-_id id').lean()

        contentGroups = groups.map((value) => Object.values(value))
        break
      case 'all':
        var groups = await Group.find({}, '-_id id').lean()

        contentGroups = groups.map((value) => Object.values(value))
        break
      case 'full':
        var groups = await Group.find(
          {},
          Object.keys(exportTemplateGroup).join(' ')
        ).lean()

        contentUsers = [Object.keys(exportTemplate).join(';')]
        contentUsers.push(
          groups.map((value) =>
            Object.values({ ...groups, ...value }).join(';')
          )
        )
        break
    }

    await ctx.replyWithDocument({
      source: Buffer.from(contentGroups.join('\n'), 'utf8'),
      filename: `groups.csv`
    })

    content = content.concat(contentGroups)

    return ctx.replyWithDocument({
      source: Buffer.from(content.join('\n'), 'utf8'),
      filename: `all.csv`
    })
  } else {
    await ctx.answerCbQuery()

    return ctx.editMessageText(
      `Выберите вариант экспорта:`,
      Markup.inlineKeyboard([
        [
          // Markup.callbackButton(`Бекап`, `admin_listUsers_full`),
          Markup.callbackButton(`Полный`, `admin_listUsers_all`),
          Markup.callbackButton(`Живые`, `admin_listUsers_alive`)
        ],
        [Markup.callbackButton(`Назад`, `admin_back`)]
      ]).extra()
    )
  }
}
