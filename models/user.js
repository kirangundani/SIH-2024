// File: models/user.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    userType: {
        type: String,
        required: [true, 'User type is required'],
        enum: {
            values: ['farmer', 'labour'],
            message: '{VALUE} is not a valid user type'
        }
    },
    labourCount: {
        type: Number,
        min: [1, 'Minimum labour count is 1'],
        max: [20, 'Maximum labour count is 20'],
        required: function() {
            return this.userType === 'farmer';
        }
    },
    location: {
        type: pointSchema,
        required: [true, 'Location is required']
    },
    available: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'busy', 'inactive'],
        default: 'active'
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userSchema.index({ location: '2dsphere' });
userSchema.index({ userType: 1 });

module.exports = mongoose.model('User', userSchema);
