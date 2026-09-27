-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2026 at 09:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pembayaran_semester`
--

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nim` varchar(20) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `prodi` varchar(100) NOT NULL,
  `angkatan` year(4) NOT NULL,
  `biaya_semester` varchar(11) NOT NULL,
  `status` enum('lunas','belum lunas','belum bayar') NOT NULL,
  `total_bayar` varchar(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nim`, `nama`, `prodi`, `angkatan`, `biaya_semester`, `status`, `total_bayar`) VALUES
(14, '123076552012535', 'Fifi Findri Odameng', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1000000'),
(15, '123076552012533', 'Yuni Kartika Iriani', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(16, '123076552012532', 'Yulita I Limatahu', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(17, '123076552012531', 'Sahmiyati Yahya', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '500000'),
(18, '123076552012530', 'Surtila D Taib', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1500000'),
(19, '123076552012526', 'Sarni Yakseb', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1000000'),
(20, '123076552012525', 'Satrio Rustam', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1000000'),
(21, '123076552012524', 'Salti Salmin', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(22, '123076552012541', 'Rizky Rusdiyansyah', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(23, '123076552012523', 'Nurul Ainurrohma', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(24, '123076552012521', 'Nurqasya Hajirin', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1000000'),
(25, '123076552012539', 'Mukrama Naba', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(26, '123076552012519', 'M. Nazarudin Kharie', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(27, '123076552012513', 'Hardianti M. Guntur', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(28, '123076552012512', 'Husna Hamid', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1500000'),
(29, '123076552012511', 'Faralia Vineswela', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(30, '123076552012510', 'Fatir Djakaria', 'Teknik Informatika', '2025', '1750000', 'belum bayar', '0'),
(31, '123076552012508', 'Dion Nitra Podomi', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(32, '123076552012506', 'Charlos Thomas Salauwe', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1500000'),
(33, '123076552012505', 'Carter Habitat Labudo', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000'),
(34, '123076552012538', 'Alma Dzalika Husada Labuha', 'Teknik Informatika', '2025', '1750000', 'belum lunas', '1500000'),
(35, '123076552012504', 'Ardany Ali', 'Teknik Informatika', '2025', '1750000', 'lunas', '1750000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD UNIQUE KEY `nim` (`nim`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
