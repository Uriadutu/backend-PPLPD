import Berita from "../models/BeritaModels.js";

export const getBerita = async(req, res) => {
    try {
        const response = await Berita.findAll({
            attributes : ["id", "judul", "isiBerita"],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data tidak ditemukan"})
    }
}

export const getBeritaById = async(req, res) => {
   try {
     const response = await Berita.findOne({
        where : {
            id : req.params.id,
        },
       attributes: ["id", "judul", "isiBerita"],
     });
     res.status(200).json(response);
   } catch (error) {
     res.status(404).json({ msg: "Data tidak ditemukan" });
   }
}

export const createBerita = async (req, res)=> {
    try {
        const {id, judul, isiBerita} = req.body
        await Berita.create({
            id : id,
            judul : judul,
            isiBerita : isiBerita,
        });
        res.status(200).json({msg : "Berita Ditambahkan"});
    } catch (error) {
     res.status(404).json({ msg: "Data tidak dapat dibuat" });
    }
}

export const deleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!berita) {
    res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    await berita.destroy();
    res.status(200).json({msg :"Data Berhasil dihapus"});
  } catch (error) {
    res.status(404).json({ msg: "Data tidak dapat dihapus" });
  }
};
