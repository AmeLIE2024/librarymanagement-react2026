# Library Management - React

Petit projet React utilisé comme support pédagogique pour l'apprentissage des tests unitaires avec Vitest.

## Prérequis

Utilise une version récente de Node compatible avec le projet.

Installe les dépendances :

```bash
npm install
```

Puis démarre l'application :

```bash
npm start
```

L'application est disponible sur `http://localhost:4200`.

## Tests unitaires

Le projet utilise Vitest :

```bash
npm test
```

Pour lancer les tests une seule fois :

```bash
npm run test:run
```

React Testing Library est également installé pour permettre de tester les composants du point de vue de l'utilisateur.

## Important pour l'exercice

La logique de gestion des livres et le formulaire contiennent volontairement plusieurs comportements incorrects ou validations manquantes.

Ces défauts font partie de l'exercice. Ils doivent être mis en évidence par des tests avant d'être corrigés.
