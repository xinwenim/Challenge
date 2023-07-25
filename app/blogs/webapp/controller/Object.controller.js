sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("blogs.controller.Object", {
            onInit: function () {
                if (this.getRouter()) {
                    this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
                }
            },

            _onObjectMatched: function (oEvent) {
                this.dbKey = oEvent.getParameter("arguments").dbKey;
			    this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetaDataLoaded.bind(this));
            },

            _onMetaDataLoaded: function() {
                var oIntentConfig = this.getOwnerComponent().getModel("intentConfig").getData();
                //if it is necessary to bind view with another entityset must used to "serviceForObject"
                //the default value is in the properties of the service
                var sIntentService = oIntentConfig.serviceForObject || oIntentConfig.service;
                
                var sObjectPath = this.getModel().createKey(sIntentService, {
                    DBKey: this.objectId
                });
                
                sObjectPath = "/" + sObjectPath;
                this._bindView(sObjectPath);            
            },
        });
    });
