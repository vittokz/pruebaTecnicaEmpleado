-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2021 a las 16:57:13
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_usuario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usu_usuario`
--

CREATE TABLE `usu_usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fechaNacimiento` varchar(20) NOT NULL,
  `pais` varchar(60) NOT NULL,
  `nombreUsuario` varchar(50) NOT NULL,
  `fechaContratacion` varchar(20) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `area` varchar(50) NOT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `comision` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usu_usuario`
--

INSERT INTO `usu_usuario` (`id`, `nombre`, `fechaNacimiento`, `pais`, `nombreUsuario`, `fechaContratacion`, `estado`, `area`, `cargo`, `comision`) VALUES
(2, 'Grace Hopper (Diseñador)', '1990-08-01', 'Colombia', 'grace', '2021-05-12', 'Activo', 'Tecnologia', 'Diseñador', ''),
(7, 'vittorio cassetta', '2000-05-12', 'Aruba', 'vittoriokz', '2021-05-04', '1', 'Tecnologia', 'Fundador y CEO', '13');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usu_usuario`
--
ALTER TABLE `usu_usuario`
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usu_usuario`
--
ALTER TABLE `usu_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
