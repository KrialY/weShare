/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : weshare

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-07-10 15:44:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_tab`
-- ----------------------------
DROP TABLE IF EXISTS `admin_tab`;
CREATE TABLE `admin_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(150) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_tab
-- ----------------------------
INSERT INTO `admin_tab` VALUES ('1', 'admin', 'add703dc9353ed7870677767b62ce4ba');

-- ----------------------------
-- Table structure for `barrage_tab`
-- ----------------------------
DROP TABLE IF EXISTS `barrage_tab`;
CREATE TABLE `barrage_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `imgID` int(11) NOT NULL,
  `content` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of barrage_tab
-- ----------------------------
INSERT INTO `barrage_tab` VALUES ('5', '15', '22', '好吃的');
INSERT INTO `barrage_tab` VALUES ('9', '7', '43', '龙与人');
INSERT INTO `barrage_tab` VALUES ('12', '18', '44', '白天的沙漠');
INSERT INTO `barrage_tab` VALUES ('14', '19', '45', '我是bear2，我是uploader~~~');

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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collect_tab
-- ----------------------------
INSERT INTO `collect_tab` VALUES ('56', '9', '20');
INSERT INTO `collect_tab` VALUES ('60', '10', '22');
INSERT INTO `collect_tab` VALUES ('61', '7', '26');
INSERT INTO `collect_tab` VALUES ('103', '15', '25');
INSERT INTO `collect_tab` VALUES ('104', '15', '44');
INSERT INTO `collect_tab` VALUES ('105', '15', '42');
INSERT INTO `collect_tab` VALUES ('106', '7', '31');

-- ----------------------------
-- Table structure for `fans_tab`
-- ----------------------------
DROP TABLE IF EXISTS `fans_tab`;
CREATE TABLE `fans_tab` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `fansID` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of fans_tab
-- ----------------------------
INSERT INTO `fans_tab` VALUES ('4', '7', '9');
INSERT INTO `fans_tab` VALUES ('5', '7', '10');
INSERT INTO `fans_tab` VALUES ('6', '10', '9');
INSERT INTO `fans_tab` VALUES ('10', '15', '7');
INSERT INTO `fans_tab` VALUES ('11', '10', '7');
INSERT INTO `fans_tab` VALUES ('12', '18', '7');
INSERT INTO `fans_tab` VALUES ('13', '7', '15');
INSERT INTO `fans_tab` VALUES ('14', '7', '18');

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
  `status` int(3) NOT NULL DEFAULT '1' COMMENT '0：审核通过 1：未审核 2：审核不通过',
  PRIMARY KEY (`ID`),
  KEY `upload` (`UPLOADID`),
  KEY `type` (`TYPEID`),
  CONSTRAINT `type` FOREIGN KEY (`TYPEID`) REFERENCES `type_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `upload` FOREIGN KEY (`UPLOADID`) REFERENCES `user_tab` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of imgs_tab
