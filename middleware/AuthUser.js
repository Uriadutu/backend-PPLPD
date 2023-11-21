import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js";
import Pelatih from "../models/Pelatihmodels.js";
import SuperAdmin from "../models/SuperAdmin.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login Terlebi Dahulu" });
  }
  const Admins = await Admin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const SuperAdmins = await SuperAdmin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const Atlets = await Atlet.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const user = Admins || SuperAdmins || Atlets ;
  if (!user) return res.status(404).json({ msg: "Akses terlarang" });
  req.userId = user.id_Super || user.id_admin || user.id_atlet;
  req.role = user.role;
  next();
};

export const Adminonly = async (req, res, next) => {
  const Admins = await Admin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const SuperAdmins = await SuperAdmin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const Atlets = await Atlet.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const user = Admins || SuperAdmins || Atlets;

  if (!user) return res.status(404).json({ msg: "Akses terlarang" });
  if (user.role === "Atlet")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};

export const SuperAdminOnly = async (req, res, next) => {
  const Admin = await Admin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const SuperAdmin = await SuperAdmin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const Atlet = await Atlet.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  const user = Admin || SuperAdmin || Atlet;

  if (!user) return res.status(404).json({ msg: "Akses terlarang" });
  if (user.role !== "SuperAdmin")
    return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
