import mongoose from 'mongoose';

const sectionSchema = mongoose.Schema({
    sectionName: String,
    slots: [String],
    assigned: [String],
    equipment: [String]
});

const section = mongoose.model('section', sectionSchema);

export default section;