import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import mpesaRouter from './routers/mpesa.js';

//Allow to use .env file
dotenv.config();

//create an ap
const app = express();
//For the objects passed will be request.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then connect to a local MongoDB instance using the mongoose.connect() function.
// We pass the useNewUrlParser: true, etc. to mongoose.connect() to avoid the DeprecationWarning.
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/rmkecommerce');


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/mp', mpesaRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => {
    res.send("Server is ready");
});

//this will capture all the errors
app.use((err, req, res) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000

//Run the server ${} template literal
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
