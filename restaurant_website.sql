-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 07:15 AM
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
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_date` date DEFAULT NULL,
  `customer_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `billing_address` text DEFAULT NULL,
  `shipping_address` text DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_gateway` varchar(50) DEFAULT NULL,
  `transaction_id` varchar(50) DEFAULT NULL,
  `subtotal` decimal(4,2) DEFAULT NULL,
  `delivery_charge` decimal(4,2) DEFAULT NULL,
  `discount_price` decimal(4,2) DEFAULT NULL,
  `payable_amount` decimal(4,2) DEFAULT NULL,
  `paid_amount` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `customer_name`, `email`, `billing_address`, `shipping_address`, `phone_number`, `payment_date`, `payment_gateway`, `transaction_id`, `subtotal`, `delivery_charge`, `discount_price`, `payable_amount`, `paid_amount`) VALUES
(1, '2023-06-01', 'John Smith', 'john@example.com', '123 Main St, City, Country', '456 Elm St, City, Country', '1234567890', '2023-06-02', 'PayPal', 'ABC123', '50.00', '5.00', '10.00', '45.00', '45.00'),
(2, '2023-06-02', 'Jane Doe', 'jane@example.com', '789 Oak St, City, Country', '987 Pine St, City, Country', '0987654321', '2023-06-03', 'Stripe', 'DEF456', '75.00', '7.50', '15.00', '67.50', '67.50'),
(3, '2023-06-03', 'David Johnson', 'david@example.com', '321 Maple St, City, Country', '654 Birch St, City, Country', '5678901234', '2023-06-04', 'PayPal', 'GHI789', '99.99', '10.00', '20.00', '90.00', '90.00'),
(4, '2023-06-04', 'Emily Davis', 'emily@example.com', '543 Walnut St, City, Country', '876 Cedar St, City, Country', '4321098765', '2023-06-05', 'Stripe', 'JKL012', '65.00', '6.50', '13.00', '58.50', '58.50'),
(5, '2023-06-05', 'Michael Brown', 'michael@example.com', '987 Elm St, City, Country', '654 Pine St, City, Country', '5678904321', '2023-06-06', 'PayPal', 'MNO345', '85.00', '8.50', '17.00', '76.50', '76.50'),
(6, '2023-06-06', 'Sarah Wilson', 'sarah@example.com', '123 Oak St, City, Country', '456 Birch St, City, Country', '0987654321', '2023-06-07', 'Stripe', 'PQR678', '95.00', '9.50', '19.00', '85.50', '85.50'),
(7, '2023-06-07', 'Daniel Martinez', 'daniel@example.com', '789 Maple St, City, Country', '987 Cedar St, City, Country', '1234567890', '2023-06-08', 'PayPal', 'STU901', '55.00', '5.50', '11.00', '49.50', '49.50'),
(8, '2023-06-08', 'Olivia Thompson', 'olivia@example.com', '321 Walnut St, City, Country', '654 Elm St, City, Country', '0987654321', '2023-06-09', 'Stripe', 'VWX234', '75.00', '7.50', '15.00', '67.50', '67.50'),
(9, '2023-06-09', 'Christopher Anderson', 'christopher@example.com', '543 Oak St, City, Country', '876 Birch St, City, Country', '5678904321', '2023-06-10', 'PayPal', 'YZA567', '60.00', '6.00', '12.00', '54.00', '54.00'),
(10, '2023-06-10', 'Ava White', 'ava@example.com', '987 Maple St, City, Country', '654 Cedar St, City, Country', '1234567890', '2023-06-11', 'Stripe', 'BCD890', '80.00', '8.00', '16.00', '72.00', '72.00');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `unit_price` decimal(4,2) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `price` decimal(4,2) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `product_id`, `unit_price`, `qty`, `price`, `order_id`) VALUES
(1, 1, '10.00', 2, '20.00', 1),
(2, 2, '15.00', 1, '15.00', 1),
(3, 3, '8.50', 3, '25.50', 2),
(4, 1, '10.00', 4, '40.00', 3),
(5, 4, '20.00', 2, '40.00', 4),
(6, 5, '5.00', 5, '25.00', 4),
(7, 3, '8.50', 1, '8.50', 5),
(8, 2, '15.00', 3, '45.00', 6),
(9, 5, '5.00', 2, '10.00', 7),
(10, 4, '20.00', 1, '20.00', 8);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) DEFAULT NULL,
  `available_qty` int(11) DEFAULT 0,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `details` text DEFAULT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `available_qty`, `unit_price`, `image_url`, `details`, `category_id`) VALUES
(1, 'Product A', 5, '10.00', 'http://example.com/image1.jpg', 'Product A details', 1),
(2, 'Product B', 3, '15.00', 'http://example.com/image2.jpg', 'Product B details', 2),
(3, 'Product C', 8, '8.50', 'http://example.com/image3.jpg', 'Product C details', 1),
(4, 'Product D', 2, '20.00', 'http://example.com/image4.jpg', 'Product D details', 2),
(5, 'Product E', 6, '5.00', 'http://example.com/image5.jpg', 'Product E details', 1),
(6, 'Product F', 4, '15.00', 'http://example.com/image6.jpg', 'Product F details', 2),
(7, 'Product G', 9, '5.00', 'http://example.com/image7.jpg', 'Product G details', 1),
(8, 'Product H', 7, '20.00', 'http://example.com/image8.jpg', 'Product H details', 2),
(9, 'Product I', 1, '10.00', 'http://example.com/image9.jpg', 'Product I details', 1),
(10, 'Product J', 0, '25.00', 'http://example.com/image10.jpg', 'Product J details', 2),
(11, 'Product K', 3, '12.50', 'http://example.com/image11.jpg', 'Product K details', 1),
(12, 'Product L', 10, '18.00', 'http://example.com/image12.jpg', 'Product L details', 2),
(13, 'Product M', 6, '9.50', 'http://example.com/image13.jpg', 'Product M details', 1),
(14, 'Product N', 2, '22.00', 'http://example.com/image14.jpg', 'Product N details', 2),
(15, 'Product O', 4, '7.50', 'http://example.com/image15.jpg', 'Product O details', 1),
(16, 'Product P', 8, '14.00', 'http://example.com/image16.jpg', 'Product P details', 2),
(17, 'Product Q', 5, '6.00', 'http://example.com/image17.jpg', 'Product Q details', 1),
(18, 'Product R', 7, '18.50', 'http://example.com/image18.jpg', 'Product R details', 2),
(19, 'Product S', 0, '11.00', 'http://example.com/image19.jpg', 'Product S details', 1),
(20, 'Product T', 9, '24.00', 'http://example.com/image20.jpg', 'Product T details', 2),
(21, 'Product U', 2, '11.50', 'http://example.com/image21.jpg', 'Product U details', 1),
(22, 'Product V', 6, '17.00', 'http://example.com/image22.jpg', 'Product V details', 2),
(23, 'Product W', 3, '8.00', 'http://example.com/image23.jpg', 'Product W details', 1),
(24, 'Product X', 1, '21.00', 'http://example.com/image24.jpg', 'Product X details', 2),
(25, 'Product Y', 5, '5.50', 'http://example.com/image25.jpg', 'Product Y details', 1),
(26, 'Product Z', 4, '16.00', 'http://example.com/image26.jpg', 'Product Z details', 2),
(27, 'Product AA', 7, '10.50', 'http://example.com/image27.jpg', 'Product AA details', 1),
(28, 'Product BB', 2, '19.00', 'http://example.com/image28.jpg', 'Product BB details', 2),
(29, 'Product CC', 8, '7.00', 'http://example.com/image29.jpg', 'Product CC details', 1),
(30, 'Product DD', 3, '23.00', 'http://example.com/image30.jpg', 'Product DD details', 2);

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `value` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`id`, `value`) VALUES
(1, 'Category A'),
(2, 'Category B'),
(3, 'Category C'),
(4, 'Category D'),
(5, 'Category E');

-- --------------------------------------------------------

--
-- Table structure for table `table_reservation`
--

CREATE TABLE `table_reservation` (
  `id` int(11) NOT NULL,
  `nos_person` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone_no` varchar(20) DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `table_reservation`
--

INSERT INTO `table_reservation` (`id`, `nos_person`, `date`, `time`, `contact_name`, `contact_email`, `contact_phone_no`, `notes`) VALUES
(1, 2, '2023-06-14', '12:00:00', 'John Doe', 'johndoe@example.com', '+123456789', 'Additional information for Reservation 1'),
(2, 4, '2023-06-15', '14:30:00', 'Jane Smith', 'janesmith@example.com', '+987654321', 'Additional information for Reservation 2'),
(3, 3, '2023-06-16', '18:00:00', 'Alice Johnson', 'alicejohnson@example.com', '+111222333', 'Additional information for Reservation 3'),
(4, 6, '2023-06-17', '20:15:00', 'Bob Williams', 'bobwilliams@example.com', '+444555666', 'Additional information for Reservation 4'),
(5, 1, '2023-06-18', '10:45:00', 'Emily Davis', 'emilydavis@example.com', '+777888999', 'Additional information for Reservation 5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `fk_order_details_product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_name` (`product_name`),
  ADD KEY `fk_category_id` (`category_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `table_reservation`
--
ALTER TABLE `table_reservation`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `date` (`date`),
  ADD UNIQUE KEY `time` (`time`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
