# Hono 🔥- Mongoose - Ts

_Copy .env.example to a .env file_
  

-  `npm install`
-  `npm run dev`

# Modelisation DB

Pour la modélisation des collections "flippers" et "marques" en utilisant les données du site lyon-flipper.com, voici comment j'ai pris mes décisions 

## Screenshots :

Pour visualiser les données des collections sur mongo db : cf dossier screenshots (à la racine).

## Collection flippers

```js
{
  "_id": "",
  "nom": "",
  "marque": "",
  "annee_sortie": ,
  "description": "",
  "prix": ,
  "etat": "",
  "photos": []
}
```

**Justification :**

Nom et marque: Ce sont des données de base nécessaires pour identifier et organiser les informations sur les flippers.

Année de sortie: Utile pour comprendre l'évolution des modèles et pour les recherches historiques.

Description et photos: Importants pour offrir une vue d'ensemble du flipper.

Prix et état: Informations que les acheteurs (qui peuvent être des collectionneurs potentiels), influençant leur décision d'achat.

## Collection marques

```js
{
  "_id": "",
  "nom": "",
  "pays_origine": "",
  "annee_fondation": ,
  "histoire": ""
}
```     

**Justification :**

Nom et pays d'origine: Ces informations sont essentielles pour identifier la marque et comprendre sa provenance.

Année de fondation et histoire: Ils fournissent un contexte, permettant aux utilisateurs de comprendre les valeurs de la marque et l'ancienneté.


# Optimisation

Pour optimiser les recherche, il peut être intéressant d'ajouter un index sur le nom des flippers :

```db.flippers.createIndex({ nom: "text" });```

Pour accélérer la présentation des flippers on peut utiliser un système de pagination :

```db.flippers.find({}).sort({ date_ajout: -1 }).limit(10).skip(0);```