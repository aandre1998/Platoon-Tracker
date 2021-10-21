import SoldierData from '../models/soldier.js';

export const getSoldiers = async (req, res)=> {
    try {
        const allSoldiers = await SoldierData.find();

        res.status(200).json(allSoldiers);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createSoldier = async (req, res)=> {
    const soldier = req.body;

    const newSoldier = new SoldierData(soldier);

    try {
        await newSoldier.save();
        res.status(201).json(newSoldier);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const deleteSoldier = async (req, res)=> {
    const id = req.params.id;

    try {
        await SoldierData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}