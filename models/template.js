const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema(
  {
    student: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
      unique:true

    },
  
  },
  { timestamps: true }
);
module.exports = mongoose.model("templates", TemplateSchema);
