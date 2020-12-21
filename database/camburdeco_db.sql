-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema camburdeco_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema camburdeco_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `camburdeco_db` DEFAULT CHARACTER SET utf8 ;
USE `camburdeco_db` ;

-- -----------------------------------------------------
-- Table `camburdeco_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT(2500) NULL,
  `stock` INT UNSIGNED NULL,
  `price` FLOAT(9,2) UNSIGNED NULL,
  `img` VARCHAR(100) BINARY NOT NULL,
  `top` INT UNSIGNED NULL,
  `categories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id` (`id` ASC) ,
  INDEX `fk_products_categories1_idx` (`categories_id` ASC),
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `camburdeco_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '			';


-- -----------------------------------------------------
-- Table `camburdeco_db`.`styles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`styles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `camburdeco_db`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`colors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`tipos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`tipos_usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`users` (
  `id` INT NOT NULL,
  `email` VARCHAR(40) NULL,
  `password` VARCHAR(100) NOT NULL,
  `user_name` VARCHAR(25) NOT NULL,
  `tipos_usuarios_id` INT NOT NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) ,
  UNIQUE INDEX `username_UNIQUE` (`user_name` ASC) ,
  INDEX `fk_users_tipos_usuarios1_idx` (`tipos_usuarios_id` ASC) ,
  CONSTRAINT `fk_users_tipos_usuarios1`
    FOREIGN KEY (`tipos_usuarios_id`)
    REFERENCES `camburdeco_db`.`tipos_usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  INDEX `fk_users_profiles1_idx` (`profile_id` ASC) ,
  CONSTRAINT `fk_users_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `camburdeco_db`.`profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`profiles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `avatar` VARCHAR(45) NULL,
  `address` VARCHAR(255) NULL,
  `city` VARCHAR(50) NULL,
  `pais` VARCHAR(50) NULL,
  PRIMARY KEY (`id`))
  ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(50) NOT NULL,
  `number` INT UNSIGNED NOT NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) ,
  INDEX `fk_payments_profiles1_idx` (`profile_id` ASC) ,
  CONSTRAINT `fk_payments_profiles1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `camburdeco_db`.`profiles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `forma_entrega` VARCHAR(15) NOT NULL,
  `forma_pago` VARCHAR(15) NOT NULL,
  `user_id` INT NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`),
  INDEX `fk_carritos_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_carritos_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `camburdeco_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`product_carrito`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`product_carrito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `carrito_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_has_carritos_carritos1_idx` (`carrito_id` ASC) ,
  INDEX `fk_products_has_carritos_products1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_products_has_carritos_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `camburdeco_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_carritos_carritos1`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `camburdeco_db`.`carritos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`product_style`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`product_style` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `style_id` INT NOT NULL COMMENT '\n',
  PRIMARY KEY (`id`),
  INDEX `fk_products_has_styles_styles1_idx` (`style_id` ASC) ,
  INDEX `fk_products_has_styles_products1_idx` (`product_id` ASC) ,
  CONSTRAINT `fk_products_has_styles_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `camburdeco_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_styles_styles1`
    FOREIGN KEY (`style_id`)
    REFERENCES `camburdeco_db`.`styles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `camburdeco_db`.`product_color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `camburdeco_db`.`product_color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  INDEX `fk_products_has_colors_colors1_idx` (`color_id` ASC) ,
  INDEX `fk_products_has_colors_products1_idx` (`product_id` ASC) ,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_products_has_colors_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `camburdeco_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_colors_colors1`
    FOREIGN KEY (`color_id`)
    REFERENCES `camburdeco_db`.`colors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
