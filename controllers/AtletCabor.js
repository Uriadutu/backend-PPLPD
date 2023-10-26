import Cabor from "../models/Cabormodels.js";
import Atlet from "../models/Atletmodels.js";
import AtletCabor from "../models/AtletCaborModels.js";


export const createAtletCabangOlahraga = async (req, res) => {
  const { id_atlet, id_cabor } = req.body;

  try {
    await AtletCabor.create({
        id_atlet: id_atlet,
        id_cabor: id_cabor,
    });
    res.status(201).json({ msg: "Data berhasil disisipkan"});
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
