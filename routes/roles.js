// routes/exampleRoute.js
const express = require('express');
const router = express.Router();
const { checkAdminRole } = require('..authMiddleware.js');

// Example route that requires admin access
router.get('/roles/admin-only', checkAdminRole, (req, res) => {
  res.status(200).json({ success: true, message: 'You have access to this admin-only route!' });
});

module.exports = router;
