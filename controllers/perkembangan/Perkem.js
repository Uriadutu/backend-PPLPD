import Perkembangan from "../../models/Perkembangan/Perkembanganmodels.js";
import Atlet from "../../models/Atletmodels.js"
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Komponen from "../../models/Perkembangan/KomponenModels.js";
import Cabor from "../../models/Cabormodels.js";
import { v4 as uuidv4 } from "uuid";

export const getPerkembangan = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes", "datahapus", "id_perkem"],
      include: [
        {
          model: Atlet,
        },
        {
          model: Indikator,
          attributes: ["namaIndikator"],
          include: [
            {
              model: Komponen,
              attributes: ["id_komponen", "namaKomponen"],
              include: [
                {
                  model: Cabor,
                  attributes: ["id_cabor", "namaCabor"],
                },
              ],
            },
          ],
        },
      ],
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};

export const getPerkembanganByAtlet = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      where: {
        id_atlet: req.params.id,
      },
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes", "id_perkem"],
      include: [
        {
          model: Atlet,
          attributes: ["id_atlet"],
        },
        {
          model: Indikator,
          attributes: ["namaIndikator"],
          include: [
            {
              model: Komponen,
              attributes: ["id_komponen", "namaKomponen", "periode"],
            },
          ],
        },
      ],
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};

export const getPerkembanganByid = async (req, res) => {
  try {
    const response = await Perkembangan.findOne({
      where: {
        id_perkem: req.params.id,
      },
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes", "id_perkem", "datahapus"],
      include: [
        {
          model: Atlet,
        },
        {
          model: Indikator,
          attributes: ["namaIndikator"],
        },
      ],
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
  }
};



export const createPerkembangan = async (req, res) => {
  try {
    const { tgl, id_atlet, id_indikator, hasilTes } = req.body;

    if (id_indikator.length !== hasilTes.length) {
      return res.status(400).json({ msg: "Panjang array tidak sama" });
    }

    const datahapus = `${uuidv4()}`;

    const createdData = [];

    for (let i = 0; i < id_indikator.length; i++) {
      const newPerkembangan = await Perkembangan.create({
        id_atlet: id_atlet,
        id_indikator: id_indikator[i],
        tgl: tgl,
        hasilTes: hasilTes[i],
        datahapus: datahapus,
      });
      createdData.push(newPerkembangan);
    }

    res.status(200).json({ msg: "Data berhasil ditambahkan", createdData });
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
      attributes: ["id_atlet", "id_indikator", "tgl", "hasilTes", "id_perkem"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({msg :"Data tidak ditemukan"});
  }
};


export const deletePerkembanganbytgl = async (req, res) => {
  try {
    const response = await Perkembangan.findAll({
      where: {
        datahapus: req.params.id, 
      },
    });
    if(!response) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    if (response.length === 0) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    for (let i = 0; i < response.length; i++) {
      await response[i].destroy();
    }

    res.status(200).json({ msg: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Tidak dapat menghapus data" });
  }
};


