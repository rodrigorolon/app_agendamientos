const express = require('express');
const { getDoctors, getDoctorAppointments } = require('../controllers/doctorController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getDoctors);
router.get('/appointments', authenticate, getDoctorAppointments);

module.exports = router;
