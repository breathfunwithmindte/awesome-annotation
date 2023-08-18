/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::Parser
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file Parser.js
 * @description Defines the logic to parse the annotations in a file.
 *
 * ==================================
 *
 * Defines the logic to parse the annotations in a file.
 *
 * ==================================
 *
 */

const AnnotationResult = require("../types/AnnotationResult");
const ParserComment = require("../types/ParserComment");
const { LineType, AnnotationType } = require("../types/StaticTypes");
const Parser = require("./Parser");
const os = require("os");

/** @implements Parser */
module.exports = class ParserImpl extends Parser 
{

  /**
   * This method will parse the next line after a multiline comment.
   * @description - This method will parse the next line after a multiline comment.
   * @param {Boolean} debug ; // if debug enable will print all parserComments that have type none;
   * @returns {Array<ParserComment>}
   */
  createParserCommentList(debug) 
  {
    // first we are parsing using regex the multiline comments in file.
    /** @type {ParserComment[]} */
    const parserComments = new Array();
    const multilineCommentRegex = /\/\*\*([\s\S]*?)\*\//gm;
    const multiLineComments = [...this.fileContent.matchAll(multilineCommentRegex)];
    // const split_new_line = os.platform() === "win32" ? "\r\n" : "\n";
    const split_new_line = /\r?\n/;
    // we loop the multiline comments that we parsed previous
    for (let c = 0; c < multiLineComments.length; c++) {
      const current = multiLineComments[c];
      const comment = current[0];
      const commentStartLine = this.fileContent.substring(0, current.index).split(split_new_line).length - 1;
      const commentEndLine = commentStartLine + comment.split(split_new_line).length - 1;
      const matchNonWhitespaceChar = this.fileContent.substring(current.index + current[0].length).match(/\S/);
      //const previousNextLineIndex = current.index + current[0].length + 1;
      const nextLineStartIndex = matchNonWhitespaceChar ? matchNonWhitespaceChar.index + current.index + current[0].length : current.index + current[0].length + 1
      const nextLine = this.fileContent.substring(nextLineStartIndex).split(split_new_line)[0];
      const commentLines = comment.split(split_new_line).map(line => line.trim());
      
      parserComments.push(new ParserComment(
        comment, commentStartLine, commentEndLine, nextLineStartIndex, nextLine, commentLines
      ));
    }
    if(debug) {
      console.log("====================================================================================================\n")
      console.log("Parsing comment lines and searching for comment type ... \n\n");
      console.table(parserComments.filter(f => f.commentLines.length !== 0 && f.nextLineType === "NONE").map(i => {
        return { ...i, commentLines: i.commentLines.length, comment: "<comment string>" }
      }));
      console.log(parserComments.filter(f => f.commentLines.length !== 0 && f.nextLineType === "NONE"))
      console.log("====================================================================================================")
    }
    return parserComments.filter(f => f.commentLines.length !== 0 && f.nextLineType !== "NONE");
  }

  /**
   * This method will parse the default export of a class.
   * @description - This method will parse the default export of a class.
   * @example - module.exports = class DefaultExportOfClass ...
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportClass(parserComment) 
  {
    const classNamePart = parserComment.nextLine.split("=")[1];
    this.parserResult.push(new AnnotationResult(
      AnnotationType.DEFAULT_CLASS, parserComment.commentLines, classNamePart.trim().split(" ")[1].trim(), parserComment
    ));
  }

  /**
   * This method will parse the named export of a class.
   * @description - This method will parse the named export of a class.
   * @example - module.exports.NamedExportOfClass = class NamedExportOfClass ...
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportClass(parserComment) 
  {
    const namedExportRegex = /module\.exports\.([A-Za-z0-9]+)\s*=\s*class\s+([A-Za-z0-9]+)/;
    const namedExportMatch = parserComment.nextLine.match(namedExportRegex);
    if (namedExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS, parserComment.commentLines, namedExportMatch[1], parserComment
      ));
    } 
  }

  /**
   * @description Parses and processes the default exported named function.
   * @example module.exports = function primaryFunction (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportOfNamedFunction(parserComment) 
  {
    const defaultExportRegex = /module\.exports\s*=\s*function\s+(\w+)\s*\(/;
    const defaultExportMatch = parserComment.nextLine.match(defaultExportRegex);
    if (defaultExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.DEFAULT_FUNCTION, parserComment.commentLines, defaultExportMatch[1], parserComment
      ));
    }
  }

  /**
   * @description Parses and processes the default exported named async function.
   * @example module.exports = async function primaryFunction (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportOfNamedAsyncFunction(parserComment) 
  {
    const defaultAsyncExportRegex = /module\.exports\s*=\s*async\s+function\s+(\w+)\s*\(/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.DEFAULT_ASYNC_FUNCTION, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * @description Parses and processes named exports of function, the name in these case will be the export name and not the function name.
   * @example module.exports.nameExportOfNamedFunction = function (nameExportOfNamedFunction | anonymous) (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportOfFunction(parserComment) 
  {
    /** @rule (module.exports) + (whitespaces?) + (=) + (whitespaces?) + (function) + (whitespaces?1) (Required Word) (*)  */
    const defaultAsyncExportRegex = /module\.exports\.(\w+)\s*=\s*function\s*(\w+|\(\w+\))/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.FUNCTION, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * @description Parses and processes named exports of async function, the name in these case will be the export name and not the function name.
   * @example module.exports.nameExportOfNamedFunction = async function (nameExportOfNamedFunction | anonymous) (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportOfAsyncFunction(parserComment) 
  {
    /** @rule (module.exports) + (whitespaces?) + (=) + (async) + (whitespaces?1) + (function) + (whitespaces?1) (Required Word) (*)  */
    const defaultAsyncExportRegex = /module\.exports\.(\w+)\s*=\s*async\s+function\s*(\w+|\(\w+\))/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.ASYNC_FUNCTION, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class static property without a value.
   * @description - This method will parse a class static property without a value.
   * @example static staticWithoutValue;
   * @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (;?)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticWithoutValue(parserComment) 
  {
    /** @rule (RequiredWord) + (whitespaces?) + (;?) */
    const defaultAsyncExportRegex = /static\s+(\w+)\s*;/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_STATIC_PROPERTY_UNINITIALIZED, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class static property with a value.
   * @description - This method will parse a class static property with a value.
   * @example static staticWithValue = 5;
   * @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (=) + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticWithValue(parserComment) 
  {
    const defaultAsyncExportRegex = /static\s+(\w+)\s*=\s*(.*)/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_STATIC_PROPERTY, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class property without a value.
   * @description - This method will parse a class property without a default value.
   * @example propertyWithoutValue;
   * @rule (RequiredWord) + (whitespaces?) + (;?)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassPropertyWithoutValue(parserComment) 
  {
    const defaultAsyncExportRegex = /(\w+)\s*;/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_PROPERTY_UNINITIALIZED, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class property with a value.
   * @description - This method will parse a class property with a default value.
   * @example propertyWithValue = 5;
   * @rule (RequiredWord) + (whitespaces?) + (=) + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassPropertyWithValue(parserComment) 
  {
    const defaultAsyncExportRegex = /(\w+)\s*=\s*(.*)/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_PROPERTY, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class static method.
   * @description - This method will parse a class static method.
   * @example static staticMethod () {}
   * @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticMethod(parserComment) 
  {
    const defaultAsyncExportRegex = /static\s+(\w+)\s*\(/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_STATIC_METHOD, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class static asynchronous method.
   * @description - This method will parse a class static asynchronous method.
   * @example static async staticAsyncMethod () {}
   * @rule (static) + (whitespaces?1) + (async) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticAsyncMethod(parserComment) 
  {
    const defaultAsyncExportRegex = /static\s+async\s+(\w+)\s*\(/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_STATIC_ASYNC_METHOD, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class asynchronous method.
   * @description - This method will parse a class asynchronous method.
   * @example async asyncMethod () {}
   * @rule (async) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassAsyncMethod(parserComment) 
  {
    const defaultAsyncExportRegex = /async\s+(\w+)\s*\(/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_ASYNC_METHOD, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }

  /**
   * This method will parse a class method.
   * @description - This method will parse a class method.
   * @example method () {}
   * @rule (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassMethod(parserComment) 
  {
    const defaultAsyncExportRegex = /(\w+)\s*\(/;
    const defaultAsyncExportMatch = parserComment.nextLine.match(defaultAsyncExportRegex);
    if (defaultAsyncExportMatch) {
      this.parserResult.push(new AnnotationResult(
        AnnotationType.CLASS_METHOD, parserComment.commentLines, defaultAsyncExportMatch[1], parserComment
      ));
    }
  }
};
