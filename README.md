# KISOTISOTY

Starter mobile-first en mode paysage pour un runner 2D construit avec Vite, TypeScript et Phaser 3.

## Démarrer

```bash
npm install
npm run dev
```

Ouvrir l’adresse réseau affichée par Vite sur un téléphone connecté au même Wi-Fi.

## Commandes

- Tourner le téléphone Android en mode paysage
- Toucher l’écran, `Espace` ou `↑` : commencer / sauter
- Toucher après une collision : recommencer
- Ajouter `?debug` à l’URL : afficher les hitboxes en développement

## Structure

- `src/scenes/BootScene.ts` : textures temporaires et chargement initial
- `src/scenes/TravelScene.ts` : gameplay du runner
- `src/main.ts` : configuration Phaser et mise à l’échelle mobile

Les formes générées dans `BootScene` servent de placeholders : elles pourront être remplacées par les futurs sprites sans changer l’architecture.
