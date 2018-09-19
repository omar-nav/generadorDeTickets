const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PLM = require('passport-local-mongoose')

let finalString = String;
function passwordGenerator() {
  // 25 element locations including 0
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // 7 element places including 0
  let numbers = [2, 3, 4, 5, 6, 7, 8, 9]
  let letterElementOne = Math.floor((Math.random() * 25));
  let letterElementTwo = Math.floor((Math.random() * 25));
  let numberElementOne = Math.floor((Math.random() * 7));
  let numberElementTwo = Math.floor((Math.random() * 7));
  let x1 = letters[letterElementOne];
  let x2 = letters[letterElementTwo];
  let y1 = (numbers[numberElementOne]);
  let y2 = (numbers[numberElementTwo]);
  let finalString = x1 + x2 + '-' + y1 + y2;
  return finalString;
}
passwordGenerator();
const userSchema = new Schema({
  username: String,
  email: String,
  systemPassword: String = finalString
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'update_at'
    }
  })

userSchema.plugin(PLM, { usernameField: 'email' })
module.exports = mongoose.model('User', userSchema)