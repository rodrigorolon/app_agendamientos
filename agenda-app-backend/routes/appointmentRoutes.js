const express = require('express');
const { createAppointment, getAppointmentsForPatient, getAppointmentsForDoctor, deleteAppointment } = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createAppointment);
router.get('/patient', authenticate, getAppointmentsForPatient);
router.get('/doctor', authenticate, getAppointmentsForDoctor);
router.delete('/:id', authenticate, deleteAppointment);

module.exports = router;
