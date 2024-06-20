import { Request, Response } from 'express';
import MarqueModel, { Marque } from '../models/marques';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const marques: Marque[] = await MarqueModel.find();
    res.status(200).json(marques);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const marque: Marque | null = await MarqueModel.findById(req.params.id);
    if (marque) {
      res.status(200).json(marque);
    } else {
      res.status(404).json({ message: 'Marque not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { nom, pays_origine, annee_fondation, histoire } = req.body;

  const marque: Marque = new MarqueModel({
    nom,
    pays_origine,
    annee_fondation,
    histoire
  });

  try {
    const newMarque: Marque = await marque.save();
    res.status(201).json(newMarque);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const marque: Marque | null = await MarqueModel.findById(req.params.id);
    if (marque) {
      marque.nom = req.body.nom || marque.nom;
      marque.pays_origine = req.body.pays_origine || marque.pays_origine;
      marque.annee_fondation = req.body.annee_fondation || marque.annee_fondation;
      marque.histoire = req.body.histoire || marque.histoire;

      const updatedMarque: Marque = await marque.save();
      res.status(200).json(updatedMarque);
    } else {
      res.status(404).json({ message: 'Marque not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const marque: Marque | null = await MarqueModel.findById(req.params.id);
    if (marque) {
      await marque.remove();
      res.status(200).json({ message: 'Marque deleted' });
    } else {
      res.status(404).json({ message: 'Marque not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
