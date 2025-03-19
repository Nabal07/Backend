import express, { response } from 'express';
import { connectMongoDb } from './mongodb.js';
import Storage from './Storage.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());

(() => {
    
    connectMongoDb();

    app.post('/api/storage', async (req, res) => {
        try {
            const { conteudo, criadoEm } = req.body;

            let storageData = {
                conteudo,
                criadoEm: new Date()
            };

            storageData = await Storage.create(storageData);

            return res.status(201).json({ status: 201, response: storageData });
            
        } catch (error) {
            return res.status(500).json({ status: 500, message: error });
        }
    });

    app.get('/api/storage/', async (req, res) => {
        try {

            const results = await Storage.find();
            return res.status(200).json({ status: 200, response: results });

        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    });

    app.get('/api/storage/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Storage.findById(id);

            if (!result)
                return res.status(404).json({status: 404, response: `Registro de id ${id} nao encontrado`})

            return res.status(200).json({ status: 200, response: result });

        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    });

    app.put('/api/storage/:id', async (req, res) => {
        try {
            const { status, data } = req.body;
            const { id } = req.params;
            const filter = { _id: id };
            const update = {
                $set: {
                data: data,
                status: status
                },
            };

            let result = await Storage.updateOne(filter, update);

            if (result.acknowledged && result.matchedCount < 1)
                return res.status(404).json({status: 404, response: `Registro de id ${id} nao encontrado`})

            return res.status(200).json({ status: 200, response: result });

        } catch (error) {
            return res.status(500).json({ status: 500, message: 'Internal Server Error' });
        }
    })

    app.delete('/api/storage/:id', async (req, res) => {
        try {

            const { id }= req.params;
            const filter = { _id: id };
            const result = await Storage.deleteOne(filter)

            if (result.acknowledged && result.deletedCount < 1)
                return res.status(404).json({status: 404, response: `Registro de id ${id} nao encontrado`})

            return res.status(200).json({status: 200, response: `Registro de id ${id} deletado`})

        } catch (error) {
            return res.status(500).json({status: 500, message: 'Internal Server Error'});
        }
    })

    app.listen(PORT, () => {
        console.info(`✅ App rodando na porta ${PORT}.`);
    });
})();
