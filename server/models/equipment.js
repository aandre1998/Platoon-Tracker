import mongoose from 'mongoose';

const equipmentSchema = mongoose.Schema({
    equipmentName: String,
    lin: String,
    quantity: Number,
});

const equipment = mongoose.model('equipment', equipmentSchema);

export default equipment;