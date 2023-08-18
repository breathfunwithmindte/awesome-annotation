# Awesome Annotation Library

This library provides a simple and elegant solution for parsing annotations in JavaScript projects. It makes it easy to organize and scale your projects by extracting meaningful information from your code.

With this library, you can parse module.exports = class Something, annotations for default exporting class, functions, properties, methods, static methods, static properties, async methods, async functions, and more!


## Features

>    Supports a wide range of JavaScript syntax for annotations.

>    Easy to use and integrate into your projects.

>    Makes it simple to extract and organize meaningful information from your code.

## Usage

To get started with this library, simply include it in your project and start using it to parse your annotations.

## Installation

You can install awesome-annotation as a dependency in your project by running the following command in your terminal:

``` 
npm install awesome-annotation
```

Or if you are using Yarn:

``` 
yarn add awesome-annotation 
```

After successful installation, you can import the package in your project and start using it.

## Guide

You can use the annotation function in your project by requiring it in your code:

```javascript 
  const annotation = require("awesome-annotation");
```

The annotation function takes two arguments: the path to the file you want to parse for annotations, and an options object (which is optional).

Here is an example of how you could use the annotation function:

```javascript 
  const fileContent = annotation("/test/testone1.js", { cached: true, debug: false });

  console.table(fileContent.annotations);
  console.table(fileContent.getAnnos("UserController"));

  console.log(fileContent.exports.something, "@@");
  console.log(new fileContent.exports());
```

The fileContent variable will contain the annotations found in the file, as well as information about the exports. You can access the annotations through the annotations property, and use the getAnnos method to get annotations for a specific exported entity. Additionally, you can access the exports themselves through the exports property.

## Realistic Example Use Case

Let's say you're working on a complex Ecommerce project and you need to implement hundreds of REST APIs. Rather than copying and pasting code multiple times, you can use Awesome Annotations to make your code more scalable and reusable.

To use Awesome Annotations, you simply add annotations to your JavaScript code that describe the data model, collection name, and other important information. For example, take a look at this code:


``` javascript
  /** 
   * % @Model
   * % @ModelName := Review
   * % @CollectionName := reviews 
   * & @Fields := ModelFields
   * & @GenerateDefaultAdminCRUDAll
   */
  module.exports = class Review extends EcommerceLib.Model
  {
    /** 
     * @override default behaviour of EcommerceLib.Model 
     * @example you can override default read_many method
     */
  }

  module.exports.ModelFields = [
    { name: "user",             mongodb: EcommerceLib.userField(true),       populate: true  },
    { name: "product",          mongodb: EcommerceLib.productField(true),    populate: true  },
    { name: "rating",           mongodb: { type: Number, required: true, min: 1, max: 5 }    },
    { name: "comment",          mongodb: { type: String, required: true, maxlength: 255 }    },
    { name: "metadata",         mongodb: { type: String, maxlength: 1400 } } // just in case...json stringify format
  ]

```

This code uses Awesome Annotations to describe a Mongoose model for product reviews. The annotations specify that this is a model, the name of the model is "Review", the collection name is "reviews", and the fields for this model are defined in the ModelFields array. Additionally, the GenerateDefaultAdminCRUDAll annotation generates default CRUD APIs for this model.

By using these annotations, you can easily generate the boilerplate code for your REST APIs, and also maintain your code as your project grows. The Ecommerce library reads these annotations and generates REST APIs automatically based on the specified model, collection name, and fields.

With Awesome Annotations, you can write clean, readable code that is also scalable and reusable, making it easy to build complex projects with ease.

## Contributing

We welcome contributions to this library. If you would like to contribute, please fork the repository and submit a pull request.


## License

This library is open-source and available under the MIT License.