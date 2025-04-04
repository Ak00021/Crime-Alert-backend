const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(cors());

//importing api routes
const userApi = require('./API/UserApi');
const policeApi = require('./API/PolicApi');
const crimeApi = require('./API/CrimeApi');

app.use('/user-api',userApi);
app.use('/police-api',policeApi);   
app.use('/crime-api',crimeApi);

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message); // Log the error stack for debugging
    res.status(400).send({ message: "error occured", payload: err.message })
});

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

