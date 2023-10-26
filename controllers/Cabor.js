import Cabor from "../models/Cabormodels.js";


export const GetCabor = async (req, res) => {
    try {
        const InfoCabor = await Cabor.findAll({
            attributes: ['id_cabor','namaCabor', 'kodeCabor']
        });
        res.status(200).json(InfoCabor);
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const AddCabor = async (req, res) => {
    const {id_cabor, namaCabor, kodeCabor} =  req.body;
    try {
        await Cabor.create({
            namaCabor : namaCabor,
            kodeCabor : kodeCabor,
            id_cabor : kodeCabor
        });
        res.status(201).json({msg : "Cabang Olahraga ditambahkan"});
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
}

export const DeleteCabor = async (req, res) => {
    const Cabang = await Cabor.findOne({
      where: {
        id_cabor: req.params.id,
      },
    });
    if (!Cabang) return res.status(404).json({ msg: "Data tidak ditemukan" });
    try {
      await Cabor.destroy({
        where: {
          id: Cabang.id,
        },
      });
      res.status(200).json({ msg: "Data Telah terhapus" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
}


