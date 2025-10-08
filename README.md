## Vaasan Eläinsuoja - Adoptiosovellus

Digitaalinen ratkaisu eläinten adoptiohakemusten helpottamiseksi.

## 📋 Kuvaus

Web-sovellus, jossa käyttäjät voivat:
- Tutustua adoptoitaviin eläimiin
- Lukea eläinten tiedot
- Jättää adoptiohakemuksen sähköisesti
- Saada välittömän vahvistuksen

## 🔧 Teknologiat

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Tietokanta:** PostgreSQL
- **DevOps:** Docker + Docker Compose

## 🚀 Asennus ja käynnistys

### Vaatimukset
- Docker Desktop
- Git

### Kloonaa ja käynnistä
```bash
git clone https://github.com/2302304/vaasan-elainsuoja.git
cd vaasan-elainsuoja
docker-compose up --build

Avaa selaimessa: http://localhost:5173/
Sammutus
# Pysäytä palvelut
Ctrl + C

# TAI komentorivillä
docker-compose down

Tietokannan nollaus
Jos haluat aloittaa puhtaalta pöydältä (kaikki eläimet takaisin saataville):
docker-compose down -v
docker-compose up --build

🐳 Portit
PalveluPorttiFrontend5173Server A3001Server B3002Tietokanta5432
🧪 Testaus
API Endpointit:

GET http://localhost:3001/api/animals - Listaa eläimet
GET http://localhost:3001/api/animals/:id - Yksittäinen eläin
POST http://localhost:3001/api/animals/:id/adopt - Adoptoi

Testidata: 9 eläintä (koirat, kissat, kani, lintu)

📁 Rakenne
vaasan-elainsuoja/
├── frontend/         # React Vite
├── server-a/         # API Gateway
├── server-b/         # Adoptiopalvelin
├── database/         # PostgreSQL init
└── docker-compose.yml

🏗️ Arkkitehtuuri
Frontend (React) → Server A (API) → Server B (Adoption)
                        ↓                  ↓
                   PostgreSQL Database

👨‍💻 Tekijä
Opiskelija - Vaasan Ammattikorkeakoulu                 