-- ----------------------------
INSERT INTO `imgs_tab` VALUES ('20', '7', '1', 'c9b5c0453bf54cd8bd815cf0543a6a1a.jpg', '2000', '3000', '2');
INSERT INTO `imgs_tab` VALUES ('21', '9', '7', 'f03471089f13af19749f4a2349f1f716.jpg', '2000', '1328', '2');
INSERT INTO `imgs_tab` VALUES ('22', '7', '2', 'b1048eb3b565616cdec136560a4d2729.jpg', '2000', '2000', '0');
INSERT INTO `imgs_tab` VALUES ('23', '7', '3', '0520f77bfa94bacf7d53d56c57c53c94.png', '1920', '1080', '0');
INSERT INTO `imgs_tab` VALUES ('24', '7', '5', 'f65d078c76df2e795d5e5d1a05fe66c6.png', '1515', '929', '0');
INSERT INTO `imgs_tab` VALUES ('25', '7', '6', 'f1764158407124a5a16d4429cd9aa645.jpg', '2000', '1250', '0');
INSERT INTO `imgs_tab` VALUES ('26', '10', '8', '9913bafb58540c0beb95a089eb884d11.jpg', '2000', '1125', '0');
INSERT INTO `imgs_tab` VALUES ('27', '10', '8', '159ba74a8c757ab65c634f59e80b75fd.jpg', '2000', '1250', '2');
INSERT INTO `imgs_tab` VALUES ('31', '7', '1', '0025183500ab3db11d3fc635b2149edd.jpg', '2000', '1125', '0');
INSERT INTO `imgs_tab` VALUES ('36', '7', '11', '9be1af801eacc52f16929ff515406d17.jpg', '2000', '1125', '1');
INSERT INTO `imgs_tab` VALUES ('37', '7', '10', 'cd5b9675d2c5a257d5f6dee057d45c69.jpg', '2000', '1125', '2');
INSERT INTO `imgs_tab` VALUES ('38', '7', '10', '6016e75371266ba939983b128908453c.jpg', '2000', '1125', '1');
INSERT INTO `imgs_tab` VALUES ('39', '7', '10', '1e456b6a4e1e6d62400f67344bbc5a1c.jpg', '2000', '1125', '1');
INSERT INTO `imgs_tab` VALUES ('40', '7', '11', '481cb812490f1444100e2ffe9144dcbd.jpg', '2000', '1125', '1');
INSERT INTO `imgs_tab` VALUES ('41', '7', '1', '1d5d909eb578f1acdf910afdefe50198.jpg', '2000', '1125', '2');
INSERT INTO `imgs_tab` VALUES ('42', '7', '1', '3797fd4eb45a847831e1841d8ad92ecb.jpg', '6000', '4000', '2');
INSERT INTO `imgs_tab` VALUES ('43', '14', '8', 'eec318210757ab1211fb0aecdb46c05b.jpg', '2000', '1125', '0');
INSERT INTO `imgs_tab` VALUES ('44', '18', '3', '7a05622efcec9dd50275bb0313c8cd8a.jpg', '6000', '4000', '0');
INSERT INTO `imgs_tab` VALUES ('45', '19', '3', 'd422f05fa77fc16a62b630da06d1f4e0.jpg', '5464', '3640', '0');
INSERT INTO `imgs_tab` VALUES ('46', '15', '7', 'ab678316d13a035bb8f3f9092da9daeb.jpg', '4683', '5854', '0');
INSERT INTO `imgs_tab` VALUES ('47', '15', '2', '5b0a798be3ee3a8e883043436fd89705.jpg', '2550', '3187', '0');
INSERT INTO `imgs_tab` VALUES ('48', '15', '6', '35da2da6a4a381f63383ac1745e4242f.jpg', '3263', '2171', '1');
INSERT INTO `imgs_tab` VALUES ('49', '1', '12', '016ba334b4a7ef5417b0f79fc771f5a9.jpg', '3270', '4096', '1');
INSERT INTO `imgs_tab` VALUES ('50', '7', '3', 'fba4e590106babd9d0d3f0b335f7d240.jpg', '7360', '4912', '0');
INSERT INTO `imgs_tab` VALUES ('51', '18', '2', 'fed9d19f1a266360ce36bda277620fc2.jpg', '6000', '4000', '0');

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
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of like_tab
-- ----------------------------
INSERT INTO `like_tab` VALUES ('186', '9', '21');
INSERT INTO `like_tab` VALUES ('189', '7', '43');
INSERT INTO `like_tab` VALUES ('191', '10', '22');
INSERT INTO `like_tab` VALUES ('198', '7', '26');
INSERT INTO `like_tab` VALUES ('211', '18', '42');
INSERT INTO `like_tab` VALUES ('218', '18', '31');
INSERT INTO `like_tab` VALUES ('219', '15', '44');
INSERT INTO `like_tab` VALUES ('220', '15', '31');
INSERT INTO `like_tab` VALUES ('221', '15', '26');
INSERT INTO `like_tab` VALUES ('222', '7', '21');
INSERT INTO `like_tab` VALUES ('223', '7', '31');
INSERT INTO `like_tab` VALUES ('226', '18', '44');

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
INSERT INTO `type_tab` VALUES ('1', 'food', '1');
INSERT INTO `type_tab` VALUES ('2', 'animal', '3');
INSERT INTO `type_tab` VALUES ('3', 'natural', '4');
INSERT INTO `type_tab` VALUES ('4', 'person', '0');
INSERT INTO `type_tab` VALUES ('5', 'simple', '1');
INSERT INTO `type_tab` VALUES ('6', 'sky', '1');
INSERT INTO `type_tab` VALUES ('7', 'city', '1');
INSERT INTO `type_tab` VALUES ('8', 'comic', '2');
INSERT INTO `type_tab` VALUES ('9', 'game', '0');
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
  `uStatus` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_tab
