import Atlet from "../models/Atletmodels.js";
import ForumCabor from "../models/ForumCaborModels.js";
import Pelatih from "../models/Pelatihmodels.js";

export const getForumCabor = async (req, res) => {
  try {
    const response = await ForumCabor.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getForumCaborbyCabor = async (req, res) => {
  try {
    const response = await ForumCabor.findAll({
      where: {
        id_cabor: req.params.id,
      },
      include: [
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
export const createForumCabor = async (req, res) => {
  const { id_cabor } = req.body;
  const isi_forum = req.body.isi_forum;
  const judul_forum = req.body.judul_forum;

  try {
    let id_pelatih = null;
    let id_atlet = null;

    // Memastikan hanya role "Pelatih" atau "Atlet" yang bisa membuat forum
    if (req.role === "Pelatih") {
      id_pelatih = req.id_pelatih;
    } else if (req.role === "Atlet") {
      id_atlet = req.id_atlet;
    } else {
      // Jika rolenya bukan "Pelatih" atau "Atlet", kirim respons bahwa akses ditolak
      return res
        .status(403)
        .json({ msg: "Anda tidak diizinkan membuat forum" });
    }

    // Membuat forum hanya jika pengguna memiliki role "Pelatih" atau "Atlet"
    await ForumCabor.create({
      id_cabor: id_cabor,
      id_pelatih: id_pelatih,
      id_atlet: id_atlet,
      judul_forum: judul_forum,
      isi_forum: isi_forum,
    });

    res.status(200).json({ msg: "Data berhasil terkirim" });
  } catch (error) {
    res.status(500).json({ msg: "Lengkapi Semua Field" });
  }
};

export const deleteForumCabor = async (req, res) => {};

export const countForumByCabor = async (req, res) => {
  try {
    const forumCounts = await ForumCabor.count({
      attributes: ["id_cabor"],
      group: ["id_cabor"],
    });
    const result = forumCounts.reduce((acc, row) => {
      acc[row.id_cabor] = row.count;
      return acc;
    }, {});

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan dalam menghitung data forum" });
  }
};