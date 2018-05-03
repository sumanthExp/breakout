-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 08, 2018 at 06:53 AM
-- Server version: 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `breakout`
--

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
CREATE TABLE IF NOT EXISTS `player` (
  `pid` int(5) NOT NULL AUTO_INCREMENT,
  `pfname` varchar(100) NOT NULL,
  `plname` varchar(100) NOT NULL,
  `pusername` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `pemailid` varchar(100) NOT NULL,
  `pscore` int(5) NOT NULL,
  `online` varchar(1) NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pusername` (`pusername`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `player`
--

INSERT INTO `player` (`pid`, `pfname`, `plname`, `pusername`, `password`, `pemailid`, `pscore`, `online`) VALUES
(1, 'ganesh', 'takoor', 'gtakoor', '9c5a809c7a4683075467b56c85445e4f1f49ef42', 'gtakoor@gmail.com', 100, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `teamid` int(5) NOT NULL AUTO_INCREMENT,
  `p1username` varchar(100) NOT NULL,
  `p2username` varchar(100) NOT NULL,
  `teamscore` varchar(5) NOT NULL,
  PRIMARY KEY (`teamid`),
  KEY `p1username` (`p1username`),
  KEY `p2username` (`p2username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
