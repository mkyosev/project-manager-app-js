const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name is required!'], minlength: [3, 'Minimum project name length is 3!'] },
    description: { type: String, required: [true, 'Description is required!'], maxlength: [1024, 'Maximum description length is 1024!'] },
    imageUrl: { type: String, required: [true, 'Image URL is required!'], },
    createdAt: { type: Date, default: Date.now },
    public: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: Object, default: { lanes: [] } },
    groupMembers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = model('Project', schema);
