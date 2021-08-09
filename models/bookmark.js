const { Schema, model } = require('mongoose');

const bookmarkSchema = new Schema({
  title: { type: String, required: true, unique: true },
  link: String,
  comments: [ {type: Schema.Types.ObjectId, ref: "Comment"}]
}, {
  timestamps: true
})

module.exports = model("Bookmark", bookmarkSchema)
