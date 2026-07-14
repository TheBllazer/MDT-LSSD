# LSSD MDT - Mobile Data Terminal

Système de gestion intégré pour le LSSD (Los Santos Sheriff's Department).

## Fonctionnalités

- **Gestion des Citoyens** : ajouter, modifier, rechercher des citoyens (photo via Firebase Storage)
- **Gestion des Véhicules** : registre complet avec photos et détails
- **Gestion des Armes** : enregistrement et suivi des armes
- **Rapports d'intervention** : création, éditeur de texte riche, suspect lié au registre des citoyens, workflow de validation par un gradé, export PDF
- **Gestion des Agents** : grades gérés uniquement par les gradés (Sergent et au-dessus)
- **Enquêtes** : suivi avec priorités et statuts
- **Groupes illégaux** : documentation des gangs, territoire revendiqué
- **Notifications** : les gradés sont notifiés en temps réel quand un rapport attend validation

Les suppressions (citoyens, véhicules, armes, enquêtes, groupes, agents, rapports) sont réservées aux gradés, à la fois côté interface et côté règles Firestore.

## Installation

```bash
npm install
```

## Configuration Firebase

1. Créer un projet Firebase (Authentification par email/mot de passe + Firestore + Storage).
2. Copier `.env.example` vers `.env` et compléter avec tes identifiants Firebase.
3. Définir `REACT_APP_SIGNUP_CODE` : un code que tu communiques toi-même aux agents pour qu'ils puissent créer un compte. Sans ce code, n'importe qui pourrait s'inscrire sur le MDT.
4. Déployer les règles de sécurité (Firestore + Storage), sinon la base reste inutilisable ou grande ouverte :

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage:rules
```

Vérifie l'ID de projet dans `.firebaserc` avant de déployer.

> Note Firestore : la requête de notifications utilise un index composite
> (`targetGraded` + `read` + `createdAt`). Au premier lancement, Firestore
> affichera dans la console une erreur avec un lien direct pour créer cet
> index automatiquement — clique dessus, ça prend quelques secondes.

## Icônes personnalisées

L'icône du module "Agents" utilise ton propre asset : remplace
`src/assets/icons/badge.svg` par ton fichier (garde le même nom). Un
placeholder simple est fourni pour que le projet compile en attendant.

## Domaine personnalisé

Le fichier `CNAME` pointe vers `lssd.thebllazer.fr`. Le routeur (`App.js`)
et `homepage` dans `package.json` sont configurés pour être servis à la
racine de ce domaine — ne remets pas de `basename` dans le `<Router>` sauf
si tu repasses sur `https://thebllazer.github.io/LSSD`.

## Démarrage

```bash
npm start
```

## Build

```bash
npm run build
```

## Déploiement

```bash
npm run deploy
```

## Technologie

- React 18
- Firebase (Auth + Firestore + Storage)
- React Router v6
- Lucide Icons
- React Quill (éditeur de texte riche)
- jsPDF (export PDF)

## Licence

LSSD MDT © 2026
