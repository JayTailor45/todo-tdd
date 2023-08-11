const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb://root:password@127.0.0.1:27017/todo-tdd?directConnection=true&authSource=admin&retryWrites=true"
    );
  } catch (e) {
    console.log(e);
  }
}

module.exports = { connect };
