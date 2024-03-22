-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2024 a las 18:23:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `activity`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `distance` int(11) DEFAULT NULL,
  `activityDate` date DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`id`, `name`, `surname`, `email`, `age`, `distance`, `activityDate`, `location`) VALUES
(0, 'Rafa', 'fernandez', 'rafa@rafa.com', 50, 15, '2024-02-02', 'Canovelles'),
(1, 'Alex', 'rodriguez', 'alex@alex.com', 18, 25, '2024-03-04', 'Cardedeu'),
(2, 'Laia', 'Roig', 'laia@laia.com', 22, 10, '2024-02-19', 'Canovelles'),
(3, 'Marta', 'Iniesta', 'marta@marta.com', 47, 50, '2024-01-05', 'Montseny'),
(4, 'Peter', 'Doe', 'jack@jack.com', 11, 6, '2024-03-06', 'Montseny'),
(5, 'Anton', 'fernandez', 'demo@demo.com', 50, 50, '2024-03-14', 'Montseny'),
(6, 'Sue', 'Smith', 'admin@admin.com', 1, 1, '2024-03-07', 'Mataró'),
(7, 'Charo', 'Messi', 'Charo@Charo.com', 2, 2, '2001-03-07', 'Mataró'),
(8, 'Mar', 'Cuesta', 'Mar@Mar.com', 9, 5, '2024-01-01', 'Canovelles'),
(9, 'Isma', 'Smith', 'isma@isma.com', 35, 15, '2024-03-21', 'Mataró'),
(10, 'Joan', 'Roig', 'Joan@Joan.com', 20, 20, '2024-04-06', 'Barcelona'),
(11, 'Julia', 'Cuesta', 'Julia@Julia.com', 25, 5, '2024-01-07', 'Barcelona'),
(12, 'Ester', 'Torres', 'Ester@Ester.com', 45, 50, '2024-08-08', 'Canovelles'),
(13, 'Jose', 'Smith', 'Jose@Jose.com', 51, 47, '2024-09-09', 'Mataró'),
(14, 'Amador', 'Cuesta', 'Amador@Amador.com', 17, 21, '2024-10-09', 'Mataró'),
(15, 'Pere', 'Isma', 'Pere@Pere.com', 36, 17, '2024-11-12', 'Barcelona'),
(16, 'Judit', 'Isma', 'Judit@Judit.com', 33, 8, '2024-12-13', 'Barcelona'),
(17, 'Toni', 'fernandez', 'Toni@Toni.com', 23, 115, '2024-01-14', 'Montseny'),
(18, 'Lurdes', 'Isma', 'Lurdes@Lurdes.com', 55, 80, '2024-02-17', 'Canovelles'),
(19, 'Maira', 'rodriguez', 'Maira@Maira.com', 51, 35, '2024-03-21', 'Barcelona'),
(20, 'Albert', 'Torres', 'Albert@Albert.com', 15, 41, '2024-04-18', 'Cardedeu'),
(21, 'Oleguer', 'Smith', 'Oleguer@Oleguer.com', 31, 16, '2024-05-02', 'Barcelona'),
(22, 'Pol', 'rodriguez', 'Pol@Pol.com', 27, 15, '2024-06-11', 'Canovelles'),
(23, 'Pau', 'Roig', 'Pau@Pau.com', 75, 17, '2024-07-15', 'Mataró'),
(24, 'Paula', 'Smith', 'Paula@Paula.com', 73, 18, '2024-07-17', 'Barcelona'),
(25, 'Lionel', 'fernandez', 'Lionel@Lionel.com', 65, 19, '2024-03-18', 'Granollers'),
(26, 'Andres', 'Torres', 'Andres@Andres.com', 38, 10, '2024-03-28', 'Cardedeu'),
(27, 'Erica', 'Cuesta', 'Erica@Erica.com', 39, 5, '2024-03-23', 'Canovelles'),
(28, 'Sara', 'rodriguez', 'Sara@Sara.com', 25, 1, '2024-07-22', 'Granollers'),
(29, 'Montse', 'Roig', 'Montse@Montse.com', 33, 65, '2024-08-21', 'Barcelona'),
(30, 'Gemma', 'Torres', 'Gemma@Gemma.com', 35, 45, '2024-09-01', 'Granollers');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
