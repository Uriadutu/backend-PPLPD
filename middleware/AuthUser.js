import Admin from "../models/Adminmodels.js";
import Atlet from "../models/Atletmodels.js";
import Pelatih from "../models/Pelatihmodels.js";
import SuperAdmin from "../models/SuperAdmin.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
  }

  let user = null;

  const admin = await Admin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  const superAdmin = await SuperAdmin.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  const atlet = await Atlet.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  const pelatih = await Pelatih.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  if (admin) {
    user = admin;
  } else if (superAdmin) {
    user = superAdmin;
  } else if (atlet) {
    user = atlet;
  } else if (pelatih) {
    user = pelatih;
  }

  if (!user) return res.status(404).json({ msg: "Akses terlarang" });

  // Tentukan ID berdasarkan rolenya
  let userId = null;
  if (user.id_admin) {
    userId = user.id_admin;
  } else if (user.id_Super) {
    userId = user.id_Super;
  } else if (user.id_atlet) {
    userId = user.id_atlet;
  } else if (user.id_pelatih) {
    userId = user.id_pelatih;
  }

  req.userId = userId;
  req.role = user.role;
  req.id_admin = user.id_admin;
  req.id_Super = user.id_Super;
  req.id_atlet = user.id_atlet;
  req.id_pelatih = user.id_pelatih;
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
