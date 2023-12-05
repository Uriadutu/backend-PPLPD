import Cabor from "../models/Cabormodels.js";
import Club from "../models/ClubModels.js";

export const getClubbyId =async (req, res) => {
    try {
        const response = await Club.findOne({
            where : {
                id_club : req.params.id
            },
            include : [{
                    model : Cabor,
                }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msh : "Data tidak ditemukan"});
        
    }
}
export const getClubbyCabor = async (req, res) => {
    try {
        const response = await Club.findAll(
            {
                where : {
                    id_cabor : req.params.id
                },
                include : [{
                    model : Cabor,
                }]
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const createClub = async (req, res) => {
    const {nama_club, id_cabor} = req.body;
    try {
        await Club.create({
            nama_club : nama_club,
            id_cabor : id_cabor
        })
        res.status(200).json({msg : "Data Berhasil Ditambahkan"})
    } catch (error) {
        res.status(404).json({msg : "Harap Masukan Nama Club"})
    }
}

export const deleteClub = async (req, res) => {}

export const updateClub = async (req, res) => {}
