const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  token: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const StaffSchema = mongoose.model("Staff", Schema);

module.exports = StaffSchema;
