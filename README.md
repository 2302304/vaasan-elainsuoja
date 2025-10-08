markdown# Vaasan Eläinsuoja - Adoptiosovellus

Digitaalinen ratkaisu eläinten adoptiohakemusten helpottamiseksi.

## 📋 Projektin kuvaus

Web-sovellus, jossa käyttäjät voivat:
- Tutustua adoptoitaviin eläimiin verkossa
- Lukea yksityiskohtaiset tiedot eläimistä
- Jättää adoptiohakemuksen sähköisesti
- Saada välittömän vahvistuksen hakemuksestaan

## 🏗️ Teknologiat

**Frontend:**
- React 18 (Vite)
- React Router
- Axios

**Backend:**
- Node.js + Express
- PostgreSQL 15
- REST API

**DevOps:**
- Docker & Docker Compose
- Multi-container architecture

## 📁 Projektin rakenne
vaasan-elainsuoja/
├── frontend/          # React Vite käyttöliittymä
├── server-a/          # Pääpalvelin (API Gateway)
├── server-b/          # Adoptiopalvelin
├── database/          # PostgreSQL alustustiedostot
└── docker-compose.yml # Orkestrointi

## 🔧 Vaatimukset

- **Docker Desktop** (v20.10 tai uudempi)
- **Git**
- Vapaat portit: 5432, 3001, 3002, 5173

## 🚀 Asennusohjeet

### 1. Kloonaa repositorio
```bash
git clone https://github.com/2302304/vaasan-elainsuoja.git
cd vaasan-elainsuoja
2. Käynnistä sovellus Dockerilla
Ensimmäinen käynnistys (tai jos haluat puhtaan tietokannan):
bashdocker-compose up --build
Normaali käynnistys (nopea, säilyttää tietokannan tilan):
bashdocker-compose up
3. Avaa sovellus selaimessa
Sovellus käynnistyy osoitteessa: http://localhost:5173/
4. Sammuta sovellus
Paina terminaalissa Ctrl + C tai aja:
bashdocker-compose down
🔄 Tietokannan nollaus
Jos haluat nollata tietokannan (kaikki eläimet takaisin "saatavilla" -tilaan):
bashdocker-compose down -v
docker-compose up --build
-v lippu poistaa tietokannan volumen, jolloin data alustetaan uudelleen.
🧪 Testaus
API Endpointit (voi testata Postmanilla)
Server A (API Gateway):

GET http://localhost:3001/api/animals - Hae kaikki eläimet
GET http://localhost:3001/api/animals/:id - Hae yksittäinen eläin
POST http://localhost:3001/api/animals/:id/adopt - Adoptoi eläin

Server B (Adoptiopalvelin):

POST http://localhost:3002/api/adoptions - Käsittele adoptiohakemus

Testidata
Tietokanta alustetaan automaattisesti 9 eläimellä:

5 koiraa (Musti, Rex, Bella, Max + 1)
3 kissaa (Mirri, Kisu, Luna)
1 kani (Pupu)
1 lintu (Pikku)

📊 Arkkitehtuuri
┌─────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend  │─────▶│   Server A   │─────▶│   Server B   │
│  (React)    │      │ (API Gateway)│      │  (Adoption)  │
└─────────────┘      └───────┬──────┘      └───────┬──────┘
                             │                     │
                             ▼                     ▼
                      ┌─────────────────────────────┐
                      │   PostgreSQL Database       │
                      └─────────────────────────────┘
🐳 Docker Services
Sovellus koostuu 4 kontista:
ServicePortKuvausfrontend5173React Vite dev-serveriserver-a3001Pääpalvelin (API Gateway)server-b3002Adoptiopalvelindatabase5432PostgreSQL tietokanta
👨‍💻 Kehittäjälle
Paikallinen kehitys (ilman Dockeria)
Tietokanta:
bashdocker-compose up database -d
Server A:
bashcd server-a
npm install
npm start
Server B:
bashcd server-b
npm install
npm start
Frontend:
bashcd frontend
npm install
npm run dev
📝 Tekijä
Opiskelija - Vaasan Ammattikorkeakoulu
Harjoitustyö - Web-palvelujen toteutus
📄 Lisenssi
MIT