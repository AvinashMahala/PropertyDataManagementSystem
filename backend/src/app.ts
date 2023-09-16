import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/ValidateEnvUtil";
import MongoStore  from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import cors from "cors";

import notesRoutes from "./routes/NotesRoutes";
import userRoutes from "./routes/UsersRoutes";
import ownerDetailsRoutes from "./routes/OwnersRoutes";
import rentReceiptMetaDataDetailsRoutes from "./routes/PaymentMetaDataRoutes";
import propertyRoutes from "./routes/PropertiesRoutes";
import flatRoutes from "./routes/FlatsRoutes";
import tenantRoutes from "./routes/TenantsRoutes";
import allRentDetailsRoutes from "./routes/RentalRecordsRoutes";
import allMaintenanceDetailsRoutes from "./routes/MaintenanceRequestsRoutes";

const app = express();

app.use(morgan("dev"));

//middleware
const corsOption={
    origin:"https://pdms-website-client.onrender.com",
}

app.use(express.json());
app.use(cors(corsOption));

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60 * 60 * 1000, 
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}));


app.use("/api/users", userRoutes);
app.use("/api/ownerDetails", requiresAuth, ownerDetailsRoutes);
app.use("/api/rentReceiptMetaDataDetails",requiresAuth, rentReceiptMetaDataDetailsRoutes);
app.use("/api/properties",requiresAuth, propertyRoutes);
app.use("/api/flats",requiresAuth, flatRoutes);
app.use("/api/tenants",requiresAuth, tenantRoutes);
app.use("/api/rent",requiresAuth, allRentDetailsRoutes);
app.use("/api/maintenanceRequest",requiresAuth, allMaintenanceDetailsRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

app.use((req, res, next)=>{
    next(createHttpError(404,"Endpoint not Found!!"));
});


// app.use((error:unknown, req:Request, res:Response, next:NextFunction)=>{
//     //console.log(error);
//     let errorMessage="An Unknown Error Occurred!";
//     let statusCode=500;
//     if(isHttpError(error)){
//         statusCode=error.status;
//         errorMessage=error.message;
//     }
//     res.status(statusCode).json({error: errorMessage});
// });

export default app;