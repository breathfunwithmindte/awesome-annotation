/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::utils::read_file
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file read_file.js
 * @description Contains a utility function to read the contents of a file.
 * 
 * ==================================
 * 
 * Contains a utility function to read the contents of a file.
 * 
 * ==================================
 * 
 */

const fs = require("fs");

module.exports = function (path) 
{

  return fs.readFileSync(require("path").resolve() + path, "utf-8");

}