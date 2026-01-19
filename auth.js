const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user with auto-enrollment
    const user = new User({
      email,
      password: hashed,
      enrolledCourses: ['web-dev-basics'],
      progress: { 'web-dev-basics': { completedLessons: [] } }
    });

    await user.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/lessons/:courseId
router.get('/lessons/:courseId', (req, res) => {
  const lessons = [
    {
      id: 'html-basics',
      title: 'HTML Basics',
      content: 'HTML is the foundation of every website. Start by learning tags like &lt;h1&gt;, &lt;p&gt;, and &lt;div&gt;. Try creating your first page!'
    },
    {
      id: 'css-intro',
      title: 'Introduction to CSS',
      content: 'CSS makes your HTML beautiful. Learn how to change colors, fonts, and layout using selectors and properties.'
    },
    {
      id: 'git-github',
      title: 'Git & GitHub for Beginners',
      content: 'Version control is essential. Learn to save your work, collaborate, and deploy using Git and GitHub.'
    }
  ];
  res.json(lessons);
});

module.exports = router;