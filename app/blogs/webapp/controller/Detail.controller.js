
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
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Engine,SelectionController, SortController, GroupController,MetadataHelper,Sorter,ColumnListItem,UIComponent,History) {
        "use strict";
        return Controller.extend("blogs.controller.Detail", {
            onInit: function () {
                // var odataModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: '/service/challenge/' });
                // this.getView().setModel(odataModel);
                var oRouter = this.getRouter();

			    oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched : function (oEvent) {
                var oArgs, oView;
    
                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();
    
                oView.bindElement({
                    path : "/Blogs(" + oArgs.dbKey + ")",
                    events : {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function (oEvent) {
                            oView.setBusy(true);
                        },
                        dataReceived: function (oEvent) {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            getRouter : function () {
                return UIComponent.getRouterFor(this);
            },
    
            _onBindingChange : function (oEvent) {
                // No data for the binding
                if (!this.getView().getBindingContext()) {
                    this.getRouter().getTargets().display("notFound");
                }
            },

            onNavBack: function () {
                var oHistory, sPreviousHash;
    
                oHistory = History.getInstance();
                sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    this.getRouter().navTo("Blogs", {}, true /*no history*/);
                }
            }
            
        })
    });
