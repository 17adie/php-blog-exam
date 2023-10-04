/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : php_blog_exam_db

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 29/09/2023 16:24:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_comments_tbl
-- ----------------------------
DROP TABLE IF EXISTS `blog_comments_tbl`;
CREATE TABLE `blog_comments_tbl`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `blogId` int NULL DEFAULT NULL,
  `status` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_comments_tbl
-- ----------------------------
INSERT INTO `blog_comments_tbl` VALUES (1, 'fist comment', '2023-09-29 16:01:40', 1, NULL);
INSERT INTO `blog_comments_tbl` VALUES (2, '2nd comment', '2023-09-29 16:01:46', 1, NULL);
INSERT INTO `blog_comments_tbl` VALUES (3, '3rd comment', '2023-09-28 16:13:19', 1, NULL);
INSERT INTO `blog_comments_tbl` VALUES (4, '4th comment', '2023-09-29 16:22:59', 1, NULL);

-- ----------------------------
-- Table structure for blog_tbl
-- ----------------------------
DROP TABLE IF EXISTS `blog_tbl`;
CREATE TABLE `blog_tbl`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of blog_tbl
-- ----------------------------
INSERT INTO `blog_tbl` VALUES (1, 'test', 'content', '2023-09-28 14:27:37');
INSERT INTO `blog_tbl` VALUES (2, 'test2', '12', '2023-09-29 14:37:36');
INSERT INTO `blog_tbl` VALUES (3, 'title 2', 'content 2', '2023-09-29 15:03:44');

SET FOREIGN_KEY_CHECKS = 1;
