-- Luodaan animals taulu
CREATE TABLE IF NOT EXISTS animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL,
    breed VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    likes INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'available'
);

-- Luodaan adoptions taulu
CREATE TABLE IF NOT EXISTS adoptions (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animals(id),
    applicant_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lisätään esimerkkieläimet
INSERT INTO animals (name, type, age, breed, description, image_url, likes, status) VALUES
('Musti', 'koira', 3, 'Sekarotuinen', 'Iloinen ja leikkisä koira joka rakastaa pitkiä lenkkejä.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400', 15, 'available'),
('Mirri', 'kissa', 2, 'Eurooppalainen', 'Rauhallinen ja hellyttävä kissa, sopii hyvin perheen lemmikin.', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400', 23, 'available'),
('Rex', 'koira', 5, 'Labradorinnoutaja', 'Ystävällinen ja energinen koira. Tarvitsee aktiivisen kodin.', 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', 31, 'available'),
('Kisu', 'kissa', 1, 'Persialainen', 'Nuori ja utelias kissa joka rakastaa leikkiä.', 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400', 8, 'available'),
('Bella', 'koira', 4, 'Golden Retriever', 'Ystävällinen perheen ystävä joka rakastaa lapsia.', 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400', 19, 'available'),
('Pupu', 'kani', 2, 'Hollanninpikkukani', 'Söpö ja rauhallinen kani. Helppohoitoinen lemmikin.', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400', 27, 'available'),
('Pikku', 'lintu', 1, 'Undulaatti', 'Iloinen ja puhelias undulaatti joka osaa sanoa muutaman sanan.', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400', 14, 'available'),
('Luna', 'kissa', 3, 'Siamilainen', 'Sosiaalinen ja äänekäs kissa joka pitää seurasta.', 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400', 22, 'available'),
('Max', 'koira', 6, 'Saksanpaimenkoira', 'Älykäs ja uskollinen koira. Sopii aktiiviselle perheelle.', 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400', 18, 'available');