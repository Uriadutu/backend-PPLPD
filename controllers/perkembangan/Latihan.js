import Cabor from "../../models/Cabormodels.js";
import Komponen from "../../models/Perkembangan/KomponenModels.js";
import Latihan from "../../models/Perkembangan/LatihanModels.js";

export const getLatihan = async(req, res) => {
    try {
        const response = await Latihan.findAll({
            attributes :["id_latihan", "namaLatihan", "id_komponen", "id_cabor"],
            include : [ 
                {model : Cabor,
                attributes : ["namaCabor"]},
                {model : Komponen,
                attributes : ["namaKomponen", "id_komponen"]},

            ]
        });
        res.status(200).json(response);

    } catch (error) {
        res.status(404).json({msg : "Data Tidak Ditemukan"})
    }

}

export const getLatihanbyId = async(req, res) => {
     try {
       const response = await Latihan.findOne({
        where : {
            id_latihan : req.params.id,
        },
         attributes: ["id_latihan", "namaLatihan", "id_indikator", "id_cabor"],
         include: [
           { model: Cabor, attributes: ["namaCabor"] },
           { model: Komponen, attributes: ["namaKomponen", "id_komponen"] },
         ],
       });
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data Tidak Ditemukan" });
     }
}

export const getLatihanbyIndi = async(req, res) => {
     try {
       const response = await Latihan.findAll({
        where : {
            id_komponen : req.params.id,
        },
         attributes: ["id_latihan", "namaLatihan", "id_indikator", "id_cabor"],
         include: [
           { model: Cabor, attributes: ["namaCabor"] },
           { model: Komponen, attributes: ["namaKomponen", "id_komponen"] },
         ],
       });
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data Tidak Ditemukan" });
     }
}

export const createLatihan = async(req, res) => {
    try {
        const {id_cabor, id_komponen, namaLatihan,} =req.body;
        await Latihan.create({
            id_cabor : id_cabor,
            id_komponen : id_komponen,
            namaLatihan : namaLatihan,
        }),
        res.status(200).json({msg : "Data Berhasil Dibuat"})
    } catch (error) {
        res.status(404).json({ msg: "Data Gagal Dibuat" });
    }

}

export const deleteLatihan = async(req, res) => {
    try {
      const Latihans = await Latihan.findOne({
        where: {
          id_latihan: req.params.id,
        },
      });
      if (!Latihans) {
        res.status(404).json({ msg: "Data Tidak Ditemukan" });
      }
      await Latihans.destroy();
      res.status(200).json({ msg: "Data terhapus" });
    } catch (error) {
      res.status(404).json({ msg: "Data Tidak Dapat Dihapus" });
    }
}