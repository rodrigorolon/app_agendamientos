const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

const registerUser = async (req, res) => {
  const { name, email, password, role, specialty } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'doctor') {
      const doctor = new Doctor({ name, email, password: hashedPassword, specialty });
      await doctor.save();
      return res.status(201).json({ message: 'Doctor registered successfully' });
    }

    const patient = new Patient({ name, email, password: hashedPassword });
    await patient.save();
    res.status(201).json({ message: 'Patient registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = role === 'doctor'
      ? await Doctor.findOne({ email })
      : await Patient.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };
