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

const AnnotationOption = require("../types/AnnotationOption");
const AnnotationResult = require("../types/AnnotationResult");
const ParserComment = require("../types/ParserComment");
const { LineType } = require("../types/StaticTypes");

/** @interface */
module.exports = class Parser 
{

  /** @type {String} */
  fileContent;

  /** @type {Array<AnnotationResult>} */
  parserResult = new Array();

  /** @type {AnnotationOption} options */
  options;

  /**
   * @param {AnnotationOption} annotationOption
   */
  constructor(annotationOption) { this.options = annotationOption; }

  setFileContent(content) { this.fileContent = content; }

  parseAnnotations() {
    const parserCommentList = this.createParserCommentList(this.options.debug);

    // ? helps for debug sometimes
    // console.table(
    //   parserCommentList.filter(f => f.nextLineType === "CLASS_PROPERTY_WITH_VALUE" 
    //   || f.nextLineType === "CLASS_PROPERTY_WITHOUT_VALUE" || f.nextLineType === "CLASS_STATIC_PROPERTY_WITH_VALUE" 
    //   || f.nextLineType === "CLASS_STATIC_PROPERTY_WITHOUT_VALUE" || f.nextLineType === "NONE"
    //   ).map(i => {return {...i,
    //       comment: i.comment.substring(0, 50), commentLines: i.commentLines.length}})
    //   );
    for (let cc = 0; cc < parserCommentList.length; cc++) {
      const current = parserCommentList[cc];
      switch (current.nextLineType) {
        case LineType.DEFAULT_EXPORT_CLASS:
          // handle DEFAULT_EXPORT_CLASS type
          this.parseDefaultExportClass(current);
          break;
      
        case LineType.NAMED_EXPORT_CLASS:
          // handle NAMED_EXPORT_CLASS type
          this.parseNamedExportClass(current);
          break;
      
        case LineType.DEFAULT_EXPORT_NAMED_FUNCTION:
          // handle DEFAULT_EXPORT_NAMED_FUNCTION type
          this.parseDefaultExportOfNamedFunction(current);
          break;
      
        case LineType.DEFAULT_EXPORT_NAMED_ASYNC_FUNCTION:
          // handle DEFAULT_EXPORT_NAMED_ASYNC_FUNCTION type
          this.parseDefaultExportOfNamedAsyncFunction(current);
          break;
      
        case LineType.NAMED_EXPORT_FUNCTION:
          // handle NAMED_EXPORT_FUNCTION type
          this.parseNamedExportOfFunction(current);
          break;
      
        case LineType.NAMED_EXPORT_ASYNC_FUNCTION:
          // handle NAMED_EXPORT_ASYNC_FUNCTION type
          this.parseNamedExportOfAsyncFunction(current);
          break;
      
        case LineType.CLASS_STATIC_PROPERTY_WITH_VALUE:
          // handle CLASS_STATIC_PROPERTY_WITH_VALUE type
          this.parseClassStaticWithValue(current);
          break;
      
        case LineType.CLASS_STATIC_PROPERTY_WITHOUT_VALUE:
          // handle CLASS_STATIC_PROPERTY_WITHOUT_VALUE type
          this.parseClassStaticWithoutValue(current);
          break;
      
        case LineType.CLASS_PROPERTY_WITH_VALUE:
          // handle CLASS_PROPERTY_WITH_VALUE type
          this.parseClassPropertyWithValue(current);
          break;
      
        case LineType.CLASS_PROPERTY_WITHOUT_VALUE:
          // handle CLASS_PROPERTY_WITHOUT_VALUE type
          this.parseClassPropertyWithoutValue(current);
          break;
      
        case LineType.CLASS_STATIC_METHOD:
          // handle CLASS_STATIC_METHOD type
          this.parseClassStaticMethod(current);
          break;
      
        case LineType.CLASS_STATIC_ASYNC_METHOD:
          // handle CLASS_STATIC_ASYNC_METHOD type
          this.parseClassStaticAsyncMethod(current);
          break;
      
        case LineType.CLASS_ASYNC_METHOD:
          // handle CLASS_ASYNC_METHOD type
          this.parseClassAsyncMethod(current);
          break;
      
        case LineType.CLASS_METHOD:
          // handle CLASS_METHOD type
          this.parseClassMethod(current);
          break;

        default:
          // handle default or unknown type
          break;
      }
    }
    // this.parserResult.map(i => {
    //   console.table(i.annotations);
    //   console.log({ ...i, debug: null, annotations: null, line: i.debug.nextLine, dtype: i.debug.nextLineType })
    // })
    //require("fs").writeFileSync(require("path").resolve() + "/testone.json", JSON.stringify(this.parserResult))
  }

  /**
   * 
   * @return {Array<AnnotationResult>} parsedResult 
   */
  getParsedResult () { return this.parserResult }

  /**
   * This method will parse the next line after a multiline comment.
   * @description - This method will parse the next line after a multiline comment.
   * @param {Boolean} debug ; // if debug enable will print all parserComments that have type none;
   * @returns {Array<ParserComment>}
   */
  createParserCommentList(debug) {}

  /**
   * This method will parse the default export of a class.
   * @description - This method will parse the default export of a class.
   * @example - module.exports = class DefaultExportOfClass ...
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportClass(parserComment) {}

  /**
   * This method will parse the named export of a class.
   * @description - This method will parse the named export of a class.
   * @example - module.exports.NamedExportOfClass = class NamedExportOfClass ...
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportClass(parserComment) {}

  /**
   * @description Parses and processes the default exported named function.
   * @example module.exports = function primaryFunction (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportOfNamedFunction(parserComment) {}

  /**
   * @description Parses and processes the default exported named async function.
   * @example module.exports = async function primaryFunction (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseDefaultExportOfNamedAsyncFunction(parserComment) {}

  /**
   * @description Parses and processes named exports of function, the name in these case will be the export name and not the function name.
   * @example module.exports.nameExportOfNamedFunction = function (nameExportOfNamedFunction | anonymous) (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportOfFunction(parserComment) {}

  /**
   * @description Parses and processes named exports of async function, the name in these case will be the export name and not the function name.
   * @example module.exports.nameExportOfNamedFunction = async function (nameExportOfNamedFunction | anonymous) (arg1, ...) {...}
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseNamedExportOfAsyncFunction(parserComment) {}

  /**
   * This method will parse a class static property without a value.
   * @description - This method will parse a class static property without a value.
   * @example static staticWithoutValue;
   * @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (;?)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticWithoutValue(parserComment) {}

  /**
   * This method will parse a class static property with a value.
   * @description - This method will parse a class static property with a value.
   * @example static staticWithValue = 5;
   * @rule @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (=) + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticWithValue(parserComment) {}

  /**
   * This method will parse a class property without a value.
   * @description - This method will parse a class property without a default value.
   * @example propertyWithoutValue;
   * @rule (RequiredWord) + (whitespaces?) + (;?)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassPropertyWithoutValue(parserComment) {}

  /**
   * This method will parse a class property with a value.
   * @description - This method will parse a class property with a default value.
   * @example propertyWithValue = 5;
   * @rule (RequiredWord) + (whitespaces?) + (=) + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassPropertyWithValue(parserComment) {}

  /**
   * This method will parse a class static method.
   * @description - This method will parse a class static method.
   * @example static staticMethod () {}
   * @rule (static) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticMethod(parserComment) {}

  /**
   * This method will parse a class static asynchronous method.
   * @description - This method will parse a class static asynchronous method.
   * @example static async staticAsyncMethod () {}
   * @rule (static) + (whitespaces?1) + (async) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassStaticAsyncMethod(parserComment) {}

  /**
   * This method will parse a class asynchronous method.
   * @description - This method will parse a class asynchronous method.
   * @example async asyncMethod () {}
   * @rule (async) + (whitespaces?1) + (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassAsyncMethod(parserComment) {}

  /**
   * This method will parse a class method.
   * @description - This method will parse a class method.
   * @example method () {}
   * @rule (RequiredWord) + (whitespaces?) + (() + (*)
   * @param {ParserComment} parserComment
   * @returns {void}
   */
  parseClassMethod(parserComment) {}
};
