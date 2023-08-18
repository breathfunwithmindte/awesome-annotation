/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::AnnotationResult
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file AnnotationResult.js
 * @description The AnnotationResult is a result type that represents the results of parsing annotations. 
 * 
 * ==================================
 * 
 * The AnnotationResult is a result type that represents the results of parsing annotations. 
 * It is returned by the parsing process and contains a list of AnnotationItem objects. 
 * Each instance of AnnotationResult contains the following properties:
 * 
 * type: A string that represents the type of the result.
 * annotations: An array of AnnotationItem objects that represent the annotations parsed.
 * name: A string that represents the name of the annotations.
 * debug: An instance of ParserComment that provides additional debugging information.
 * 
 * In this project, 
 * the goal is to parse annotations in JavaScript code and extract the relevant information about each annotation. 
 * The AnnotationResult and AnnotationItem types are used
 * to represent the results of this parsing process and provide a way to access the information about each annotation
 * 
 * ==================================
 * 
 */

const ParserComment = require("./ParserComment");
const AnnotationItem = require("./AnnotationItem");

/** @Type */
module.exports = class AnnotationResult
{

  /**
   * @type {String} type
   */
  type;

  /**
   * @type {Array<AnnotationItem>}
   */
  annotations;

  /**
   * @type {String} name;
   */
  name;

  /**
   * @type {ParserComment}
   */
  debug;

  /**
   * 
   * @param {String} type 
   * @param {String[]} annotations 
   * @param {String} name 
   * @param {ParserComment} debug 
   */
  constructor (type, annotations, name, debug)
  {
    this.type = type;
    this.annotations = annotations.map(a => {
      let anno_prop_type = a.startsWith("* %") ? "primitive" : "reference";
      let matchAnno = a.match(/@(\w+)/g);
      if(!matchAnno) return null;
      let anno_name = matchAnno[0];
      let anno_props = a.split(":=").map(ai => ai.trim())[1] || "";
      anno_props = anno_props.trim().split(";;").map(i => {
        if(i.split("=").length > 1) {
          return { key: i.split("=")[0], value: this.#checkForNumberOrBoolean(i.split("=")[1]) }
        }else {
          return this.#checkForNumberOrBoolean(i)
        }
      }).filter(f => f !== null);
      return new AnnotationItem(anno_prop_type, anno_name, anno_props);
    }).filter(f => f !== null);
    this.name = name;
    this.debug = debug;
  }


  #checkForNumberOrBoolean (value)
  {
    value = value.trim()
    if(!value) return null;
    if(!isNaN(value)) return Number(value);
    if(value === "true" || value === "True") return true;
    if(value === "false" || value === "False") return false;
    if(value === "null" || value === "None" || value === "NULL" || value === "undefined") return null;
    return value;
  }

}