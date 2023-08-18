/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::Parser
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file Parser.js
 * @description The primary entry point for the Annotation library. Implements the logic to import and parse annotations from a file.
 * 
 * ==================================
 * 
 * * Entry Point
 * 
 * ==================================
 * 
 */

const ParserImpl = require("./parser/ParserImpl");
const AnnotationImport = require("./types/AnnotationImport");
const AnnotationOption = require("./types/AnnotationOption");
const file_exports = require("./utils/file_exports");
const read_file = require("./utils/read_file");


/**
 * @primaryFunction
 * @param {String} filePath required - will throw an error if file not exist; FilePath always starts from root directory;
 * @param {import("./types/AnnotationOption").AnnotationOptionProps} options
 * @returns {AnnotationImport}
 * 
 */
module.exports = function Annotation (filePath, options)
{

  const annoOptions = new AnnotationOption(options || {});

  const fileContentAsString = read_file(filePath);
  const fileContentExports = file_exports(filePath, annoOptions);

  // console.log(fileContentExports)
  // console.log(fileContentAsString);

  const parser = new ParserImpl(annoOptions);

  parser.setFileContent(fileContentAsString); 
  parser.parseAnnotations();

  return new AnnotationImport(annoOptions, parser.getParsedResult(), fileContentExports, fileContentAsString);

}