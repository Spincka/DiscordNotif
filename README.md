## 🌸 DiscordNotif – Karuta Timer

Un workflow GitHub Actions qui te rappelle automatiquement de taper ta commande Karuta toutes les 35 minutes, avec un GIF kawaii, un texte sympa et une pause automatique entre minuit et 9h.
https://github.com/Spincka/DiscordNotif/blob/main/README.md
Tout est 100 % automatique, aucun serveur ni bot à faire tourner.

## 📂 Arborescence du projet

DiscordNotif/
├─ .github/
│  └─ workflows/
│     └─ notify.yml        # Workflow GitHub Actions pour notifications
├─ assets/
│  └─ mwa.gif              # GIF kawaii envoyé dans les notifications
└─ README.md

## ⚙️ Fonctionnement

GitHub Actions se déclenche toutes les 35 minutes.

Vérifie l’heure locale (UTC+2).

Si entre 00h00 et 09h00, la notification n’est pas envoyée.

Sinon, envoie la notification Discord.

## Notification Discord :

GIF kawaii assets/mwa.gif

Message : “Il est temps de farmer tes cartes, Senpai ! ✨”

Petit rappel pour taper ta commande Karuta

Tout se fait sans action manuelle.

## 🛠️ Installation

Crée un webhook Discord pour le channel où tu veux recevoir les notifications.

Ajoute le webhook dans les Secrets GitHub du repo :

Nom : DISCORD_WEBHOOK_URL

Valeur : URL de ton webhook Discord

## 📄 Fichier Workflow

Le fichier .github/workflows/notify.yml est déjà configuré pour :

Envoyer les notifications toutes les 35 min

Ajouter GIF + embed + texte

Pauser automatiquement les notifications de 00h00 à 09h00

## 🎨 Personnalisation

GIF : change assets/mwa.gif par ton GIF préféré

Texte de la notification : modifie la variable DESC dans le workflow

Fuseau horaire : actuellement réglé sur UTC+2. Pour un autre fuseau, modifie la partie HOUR=$((HOUR + 2)) dans le workflow.
