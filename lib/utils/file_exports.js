/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::utils::file_exports
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file file_exports.js
 * @description Contains a utility function to read the contents of a file.
 * 
 * ==================================
 * 
 * Contains a utility function to read the contents of a file using js require function.
 * 
 * ==================================
 * 
 */

module.exports = function (path, cached) 
{

const fileContent = require(require("path").resolve() + path);

if(!cached) {
  delete require.cache[require("path").resolve() + path]
}

return fileContent;
}