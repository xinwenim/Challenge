sap.ui.define([], function() {
	"use strict";


	return {
		formatContent: function(sValue) {
			if (sValue.length>10){
                return sValue.substring(0,100)+"...";
            }
            else{
                return sValue;
            }
        }
	};
});