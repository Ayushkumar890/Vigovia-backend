const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'https://vigovia-saas.vercel.app',
    credentials: true 
}));



require('./config/db').connect();


const dataRoute = require('./routes/routes')

app.use('/api/itinerary', dataRoute);

const Port = process.env.PORT || 3001;
app.listen(Port, () => {
    console.log(`server started on port ${Port}`)
})

