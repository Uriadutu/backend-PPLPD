import Cabor from "../models/Cabormodels.js";
import Komponen from "../models/Perkembangan/KomponenModels.js";

export const GetCabor = async (req, res) => {
    try {
        const InfoCabor = await Cabor.findAll({
          attributes: ["id_cabor", "namaCabor", "kodeCabor", "inisialCabor"],
        });
        res.status(200).json(InfoCabor);
        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
export const GetcaborbyId = async (req, res) => {
  try {
    // Menggunakan "findAndCountAll" untuk mendapatkan data Cabor dan menghitung jumlah baris
    const response = await Cabor.findOne({
      attributes: ["id_cabor", "kodeCabor", "namaCabor", "inisialCabor"],
      where: {
        id_cabor: req.params.id,
      },
    });

    // Mengirim respons JSON dengan data dan jumlah baris
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const AddCabor = async (req, res) => {
  const { namaCabor, kodeCabor } = req.body;

  // Mengambil inisial dari namaCabor (menggunakan huruf pertama)
  const inisial = namaCabor[0]; // Misalnya, mengambil huruf pertama dan mengubahnya menjadi huruf besar

  try {
    await Cabor.create({
      namaCabor: namaCabor,
      kodeCabor: kodeCabor,
      inisialCabor: inisial, // Menambahkan inisialCabor ke data
      id_cabor : kodeCabor,
    });
    res.status(201).json({ msg: "Cabang Olahraga ditambahkan" });
  } catch (error) {
    if(namaCabor === "") {
      res.status(400).json({msg : "Masukan Semua Field"});
    } else if (kodeCabor === "") {
      res.status(400).json({ msg: "Harap Masukan Kode Cabor" });
    } else if (kodeCabor === "" || namaCabor === "") {
      res.status(400).json({ msg: "Harap Masukan Semua Field" });
    } else {
      res.status(400).json({ msg: "Terdapat Kesalahan Pada Kode Cabor" });
    }
  }
};


export const DeleteCabora = async (req, res) => {
  try {
    const Cabang = await Cabor.findOne({
      where: {
        id_cabor: req.params.id,
      },
    });
    if (!Cabang) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    await Cabang.destroy(); // Menggunakan variabel `Cabang` yang telah ditemukan

    
    res.status(200).json({ msg: "Data Telah terhapus" });

  } catch (error) {
    res.status(404).json({ msg: "Terdapat Data Dalam Cabor Ini. Tidak dapat di hapus" });
  }
};



export const DeleteCabor = async (req, res) => {
  try {
    const Cabang = await Cabor.findOne({
      where: {
        id_cabor: req.params.id,
      },
    });


    const idCabor = Cabang.id_cabor
    // Temukan dan hapus semua Komponen berdasarkan id_cabor
    const Komponens = await Komponen.findAll({
      where: {
        id_cabor: idCabor,
      },
    });

    await Komponens.destroy();
    await Cabor.destroy();
    res.status(200).json({msg : "hayyy"});
  } catch (error) {
    res.status(500).json({ msg: "Gagal menghapus data" });
  }
};

