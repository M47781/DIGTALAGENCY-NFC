# Digital Agency NFC — Landing Page

Landing page React + Vite pour vendre les cartes NFC Digital Agency.

## Fonctionnalités
- Deux modèles : carte normale (2 200 DA) et personnalisée (2 800 DA).
- Sélecteur FR / AR.
- Formulaire de commande avec quantité et total estimé.
- Envoi des détails de commande vers WhatsApp.
- FAQ, présentation produit et responsive mobile / desktop.

## Installation
Prérequis : Node.js 18+.

```bash
npm install
npm run dev
```

Ouvrir l'adresse locale affichée par Vite.

## Production
```bash
npm run build
npm run preview
```

Le site statique compilé se trouve dans `dist/`.

## Personnalisation
- Numéro WhatsApp : `WHATSAPP` dans `src/App.jsx`, format international sans `+`.
- Prix et traductions : objet `copy` dans `src/App.jsx`.
- Identité visuelle : variables CSS en haut de `src/styles.css`.
- Les cartes affichées sont des mockups CSS. Remplacez `CardVisual` par vos visuels produits définitifs quand ils seront disponibles.

## Important
Le formulaire ouvre WhatsApp avec un message prérempli. Il n'enregistre pas les commandes dans une base de données et ne traite aucun paiement en ligne. Pour sauvegarder les commandes, connecter ensuite Supabase ou un backend.
