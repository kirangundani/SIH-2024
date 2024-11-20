// File: server.js

const express = require("express");
const app = express();
const path = require('path');
const http = require("http");
const socketio = require("socket.io");
const mongoose = require('mongoose');
const User = require('./models/user');

// Create server with socket.io
const server = http.createServer(app);
const io = socketio(server);

// MongoDB connection
mongoose.connect('mongodb://localhost/agri_labour_connect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
    res.render('registration', { error: null });
});

app.post('/register', async (req, res) => {
    try {
        const { name, userType, labourCount } = req.body;
        
        // For testing purposes, using default coordinates
        const location = {
            type: 'Point',
            coordinates: [0, 0] // Replace with actual coordinates from client
        };

        const userData = {
            name,
            userType,
            labourCount: userType === 'farmer' ? labourCount : undefined,
            location
        };

        const user = new User(userData);
        await user.save();

        res.json({
            success: true,
            userId: user._id,
            redirect: userType === 'farmer' ? '/labour' : '/labour-profile'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/labour', (req, res) => {
    res.render('labour');
});

app.get('/labour-profile', (req, res) => {
    res.render('labour-profile');
});

// Socket.IO connection handling
io.on('connection', async (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('update-location', async (data) => {
        if (socket.userData) {
            try {
                await User.findByIdAndUpdate(socket.userData._id, {
                    location: {
                        type: 'Point',
                        coordinates: [data.longitude, data.latitude]
                    },
                    lastActive: new Date()
                });
            } catch (error) {
                console.error('Error updating location:', error);
            }
        }
    });

    socket.on('disconnect', async () => {
        if (socket.userData) {
            try {
                await User.findByIdAndUpdate(
                    socket.userData._id,
                    {
                        available: false,
                        lastActive: new Date()
                    }
                );
                io.emit('user-disconnected', socket.userData._id);
            } catch (error) {
                console.error('Error handling disconnection:', error);
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        message: 'Something went wrong! Please try again.' 
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});