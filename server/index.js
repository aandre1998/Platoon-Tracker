import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import soldierRoutes from './routes/soldier.js';
import equipmentRoutes from './routes/equipment.js';
import sectionRoutes from './routes/section.js';

const app = express();

app.use(bodyParser.json({limit: "20mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "20mb", extended: true}));

app.use(cors());
app.use('/soldiers', soldierRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/sections', sectionRoutes);

const CONNECTION_URL = 'mongodb+srv://platoonleader:1234@mycluster.4kjzt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL).then(() => app.listen(PORT, ()=>
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));