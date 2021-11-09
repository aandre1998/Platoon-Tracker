import EquipmentData from '../models/equipment.js';


export const getEquipment = async (req, res)=> {
    try {
        const allEquipment = await EquipmentData.find();

        res.status(200).json(allEquipment);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


export const createEquipment = async (req, res)=> {
    const equipment = req.body;

    const newEquipment = new EquipmentData(equipment);

    try {
        await newEquipment.save();
        res.status(201).json(newEquipment);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


export const deleteEquipment = async (req, res)=> {
    const id = req.params.id;

    try {
        await EquipmentData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}