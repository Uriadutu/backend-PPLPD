import ClubAtlet from "../models/ClubAtletModels.js";

export const getClubAtlet = async (req, res) => {
  try {
    const response = await ClubAtlet.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createClubAtlet = async (req, res) => {
  const { id_club, id_atlet } = req.body;
  try {
    await ClubAtlet.create({
      id_club: id_club,
      id_atlet: id_atlet,
    });
    res.status(200).json({ msg: "Data Berhasil Ditambahkan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteClubAtlet = async (req, res) => {
  try {
    const clubs = await ClubAtlet.findOne({
      where: {
        id_clubatlet: req.params.id,
      },
    });
    if (!clubs) {
      res.status(404).json({ msg: "Data Gagal Dihapus" });
    }
    await clubs.destroy();
    res.status(200).json({ msg: "Data Berhasil Dihapus" });
  } catch (error) {
    res.status(404).json({ msg: "Data Gagal Dihapus" });
  }
};
