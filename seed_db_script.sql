-- ============================================
-- AnemosParts Test Database Seed Script
-- ============================================
-- Purpose: Drop/recreate tables and seed test data
-- Database: webstore_test
-- ============================================

USE webstore_test;

-- ============================================
-- 1. DROP EXISTING TABLES (in correct order due to foreign keys)
-- ============================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS part_images;
DROP TABLE IF EXISTS part_model;
DROP TABLE IF EXISTS oemnumber_model;
DROP TABLE IF EXISTS part_transactions;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS parts;
DROP TABLE IF EXISTS oem_numbers;
DROP TABLE IF EXISTS models;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS accounts;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- 2. CREATE TABLES
-- ============================================

CREATE TABLE brands (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL UNIQUE,
                        icon_url VARCHAR(500)
);

CREATE TABLE models (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(100) NOT NULL,
                        production_year INT NOT NULL,
                        brand BIGINT NOT NULL,
                        FOREIGN KEY (brand) REFERENCES brands(id) ON DELETE CASCADE
);

CREATE TABLE oem_numbers (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             number VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE parts (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       description VARCHAR(500) NOT NULL,
                       price DECIMAL(10,2) DEFAULT 10.00,
                       oem_number BIGINT,
                       part_number VARCHAR(20) NOT NULL,
                       quantity INT NOT NULL DEFAULT 1,
                       FOREIGN KEY (oem_number) REFERENCES oem_numbers(id) ON DELETE SET NULL
);

CREATE TABLE part_images (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                             source VARCHAR(500) NOT NULL,
                             is_thumbnail BOOLEAN DEFAULT FALSE,
                             part_id BIGINT NOT NULL,
                             FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE
);

CREATE TABLE part_model (
                            part_id BIGINT NOT NULL,
                            model_id BIGINT NOT NULL,
                            PRIMARY KEY (part_id, model_id),
                            FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE,
                            FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
);

CREATE TABLE oemnumber_model (
                                 oem_number_id BIGINT NOT NULL,
                                 model_id BIGINT NOT NULL,
                                 PRIMARY KEY (oem_number_id, model_id),
                                 FOREIGN KEY (oem_number_id) REFERENCES oem_numbers(id) ON DELETE CASCADE,
                                 FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
);

CREATE TABLE accounts (
                          uuid VARCHAR(36) PRIMARY KEY,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password VARCHAR(255),
                          forename VARCHAR(100),
                          surname VARCHAR(100),
                          birthday DATE,
                          role VARCHAR(20) DEFAULT 'CUSTOMER'
);

CREATE TABLE addresses (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           account_uuid VARCHAR(36) NOT NULL,
                           forename VARCHAR(100) NOT NULL,
                           surname VARCHAR(100) NOT NULL,
                           extras VARCHAR(255),
                           house_number VARCHAR(20) NOT NULL,
                           street VARCHAR(255) NOT NULL,
                           city VARCHAR(100) NOT NULL,
                           state VARCHAR(100),
                           postal_code VARCHAR(20) NOT NULL,
                           country VARCHAR(100) NOT NULL,
                           FOREIGN KEY (account_uuid) REFERENCES accounts(uuid) ON DELETE CASCADE
);

CREATE TABLE orders (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        account_uuid VARCHAR(36) NOT NULL,
                        shipping_address_id BIGINT NOT NULL,
                        order_status VARCHAR(50) DEFAULT 'PAID',
                        payment_reference VARCHAR(255) NOT NULL,
                        tracking_code VARCHAR(100),
                        total DECIMAL(10,2) NOT NULL,
                        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (account_uuid) REFERENCES accounts(uuid),
                        FOREIGN KEY (shipping_address_id) REFERENCES addresses(id)
);

CREATE TABLE part_transactions (
                                   id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                   part_id BIGINT NOT NULL,
                                   order_id BIGINT,
                                   quantity BIGINT NOT NULL,
                                   status VARCHAR(50) DEFAULT 'COMPLETED',
                                   FOREIGN KEY (part_id) REFERENCES parts(id),
                                   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- ============================================
-- 3. SEED TEST DATA
-- ============================================

-- Brands
INSERT INTO brands (id, name, icon_url) VALUES
                                            (1, 'Yamaha', 'http://localhost:8080/api/resources/images/yamaha-icon.png'),
                                            (2, 'Honda', 'http://localhost:8080/api/resources/images/honda-icon.png'),
                                            (3, 'Suzuki', 'http://localhost:8080/api/resources/images/suzuki-icon.png');

-- Models
INSERT INTO models (id, name, production_year, brand) VALUES
                                                          (1, 'YZF-R6', 2020, 1),
                                                          (2, 'MT-07', 2021, 1),
                                                          (3, 'CBR600RR', 2019, 2),
                                                          (4, 'CB500X', 2022, 2),
                                                          (5, 'GSX-R750', 2020, 3);

-- OEM Numbers
INSERT INTO oem_numbers (id, number) VALUES
                                         (1, 'YAM-12345-001'),
                                         (2, 'HON-67890-002'),
                                         (3, 'SUZ-11223-003');

-- Parts (10 test parts with varying prices and quantities)
INSERT INTO parts (id, name, description, price, oem_number, part_number, quantity) VALUES
                                                                                        (1, 'Front Brake Pads', 'High-performance ceramic brake pads for sport bikes', 45.99, 1, 'BP-FRONT-001', 5),
                                                                                        (2, 'Engine Oil Filter', 'OEM replacement oil filter', 12.50, NULL, 'OF-123', 10),
                                                                                        (3, 'Chain and Sprocket Kit', 'Complete drive chain kit with front and rear sprockets', 189.99, 2, 'CSK-456', 3),
                                                                                        (4, 'Air Filter', 'High-flow performance air filter', 35.00, NULL, 'AF-789', 8),
                                                                                        (5, 'Clutch Cable', 'Stainless steel braided clutch cable', 22.99, NULL, 'CC-321', 6),
                                                                                        (6, 'Spark Plugs (Set of 4)', 'Iridium spark plugs', 28.50, 3, 'SP-654', 12),
                                                                                        (7, 'Rear Shock Absorber', 'Adjustable rear suspension shock', 275.00, NULL, 'RSA-987', 2),
                                                                                        (8, 'Headlight Assembly', 'Complete LED headlight assembly', 158.99, 1, 'HL-111', 4),
                                                                                        (9, 'Throttle Grip Set', 'Ergonomic throttle grip pair', 18.75, NULL, 'TG-222', 15),
                                                                                        (10, 'Fuel Pump', 'High-pressure fuel pump assembly', 120.00, 2, 'FP-333', 3);

-- Part Images
INSERT INTO part_images (source, is_thumbnail, part_id) VALUES
-- Part 1 images
('http://localhost:8080/api/resources/images/brake-pads-1.jpg', TRUE, 1),
('http://localhost:8080/api/resources/images/brake-pads-2.jpg', FALSE, 1),
-- Part 2 images
('http://localhost:8080/api/resources/images/oil-filter-1.jpg', TRUE, 2),
-- Part 3 images
('http://localhost:8080/api/resources/images/chain-kit-1.jpg', TRUE, 3),
('http://localhost:8080/api/resources/images/chain-kit-2.jpg', FALSE, 3),
('http://localhost:8080/api/resources/images/chain-kit-3.jpg', FALSE, 3),
-- Part 4 images
('http://localhost:8080/api/resources/images/air-filter-1.jpg', TRUE, 4),
-- Part 5 images
('http://localhost:8080/api/resources/images/clutch-cable-1.jpg', TRUE, 5),
-- Part 6 images
('http://localhost:8080/api/resources/images/spark-plugs-1.jpg', TRUE, 6),
-- Part 7 images
('http://localhost:8080/api/resources/images/shock-1.jpg', TRUE, 7),
-- Part 8 images
('http://localhost:8080/api/resources/images/headlight-1.jpg', TRUE, 8),
('http://localhost:8080/api/resources/images/headlight-2.jpg', FALSE, 8),
-- Part 9 images
('http://localhost:8080/api/resources/images/throttle-grip-1.jpg', TRUE, 9),
-- Part 10 images
('http://localhost:8080/api/resources/images/fuel-pump-1.jpg', TRUE, 10);

-- Part-Model Relationships
INSERT INTO part_model (part_id, model_id) VALUES
-- Brake pads fit Yamaha models
(1, 1), (1, 2),
-- Oil filter fits all models
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
-- Chain kit fits sport bikes
(3, 1), (3, 3), (3, 5),
-- Air filter fits various models
(4, 2), (4, 4),
-- Clutch cable fits specific models
(5, 1), (5, 3),
-- Spark plugs fit all
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5),
-- Rear shock fits sport bikes
(7, 1), (7, 3), (7, 5),
-- Headlight fits Yamaha
(8, 1), (8, 2),
-- Throttle grips fit all
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5),
-- Fuel pump fits Honda
(10, 3), (10, 4);

