import Prestasi from "../models/PrestasiModels.js"

export const getPrestasi = async (req, res) => {
     try {
       const response = await Prestasi.findAll({});
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data tidak ditemukan" });
     }  
}
export const getPrestasiByAtlet = async (req, res) => {
    try {
      const response = await Prestasi.findAll({
        where: {
          id_atlet: req.params.id,
        },
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ msg: "Data tidak ditemukan" });
    } 
}
export const  createPrestasi = async (req, res) => {
    const {
      id_atlet,
      namaClub,
      Tingkat,
      namaEvent,
      tahunPrestasi,
      Pencapaian,
    } = req.body;
    try {
      await Prestasi.create({
        id_atlet: id_atlet,
        namaClub: namaClub,
        Tingkat: Tingkat,
        namaEvent: namaEvent,
        tahunPrestasi: tahunPrestasi,
        Pencapaian: Pencapaian,
      });
      res.status(200).json({ msg: "Data Berhasil DiBuat" });
    } catch (error) {
      res.status(404).json({ msg: "Data Gagal DiBuat" });
    }
}
export const  deeletePrestasi = async (req, res) => {
    try {
      const pres = await Prestasi.findOne({
        where: {
          id_prestasi: req.params.id,
        },
      });
      if (!pres) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
      await pres.destroy();
      res.status(200).json({ msg: "Data Berhasil DiHapus" });
    } catch (error) {
      res.status(404).json({ msg: "Data Gagal Dihapus" });
    }

}