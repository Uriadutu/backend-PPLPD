import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import fileupload from "express-fileupload"
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AdminRoute from "./routes/AdminRoute.js";
import AtletRoute from "./routes/AtletRoute.js";
import PelatihRoute from "./routes/PelatihRoute.js";
import CaborRoute from "./routes/CaborRoute.js";
import atletCaborRoute from "./routes/AtletcaborRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import GambarRoute from "./routes/GambarRoute.js";
import PanduanRoute from "./routes/PanduanRoute.js"
import KomponenRoute from "./routes/PerkembanganRoute/KomponenRoute.js"
import IndikatorRoute from "./routes/PerkembanganRoute/IndikatorRoute.js"
import PerkemRoute from "./routes/PerkembanganRoute/PerkemRoute.js"
import LatihanRoute from "./routes/PerkembanganRoute/LatihanRoute.js"
import BeritaRoute from "./routes/BeritaRoute.js"

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })(); 

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(fileupload());
app.use(express.static("public"));
app.use(express.json());
app.use(AdminRoute);
app.use(AtletRoute);
app.use(PelatihRoute);
app.use(CaborRoute);
app.use(atletCaborRoute);
app.use(AuthRoute);
app.use(GambarRoute);
app.use(PanduanRoute);
app.use(IndikatorRoute);
app.use(KomponenRoute);
app.use(PerkemRoute);
app.use(LatihanRoute);
app.use(BeritaRoute);



// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server Aman.. Semangat boleh, Istirahat jangan lupa');
});
