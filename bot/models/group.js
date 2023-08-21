const mongoose = require('mongoose')

let Group = mongoose.Schema(
  {
    id: {
      type: Number,
      index: true,
      unique: true,
      required: true
    },
    title: String,
    username: String,
    ban: {
      type: Boolean,
      default: false
    },
    membersCount: Number,
    lastMessage: Date,
    alive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)
Group = mongoose.model('Group', Group)

module.exports = Group
