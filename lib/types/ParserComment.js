/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::ParserComment
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file ParserComment.js
 * @description Defines custom errors that can be thrown by the `Annotation` function.
 *
 * ==================================
 *
 * * comment something
 *
 * ==================================
 *
 */

const { LineType } = require("./StaticTypes");

/** @Type */
module.exports = class ParserComment {

  /** @type {String} comment */
  comment; // comments

  /** @type {Number} commentStartLine */
  commentStartLine;

  /** @type {Number} commentEndLine */
  commentEndLine;

  /** @type {Number} nextLineStartIndex */
  nextLineStartIndex;

  /** @type {String} nextLineType */
  nextLineType;

  /** @type {String} nextLine */
  nextLine; // next line after comment

  /** @type {String[]} commentLines */
  commentLines; // actually all the comments lines inside that starts with operator & or %;

  constructor (comment, commentStartLine, commentEndLine, nextLineStartIndex, nextLine, commentLines)
  {
    this.comment = comment;
    this.commentStartLine = commentStartLine + 1;
    this.commentEndLine = commentEndLine + 1;
    this.nextLineStartIndex = nextLineStartIndex;
    this.nextLine = nextLine.trim();
    this.setType();
    this.commentLines = commentLines.filter(f => f.startsWith("* %") || f.startsWith("* &"));
    //this.log();
  }

  setType ()
  {
    this.nextLineType = "unknow";
    if (/^module\.exports\s*=\s*class\s+\w+/.test(this.nextLine)) {
      this.nextLineType = LineType["DEFAULT_EXPORT_CLASS"];

    } else if (/^module\.exports\.[\w]+\s*=\s*class\s+\w+/.test(this.nextLine)) {
      this.nextLineType = LineType["NAMED_EXPORT_CLASS"];;

    } else if (/^module\.exports\s*=\s*function\s+\w+/.test(this.nextLine)) {
      this.nextLineType = LineType["DEFAULT_EXPORT_NAMED_FUNCTION"];

    } else if (/^module\.exports\s*=\s*async\s+function\s+\w+/.test(this.nextLine)) {
      this.nextLineType = LineType["DEFAULT_EXPORT_NAMED_ASYNC_FUNCTION"];

    } else if (/^module\.exports\.[\w]+\s*=\s*function\s+(\w+|\(.*\))/.test(this.nextLine)) {
      this.nextLineType = LineType["NAMED_EXPORT_FUNCTION"];

    } else if (/^module\.exports\.[\w]+\s*=\s*async\s+function\s+(\w+|\(.*\))/.test(this.nextLine)) {
      this.nextLineType = LineType["NAMED_EXPORT_ASYNC_FUNCTION"];

    }else if (/^static\s+\w+\s*=\s*.+;?$/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_STATIC_PROPERTY_WITH_VALUE"];
      
    } else if (/^static\s+\w+\s*;\s*(\/\/.*)?$/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_STATIC_PROPERTY_WITHOUT_VALUE"];
      
    } else if (/^\w+\s*=\s*.+;?$/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_PROPERTY_WITH_VALUE"];
      
    } else if (/^\w+\s*;\s*(\/\/.*)?$/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_PROPERTY_WITHOUT_VALUE"];
      
    } else if (/^static\s+\w+\s*\(/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_STATIC_METHOD"];
    
    } else if (/^static\s+async\s+\w+\s*\(/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_STATIC_ASYNC_METHOD"];
    
    } else if (/^async\s+\w+\s*\(/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_ASYNC_METHOD"];
    
    } else if (/^\w+\s*\(/.test(this.nextLine)) {
      this.nextLineType = LineType["CLASS_METHOD"];
    
    } else {
      this.nextLineType = LineType["NONE"];
    }
  }


  log () 
  {
    console.log("==================================================");
    console.log(`commentStartLine: ${this.commentStartLine}; commentEndLine: ${this.commentEndLine}; nextLineStartIndex: ${this.nextLineStartIndex}`)
    console.log(`\n\x1b[31m${this.nextLine}\x1b[0m\n`);
    console.log(`\x1b[35m${this.nextLineType}\x1b[0m\n`);
    //console.log(this.comment);
    // console.log(this.commentLines.length);
    console.log("==================================================\n");
  }

};
