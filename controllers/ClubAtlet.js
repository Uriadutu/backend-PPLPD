import ClubAtlet from "../models/ClubAtletModels.js";

export const getClubAtlet = async (req, res) => {
    try {
        const response = await ClubAtlet.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createClubAtlet = async (req, res) => {
    const {id_club, id_atlet} = req.body;
    try {
        await ClubAtlet.create({
            id_club : id_club,
            id_atlet : id_atlet,
        })
        res.status(200).json({msg : "Data Berhasil Ditambahkan"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const deleteClubAtlet = async (req, res) => {
    }