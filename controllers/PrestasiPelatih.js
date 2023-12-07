import Prestasi_pelatih from "../models/PrestasiPelatihModels.js";

export const getPrestasiPelatih = async (req, res)=> {
    try {
        const response = await Prestasi_pelatih.findAll({})
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Data tidak ditemukan"})
    }    
}
export const getPrestasiPelatihbyId = async (req, res)=> {
     try {
       const response = await Prestasi_pelatih.findAll({
        where : {
            id_pelatih : req.params.id
        }
       });
       res.status(200).json(response);
     } catch (error) {
       res.status(404).json({ msg: "Data tidak ditemukan" });
     }  
}
export const CreatePrestasiPelatih = async (req, res)=> {
    const {id_pelatih, namaClub, Tingkat, namaEvent, tahunPrestasi, Pencapaian} = req.body;
    try {
        await Prestasi_pelatih.create({
            id_pelatih : id_pelatih,
            namaClub : namaClub,
            Tingkat : Tingkat,
            namaEvent : namaEvent,
            tahunPrestasi : tahunPrestasi,
            Pencapaian : Pencapaian
        })
        res.status(200).json({msg : "Data Berhasil DiBuat"})
    } catch (error) {
        res.status(404).json({ msg: "Data Gagal DiBuat" });
        
    }
}
export const DeletePrestasiPelatih = async (req, res)=> {
    try {
        const pres = await Prestasi_pelatih.findOne({
            where : {
                id_prestasi_pelatih : req.params.id
            }
        });
        if(!pres) return res.status(404).json({msg : "Data Tidak Ditemukan"});
        await pres.destroy();
        res.status(200).json({msg : "Data Berhasil DiHapus"})
    } catch (error) {
        res.status(404).json({ msg: "Data Gagal Dihapus" });
        
    }

}