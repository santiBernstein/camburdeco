-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: camburdeco_db
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `forma_entrega` varchar(15) NOT NULL,
  `forma_pago` varchar(15) NOT NULL,
  `user_id` int NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`),
  KEY `fk_carritos_users1_idx` (`user_id`),
  CONSTRAINT `fk_carritos_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,'envio','debito',12),(2,'envio','debito',12);
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'MACETA'),(2,'CENICERO'),(3,'VELA');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'BLANCO'),(2,'CELESTE'),(3,'ROSA'),(4,'GRIS');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `number` int unsigned NOT NULL,
  `profile_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `number_UNIQUE` (`number`),
  KEY `fk_payments_profiles1_idx` (`profile_id`),
  CONSTRAINT `fk_payments_profiles1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'debito',210123456,1);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_carrito`
--

DROP TABLE IF EXISTS `product_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_carrito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `carrito_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_has_carritos_carritos1_idx` (`carrito_id`),
  KEY `fk_products_has_carritos_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_carritos_carritos1` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`),
  CONSTRAINT `fk_products_has_carritos_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_carrito`
--

LOCK TABLES `product_carrito` WRITE;
/*!40000 ALTER TABLE `product_carrito` DISABLE KEYS */;
INSERT INTO `product_carrito` VALUES (1,3,1),(2,6,1);
/*!40000 ALTER TABLE `product_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `color_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_has_colors_colors1_idx` (`color_id`),
  KEY `fk_products_has_colors_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_colors_colors1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `fk_products_has_colors_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,1,3),(2,2,1),(3,2,2),(4,2,3),(5,2,4),(6,3,1),(7,3,2),(8,3,3),(9,3,4),(10,4,1),(11,4,2),(12,4,3),(13,4,4),(14,5,1),(15,5,4),(16,6,1),(17,6,3),(18,6,4),(19,7,1),(20,7,2),(21,7,3),(22,7,4),(23,8,1),(24,8,2),(25,8,3),(26,8,4),(27,9,1),(28,9,2),(29,9,3),(30,9,4);
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_style`
--

DROP TABLE IF EXISTS `product_style`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_style` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `style_id` int NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`),
  KEY `fk_products_has_styles_styles1_idx` (`style_id`),
  KEY `fk_products_has_styles_products1_idx` (`product_id`),
  CONSTRAINT `fk_products_has_styles_products1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_products_has_styles_styles1` FOREIGN KEY (`style_id`) REFERENCES `styles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_style`
--

LOCK TABLES `product_style` WRITE;
/*!40000 ALTER TABLE `product_style` DISABLE KEYS */;
INSERT INTO `product_style` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2),(5,3,1),(6,3,2),(7,3,3),(8,4,1),(9,4,2),(10,4,3),(11,5,1),(12,5,2),(13,6,1),(14,6,2),(15,7,1),(16,7,2),(17,8,1),(18,8,2),(19,8,3),(20,9,1),(21,9,2),(22,9,3);
/*!40000 ALTER TABLE `product_style` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `stock` int unsigned DEFAULT NULL,
  `price` float(9,2) unsigned DEFAULT NULL,
  `img` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `top` int unsigned DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `fk_products_categories1_idx` (`category_id`),
  CONSTRAINT `fk_products_categories1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Cali','Alta maceta',5,400.00,'photo-1605575282313.jpg',1,1),(2,'Bono','Maceta de forma hexagonal de 12cm de altura',8,600.00,'bono.gif',1,1),(3,'Gala Small','Nuestro modelo mas pequeño para tus sucus o cactus',12,300.00,'gala.jpg',1,1),(4,'Gala','Nuestra versión Gala de 9cm',6,400.00,'gala.jpg',1,1),(5,'Flora','Flora es ideal para plantas grandes. Su diseño esta en todos los detalles',15,1000.00,'flora.jpg',0,1),(6,'Tino','Un modelo tradicional, pero que destaca por su calidad',4,450.00,'tino.jpg',1,1),(7,'Gea','Nuestro modelo colgante',7,600.00,'colgante.jpg',1,1),(8,'Cenicero','Nuestros Cenicero',11,300.00,'cenicero.jpg',0,2),(9,'Vela','Nuestras Velas',10,400.00,'velas.jpg',0,3);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Abril','Abril',' ',' ','La Plata','Argentina'),(2,'Kamila','Camil',' ',' ','Bs. As.','Argentina'),(3,'Tomasina','Tamous',' ',' ','General Pico','Argentina'),(4,'Ken','Keny',' ',' ','Bariloche','Argentina'),(5,'Emyle','Emilia',' ',' ','San Rafael','Argentina'),(6,'Melosa','Mel',' ',' ','Santa Fe','Argentina'),(7,'Craig','Crac',' ',' ','Cordoba','Argentina'),(8,'Tonye','Toni',' ',' ','Bahia Blanca','Argentina'),(9,'Mitchel','Miguel',' ',' ','Parana','Argentina'),(10,'Eustace','Esta',' ',' ','San Nicolas','Argentina'),(11,'Guss','Gomez',' ',' ','Junin','Argentina'),(12,'Ramon','Ramon','avatar-1606682398336.jpg','La vecindad puerta 72','Mexico','Mexico');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `styles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'LISA'),(2,'POLLOCK'),(3,'MARMOLADO');
/*!40000 ALTER TABLE `styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_usuarios`
--

DROP TABLE IF EXISTS `tipos_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_usuarios`
--

LOCK TABLES `tipos_usuarios` WRITE;
/*!40000 ALTER TABLE `tipos_usuarios` DISABLE KEYS */;
INSERT INTO `tipos_usuarios` VALUES (1,'ADMIN'),(2,'NORMAL');
/*!40000 ALTER TABLE `tipos_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `user_name` varchar(25) NOT NULL,
  `tipos_usuarios_id` int NOT NULL,
  `profile_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`user_name`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_tipos_usuarios1_idx` (`tipos_usuarios_id`),
  KEY `fk_users_profiles1_idx` (`profile_id`),
  CONSTRAINT `fk_users_profiles1` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `fk_users_tipos_usuarios1` FOREIGN KEY (`tipos_usuarios_id`) REFERENCES `tipos_usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'abril@gmail.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Abril',1,1),(2,'knern1@shinystat.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Kamila',2,2),(3,'treeday2@jimdo.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Tomasina',2,3),(4,'kcouronne3@gov.uk','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Ken',2,4),(5,'efayerbrother4@ucoz.ru','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Emyle',2,5),(6,'mcoase5@dropbox.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Melosa',2,6),(7,'cgully6@cbslocal.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Craig',2,7),(8,'tdeeks7@joomla.org','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Tonye',2,8),(9,'mflageul8@github.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Mitchel',2,9),(10,'ecoath9@hugedomains.com','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Eustace',2,10),(11,'gfairbridge0@earthlink.net','$2a$10$LUZpgLGUGfDNP4jW8HWeU.KZx80SvZUg8COvg7zjVRNBfEB12C95S','Guss',2,11),(12,'donramon@net.com','$2a$10$AfcXK6e/KjiIqaO4rFbdKe79sl0OVm52BV398ycCBhu9rsy26fNv.','Monchito',2,12);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-09 17:02:06
