const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = model("Comment", commentSchema)
