
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, History, MessageToast) {
        "use strict";
        return Controller.extend("blogs.controller.Detail", {
            onInit: function () {
                var likedFlag = false;
                var oRouter = this.getRouter();

                oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;

                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: "/Blogs(" + oArgs.dbKey + ")",
                    events: {
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

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            _onBindingChange: function (oEvent) {
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
            },

            onLikeBtnPress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext();
                var sMessage = "";
                var fnSuccess = function () {
                    this.getView().getModel().refresh();
                    MessageToast.show(sMessage);
                }.bind(this);
                if (this.likedFlag == true) {
                    oContext.setProperty("likes", oContext.getProperty("likes") - 1);
                    this.likedFlag = false;
                    sMessage = "Cancel Like /(ㄒoㄒ)/~~";
                    this.byId("likeBtn").setProperty("type", "Default");
                }
                else {
                    oContext.setProperty("likes", oContext.getProperty("likes") + 1);
                    this.likedFlag = true;
                    sMessage = "Like it ♥!";
                    this.byId("likeBtn").setProperty("type", "Emphasized");
                }
                oContext.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
            },

            onExit: function () {
                this.getView().destroyContent();
            }

        })
    });
