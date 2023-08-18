/**
 * @name PerfeAnnotation
 * @namespace PerfeAnnotation::types::AnnotationStandaloneItem
 * @license MIT
 * @copyright 2023 - perfect-evolution
 * @author Mike Karypidis
 * @link https://github.com
 * @file AnnotationStandaloneItem.js
 * @description The AnnotationStandaloneItem is a type that represents each element of the Annotation parsed in the file.
 * 
 * 
 * ==================================
 * 
 * AnnotationStandaloneItem includes all fields from AnnotationItem but also contain
 * 
 * ~> annotationType: StaticTypes::AnnotationType, 
 * ~> ItemName: The name of the exported item where this annotation are applyed like class, function, property, method etc.
 * ~> name change to AnnotationName the actuall annotation name
 * ~> type removed
 * 
 * ==================================
 * 
 */

/** @Type */
module.exports = class AnnotationStandaloneItem 
{
  /** @type{String}                 */                      Type;           // annotation type
  /** @type{String}                 */                      AnnotationName; // annotation name
  /** @type{String}                       */                ItemName;       // item name
  /** @type{Map<String, Object>}    */                      Props;          // props

  /**
   * 
   * @param {String} type 
   * @param {String} name 
   * @param {String} itemname
   * @param {*} props 
   */
  constructor (type, name, itemname, props)
  {
    this.AnnotationName = name;
    this.ItemName = itemname;
    this.Type = type;
    this.Props = props;
  }

}