import Perkembangan from "../../models/Perkembangan/Perkembanganmodels.js";
import Atlet from "../../models/Atletmodels.js"
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Komponen from "../../models/Perkembangan/KomponenModels.js";

export const getPerkembangan = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes"],
      include : [{
        model : Atlet,
        attributes : ["nama", "kelamin"],
      }, {
        model : Indikator,
        attributes : ["namaIndikator"],
      }
    ]
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};

export const getPerkembanganByAtlet = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      where : {
        id_atlet : req.params.id,
      },
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes"],
      include : [{
        model : Atlet,
        attributes : ["nama", "kelamin"],
      }, {
        model : Indikator, 
        attributes : ["namaIndikator"],
        include :[{
          model : Komponen,
          attributes : ["id_komponen", "namaKomponen"]
        }]
      }
    ]
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};

export const getPerkembanganByid = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      where : {
        id_indikator : req.params.id,
      },
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes"],
      include : [{
        model : Atlet,
        attributes : ["nama", "kelamin"],
      }, {
        model : Indikator,
        attributes : ["namaIndikator"],
      }
    ]
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};


export const createPerkembangan = async (req, res) => {
  try {
    const { tgl, id_atlet, id_indikator, hasilTes} = req.body;

    // sepasti indikator = hasiltes
    if (id_indikator.length !== hasilTes.length) {
      return res.status(400).json({ msg: "Panjang array tidak sama" });
    }

    // kase loop p dia
    for (let i = 0; i < id_indikator.length; i++) {
      await Perkembangan.create({
        id_atlet: id_atlet,
        id_indikator: id_indikator[i],
        tgl: tgl,
        hasilTes: hasilTes[i],
      });
    }

    res.status(200).json({ msg: "Data Berhasil ditambahlan" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ msg: "Data gagal ditambahkan" });
  }
};


export const getPerkembanganbyTglAtlet = async (req, res) => {
  try {
    const {tgl, idAtlet} = req.params
    const response = await Perkembangan.findAll({
      where: {
        tgl: tgl,
        id_atlet: idAtlet,
      },
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({msg :"Data tidak ditemukan"});
  }
};
