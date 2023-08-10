sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/m/p13n/Engine',
    'sap/m/p13n/SelectionController',
    'sap/m/p13n/SortController',
    'sap/m/p13n/GroupController',
    'sap/m/p13n/MetadataHelper',
    'sap/ui/model/Sorter',
    'sap/m/ColumnListItem',
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Engine, SelectionController, SortController, GroupController, MetadataHelper, Sorter, ColumnListItem, UIComponent) {
        "use strict";

        return Controller.extend("profile.controller.Profile", {
            //onToView2 : function () {
                //this.getOwnerComponent().getTargets().display("Profiledetail");
            //}
            getRouter : function () {
                return UIComponent.getRouterFor(this);
            },
    
            // onToView2: function (oEvent) {
            //     console.log(1);
            //     this.getRouter().navTo("Profiledetail");
            //     console.log(2);
            // }
        });
        

    });
