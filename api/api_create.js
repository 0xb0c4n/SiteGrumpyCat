const express = require('express');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const csvParser = require('csv-parser');

const app = express();
const port = 3000;

// Utiliser le middleware CORS
app.use(cors());

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Configuration du CSV Writer
const getCsvWriter = () => createCsvWriter({
    path: 'data.csv',
    header: [
        { id: 'rotation', title: 'ROTATION' },
        { id: 'elem1', title: 'ELEM1' },
        { id: 'elem2', title: 'ELEM2' },
        { id: 'elem3', title: 'ELEM3' },
        { id: 'elem4', title: 'ELEM4' },
        { id: 'elem5', title: 'ELEM5' },
        { id: 'elem6', title: 'ELEM6' },
        { id: 'elem7', title: 'ELEM7' },
        { id: 'elem8', title: 'ELEM8' }
    ]
});

// Route pour recevoir les données et écrire dans le CSV
app.post('/add-data', async (req, res) => {
    const data = req.body;

    // Validation de la requête
    if (!data.rotation || !data.elem1 || !data.elem2 || !data.elem3 || !data.elem4 || !data.elem5 || !data.elem6 || !data.elem7 || !data.elem8) {
        return res.status(400).send('Missing required fields: rotation, elem1, elem2, elem3, elem4, elem5, elem6, elem7, elem8');
    }

    try {
        // Supprimer l'ancien fichier CSV si existe
        if (fs.existsSync('data.csv')) {
            fs.unlinkSync('data.csv');
        }

        // Créer un nouvel écrivain de CSV
        const csvWriter = getCsvWriter();

        // Écriture des données dans le fichier CSV
        await csvWriter.writeRecords([data]);
        res.status(200).send('Data written to CSV successfully');
    } catch (error) {
        console.error('Error writing to CSV:', error);
        res.status(500).send('Error writing to CSV');
    }
});

app.get('/read-data', (req, res) => {
    const results = [];

    fs.createReadStream('data.csv')
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).send('Error reading CSV');
        });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
