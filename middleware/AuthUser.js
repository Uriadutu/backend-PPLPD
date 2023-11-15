import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js"

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg : "Mohon Login Terlebi Dahulu"});
    }
    const user = await Admin.findOne({
        where : {
            uuid : req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg : "Akses terlarang"});
    res.userId = user.id_admin;
    req.role = user.role;
    next();
}

export const Adminonly = async (req, res, next) => {
  const userAdmin = await Admin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!userAdmin) return res.status(404).json({ msg: "Akses terlarang" });
  if (userAdmin.role == "Atlet")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};