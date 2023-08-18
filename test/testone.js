/**
 * @test file
 */



/**
 * % @DefaultExportOfClass something=123 ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation          
 * @NonReadableAnnotation - just docs
 */
module.exports = class DefaultExportOfClass extends Error
{
  /**
   * %@AnnotationStaticPropertyWithoutDefaultValue
   * 
   */
  static propertyWithoutDefaultValue;

  /**
   * %@AnnotationStaticPropertyWithDefaultValue
   */
  static propertyWithDefaultValue = 5;

  /**
   * %@AnnotationPropertyWithoutDefaultValue
   * 
   */
  propertyWithoutDefaultValue;

  /**
   * %@AnnotationPropertyWithDefaultValue
   */
  propertyWithDefaultValue = 5;

  /**
   * %@AnnotationStaticMethod
   */
  static staticMethod () {}

  /**
   * %@AnnotationStaticAsyncMethod
   */
  static async staticAsyncMethod () {}

  /**
   * %@AnnotationAsyncMethod
   */
  async asyncMethod () {}

  /**
   * %@AnnotationMethod
   */
  justmethod () {}

}


/**
 * % @DefaultExportOfNamedFunction some argument here ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation something
 * @NonReadableAnnotation - just docs - we will not cover the case without named function
 */
module.exports =   function DefaultExportOfNamedFunction (asdasdasd)
{}

/**
 * % @DefaultExportOfNamedAsyncFunction some argument here ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation something
 * @NonReadableAnnotation - just docs - we will not cover the case without named function
 */
module.exports =async  function  DefaultExportOfNamedAsyncFunction    (asdasd)
{}

/**
 * % @wowow
 * & @nicenice
 * & @NamedClassWithoutSpacesOnEqualAndExtends
 * @NonReadableAnnotation - just docs
 */
module.exports.asdasd=class NamedClassWithoutSpacesOnEqualAndExtends extends Error{}

/**
 * % @ExportWithNameForClass some argument here ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation something
 * @NonReadableAnnotation - just docs
 */
module.exports.ExportWithNameForClass = class ExportWithNameForClass extends Error
{
  /**
   * %@AnnotationStaticPropertyWithoutDefaultValue
   * 
   */
   staticpropertyWithoutDefaultValue;//asdasd

   /**
    * %@AnnotationStaticPropertyWithDefaultValue
    */
   static            propertyWithDefaultValue  =        "ASdasd" + 5 + 123 + 1203912039
   ; // asdasdasd
 
   /**
    * %@AnnotationPropertyWithoutDefaultValue 123213213123123
    * 
    */
   propertyWithoutDefaultValue          ; // asdasd
 
   /**
    * % @AnnotationPropertyWithDefaultValue
    */
   propertyWithDefaultValue  =  this.name + "ASD" //asdasdas
 
   /**
    * %@AnnotationStaticMethod
    */
          static             staticMethod            ()                            {}
 
   /**
    * %@AnnotationStaticAsyncMethod a213213
    */
   static    async       staticAsyncMethod (asdasd,asd) {}
 
   /**
    * %@AnnotationAsyncMethod asdasdsa ;; 123123 ;; 123123
    */
   async        ___asyncMethod__    ( asdasd,asd1,as,d,asd)   
   {}
 
   /**
    * %@AnnotationMethod
    */
        justmethod123__    (            )
         {}

} 


/**
 * % @ExportWithNameForFunction := some argument here ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation something
 * @NonReadableAnnotation - just docs - we will not cover the case without named function
 */
module.exports.ExportWithNameForFunction = function ExportWithNameForFunction    
(asd, asdasd, asd){}

/**
 * % @ExportWithNameForAsyncFunction some argument here ;; and agument 2 ;; true ;; 1 ;; the last one
 * & @OtherAnnotation something
 * @NonReadableAnnotation - just docs - we will not cover the case without named function
 */
module.exports.ExportWithNameForAsyncFunction = async function ExportWithNameForAsyncFunction (){}


// this stuff here will be passed to the OtherAnnotation because it using operator &, that point reference to some variable in same file -- usecase for lists, objects etc.
// % this operator mean arguments are passed like strings, numbers, booleans, nulls
module.exports.something = [
  { something: 1, something1: 2 }
]