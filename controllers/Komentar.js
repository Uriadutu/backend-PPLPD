import Atlet from "../models/Atletmodels.js";
import ForumCabor from "../models/ForumCaborModels.js";
import Komentar from "../models/KomentarModels.js";
import Pelatih from "../models/Pelatihmodels.js";
import { Op } from "sequelize";

export const getKomentar = async (req, res) => {
  try {
    const response = await Komentar.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKomenByForum = async (req, res) => {
  try {
    const response = await Komentar.findAll({
      where: {
        id_ForumCabor: req.params.id,
      },
      include: [
        {
          model: ForumCabor,
        },
        {
          model: Atlet,
        },
        {
          model: Pelatih,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getKomenByuuid = async (req, res) => {
  try {
    const response = await Komentar.findAll({
      where: {
        uuid_penulis: req.params.id,
      },
      include: [
        {
          model: ForumCabor,
        },
        {
          model: Atlet,
        },
        {
          model: Pelatih,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getKomenByAtlet = async (req, res) => {
  try {
    const response = await Komentar.findAll({
      where: {
        [Op.or]: [{ id_atlet: req.params.id }, { id_pelatih: req.params.id }],
      },
      include: [
        {
          model: ForumCabor,
        },
        {
          model: Atlet,
        },
        {
          model: Pelatih,
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createKomentar = async (req, res) => {
  const { id_forumCabor, isi_komen, uuid_penulis } = req.body;
  try {
    let id_pelatih = null;
    let id_atlet = null;
    
    if (req.role === "Pelatih") {
      id_pelatih = req.id_pelatih;
    } else if (req.role === "Atlet") {
      id_atlet = req.id_atlet;
    } else {
      return res
        .status(403)
        .json({ msg: "Anda tidak diizinkan membuat forum", error });
    }

    await Komentar.create({
      id_forumCabor: id_forumCabor,
      uuid_penulis : uuid_penulis,
      id_atlet: id_atlet,
      id_pelatih: id_pelatih,
      isi_komen: isi_komen,
    });
    res.status(200).json({ msg: "Data berhasil terkirim" });
  } catch (error) {
    res.status(500).json({msg : "Lengkapi Semua Field"});
  }
};

export const deleteKomentar = async (req, res) => {};
