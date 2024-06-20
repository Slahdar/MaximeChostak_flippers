import { Request, Response } from 'express';
import FlipperModel, { Flipper } from '../models/flippers';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage: storage });

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const flippers: Flipper[] = await FlipperModel.find();
    res.status(200).json(flippers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const flipper: Flipper | null = await FlipperModel.findById(req.params.id);
    if (flipper) {
      res.status(200).json(flipper);
    } else {
      res.status(404).json({ message: 'Flipper not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { nom, marque, annee_sortie, description, prix, etat } = req.body;

  const flipper: Flipper = new FlipperModel({
    nom,
    marque,
    annee_sortie,
    description,
    prix,
    etat,
    photos: req.files ? req.files.map((file: Express.Multer.File) => file.filename) : []
  });

  try {
    const newFlipper: Flipper = await flipper.save();
    res.status(201).json(newFlipper);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const flipper: Flipper | null = await FlipperModel.findById(req.params.id);
    if (flipper) {
      flipper.nom = req.body.nom || flipper.nom;
      flipper.marque = req.body.marque || flipper.marque;
      flipper.annee_sortie = req.body.annee_sortie || flipper.annee_sortie;
      flipper.description = req.body.description || flipper.description;
      flipper.prix = req.body.prix || flipper.prix;
      flipper.etat = req.body.etat || flipper.etat;
      
      if (req.files) {
        // Supprimer les anciennes photos physiquement
        flipper.photos.forEach(photo => {
          const filePath = path.join(__dirname, '../uploads', photo);
          fs.unlinkSync(filePath);
        });
        // Mettre à jour les nouvelles photos
        flipper.photos = req.files.map((file: Express.Multer.File) => file.filename);
      }

      const updatedFlipper: Flipper = await flipper.save();
      res.status(200).json(updatedFlipper);
    } else {
      res.status(404).json({ message: 'Flipper not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const flipper: Flipper | null = await FlipperModel.findById(req.params.id);
    if (flipper) {
      // Supprimer les photos physiquement
      flipper.photos.forEach(photo => {
        const filePath = path.join(__dirname, '../uploads', photo);
        fs.unlinkSync(filePath);
      });

      await flipper.remove();
      res.status(200).json({ message: 'Flipper deleted' });
    } else {
      res.status(404).json({ message: 'Flipper not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
