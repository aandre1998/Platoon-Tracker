import mongoose from 'mongoose';

const soldierSchema = mongoose.Schema({
    soldierName: String,
    rank: String,
    mos: String,
});

const soldier = mongoose.model('soldier', soldierSchema);

export default soldier;