CREATE DATABASE  IF NOT EXISTS `123-recipe` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `123-recipe`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: 123-recipe
-- ------------------------------------------------------
-- Server version	5.7.13-log

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
-- Table structure for table `buy_list_to_items`
--

DROP TABLE IF EXISTS `buy_list_to_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buy_list_to_items` (
  `buy_list_to_items_buy_list_id` binary(16) NOT NULL,
  `buy_list_items_item_id` binary(16) NOT NULL,
  `buy_list_to_items_item_type` varchar(45) DEFAULT NULL,
  `buy_list_to_items_fulfitted` int(10) DEFAULT NULL,
  PRIMARY KEY (`buy_list_to_items_buy_list_id`,`buy_list_items_item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `buy_lists`
--

DROP TABLE IF EXISTS `buy_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buy_lists` (
  `buy_list_id` binary(16) NOT NULL,
  `buy_list_name` varchar(45) DEFAULT NULL,
  `buy_list_description` text,
  `buy_lists_parent` binary(16) DEFAULT NULL,
  PRIMARY KEY (`buy_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` binary(16) NOT NULL,
  `comment_user_id` binary(16) DEFAULT NULL,
  `comment_created_at` datetime DEFAULT NULL,
  `comment_updated_at` datetime DEFAULT NULL,
  `comment_deleted` tinyint(1) DEFAULT NULL,
  `comment_parent` binary(16) DEFAULT NULL,
  `comment_parant_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ingredient_lists`
--

DROP TABLE IF EXISTS `ingredient_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient_lists` (
  `ingredient_list_id` binary(16) NOT NULL,
  `ingredient_list_name` varchar(45) DEFAULT NULL,
  `ingredient_list_description` text,
  `ingredient_list_is_deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ingredient_list_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients` (
  `ingredient_id` binary(16) NOT NULL,
  `ingredient_name` varchar(45) DEFAULT NULL,
  `ingredient_measuring_unit` varchar(45) DEFAULT NULL,
  `ingredient_measuring_size` double DEFAULT NULL,
  `ingredient_is_deleted` tinyint(1) DEFAULT '0',
  `ingredient_price` double DEFAULT NULL,
  `ingredient_price_currency_iso3` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`ingredient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `instructions`
--

DROP TABLE IF EXISTS `instructions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instructions` (
  `instruction` binary(16) NOT NULL,
  `instruction_order` int(10) DEFAULT NULL,
  `instruction_text` text,
  `instruction_execution_time_seconds` int(10) DEFAULT NULL,
  `instructions_ingredient_list` binary(16) DEFAULT NULL,
  PRIMARY KEY (`instruction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `media`
--

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `media_id` binary(16) NOT NULL,
  `media_type` int(5) DEFAULT NULL,
  `media_link` varchar(1000) DEFAULT NULL,
  `media_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`media_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipes` (
  `recipe_id` binary(16) NOT NULL,
  `recipe_parent` binary(16) DEFAULT NULL,
  `recipe_name` varchar(45) DEFAULT NULL,
  `recipe_description` text,
  `recipecol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-04  0:09:44