-- ----------------------------
INSERT INTO `user_tab` VALUES ('1', 'krial1', 'add703dc9353ed7870677767b62ce4ba', '4c0669a25680655b6f738392b7845c35.jpg', '1111@qq.com', '0');
INSERT INTO `user_tab` VALUES ('2', 'krial2', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '222@gmail.com', '0');
INSERT INTO `user_tab` VALUES ('3', 'krial3', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '947@qq.com', '0');
INSERT INTO `user_tab` VALUES ('4', 'krial4', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '9471@qq.com', '0');
INSERT INTO `user_tab` VALUES ('5', 'admin', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '94710@qq.com', '0');
INSERT INTO `user_tab` VALUES ('6', 'admin1', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '94712@qq.com', '0');
INSERT INTO `user_tab` VALUES ('7', 'admin222', 'add703dc9353ed7870677767b62ce4ba', '61d1b4e834c08f451c7cb2638a460a59.jpg', '947102061@qq.com', '0');
INSERT INTO `user_tab` VALUES ('8', 'yuan', 'f801c2f96a7792582fd2fbb5c225bc76', 'avatar/defaultAvatar_register.jpg', 'ykl@gmail.com', '0');
INSERT INTO `user_tab` VALUES ('9', 'test1', 'add703dc9353ed7870677767b62ce4ba', 'aa5de8fcf43f1754decf96e0bcc84ff4.jpg', '6667@ada.com', '0');
INSERT INTO `user_tab` VALUES ('10', 'test2', 'add703dc9353ed7870677767b62ce4ba', '29c58b9e2ece8c79379a84559e2ec8c0.jpg', '54564@asd.com', '0');
INSERT INTO `user_tab` VALUES ('11', 'admin10', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '1232@gmail.com', '0');
INSERT INTO `user_tab` VALUES ('12', 'admin11', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', 'asdasd@qq.com', '0');
INSERT INTO `user_tab` VALUES ('13', 'admin12', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', 'asdsad213@qq.com', '0');
INSERT INTO `user_tab` VALUES ('14', 'admin13', 'add703dc9353ed7870677767b62ce4ba', '5574cbf21ce1c513f25353c6a986a330.jpg', 'qe34234@qq.com', '1');
INSERT INTO `user_tab` VALUES ('15', 'newone', 'add703dc9353ed7870677767b62ce4ba', 'd0abea79bd29b0e16bbff5fba5aee172.jpg', '123123123@qq.com', '0');
INSERT INTO `user_tab` VALUES ('16', 'newtwo', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '324324@qq.com', '0');
INSERT INTO `user_tab` VALUES ('17', 'newthree', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '13123@qq.com', '0');
INSERT INTO `user_tab` VALUES ('18', 'bear1', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '4234@gmail.com', '0');
INSERT INTO `user_tab` VALUES ('19', 'bear2', 'add703dc9353ed7870677767b62ce4ba', 'avatar/defaultAvatar_register.jpg', '123123@qq.com', '0');
DROP TRIGGER IF EXISTS `tr`;
DELIMITER ;;
CREATE TRIGGER `tr` AFTER UPDATE ON `imgs_tab` FOR EACH ROW begin
  update type_tab
  set `total` = (select count(ID) from imgs_tab where `status`=0 AND `TYPEID`= type_tab.`ID`);
  delete from barrage_tab where `imgID`=NEW.`ID` AND NEW.`status`=2;
end
;;
DELIMITER ;
