# form-data-helper
Javascript plug in that replaces the FormData object. Use Case: IE9 and below. 

## Code Example

```js
formDataHelper.module.settings.target = 'formDataUpload';
formDataHelper.module.settings.action = '/IFrameTestHandler.ashx';
formDataHelper.module.createFormData(parameters, files, false);
formDataHelper.module.createIframe('formDataUpload', null);
formDataHelper.module.submitFormData();
```

## Motivation

There were several plugins out there for this problem. Some were a little too robust, and others not complete enough for my liking. 
Additionally, how the html was structured, that I had to work with was making the integration of the plugins somewhat difficult. 
Therefore I decided to write my own plugin. This solution will optionally utilize pre-existing Form/IFrame objects 
or dynamically generate them for you.

## Installation

Simply reference the JS file accordingly in your html.

## API Reference

###target
type: string
description: this is the id of the iframe.

###Properties
-enctype
type: string
description: should reflect the encoding type of the request data, see: http://www.w3schools.com/tags/att_form_enctype.asp
default: multipart/form-data

-action
type: string
description: this is the Iframe target property should be set to the endpoint of the handler/or endpoint you are posting to.

-method
type: string
description: this should reflect the method signature your action will perform. see: http://www.w3schools.com/tags/att_form_method.asp
default: post

###Methods
-CreateFormData function(parameters, files, createNewForm)
type: method
description: Creates and populates the form object.
parameters: a json collection of the input types you want to pass it. See code example below.
files: the files that you wish to pass along in the form request. 
createNewForm: a bool type. Determines if a new form should be created or a pre-existing one should be used.

-createIframe: function (frameId, callback)
type: method
description: Creates the iframe object.
frameId: the id of the iframe. Should match the target property value.
callback: if you want to use a custom callback, you would pass it in here.

-iframeCallback: function (data)
type: method
description: the default callback method for the iframe. It's wired to the load eventhandler.
data: response object.

-submitFormData()
type: method
description: submits the form

## Tests

To properly test the javascript you will need an html file, a js file, and an endpoint you can post to.

###html:

```
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script type='text/javascript' src="/jquery-1.7.2.min.js"></script>
    <script type='text/javascript' src="/FormDataModule.js"></script>    
    <script type='text/javascript' src="/main.js"></script>
</head>
<body>

		<div id="fileLoadDiv">
		
            <input id="testFile" type="file" class="file-input" name="photo" accept="image/*"/>

        
			<input id="targetButton" type="button" value="submit"/>

		</div>
  

 
</body>
</html>
```

###js:

```js

var main = main || {};

main.core = {

    parameters:null,

    init: function () {

        main.core.createParameters();
        
        $('#targetButton').click(function () {
            var files = $('#testFile');
            formDataHelper.module.settings.target = 'formDataUpload';
            formDataHelper.module.settings.action = '/IFrameTestHandler.ashx';
            formDataHelper.module.createFormData(main.core.parameters, files, false);
            formDataHelper.module.createIframe('formDataUpload', main.core.mainCallback);
            formDataHelper.module.submitFormData();
        });
    },

    createParameters: function () {

        main.core.parameters = [];

        var paramter1 = { "key": "key1", "val": "val1" };
        var paramter2 = { "key": "key2", "val": 1 };

        main.core.parameters.push(paramter1);
        main.core.parameters.push(paramter2);

    },

    mainCallback: function (response) { alert('in main callback!'); console.log(response);}
};

$(document).ready(function () {
    main.core.init();
});

```

## License

MIT
