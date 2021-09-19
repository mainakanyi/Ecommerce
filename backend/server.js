import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
//create an ap
const app = express();

// Then connect to a local MongoDB instance using the mongoose.connect() function.
// We pass the useNewUrlParser: true, etc. to mongoose.connect() to avoid the DeprecationWarning.
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/rmkecommerce');


app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
    res.send("Server is ready");
});

//this will capture all the errors
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000

//Run the server ${} template literal
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});
