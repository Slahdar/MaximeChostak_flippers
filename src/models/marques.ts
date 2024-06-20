import { Document, Schema, model } from 'mongoose';

interface Marque extends Document {
    nom: string;
    pays_origine: string;
    annee_fondation: number;
    histoire?: string;
}

const marqueSchema = new Schema({
    nom: { type: String, required: true },
    pays_origine: { type: String, required: true },
    annee_fondation: { type: Number, required: true },
    histoire: { type: String }
});

export default model<Marque>('Marque', marqueSchema);
