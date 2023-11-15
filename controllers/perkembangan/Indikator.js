import Atlet from "../../models/Atletmodels.js";
import Cabor from "../../models/Cabormodels.js";
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Komponen from "../../models/Perkembangan/KomponenModels.js";

export const getIndikator = async (req, res) => {
    try {
        const response = await Indikator.findAll({
            attributes : ["id_indikator", "namaIndikator"],
            include : [
                {
                    model : Komponen,
                    attributes : ["id_komponen", "namaKomponen", "id_cabor"],
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data tidak ditemukan"});
    }
};
export const getIndikatorByKomponen = async (req, res) => {
    try {
      const response = await Indikator.findAll({
        where : {
            id_komponen : req.params.id
        },
        attributes: ["id_indikator", "namaIndikator"],
        include: [
          {
            model: Komponen,
            attributes: ["id_komponen", "namaKomponen", "id_cabor"],
          },
        ],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
};
export const getIndikatorbyId = async (req, res) => { 
    try {
      const response = await Indikator.findOne({
        where: {
          id_indikator: req.params.id,
        },
        attributes: ["id_indikator", "namaIndikator"],
        include: [
          {
            model: Komponen,
            attributes: ["id_komponen", "namaKomponen", "id_cabor"],
          },
        ],
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    }
};

export const CreateIndikator = async (req, res) => {
    try {
        const {namaIndikator, id_komponen, id_cabor} = req.body
        await Indikator.create({
            id_komponen : id_komponen,
            namaIndikator : namaIndikator,
            id_cabor : id_cabor
        });
        res.status(200).json({msg : "Data Berasil Ditambahkan"});
    } catch (error) {
        res.status(404).json({msg : "Data Tidak Dapat Ditambahkan"});
    }
}

export const DeleteIndikator = async (req, res )=> {
    try {
        const Indik = await Indikator.findOne({
            where : {
                id_indikator : req.params.id,
            },

        });
        if (!Indik) {
            res.status(404).json({msg : "Data Tidak Ditemukan"})
        }
        await Indik.destroy();
        res.status(200).json({msg : "Data terhapus"})
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Dapat Dihapus" });
    }
}

export const getIndiByCabor = async (req, res)=> {
  try {
    const response = await Indikator.findAll({
      where : {
        id_cabor : req.params.id,
      },
      attributes : ["id_cabor", "id_komponen", "namaIndikator"],
      include : [ {
        model : Komponen,
        attributes : ["namaKomponen", "id_cabor"],
        include : [{
          model : Cabor,
          attributes : ["namaCabor"],
        }]
      },]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({msg : "Data tidak ditemukan"}); 
  }
}