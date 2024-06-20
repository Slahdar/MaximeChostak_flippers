import { Document, Schema, model } from 'mongoose';

interface Flipper extends Document {
    nom: string;
    marque: string;
    annee_sortie: number;
    description?: string;
    prix?: number;
    etat: 'neuf' | 'occasion';
    photos?: string[];
}

const flipperSchema = new Schema({
    nom: { type: String, required: true },
    marque: { type: String, required: true },
    annee_sortie: { type: Number, required: true },
    description: { type: String },
    prix: { type: Number },
    etat: { type: String, enum: ['neuf', 'occasion'], required: true },
    photos: { type: [String] }  // Ajout du champ photos
});

export default model<Flipper>('Flipper', flipperSchema);
