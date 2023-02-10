const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const TimeSchema = new mongoose.Schema(
  {
    spent: {
      type: Number,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    title: {
      type: String
    },
    icon : {
        type: String   
    },
    employeeId: { type: ObjectId, ref: "Employee" },

    taskId: { type: ObjectId, ref: "Task" , default : null },
    
    nbClick: {
        type: Number,
        default: 0
    },
    nbKeyPress: {
        type: Number,
        default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Time", TimeSchema);
