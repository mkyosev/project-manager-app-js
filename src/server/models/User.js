const { Schema, model } = require('mongoose');

const schema = new Schema({
    fullName: { type: String, minlength: [3, 'Minimum Full Name length is 3!'], required: [true, 'Full Name is required!'] },
    email: { type: String, required: [true, 'Email is required!'] },
    password: { type: String, required: [true, 'Password is required!'] },
    ownProjects: [{ type: Schema.Types.ObjectId, ref: 'Project', default: [] }],
    otherProjects: [{ type: Schema.Types.ObjectId, ref: 'Project', default: [] }],
    token: { type: String },
});

module.exports = model('User', schema);
