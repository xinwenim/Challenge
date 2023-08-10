// sap.ui.define(['sap/ui/core/mvc/Controller',
// "sap/ui/core/UIComponent",
// "sap/ui/model/json/JSONModel"],
//  function (Controller, UIComponent, JSONModel) {
// 	"use strict";

// 	var oController = Controller.extend("admin.controller.SidePanel", {
//         onInit() {
// 			this.oRouter = UIComponent.getRouterFor(this);
// 		  },
// 		_initModel: function () {
// 			var odataModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: '/service/challenge/Measures' });

// 			this.getView().setModel(odataModel);
// 		},

// 		onSubmitButtonPress: function () {

// 		},
// 		handleClose: function () {
// 			this.getOwnerComponent().bShowActionLogSidePanel = false;
// 			this.oRouter.navTo(this.sPreviousRouteName, {
// 				entityId: this.entityId,
// 				query: {
// 					tab: "Calendar"
// 				}
// 			});
// 		},
// 	});
// 	return oController;
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, History) {
        "use strict";
        return Controller.extend("admin.controller.SidePanel", {
            onInit: function () {
                // var odataModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: '/service/challenge/' });
                // this.getView().setModel(odataModel);
                var oRouter = this.getRouter();

			    oRouter.getRoute("SidePanel").attachMatched(this._onRouteMatched, this);
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
