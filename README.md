# Polymart_Redeem
Redeem a product once per discord account based on your role.

# Inslallation
You need to create a `.env` file with the following environment variables:
```properties
BOT_TOKEN=discord bot token
RESOURCE_ID=polymart resource id
POLYMART_KEY=polymart api token
ROLE_TO_REDEEM=discord role allowed to redeem

# This text is inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#using-environment-variables

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQL Server and SQLite.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="mysql://new_user:ajc4FDafC%3f@135.125.148.72:3306/polymart_discord_buyers_from_discord?schema=public"
```
Then install the dependencies: `npm install` and also make sure to create the database:
```sql
-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Gazdă: localhost:3306
-- Timp de generare: iun. 28, 2021 la 02:28 PM
-- Versiune server: 10.3.28-MariaDB-log-cll-lve
-- Versiune PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Bază de date: `andrchgo_polymart_discord_buyers`
--

-- --------------------------------------------------------

--
-- Structură tabel pentru tabel `polymart_reedems_from_discord`
--

CREATE TABLE `polymart_reedems_from_discord` (
  `id` int(11) NOT NULL,
  `discord_user_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  `redeem_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `polymart_user` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Indexuri pentru tabele eliminate
--

--
-- Indexuri pentru tabele `polymart_reedems_from_discord`
--
ALTER TABLE `polymart_reedems_from_discord`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pentru tabele eliminate
--

--
-- AUTO_INCREMENT pentru tabele `polymart_reedems_from_discord`
--
ALTER TABLE `polymart_reedems_from_discord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

```
Then you can start your bot with `npm run dev`