-- Test Accounts
-- Password for both: Gg#5631h (BCrypt hashed)
-- Admin: owner@anemosracingparts.com / fMg3e#der563 (BCrypt hashed)
INSERT INTO accounts (uuid, email, password, forename, surname, role) VALUES
                                                                          ('550e8400-e29b-41d4-a716-446655440000', 'test@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Test', 'User', 'CUSTOMER'),
                                                                          ('550e8400-e29b-41d4-a716-446655440001', 'owner@anemosracingparts.com', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KRRqwu', 'Admin', 'Owner', 'ADMIN');

-- Test Addresses
INSERT INTO addresses (account_uuid, forename, surname, house_number, street, city, state, postal_code, country) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Test', 'User', '123', 'Main Street', 'Nicosia', 'Nicosia', '1234', 'Cyprus');

-- Sample Order (for testing order history)
INSERT INTO orders (account_uuid, shipping_address_id, order_status, payment_reference, total, order_date) VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 1, 'DELIVERED', 'cs_test_sample123', 45.99, '2024-01-15 10:30:00');

INSERT INTO part_transactions (part_id, order_id, quantity, status) VALUES
    (1, 1, 1, 'COMPLETED');

-- ============================================
-- 4. RESET AUTO_INCREMENT COUNTERS
-- ============================================

ALTER TABLE brands AUTO_INCREMENT = 4;
ALTER TABLE models AUTO_INCREMENT = 6;
ALTER TABLE oem_numbers AUTO_INCREMENT = 4;
ALTER TABLE parts AUTO_INCREMENT = 11;
ALTER TABLE part_images AUTO_INCREMENT = 100;
ALTER TABLE addresses AUTO_INCREMENT = 2;
ALTER TABLE orders AUTO_INCREMENT = 2;
ALTER TABLE part_transactions AUTO_INCREMENT = 2;

-- ============================================
-- 5. VERIFY SEED DATA
-- ============================================

SELECT 'Brands:' as 'Table', COUNT(*) as 'Count' FROM brands
UNION ALL
SELECT 'Models:', COUNT(*) FROM models
UNION ALL
SELECT 'Parts:', COUNT(*) FROM parts
UNION ALL
SELECT 'Part Images:', COUNT(*) FROM part_images
UNION ALL
SELECT 'Accounts:', COUNT(*) FROM accounts
UNION ALL
SELECT 'Addresses:', COUNT(*) FROM addresses
UNION ALL
SELECT 'Orders:', COUNT(*) FROM orders;

SELECT 'Test database seeded successfully' as 'Status';