import Perkembangan from "../../models/Perkembangan/Perkembanganmodels.js";
import Atlet from "../../models/Atletmodels.js"
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Latihan from "../../models/Perkembangan/LatihanModels.js";

export const getPerkembangan = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      attributes: ["id_atlet", "id_indikator", "id_latihan", "tgl", "hasilTes"],
      include : [{
        model : Atlet,
        attributes : ["nama", "kelamin"],
      }, {
        model : Indikator,
        attributes : ["namaIndikator"],
      }, {
        model : Latihan,
        attributes : ["namaLatihan"],
      }
    ]
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};


export const createPerkembangan = async (req, res)=> {
    try {
        const {id_atlet, id_indikator, id_latihan, tgl, hasilTes} = req.body;
        await Perkembangan.create({
            id_atlet : id_atlet,
            id_indikator : id_indikator,
            id_latihan : id_latihan,
            tgl : tgl,
            hasilTes : hasilTes
        });
        res.status(200).json({msg : "Data Berhasil ditambahlan"});
    } catch (error) {
        res.status(404).json({msg : "Data gagal ditambahkan"});
    }
}

export const getPerkembanganbyTgl = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      where: {
        tgl: req.params.id,
      },
      attributes: ["id_atlet", "id_indikator", "id_latihan", "tgl", "hasilTes"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({msg :"Data tidak ditemukan"});
  }
};
