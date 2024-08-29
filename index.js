require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRouter =require('./route/user.route');
const productRouter =require('./route/product.route');
const connection = require('./config/db')


app.use(express.json());
app.use(cors({
    origin:'*'
}));

app.get('/',(req,res)=>{
    return res.send('Server is Fine')
});

app.use('/user',userRouter);
app.use('/product',productRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`server is live and connected to port ${process.env.PORT}`)
    } catch (error) {
        console.log(`Error occured connecting to server ${error.message}`)
    }
})