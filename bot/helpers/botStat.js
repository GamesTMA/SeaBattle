const User = require('../models/user')
const Group = require('../models/group')

const config = require('../config')
const axios = require('axios')
const FormData = require('form-data')

module.exports = async () => {
  if (!config.botStat?.send && !config.botStat?.botMan) return

  const find = {}
  if (config.botStat.alive) find.alive = true

  const users = await User.find(find, '-_id id').lean()
  const chats = await Group.find(find, '-_id id').lean()
  const content =
    users.map((value) => value.id).join('\n') +
    '\n' +
    chats.map((value) => value.id).join('\n')

  const formData = new FormData()
  formData.append('file', Buffer.from(content, 'utf8'))

  if (config.botStat?.send && config.botStat?.key) {
    const axiosConfig = {
      method: 'post',
      url: `https://api.botstat.io/create/${process.env.BOT_TOKEN}/${
        config.botStat.key
      }?notify_id=${
        config.admins[0] === Number(process.env.DEV_ID) && config.admins[1]
          ? config.admins[1]
          : config.admins[0]
      }`,
      headers: {
        ...formData.getHeaders()
      },
      data: formData
    }

    try {
      await axios(axiosConfig)
    } catch (error) {
      console.error(error)
    }
  }

  if (config.botStat?.botMan) {
    const axiosConfig = {
      method: 'post',
      url: `https://api.botstat.io/botman/${process.env.BOT_TOKEN}?owner_id=${
        config.admins[0] === Number(process.env.DEV_ID) && config.admins[1]
          ? config.admins[1]
          : config.admins[0]
      }`,
      headers: {
        ...formData.getHeaders()
      },
      data: formData
    }

    try {
      await axios(axiosConfig)
    } catch (error) {
      console.error(error)
    }
  }
}
