-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: 51.68.18.110    Database: freep
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `borrow`
--

DROP TABLE IF EXISTS `borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_clothing` int(11) NOT NULL,
  `borrow_at` datetime DEFAULT NULL,
  `back_at` datetime DEFAULT NULL,
  `rating_lender` int(11) DEFAULT NULL,
  `id_picture` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_borrow_1_idx` (`id_picture`),
  KEY `fk_borrow_2_idx` (`id_user`),
  KEY `fk_borrow_3_idx` (`id_clothing`),
  CONSTRAINT `fk_borrow_1` FOREIGN KEY (`id_picture`) REFERENCES `picture` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_borrow_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_borrow_3` FOREIGN KEY (`id_clothing`) REFERENCES `clothing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=279 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow`
--

LOCK TABLES `borrow` WRITE;
/*!40000 ALTER TABLE `borrow` DISABLE KEYS */;
INSERT INTO `borrow` VALUES (246,51,118,NULL,NULL,NULL,100),(277,63,114,NULL,NULL,NULL,97),(278,63,119,NULL,NULL,NULL,101);
/*!40000 ALTER TABLE `borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clothing`
--

DROP TABLE IF EXISTS `clothing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clothing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `size` varchar(10) NOT NULL,
  `gender` varchar(5) DEFAULT NULL,
  `description` varchar(128) NOT NULL,
  `is_deposit` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_CLOTHE_1_idx` (`id_user`),
  CONSTRAINT `fk_CLOTHE_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothing`
--

LOCK TABLES `clothing` WRITE;
/*!40000 ALTER TABLE `clothing` DISABLE KEYS */;
INSERT INTO `clothing` VALUES (1,1,'Robe','H&M','M','F','Robe femme fleurie, bien pour l\'été ! ',1,'2019-05-15 00:00:00'),(2,2,'Pantalon','','XXL','F','Pantalon rose, tissu agréable et fin ! Parfait pour la saison ',0,'2019-06-04 00:00:00'),(3,3,'Robe','H&M','S','F','Petite robe grise moulante, simple et efficace. ',1,'2019-06-03 00:00:00'),(4,4,'Veste','Zara','L','F','Veste léopard, bordure rouge ',0,'2019-05-25 00:00:00'),(5,5,'Robe','H&M','XL','F','Robe large et agréable, aux couleurs d\'été.',1,'2019-06-18 10:31:30'),(6,6,'Top','','XS','F','Petit crop-top, vert fluo !',0,'2019-06-18 10:32:05'),(7,7,'Jupe','H&M','M','F','Petite jupe blanche, parfaite au quotidien ! ',1,'2019-06-18 10:33:54'),(8,8,'Pantalon','','L','F','Jean taille haute, large au niveau des chevilles ! ',0,'2019-06-18 10:36:52'),(9,9,'Robe','H&M','XXXL','F','Robe rouge, super agréable pour la saison.',1,'2019-06-18 10:39:00'),(10,10,'Combinaison','','M','F','Combinaison, en coton. A l\'aise comme dans un pyjama !',0,'2019-06-18 10:42:34'),(113,49,'Pantalon','Zara','M',NULL,'Pantalon moucheté',1,'2019-07-24 14:46:11'),(114,49,'Pantalon','Zara','M',NULL,'Pantalon moucheté',1,'2019-07-24 15:24:40'),(115,49,'Manteau','H&M','M',NULL,'Manteau vert à point doré',1,'2019-07-24 15:26:32'),(116,49,'Chemise','Kiabi','M',NULL,'Chemise Pailletée',1,'2019-07-24 15:27:43'),(117,50,'Veste','bash','M',NULL,'Veste militaire',0,'2019-07-24 15:28:16'),(118,49,'Tunique','Kiabi','M',NULL,'Tunique bleue à motif blanc',0,'2019-07-24 15:36:34'),(119,51,'Veste Jean','Bershka','S',NULL,'Petite veste en jean, elle revient à la mode !',1,'2019-07-24 15:52:46'),(124,57,'Chemisier','Le temps des cerises','M',NULL,'Superbe chemisier blanc en dentelle, très bon état.',0,'2019-07-25 13:44:01'),(125,57,'Veste militaire','Pimkie','M',NULL,'Veste kaki type militaire, lègére et parfaite pour l\'été.',1,'2019-07-25 13:47:18'),(127,57,'Pantalon tailleur marine','H&M','M',NULL,'Petit pantalon de tailleur pour une tenue habillée.',1,'2019-07-25 14:03:34'),(128,56,'Perfecto cuir noir','Urban Sapes','',NULL,'Petite veste en cuir noire.',1,'2019-07-25 14:31:36'),(129,56,'Veste cuir noire','Urban Sapes','M',NULL,'Petit perfecto en cuir noir, va avec tout.',1,'2019-07-25 14:32:40'),(130,56,'Chemisier gris','Cache Cache','M',NULL,'Petit chemisier gris sombre à pois blanc.',0,'2019-07-25 14:36:55');
/*!40000 ALTER TABLE `clothing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_clothing` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_COMMENT_1_idx` (`id_user`),
  KEY `fk_COMMENT_2_idx` (`id_clothing`),
  CONSTRAINT `fk_COMMENT_2` FOREIGN KEY (`id_clothing`) REFERENCES `clothing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,1,'Combi au top ! ','2019-05-15 00:00:00'),(2,2,1,'J A.D.O.R.E ! ','2019-06-03 00:00:00'),(3,3,1,'Magnifique !!!','2019-06-11 13:59:02'),(4,4,2,'Waouw !!','2019-06-13 09:47:49'),(5,5,2,'J\'ADORE ! ','2019-06-19 09:35:00'),(6,6,2,'C\'est parfait pour moi !!!!','2019-06-19 09:35:00'),(7,7,2,'Trop cool ! ','2019-06-19 09:35:00'),(8,8,2,'C\'est parfait ','2019-06-19 09:35:00'),(9,9,3,'Les couleurs sont magnifiques','2019-06-19 09:35:00'),(10,10,3,'J\'adore la forme ! ','2019-06-19 09:35:00'),(11,1,3,'*_* Je le veux ! ','2019-06-19 09:35:00'),(12,3,3,'Tu me le prêtes ?! ','2019-06-19 09:35:00'),(13,5,4,'Idéal pour moi ! ','2019-06-19 09:35:00'),(14,7,4,'Il taille super bien ! ','2019-06-19 09:35:00'),(15,8,4,'Je suis fan, merci pour ton échange','2019-06-19 09:35:00'),(16,10,4,'Encore disponible pour demain soir ?!','2019-06-19 09:35:00'),(17,3,4,'Il te va super bien ','2019-06-19 09:51:00'),(20,3,6,'Disponible pour ce soir ?!','2019-06-19 09:51:00'),(21,1,6,'J\'aimerais bien l\'avoir pour la semaine prochaine, si dispo !','2019-06-19 09:51:00'),(22,5,6,'Waw, c\'est parfait ! ','2019-06-19 09:51:00'),(23,8,6,'J\'ai le même en rose fluo, j\'adore ! Tu me le prêtes ?','2019-06-19 09:51:00'),(24,10,6,'Je le veux ! Je le veux ! ','2019-06-19 09:51:00'),(25,6,7,'J\'aime beaucoup ','2019-06-19 09:56:00'),(26,9,7,'Je suis fan des motifs ! ','2019-06-19 09:56:00'),(27,1,7,'Dispo pour demain soir ? ','2019-06-19 09:56:00'),(28,2,8,'Trop trop fan ! ','2019-06-19 10:11:00'),(29,4,8,'Je le trouve parfait ! ','2019-06-19 10:11:00'),(30,7,8,'Une grande fan, le style donne un côté rock !','2019-06-19 10:11:00'),(31,9,8,'Magnifique style ! ','2019-06-19 10:11:00'),(32,6,8,'Elle te va super bien ','2019-06-19 10:11:00'),(33,5,9,'Les couleurs vont trop bien ensemble','2019-06-19 10:11:00'),(34,8,9,'Disponible pour demain soir ? ','2019-06-19 10:11:00'),(35,1,9,'Les couleurs vives ! L\'été arrive !!! ','2019-06-19 10:11:00'),(36,10,9,'Ça te va trop bien','2019-06-19 10:11:00'),(37,3,9,'J\'aime beaucoup ton style','2019-06-19 10:11:00'),(38,7,9,'J\'aime beaucoup la coupe du pantalon, agréable à porter ! Je risque de reprendre contact rapidement avec toi !','2019-06-19 10:11:00'),(39,5,10,'Magnifique jupe d\'été !','2019-06-19 10:15:00'),(40,3,10,'J\'adore les motifs ! ','2019-06-19 10:15:00'),(41,6,10,'La taille serait parfaite pour moi ! ','2019-06-19 10:37:00'),(42,1,10,'Je trouve ta tenue parfaite !','2019-06-19 10:37:00'),(43,2,10,'J\'adore le rose ! ','2019-06-19 10:37:00'),(44,4,10,'J\'adore ton pantalon, vraiment trop beau ! ','2019-06-19 10:37:00'),(45,7,10,'J\'ai du mal à trouver des pantalons à ma taille où je suis a l\'aise ! Il serait dispo pour demain après-midi ? ','2019-06-19 10:37:00'),(46,8,10,'Il est trop beau ! ','2019-06-19 10:37:00'),(47,9,10,'J\'adore ton style ! ','2019-06-19 10:37:00'),(48,2,2,'Great !','2019-06-25 06:59:23'),(49,4,3,'Magnifique !','2019-06-25 07:15:51'),(83,4,1,'Parfait pour ce temps ! :)','2019-06-26 15:27:06'),(84,4,4,'Magnifique !','2019-06-26 17:56:49'),(198,49,5,'Très joli','2019-07-25 07:46:52'),(199,49,119,'Classe!','2019-07-25 07:52:00'),(204,51,114,'Super pantalon, très bon état ! ','2019-07-25 13:37:40'),(205,52,114,'Merci de me l\'avoir prêté, Freepeuse super sympa, au top .','2019-07-25 13:39:54'),(206,57,114,'Je recommande !!!','2019-07-25 13:41:01'),(207,56,114,'Idéal pour créer une petite tenue d\'été :)','2019-07-25 14:44:11'),(208,56,119,'Les vestes en jean reviennent à la mode en ce moment ;)','2019-07-25 14:44:49'),(209,55,119,'Légère, parfaite pour cet été !','2019-07-25 14:47:05'),(211,63,114,'J\'adore !','2019-07-25 17:25:48');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_author` int(11) NOT NULL,
  `id_reader` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `isLast` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_MESSAGE_1_idx` (`id_author`),
  KEY `fk_MESSAGE_2_idx` (`id_reader`),
  CONSTRAINT `fk_MESSAGE_1` FOREIGN KEY (`id_author`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_MESSAGE_2` FOREIGN KEY (`id_reader`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (1,2,1,'Salut, j\'ai vu les photos de ta chemise et elle est trop belle! *-*','2019-06-17 15:32:00',0),(2,1,2,'Merci c\'est gentil, tu veux l\'emprunter?','2019-06-17 16:01:00',0),(3,3,1,'Hello, j\'aime ta tunique elle est dispo?','2019-03-20 10:04:00',0),(4,2,1,'Oui j\'aimerais beaucoup. Elle serait disponible demain?','2019-06-17 16:08:00',0),(5,1,2,'Oui pas de soucis, on se retrouve où?','2019-06-17 16:15:00',0),(6,2,1,'Au bar à chat (celui qui est à République), ça t\'irait? Vers 14h?','2019-06-17 16:20:00',0),(7,1,3,'Coucou, merci, désolée elle a été abimée :/','2019-03-25 17:35:12',0),(8,2,3,'Hello, ta robe est trop chouette, elle est disponible?','2019-05-20 23:12:02',0),(10,3,2,'Salut, merci :). Je l\'ai déjà prêtée mais je la récupère après-demain, t\'en aurais besoin pour quand? ','2019-05-21 11:11:11',0),(11,2,3,'J\'ai un mariage le 25 mai','2019-05-21 12:20:02',0),(12,3,2,'Ok, je suis pas dispo demain mais on pourrait se retrouver jeudi à V2, ça t\'irait?','2019-05-21 12:41:47',0),(13,2,3,'Niquel. Merci, tu me sauves la vie! :D','2019-05-21 13:37:43',0),(14,3,1,'Haw, too bad :(','2019-03-30 19:57:18',0),(15,5,6,'Salut ça va? J\'adore tes chaussures ! Elles sont en quelle taille ?','2019-06-25 13:05:29',0),(16,6,5,'Hey, 36, tu voudrais les emprunter?','2019-06-25 13:08:06',0),(17,5,6,'Arf, j\'aurais aimé, mais je fais du 42','2019-06-25 13:08:14',0),(18,6,5,'Dommage, une autre fois alors','2019-06-25 13:09:00',0),(83,5,6,'Hey, ça va?','2019-06-27 13:28:55',1),(84,2,3,'Merci','2019-06-27 13:30:08',1),(195,32,49,'Dispo ce soir ?','2019-07-25 08:54:05',0),(196,51,32,'Hey ! ','2019-07-25 09:02:58',0),(197,32,51,'RDV à 18h à République','2019-07-25 09:03:25',0),(198,51,32,'Ok','2019-07-25 09:03:37',1),(199,49,32,'Oui','2019-07-25 09:03:38',1),(206,63,49,'Bonjour Kana','2019-07-25 17:26:05',1),(207,63,51,'Bonjour Clara','2019-07-25 17:26:29',1);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `site_url` varchar(255) NOT NULL,
  `banner` varchar(255) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partner`
--

LOCK TABLES `partner` WRITE;
/*!40000 ALTER TABLE `partner` DISABLE KEYS */;
/*!40000 ALTER TABLE `partner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_clothing` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `is_proof` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_PICTURE_1_idx` (`id_user`),
  KEY `fk_PICTURE_3_idx` (`id_clothing`),
  CONSTRAINT `fk_PICTURE_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PICTURE_3` FOREIGN KEY (`id_clothing`) REFERENCES `clothing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,1,1,0,'2019-05-15 00:00:00','https://i1.adis.ws/i/boohooamplience/agg94454_cream_xl?$product_page_main_magic_zoom$'),(2,2,2,0,'2019-06-02 00:00:00','https://scontent-cdg2-1.cdninstagram.com/vp/1d31e536010eecacb9ef6f6ec1bc3fbb/5DC4A7FE/t51.2885-15/sh0.08/e35/p640x640/60910923_388824541743622_8351394648230695415_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(3,3,3,0,'2019-06-12 00:00:00','https://scontent-cdg2-1.cdninstagram.com/vp/b7cf54a63a1eb5eb0ccc43406ce71d0f/5DA62BE8/t51.2885-15/sh0.08/e35/s640x640/63180835_1089120137948948_3886040762651724422_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(4,4,4,0,'2019-06-07 00:00:00','https://scontent-cdg2-1.cdninstagram.com/vp/133dfd059ea90a6bf30db8c10fcc02bb/5D80E6AA/t51.2885-15/sh0.08/e35/p640x640/62818114_366176467589038_8784749700819522430_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(5,5,5,0,'2019-06-18 10:31:30','https://scontent-cdg2-1.cdninstagram.com/vp/eb95c4e8681c23022dd7ac2494775e5f/5DA4C7A3/t51.2885-15/sh0.08/e35/s640x640/61121264_387116488592990_1861396778898086036_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(6,6,6,0,'2019-06-18 10:32:05','https://scontent-cdg2-1.cdninstagram.com/vp/18af69bff2bfa0426d84961c541e507f/5D923DAF/t51.2885-15/sh0.08/e35/p640x640/62161271_143915510023073_7276563567413402062_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(7,7,7,0,'2019-06-18 10:33:54','https://scontent-cdg2-1.cdninstagram.com/vp/9936f7fef5cb0981770eadf2eb0d3c0b/5DC47CE8/t51.2885-15/sh0.08/e35/p640x640/61255614_1089947317856716_6765223676237329561_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(8,8,8,0,'2019-06-18 10:36:52','https://scontent-cdg2-1.cdninstagram.com/vp/84c6e6ea8560657cdf3102b27b867550/5D949018/t51.2885-15/sh0.08/e35/s640x640/50850306_778731012519954_8665590308374405595_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(9,9,9,0,'2019-06-18 10:39:00','https://scontent-cdg2-1.cdninstagram.com/vp/ce071dae8db613f57924c79d275efeb6/5DC3E3CC/t51.2885-15/sh0.08/e35/p640x640/61776163_888673428136220_8299306671046820297_n.jpg?_nc_ht=scontent-cdg2-1.cdninstagram.com'),(97,114,49,0,'2019-07-24 15:25:21','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563981920/s8fzzbqofn5nj6knfxg7.jpg'),(98,115,49,0,'2019-07-24 15:26:45','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563982004/v8nvb1yay6foxxhbdhng.jpg'),(99,115,49,1,'2019-07-24 15:27:05','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563982025/lbin7xccdug5i1r0nwo4.jpg'),(100,118,49,0,'2019-07-24 15:36:49','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563982609/crnxdk6zhrb26c72o1zc.jpg'),(101,119,51,0,'2019-07-24 15:52:55','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563983575/nyauxxsim9bz3lvdrmou.webp'),(104,124,57,0,'2019-07-25 13:44:05','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564062245/hjitxlqzqpiih2vxe9jm.jpg'),(106,125,57,0,'2019-07-25 13:48:11','https://zupimages.net/up/19/30/86rx.jpg'),(109,127,57,0,'2019-07-25 14:03:41','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564063420/xrvnai9h1yfnzcr1onev.jpg'),(110,129,56,0,'2019-07-25 14:32:49','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564065168/yfpas6k5fypmpzjrmmca.jpg'),(111,130,56,0,'2019-07-25 14:37:02','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564065422/hhstyntpv3gmsu7etwhc.jpg');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social`
--

DROP TABLE IF EXISTS `social`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `social` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_follow` int(11) DEFAULT NULL,
  `id_like` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_social_1_idx` (`id_user`),
  CONSTRAINT `fk_social_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1569 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social`
--

LOCK TABLES `social` WRITE;
/*!40000 ALTER TABLE `social` DISABLE KEYS */;
INSERT INTO `social` VALUES (1527,32,NULL,4,'2019-07-24 14:38:32'),(1528,32,9,NULL,'2019-07-24 14:38:45'),(1532,50,48,NULL,'2019-07-24 15:29:21'),(1535,32,NULL,100,'2019-07-24 16:53:35'),(1536,32,NULL,98,'2019-07-24 16:54:17'),(1537,32,49,NULL,'2019-07-24 16:55:35'),(1538,32,48,NULL,'2019-07-24 16:58:33'),(1539,32,NULL,1,'2019-07-24 17:09:42'),(1540,52,51,NULL,'2019-07-25 07:44:13'),(1541,49,5,NULL,'2019-07-25 07:47:00'),(1542,49,NULL,97,'2019-07-25 08:00:09'),(1543,49,NULL,5,'2019-07-25 08:00:11'),(1544,49,NULL,4,'2019-07-25 08:00:13'),(1545,49,NULL,101,'2019-07-25 08:00:23'),(1546,49,9,NULL,'2019-07-25 08:08:05'),(1547,49,4,NULL,'2019-07-25 08:08:11'),(1548,49,1,NULL,'2019-07-25 08:08:18'),(1549,32,NULL,101,'2019-07-25 08:58:13'),(1556,49,58,NULL,'2019-07-25 09:52:37'),(1557,49,8,NULL,'2019-07-25 09:53:19'),(1567,63,NULL,98,'2019-07-25 17:25:22'),(1568,63,NULL,8,'2019-07-25 17:25:25');
/*!40000 ALTER TABLE `social` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` tinytext NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
  `location` varchar(255) DEFAULT 'LILLE',
  `points` int(11) NOT NULL DEFAULT '0',
  `is_admin` tinyint(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `id_borrow` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Kristin Dean','password','kristin.dean71@example.com','Kristin','Dean','https://randomuser.me/api/portraits/women/32.jpg','8392 Colorado Rd',0,0,'2019-05-26 00:00:00',1,'Je suis fan de mode depuis ma plus petite enfance ! '),(2,'Taylor Herrera','password','taylor.herrera49@example.com','Taylor','Herrera','https://randomuser.me/api/portraits/women/42.jpg','8215 W Campbell Ave',0,0,'2019-05-26 00:00:00',2,'Fan de style vintage !! Je partage avec vous mes vêtements de marque !'),(3,'Louella Jimenez','password','louella.jimenez75@example.com','Louella','Jimenez','https://randomuser.me/api/portraits/women/32.jpg','6887 Westheimer Rd',5,0,'2019-06-05 00:00:00',3,'Je suis modèle photo depuis des années, j\'adore le monde de la mode ! '),(4,'Anne Larson','password','anne.larson30@example.com','Anne','Larson','https://randomuser.me/api/portraits/women/34.jpg','2986 walnut hill ln',3,0,'2019-06-22 09:22:30',4,'Bonjouuuur, les filles ! Je suis Anne, je suis conseillère en image, grande fan absolue de FREEP!!!!!'),(5,'Sylvia Brooks','password','sylvia.brooks54@example.com','Sylvia','Brooks','https://randomuser.me/api/portraits/women/49.jpg','6110 brentwood dr',10,0,'2019-06-22 09:32:00',5,'Maman de deux petites filles magnifiques et fan de mode depuis des années !'),(6,'Sylvia Ellis','password','sylvia.ellis38@example.com','Sylvia','Ellis','https://randomuser.me/api/portraits/women/76.jpg','3385 bay ave',5,0,'2019-06-22 09:35:00',6,'Danceuse étoile, mon look est important au quotidien ! Je veux du PETILLANT les filles !'),(7,'Megan Moreno','password','megan.moreno10@example.com','Megan','Moreno','https://randomuser.me/api/portraits/women/17.jpg','3652 seventh st',1,0,'2019-06-22 09:37:33',7,'J\'adore changer de style tout le temps, une grande acheteuse, je partage avec vous mon dressing les filles !!!!'),(8,'Danielle King','password','danielle.king37@example.com','Danielle ','King','https://randomuser.me/api/portraits/women/18.jpg','8211 fincher rd',8,0,'2019-06-22 09:41:03',8,'J\'A.D.O.R.E FREEP ! L\'idée est super, j\'ai hâte de partager avec vous les filles !'),(9,'Maureen Beck','password','maureen.beck29@example.com','Maureen','Beck','https://randomuser.me/api/portraits/women/33.jpg','2114 arizona rd',2,0,'2019-06-22 09:42:55',9,'Maman d\'un petit garçon de 6 mois. Fan de Cristina Cordula, attention les filles !!!'),(10,'Tiffany Boyd','password','tiffany.boyd72@example.com','Tiffany','Boyd','https://randomuser.me/api/portraits/women/12.jpg','2776 copper st',4,0,'2019-06-22 09:45:50',10,'Ancienne candidate reine du shopping et gagnante ! J\'ai hâte de partager avec toi mes tenues les plus belles ! Peut-être que tu seras la nouvelle reine !?'),(32,'Sabine','$2b$08$bBTOLv5990opUml.sSXKOOpQPLbwBCTutll.MPlo44SLy51mUXLfa','sa@wild.fr','sa','sa','https://www.chickensmoothie.com/oekaki/image/image.php?id=3355545&size=large&format=auto&rev=1555718383','Lille',13,0,'2019-07-06 19:09:38',NULL,'Freep, c\'est fantastique !'),(49,'Kana','$2b$08$DPCbrKaD3aP26Y0.gsW.5u4f651Y.wnvmHDMAe6F97o/VqfROdCJS','kanaliou@hotmail.fr','Loukiana','Vivenot','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564040965/oaavzivo3x1arnil98tk.jpg','Lille',0,NULL,'2019-07-24 14:45:24',NULL,'J\'aime les beaux vêtements'),(50,'fred','$2b$08$.9/rzeUKjcO0FVx8U6PtdOOBtvUwAqE1a.mgG04f0Oi.TNIZs9dUW','fred@gmail.com','Fred','Wilder','https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png','Lille',0,NULL,'2019-07-24 15:25:26',NULL,NULL),(51,'Clara','$2b$08$3/rdnc5PejP33Pbp1d65NuyOP0JORhmyqJjuhhniOfecCAYiu67fS','terry.garza@exemple.com','Terry','Garza','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1563982876/pdlesxy4sfv5qgybxa6w.jpg','Lyon',0,NULL,'2019-07-24 15:30:28',NULL,'Nouvelle à Lyon, j\'adore échanger des vêtements avec mes copines.'),(52,'Nation','$2b$08$EeRFZvGfckPzIhbcxxMXauh.CQj8oI6PHwz5jof7oMmekP4dUa/Jy','lily.kennedy@exemple.com','Lily','Kennedy','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564040567/horirzrbgw8oe3vqisov.jpg','Bergerac',0,NULL,'2019-07-25 07:41:01',NULL,'Hey ! Heureuse de rejoindre la communauté Freep ! Hâte d\'échanger avec vous.'),(53,'Cyrus','$2b$08$SPP.7hqjN9M8nQHAfYvhq.MP96H0Iw41ZZ/3Nap9mG94UIma.Pov6','gladys.watson@exemple.com','Gladys','Watson','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564041029/dv0vhudsehkf5yeqr2ev.jpg','La Haye-Pesnel',0,NULL,'2019-07-25 07:49:36',NULL,'Salut les filles, acheteuse compulsive j\'ai de nombreux vêtements à vous proposer ! :)'),(54,'Titou','$2b$08$WP9.JqMZJgQEwNa0LN0dHuyoK2W6RsYaZ5yMtVEiuh.gYMXvPNvam','glen.carroll@exemple.com','Glen','Carroll','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564041419/yazah0xpxzqj1fd7gvti.jpg','Lomme',0,NULL,'2019-07-25 07:55:35',NULL,'Disponible sur Lille et ses environs, il me tarde de vous rencontrer !'),(55,'Vint\'age','$2b$08$oHihR2XYVGdj/L.kbexSR.EvyWwOdDcTUswbfcswLXtPVNcP5J8Dm','anna.hayes@exemple.com','Anna','Hayes','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564041706/aeopc2k9woyfqbjiqmty.jpg','Englos',0,NULL,'2019-07-25 08:01:04',NULL,'Fan de shooping et de mode, j\'adore le concept de cet appli !!! :) :) :)'),(56,'FlexBox','$2b$08$MhvP2LPceEGOr6yJjGnkOOeRWYJtOx3ngJ8aHqdK50AXFDWpjWs/q','toni.evans@exemple.com','Toni','Evans','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564041948/hdqjnv4uphmok3j8bwfm.jpg','Sequedin',0,NULL,'2019-07-25 08:04:17',NULL,'Je découvre juste le site, timide mais n\'hésitez pas à venir me parler.'),(57,'Doors','$2b$08$Cf6nCDKaojj8JizmJehGvez1VMh0EOguyM7/3AaeCFWgK5gHstX4m','alicia.james@exemple.com','Alicia','James','http://res.cloudinary.com/dlxzd7tqf/image/upload/v1564062135/uahzcpkoaytnn2dpdwmk.jpg','Faches-Thusmenil',0,NULL,'2019-07-25 08:09:32',NULL,NULL),(63,'NathLille','$2b$08$THDDd35tZzDNHPn6LZ6xqO252yi0qCi0vbtw1R5HSdnlOyEk4wbvO','nathlille@yopmail.fr','Nathalie','ASTANO','https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png','LILLE',0,NULL,'2019-07-25 17:25:04',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-26  9:19:23
