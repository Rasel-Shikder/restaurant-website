-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 09:05 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_website`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `available_qty` int(11) DEFAULT 0,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `available_qty`, `price`, `image_url`, `details`) VALUES
(2, 'Product 1', 25, '249.00', 'images/products/product1.jpg', 'This is a dummy product with ID 1.'),
(3, 'Product 2', 0, '162.31', 'images/products/product2.jpg', 'This is a dummy product with ID 2.'),
(4, 'Product 3', 50, '392.89', 'images/products/product3.jpg', 'This is a dummy product with ID 3.'),
(5, 'Product 4', 30, '154.07', 'images/products/product4.jpg', 'This is a dummy product with ID 4.'),
(6, 'Product 5', 24, '291.28', 'images/products/product5.jpg', 'This is a dummy product with ID 5.'),
(7, 'Product 6', 94, '97.80', 'images/products/product6.jpg', 'This is a dummy product with ID 6.'),
(8, 'Product 7', 70, '136.61', 'images/products/product7.jpg', 'This is a dummy product with ID 7.'),
(9, 'Product 8', 85, '365.45', 'images/products/product8.jpg', 'This is a dummy product with ID 8.'),
(10, 'Product 9', 93, '314.05', 'images/products/product9.jpg', 'This is a dummy product with ID 9.'),
(11, 'Product 10', 12, '427.86', 'images/products/product10.jpg', 'This is a dummy product with ID 10.'),
(12, 'Product 11', 83, '352.86', 'images/products/product11.jpg', 'This is a dummy product with ID 11.'),
(13, 'Product 12', 84, '153.72', 'images/products/product12.jpg', 'This is a dummy product with ID 12.'),
(14, 'Product 13', 60, '194.81', 'images/products/product13.jpg', 'This is a dummy product with ID 13.'),
(15, 'Product 14', 80, '67.90', 'images/products/product14.jpg', 'This is a dummy product with ID 14.'),
(16, 'Product 15', 79, '436.84', 'images/products/product15.jpg', 'This is a dummy product with ID 15.'),
(17, 'Product 16', 91, '488.87', 'images/products/product16.jpg', 'This is a dummy product with ID 16.'),
(18, 'Product 17', 14, '407.05', 'images/products/product17.jpg', 'This is a dummy product with ID 17.'),
(19, 'Product 18', 53, '184.17', 'images/products/product18.jpg', 'This is a dummy product with ID 18.'),
(20, 'Product 19', 88, '285.66', 'images/products/product19.jpg', 'This is a dummy product with ID 19.'),
(21, 'Product 20', 96, '170.03', 'images/products/product20.jpg', 'This is a dummy product with ID 20.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
