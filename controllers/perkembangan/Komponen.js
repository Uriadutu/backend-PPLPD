import Cabor from "../../models/Cabormodels.js";
import Indikator from "../../models/Perkembangan/IndikatorModels.js";
import Komponen from "../../models/Perkembangan/KomponenModels.js";

export const getKomponen = async (req, res) => {
    try {
        const response = await Komponen.findAll({
            attributes : ["id_komponen", "namaKomponen"],
            include : [
                {
                    model : Cabor,
                    attributes : ["id_cabor", "namaCabor", "inisialCabor"],
                }
            ]

        })
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data Tidak Ditemukan"});
    }
};

export const getKomponenById = async (req, res) => {
    try {
        const response = await Komponen.findOne({
          where: {
            id_komponen: req.params.id,
          },
          attributes: ["id_komponen", "namaKomponen"],
          include: [
            {
              model: Cabor,
              attributes: ["id_cabor", "namaCabor", "inisialCabor"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
}
export const getKomponenByCabor = async (req, res) => {
    try {
        const response = await Komponen.findAll({
          where: {
            id_cabor: req.params.id,
          },
          attributes: ["id_komponen", "namaKomponen"],
          include: [
            {
              model: Cabor,
              attributes: ["id_cabor", "namaCabor", "inisialCabor"],
            },
          ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
}

export const CreateKomponen = async(req, res) => {
    try {
        const {id_komponen, id_cabor, namaKomponen} = req.body;
        await Komponen.create({
            id_komponen : id_komponen,
            id_cabor : id_cabor,
            namaKomponen : namaKomponen,
        });
        res.status(200).json({msg : "data berhasil ditambahkan"})
        
    } catch (error) {
        res.status(404).json({ msg: "Data Tidak Dapat DiBuat" });        
    }
}

export const DeleteKomponen = async (req, res) => {
  try {
    // Hapus semua Komponen berdasarkan id_cabor
    
    const result = await Komponen.destroy({
      where: {
        id_cabor: req.params.id,
      },
    });

    const Cabang = await Cabor.destroy({
        where : {
            id_cabor : req.params.id,
        }
    });
    
    if (result > 0 || Cabang === 1) {
      res.status(200).json({ msg: "Data Telah terhapus" });
    } else {
      res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Terdapat Data Dalam Cabang Olahraga Ini" });
  }
};

export const DeleteOneKomponen = async (req, res) => {
  try {
    const Indi = await Indikator.destroy({
      where: {
        id_komponen: req.params.id,
      },
    });
    
    const Komponens = await Komponen.destroy({
      where: {
        id_komponen: req.params.id,
      },
    });


    if (Komponens === 1 || Indi > 0) {
      res.status(200).json({ msg: "Data Telah terhapus" });
    } else {
      res.status(404).json({ msg: "Data Tidak Ditemukan" });
    }
  } catch (error) {
    return res.status(404).json({ msg: "Data Tidak Dapat Dihapus" });
  }
};
