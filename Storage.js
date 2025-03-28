import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const StorageSchema = new Schema({
    conteudo: {
        type: Object,
        //required: true,
    },
    criadoEm: {
        type: Date,
        default: Date.now, 
    },
    atualizadoEm: {
        type: Date,
        default: Date.now, 
    }

});

export default model("Storage", StorageSchema);
