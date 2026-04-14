# AirGap - Vos finances ne regardent que vous.

Une application web open-source et complète pour gérer vos finances personnelles, développée avec NuxtJs, DrizzleORM, PostgreSQL.

## 🚀 Fonctionnalités

### Gestion Financière Complète
- **Tableau de bord interactif** avec visualisations en temps réel
- **Gestion budgétaire** avec suivi des dépenses par catégorie
- **Suivi des transactions** avec catégorisation automatique

### Technologies Utilisées
- **Frontend**: NuxtJs, Vue 3, TailwindCSS, Shadcn
- **Backend**: DrizzleORM, PostgreSQL
- **Visualisations**: Unovis
- **Conteneurisation**: Docker & Docker Compose

### Interface Moderne
- Design épuré et professionnel
- Tableau de bord interactif avec graphiques
- Modales pour l'ajout rapide de données
- Responsive design
- Animations fluides

## 📦 Installation

### Prérequis
- Docker et Docker Compose
- Node.js 18+ (pour le développement local)
- PostgreSQL 15+

### Installation Rapide avec Docker

1. **Cloner le repository**
```bash
git clone https://github.com/qldwin/airgap.git
cd airgap
```

2. **Configurer les variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

3. **Lancer l'application avec Docker Compose**
```bash
docker compose up -d
```

4. **Accéder à l'application**
- Application principale: http://localhost:3000
- Base de données: localhost:5432

### Installation pour le Développement

1. **Installer les dépendances**
```bash
npm install
```

2. **Configurer la base de données**

**Nécessite la variable DATABASE_URL dans .env**

```bash
npx drizzle-kit migrate
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

## 🏗️ Architecture du Projet

```
airgap/
├── server/             # API côté serveur
├── app/                # Fichiers de l'app
      ├── pages/        # Pages de l'app
      ├── assets/       # Fichiers styles
      └── components/   # Composants Vue réutilisables
├── public/             # Fichiers statiques
├── docker-compose.yml  # Configuration Docker
├── Dockerfile          # Composants Vue réutilisables
├── package.json        # Dépendances du projet
├── package-lock.json   # Dépendances du projet
├── nuxt.config.js      # Configuration de Nuxt
├── drizzle.config.ts   # Configuration de Drizzle
└── README.md           # Documentation
```

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Database
NUXT_DATABASE_URL=postgresql://airgap_user:airgap_password@localhost:5432/airgap

```
## 📊 Base de Données

### Schéma

La base de données inclut les tables suivantes :
- `users` - Utilisateurs
- `accounts` - Comptes bancaires
- `categories` - Catégories de transactions
- `transactions` - Transactions financières
- `budgets` - Budgets mensuels
- `recurrences` - Gestion des transactions récurrentes
 
### Migration

```bash
# Générer une nouvelle migration
npx drizzle-kit generate

# Exécuter les migrations
npx drizzle-kit migrate

# Ouvrir le studio Drizzle
npx drizzle-kit studio
```

## 🎯 Utilisation

### Première Connexion

1. **Créer un compte utilisateur**
2. **Configurer vos catégories de dépenses**
3. **Définir vos budgets mensuels**

### Fonctionnalités Principales

#### Tableau de Bord
- Vue d'ensemble des finances
- Graphiques de tendances

#### Gestion Budgétaire
- Création de budgets par catégorie
- Suivi en temps réel des dépenses

## 🔒 Sécurité

- Authentification utilisateur
- Validation des entrées côté serveur
- Protection CSRF
- Sessions sécurisées
- Cryptage des données (protocole AES-GCM 256)

## 📱 Responsive Design

L'application est entièrement responsive et fonctionne sur :
- Desktop (1920px+)
- Tablette (768px - 1024px)
- Mobile (320px - 768px)

## 📄 Licence

Ce projet est sous licence AGPLv3. Voir le fichier LICENSE pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la documentation
- Contactez l'équipe de support sur discord

---

**AirGap** - Vos finances ne regardent que vous.
