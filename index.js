import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AdminRoute from "./routes/AdminRoute.js";
import AtletRoute from "./routes/AtletRoute.js";
import PelatihRoute from "./routes/PelatihRoute.js";
import CaborRoute from "./routes/CaborRoute.js";
import atletCaborRoute from "./routes/AtletcaborRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

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
app.use(express.json());
app.use(AdminRoute);
app.use(AtletRoute);
app.use(PelatihRoute);
app.use(CaborRoute);
app.use(atletCaborRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server Berjalan Dengan Baik');
});
