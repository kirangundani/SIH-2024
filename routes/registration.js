const express = require('express');
const router = express.Router();
const UserRegistration = require('../models/registration');

// Render registration page
router.get('/register', (req, res) => {
    res.render('registration');
});

// Handle registration
router.post('/register', async (req, res) => {
    try {
        const { userType, name, labourCount } = req.body;

        // Validate required fields
        if (!userType || !name) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Validate labour count for farmers
        if (userType === 'farmer' && (!labourCount || labourCount < 1 || labourCount > 20)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid number of labours (1-20)'
            });
        }

        // Create new user registration
        const userRegistration = new UserRegistration({
            userType,
            name,
            labourCount: userType === 'farmer' ? labourCount : undefined,
            registrationDate: new Date()
        });

        // Save to database
        await userRegistration.save();

        // Send success response with user ID
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            userId: userRegistration._id
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Registration failed. Please try again.'
        });
    }
});

// Get registration details
router.get('/registration/:id', async (req, res) => {
    try {
        const registration = await UserRegistration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({
                success: false,
                message: 'Registration not found'
            });
        }

        res.json({
            success: true,
            data: registration
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching registration details'
        });
    }
});

module.exports = router;