import express from "express";
import connection from "./config/db.js"
import dotenv from "dotenv";
import userRouter  from "./route/user.route.js";
import noteRouter from "./route/note.route.js";
import auth from "./middleware/auth.middleware.js";
import cors from "cors";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3005;
app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use("/user", userRouter);
app.use("/note",auth, noteRouter);

app.get("/",(req,res)=>{
    res.send("server is running fine");
});

app.listen(PORT, async()=>{
    try {
        await connection;
        console.log(`server is running on port ${PORT} and db is also connected`);
    } catch (error) {
        console.log("Error in the server", error);
    }
})