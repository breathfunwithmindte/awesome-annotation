/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::AnnotationItem
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file AnnotationItem.js
 * @description The AnnotationItem is a type that represents each element of the AnnotationResult.annotations array. 
 * It contains information about a single annotation, including its type, name, and properties.
 * 
 * ==================================
 * 
 * The AnnotationItem is a type that represents each element of the AnnotationResult.annotations array. 
 * It contains information about a single annotation, including its type, name, and properties.
 * Each instance of AnnotationItem contains the following properties:
 * 
 * type: A string that represents the type of the annotation. It can be either 'primitive' or 'reference'.
 * name: A string that represents the name of the annotation.
 * props: A map of strings to objects that represents the properties of the annotation.
 * 
 * In this project, 
 * the goal is to parse annotations in JavaScript code and extract the relevant information about each annotation. 
 * The AnnotationResult and AnnotationItem types are used
 * to represent the results of this parsing process and provide a way to access the information about each annotation
 * 
 * ==================================
 * 
 */

/** @Type */
module.exports = class AnnotationItem 
{
  /** @type{String} */                      type;       // Enum<primitive || reference>
  /** @type{String} */                      name;
  /** @type{Map<String, Object>} */         props;

  /**
   * 
   * @param {String} type 
   * @param {String} name 
   * @param {*} props 
   */
  constructor (type, name, props)
  {
    this.type = type;
    this.name = name;
    this.props = props;
  }

}