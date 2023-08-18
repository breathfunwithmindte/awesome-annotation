/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::AnnotationImport
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file AnnotationImport.js
 * @description The AnnotationImport is a type that will be returned at the end of the importing proccess. 
 * 
 * ==================================
 * 
 * 
 * ==================================
 * 
 */

const AnnotationOption = require("./AnnotationOption");
const AnnotationResult = require("./AnnotationResult");
const AnnotationStandaloneItem = require("./AnnotationStandaloneItem");

/** @Type */
module.exports = class AnnotationImport 
{
  /** @type {*} */                                  exports;     
  /** @type {AnnotationOption} */                   options;
  /** @type {Array<AnnotationResult>} */            result;     
  /** @type {String} */                             fileAsString;
  /** @type {AnnotationStandaloneItem[]} */         annotations = new Array();

  /**
   * 
   * @param {AnnotationOption} options 
   * @param {Array<AnnotationResult>} result
   * @param {*} exports
   * @param {String} fileAsString
   */
  constructor (options, result, exports, fileAsString)
  {
    this.options = options;
    this.result = result;
    this.exports = exports;
    this.fileAsString = fileAsString;
    this.#setAnnotations()
  }

  #setAnnotations ()
  {
    this.result.map(r => {
      const name = r.name;
      const type = r.type;
      r.annotations.map(ranno => {
        if(ranno.type === "primitive") {
          this.annotations.push(new AnnotationStandaloneItem(
            type, ranno.name, name, ranno.props
          ))
        } else {
          this.annotations.push(new AnnotationStandaloneItem(
            type, ranno.name, name, ranno.props.map(rannop => { return this.exports[rannop] })
          ))
        }
      })
    })
  }

  /** @returns {Array<AnnotationStandaloneItem>} */
  getAnnos (classname){
    if(classname) return this.annotations.filter(f => f.ItemName === classname)
    return this.annotations
  }


}