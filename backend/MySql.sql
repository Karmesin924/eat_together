CREATE DATABASE `eat_togeher_db`;
USE eat_together_db;

CREATE TABLE `user_info` (
                             `id` bigint NOT NULL AUTO_INCREMENT,
                             `email` varchar(45) NOT NULL,
                             `name` varchar(10) NOT NULL,
                             `nickname` varchar(45) NOT NULL,
                             `birth_date` date NOT NULL,
                             `password` varchar(255) NOT NULL,
                             `gender` varchar(10) DEFAULT NULL,
                             PRIMARY KEY (`id`),
                             KEY `idx_nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `post_info` (
                             `id` int NOT NULL AUTO_INCREMENT,
                             `title` varchar(45) NOT NULL,
                             `content` varchar(1000) NOT NULL,
                             `nickname` varchar(45) NOT NULL,
                             `created_date` datetime NOT NULL,
                             `user_nickname` varchar(45) NOT NULL,
                             PRIMARY KEY (`id`),
                             KEY `user_nickname` (`user_nickname`),
                             CONSTRAINT `post_info_ibfk_1` FOREIGN KEY (`user_nickname`) REFERENCES `user_info` (`nickname`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comment_info` (
                                `id` int NOT NULL AUTO_INCREMENT,
                                `post_id` int DEFAULT NULL,
                                `content` varchar(255) NOT NULL,
                                `nickname` varchar(255) NOT NULL,
                                `created_date` datetime NOT NULL,
                                `user_nickname` varchar(45) DEFAULT NULL,
                                PRIMARY KEY (`id`),
                                KEY `post_id` (`post_id`),
                                KEY `user_nickname` (`user_nickname`),
                                CONSTRAINT `comment_info_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post_info` (`id`) ON DELETE CASCADE,
                                CONSTRAINT `comment_info_ibfk_2` FOREIGN KEY (`user_nickname`) REFERENCES `user_info` (`nickname`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
