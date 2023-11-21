import Forum from "../models/ForumModels.js";

export const getForum = async(req, res) => {
    try {
        const response = await Forum.findAll({
            attributes : ["id_forum", "namaForum"],
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg :"Belum Ada Forum"});
        
    }
}

export const getForumbyId = async(req, res) => {
    try {
        const response = await Forum.findOne({
          attributes: ["id_forum", "namaForum"],
          where: {
            id_forum: req.params.id,
          },
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json({msg :"Belum Ada Forum"});
        
    }
}

export const createForum = async (req, res)=> {
    const {namaForum} = req.body;
    try {
        await Forum.create({
            namaForum : namaForum,
        }),
        res.status(200).json({msg : "Data ditambahkan"})
    } catch (error) {
        res.status(404).json({ msg: "Data gagal ditambahkan" });
        
    }
}

export const deleteForum = async (req, res) => {
    try {
        const forum = await Forum.findOne({
            where: {
                id_forum: req.params.id
            }
        });

        if (!forum) {
            return res.status(404).json({ msg: "Data tidak ditemukan" });
        }

        await forum.destroy();
        return res.status(200).json({ msg: "Data berhasil dihapus" });
    } catch (error) {
        return res.status(500).json({ msg: error.message || "Data gagal dihapus" });
    }
}