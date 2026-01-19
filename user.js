const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  enrolledCourses: [{ type: String, default: ['web-dev-basics'] }],
  progress: {
    'web-dev-basics': {
      completedLessons: [String]
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);