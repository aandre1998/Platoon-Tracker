import SectionData from '../models/section.js';

export const getSection = async (req, res)=> {
    try {
        const allSections = await SectionData.find();

        res.status(200).json(allSections);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createSection = async (req, res)=> {
    const section = req.body;

    const newSection = new SectionData(section);

    try {
        await newSection.save();
        res.status(201).json(newSection);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const deleteSection = async (req, res)=> {
    const id = req.params.id;

    try {
        await SectionData.findByIdAndRemove(id).exec();
        res.send('Successfully Deleted!');
    } catch (error) {
        console.log(error);
    }
}