import Cabor from "../models/Cabormodels.js";
import Pelatih from "../models/Pelatihmodels.js";

export const getPelatih = async (req, res) => {
  try {
    const response = await Pelatih.findAll({
      attributes: [
        "id_pelatih",
        "uuid",
        "image",
        "id_cabor",
        "name_awal",
        "nama_tengah",
        "nama_akhir",
        "nama_panggil",
        "tgl_lahir",
        "tmp_lahir",
        "agama",
        "nama_jalan",
        "desa",
        "kelurahan",
        "kecamatan",
        "kota",
        "provinsi",
        "no_telp",
        "hp_mobile",
        "email",
        "kelamin",
        "gol_darah",
        "tinggi_badan",
        "berat_badan",
        "pendidikan",
        "nama_sklh",
        "pend_terakhir",
        "alumni",
        "tahun_lulus",
        "ukuran_baju",
        "ukuran_sepatu",
      ],
      include: [
        {
          model: Cabor,
          attributes: ["namaCabor"],
        },
      ],
    });
    res.statu(200).json(response);
  } catch (error) {
    res.status(404).json({msg : "Datat tidak ditemukan"})
  }
};

export const getPelatihById = async (req, res) => {
    try {
        const response = await Pelatih.findOne({
          where: {
            id_pelatih: req.params.id,
          },
          attributes: [
            "id_pelatih",
            "id_cabor",
            "image",
            "uuid",
            "name_awal",
            "nama_tengah",
            "nama_akhir",
            "nama_panggil",
            "tgl_lahir",
            "tmp_lahir",
            "agama",
            "nama_jalan",
            "desa",
            "kelurahan",
            "kecamatan",
            "kota",
            "provinsi",
            "no_telp",
            "hp_mobile",
            "email",
            "kelamin",
            "gol_darah",
            "tinggi_badan",
            "berat_badan",
            "pendidikan",
            "nama_sklh",
            "pend_terakhir",
            "alumni",
            "tahun_lulus",
            "ukuran_baju",
            "ukuran_sepatu",
          ],
          include : [{
            model : Cabor,
            attributes : ["namaCabor"]
          }]
        });
        res.statu(200).json(response);
    } catch (error) {
        res.status(404).json({msg : "Datat tidak ditemukan"})
    }
};

export const createPelatih = async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ msg: "Tidak Ada File Dipilih" });
    }

    const file = req.files.file;
    const fileSize = file.size;
    const ext = path.extname(file.name);
    const allowedTypes = [".png", ".jpg", ".jpeg", ".pdf", ".docx"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Format Tidak Mendukung" });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "File Tidak Bisa Lebih Dari 5 MB" });
    }

    const timestamp = new Date().getTime(); // Waktu saat ini sebagai timestamp
    const uniqueFileName = `${timestamp}_${file.md5}${ext}`; // Menggabungkan timestamp dan nama file yang unik
    const url = `${req.protocol}://${req.get(
      "host"
    )}/Pelatih/${uniqueFileName}`;

    file.mv(`./public/Pelatih/${uniqueFileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      } else {
        const { id_pelatih } = req.body;

        try {
          await Program.create({
            id_pelatih : id_pelatih,
            Image: uniqueFileName, // Simpan nama file yang unik di database
            url: url,
          });
          res.status(200).json({ msg: "File Berhasil Terupload" });
        } catch (error) {
          res.status(404).json({ msg: "File Gagal Terupload" });
        }
      }
    });
};

export const updatePelatih = async (req, res) => {};

export const deletePelatih = async (req, res) => {};
