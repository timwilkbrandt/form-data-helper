/*
 * FormDataHelper formDataHelper.js
 * https://github.com/timwilkbrandt/form-data-helper
 * Author: Tim Wilk Brandt
 * Version: 1.0
 * CreateDate: 2015-3-09
 * ModifyData: 2015-3-09
 */
 
var formDataHelper = formDataHelper || {};

(function () {

    'use strict';

    function tryConsoleLog(data) {

        var isDebug = true; //for production set to false

        try {
            if (isDebug) { window.console.log(data); }
        }
        catch (ignore) {

        }
    };
	
    formDataHelper.module = {

        //Form Default Settings
        settings: {
        target: '',
        enctype: 'multipart/form-data',
        action: '',
        method: 'Post',
        },

    //Example parameters: [{"key":<someKey>, "val":<someval>},...]
    createFormData: function (parameters, files, createNewForm) {

        var formEle = null;
			
        if(createNewForm)
        {

            formEle = document.createElement('Form');
            document.body.appendChild(formEle);

            if (files != null) {
                Array.prototype.forEach.call(files, function (file, i) {
                    formEle.appendChild(file);
                });
            }

            
        }
        else
        {
            formEle = document.forms[0];
        }
		

        formEle.setAttribute('action', formDataHelper.module.settings.action);
        formEle.setAttribute('method', formDataHelper.module.settings.method);
        formEle.setAttribute('target', formDataHelper.module.settings.target);
        formEle.setAttribute('enctype', formDataHelper.module.settings.enctype);
            			        
               
        Array.prototype.forEach.call(parameters, function (parameter, i) {

            var inputEle = document.createElement("input");
            inputEle.setAttribute("type", "hidden");
            inputEle.setAttribute("name", parameter.key);
            inputEle.setAttribute("value", parameter.val);

            var targetEle = document.querySelectorAll('input[name="' + inputEle.name + '"]');
            if (targetEle.length > 0) {
                formEle.removeChild(targetEle[0]);
            }

            formEle.appendChild(inputEle);

        });

    },

    createIframe: function (frameId, callback) {

        //if no callback is passed in the default one provided will be used.
        if (callback == null) { callback = formDataHelper.module.iframeCallback; }

        var frame;

        //ensure that no pre-existing iFrame is in the html
        var targetFrame = document.getElementById(formDataHelper.module.settings.target);
			
        if (frameId == null && targetFrame == null) {

            frame = document.createElement('IFRAME');
            frame.name = formDataHelper.module.settings.target;
            frame.id = formDataHelper.module.settings.target;
            frame.width = 0;
            frame.height = 0;
            frame.style.display = 'none';

            document.forms[0].insertBefore(frame, document.forms[0].firstChild);
        }
        else {
            frame = document.getElementById(frameId);
        }

        frame.removeEventListener('load', callback);
        frame.addEventListener('load', callback);
    },

    iframeCallback: function (data) {

        tryConsoleLog(data);

    },

    submitFormData: function () {

        //if jquery validation needs to be removed
        //$(document.forms[0]).validate().settings.ignore = "*"; 
        document.forms[0].submit();
    }

};

}());

