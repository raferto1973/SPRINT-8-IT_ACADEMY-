-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2024 a las 12:46:35
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
(6, 'rafa', 'fernandez', 'rafa@rafa.com', 50, 15, '2024-02-02', 'Canovelles'),
(9, 'alex', 'alex', 'alex@alex.com', 18, 25, '2024-03-04', 'Cardedeu'),
(10, 'laia', 'laia', 'laia@laia.com', 22, 10, '2024-02-19', 'Canovelles'),
(11, 'marta', 'marta', 'marta@marta.com', 47, 50, '2024-01-05', 'Montseny'),
(13, 'jack', 'jacks', 'jack@jack.com', 11, 6, '2024-03-06', 'Casa'),
(15, 'demo', 'demo', 'demo@demo.com', 50, 50, '2024-03-14', 'demo'),
(17, 'admin', 'admin', 'admin@admin.com', 1, 1, '2024-03-07', 'admin'),
(18, 'hola', 'hola', 'hola@hola.com', 2, 2, '2001-03-07', 'Mataró'),
(21, 'mila', 'mila', 'mila@mila.com', 9, 5, '2024-01-01', 'Canovelles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `allDay` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `events`
--

INSERT INTO `events` (`id`, `title`, `start`, `end`, `allDay`) VALUES
(1, 'Excursió', '2024-03-19 17:30:00', '2024-03-19 18:30:00', 0),
(2, 'Comida', '2024-03-19 12:30:00', '2024-03-19 16:30:00', 0),
(3, 'Hola', '2024-03-19 00:00:00', '2024-03-20 00:00:00', 1),
(4, 'Prueba', '2024-03-20 23:00:00', '2024-03-21 23:00:00', NULL),
(5, 'ghdfhdfghd', '2024-03-12 00:00:00', '2024-03-13 00:00:00', 1),
(6, 'Prueba', '2024-03-21 12:00:00', '2024-03-21 13:00:00', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `markers`
--

CREATE TABLE `markers` (
  `id` int(11) NOT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `markers`
--

INSERT INTO `markers` (`id`, `longitude`, `latitude`, `name`, `category`) VALUES
(1, 41.403699, 22.403629, 'Marker1', 'Bancs'),
(2, 11.403629, 21.403629, 'Marker2', 'Botigues'),
(4, 12.564700, 7.569700, 'marker3', '#FFFF00'),
(5, 12.564700, 7.000000, 'marker4', '#800000'),
(6, 12.000000, 7.000000, 'marker5', 'Bencineres'),
(7, 2.350000, 41.620000, 'Casa', 'Restaurants'),
(8, 2.139079, 41.583702, 'fdasfas', 'Restaurants'),
(9, 2.171981, 41.503445, 'sdafasdf', 'Botigues'),
(10, 2.130827, 41.437613, 'asdfasdfwqer', 'Restaurants');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `markers`
--
ALTER TABLE `markers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `markers`
--
ALTER TABLE `markers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
