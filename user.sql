CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) DEFAULT NULL,
  `rol` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `telegram_id_UNIQUE` (`telegram_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci