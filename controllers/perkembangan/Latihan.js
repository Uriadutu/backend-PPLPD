import Cabor from "../../models/Cabormodels.js";
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Latihan from "../../models/Perkembangan/LatihanModels.js";

export const getLatihan = async(req, res) => {
    try {
        const response = await Latihan.findAll({
            attributes :["id_latihan", "namaLatihan", "id_indikator", "id_cabor"],
            include : [ 
                {model : Cabor,
                attributes : ["namaCabor"]},
                {model : Indikator,
                attributes : ["namaIndikator", "id_komponen"]},

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
           { model: Indikator, attributes: ["namaIndikator", "id_komponen"] },
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
            id_indikator : req.params.id,
        },
         attributes: ["id_latihan", "namaLatihan", "id_indikator", "id_cabor"],
         include: [
           { model: Cabor, attributes: ["namaCabor"] },
           { model: Indikator, attributes: ["namaIndikator", "id_komponen"] },
         ],
       });
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data Tidak Ditemukan" });
     }
}

export const createLatihan = async(req, res) => {
    try {
        const {id_cabor, id_indikator, namaLatihan,} =req.body;
        await Latihan.create({
            id_cabor : id_cabor,
            id_indikator : id_indikator,
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