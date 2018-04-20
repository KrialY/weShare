/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : weshare

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-04-20 19:31:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `collect_tab`
-- ----------------------------
DROP TABLE IF EXISTS `collect_tab`;
CREATE TABLE `collect_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `USERID` int(10) unsigned NOT NULL,
  `IMGID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `collectuser` (`USERID`),
  KEY `collectimg` (`IMGID`),
  CONSTRAINT `collectimg` FOREIGN KEY (`IMGID`) REFERENCES `imgs_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collectuser` FOREIGN KEY (`USERID`) REFERENCES `user_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect_tab
-- ----------------------------
INSERT INTO `collect_tab` VALUES ('19', '7', '13');
INSERT INTO `collect_tab` VALUES ('21', '8', '15');
INSERT INTO `collect_tab` VALUES ('22', '8', '14');
INSERT INTO `collect_tab` VALUES ('43', '7', '9');

-- ----------------------------
-- Table structure for `imgs_tab`
-- ----------------------------
DROP TABLE IF EXISTS `imgs_tab`;
CREATE TABLE `imgs_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `UPLOADID` int(10) unsigned NOT NULL,
  `TYPEID` int(10) unsigned NOT NULL,
  `src` varchar(250) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `upload` (`UPLOADID`),
  KEY `type` (`TYPEID`),
  CONSTRAINT `type` FOREIGN KEY (`TYPEID`) REFERENCES `type_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `upload` FOREIGN KEY (`UPLOADID`) REFERENCES `user_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of imgs_tab
-- ----------------------------
INSERT INTO `imgs_tab` VALUES ('8', '7', '1', 'ac814dca92b84aa6c78e4cbb555010bc.jpg', '750', '2690');
INSERT INTO `imgs_tab` VALUES ('9', '7', '1', '5aeb749a3fcc41327448c0cd5cb0fb4c.jpg', '750', '1630');
INSERT INTO `imgs_tab` VALUES ('10', '7', '1', 'e9de0b1b823914d3ef7bdc834a385970.jpg', '750', '1630');
INSERT INTO `imgs_tab` VALUES ('11', '7', '2', 'af884cd9a707b6b0c92a273aaa9e97ed.png', '90', '54');
INSERT INTO `imgs_tab` VALUES ('12', '7', '1', '156634c0ab34630b5752595efd02fc74.png', '48', '48');
INSERT INTO `imgs_tab` VALUES ('13', '7', '9', 'cad3f459fe4b864339593a06abe8c729.png', '60', '57');
INSERT INTO `imgs_tab` VALUES ('14', '7', '9', '26787d4e157080b5b880abfad931829d.jpg', '1920', '1080');
INSERT INTO `imgs_tab` VALUES ('15', '10', '8', '87b538955e48a89e77c3a47a6877c0a2.jpg', '2500', '1406');

-- ----------------------------
-- Table structure for `like_tab`
-- ----------------------------
DROP TABLE IF EXISTS `like_tab`;
CREATE TABLE `like_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `USERID` int(10) unsigned NOT NULL,
  `IMGID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `likeimg` (`IMGID`),
  KEY `likeuser` (`USERID`),
  CONSTRAINT `likeimg` FOREIGN KEY (`IMGID`) REFERENCES `imgs_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likeuser` FOREIGN KEY (`USERID`) REFERENCES `user_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like_tab
-- ----------------------------
INSERT INTO `like_tab` VALUES ('103', '7', '8');
INSERT INTO `like_tab` VALUES ('105', '7', '13');
INSERT INTO `like_tab` VALUES ('107', '10', '14');
INSERT INTO `like_tab` VALUES ('108', '8', '15');
INSERT INTO `like_tab` VALUES ('109', '7', '11');
INSERT INTO `like_tab` VALUES ('144', '7', '10');
INSERT INTO `like_tab` VALUES ('165', '7', '12');
INSERT INTO `like_tab` VALUES ('168', '7', '9');
INSERT INTO `like_tab` VALUES ('171', '7', '14');

-- ----------------------------
-- Table structure for `type_tab`
-- ----------------------------
DROP TABLE IF EXISTS `type_tab`;
CREATE TABLE `type_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `typename` varchar(20) NOT NULL,
  `total` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type_tab
-- ----------------------------
INSERT INTO `type_tab` VALUES ('1', 'food', '4');
INSERT INTO `type_tab` VALUES ('2', 'animal', '1');
INSERT INTO `type_tab` VALUES ('3', 'natural', '0');
INSERT INTO `type_tab` VALUES ('4', 'person', '0');
INSERT INTO `type_tab` VALUES ('5', 'simple', '0');
INSERT INTO `type_tab` VALUES ('6', 'sky', '0');
INSERT INTO `type_tab` VALUES ('7', 'city', '0');
INSERT INTO `type_tab` VALUES ('8', 'comic', '1');
INSERT INTO `type_tab` VALUES ('9', 'game', '2');
INSERT INTO `type_tab` VALUES ('10', 'space', '0');
INSERT INTO `type_tab` VALUES ('11', 'healthy', '0');
INSERT INTO `type_tab` VALUES ('12', 'happiness', '0');

-- ----------------------------
-- Table structure for `user_tab`
-- ----------------------------
DROP TABLE IF EXISTS `user_tab`;
CREATE TABLE `user_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(150) NOT NULL,
  `avatar` varchar(250) DEFAULT NULL,
  `email` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_tab
-- ----------------------------
INSERT INTO `user_tab` VALUES ('1', 'krial1', '123456', null, '1111');
INSERT INTO `user_tab` VALUES ('2', 'krial2', '123456789', null, '222');
INSERT INTO `user_tab` VALUES ('3', 'krial3', '123456', null, '947@qq.com');
INSERT INTO `user_tab` VALUES ('4', 'krial4', '123456', null, '9471@qq.com');
INSERT INTO `user_tab` VALUES ('5', 'admin', '1213456', null, '94710@qq.com');
INSERT INTO `user_tab` VALUES ('6', 'admin1', '147258339', null, '94712@qq.com');
INSERT INTO `user_tab` VALUES ('7', 'admin22', 'add703dc9353ed7870677767b62ce4ba', null, '9427@qq.com');
INSERT INTO `user_tab` VALUES ('8', 'yuan', 'f801c2f96a7792582fd2fbb5c225bc76', null, 'ykl@gmail.com');
INSERT INTO `user_tab` VALUES ('9', 'test1', 'add703dc9353ed7870677767b62ce4ba', null, '6667@ada.com');
INSERT INTO `user_tab` VALUES ('10', 'test2', 'add703dc9353ed7870677767b62ce4ba', null, '54564@asd.com');
DROP TRIGGER IF EXISTS `tr`;
DELIMITER ;;
CREATE TRIGGER `tr` AFTER INSERT ON `imgs_tab` FOR EACH ROW begin
  update type_tab
  set `total` = (select count(ID) from imgs_tab where `TYPEID`= type_tab.`ID`);
end
;;
DELIMITER ;
