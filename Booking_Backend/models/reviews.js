var mongoose = require("mongoose");
var { Schema } = mongoose;

const ReviewSchema = new Schema({
  rating: { type: Number },
  review: { type: String },
  images: [String],
  staff: { type: Number },
  service: { type: Number },
  reviewedBy: {
    type: Object,
  },
});

module.exports = ReviewSchema;
