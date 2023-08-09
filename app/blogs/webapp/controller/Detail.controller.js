
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent, History, MessageToast, JSONModel, Filter) {
        "use strict";
        return Controller.extend("blogs.controller.Detail", {
            onInit: function () {
                var likedFlag = false;
                var disLikedFlag = false;
                var favFlag = false;
                var oRouter = this.getRouter();
                var oViewModel = new JSONModel({
                    busy: false,
                    hasUIChanges: false,
                    contentEmpty: true,
                    order: 0
                });

                var blogDBKey = "";

                this._bTechnicalErrors = false;

                this.getView().setModel(oViewModel, "tableView");

                oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;

                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                this.blogDBKey = oArgs.dbKey;

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

            onDisBtnPress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext();
                var sMessage = "";
                var fnSuccess = function () {
                    this.getView().getModel().refresh();
                    MessageToast.show(sMessage);
                }.bind(this);
                if (this.disLikedFlag == true) {
                    oContext.setProperty("dislikes", oContext.getProperty("dislikes") - 1);
                    this.disLikedFlag = false;
                    sMessage = "Cancel Dislike";
                    this.byId("disLikeBtn").setProperty("type", "Default");
                }
                else {
                    oContext.setProperty("dislikes", oContext.getProperty("dislikes") + 1);
                    this.disLikedFlag = true;
                    sMessage = "Dislike It";
                    this.byId("disLikeBtn").setProperty("type", "Emphasized");
                }
                oContext.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
            },

            onFavBtnPress: function (oEvent) {
                var oContext = oEvent.getSource().getBindingContext();
                var sMessage = "";
                var fnSuccess = function () {
                    this.getView().getModel().refresh();
                    MessageToast.show(sMessage);
                }.bind(this);
                if (this.favFlag == true) {
                    oContext.setProperty("favorites", oContext.getProperty("favorites") - 1);
                    this.favFlag = false;
                    sMessage = "Rmove from favorites";
                    this.byId("btnFav").setProperty("type", "Default");
                }
                else {
                    oContext.setProperty("favorites", oContext.getProperty("favorites") + 1);
                    this.favFlag = true;
                    sMessage = "Add to favorites";
                    this.byId("btnFav").setProperty("type", "Emphasized");
                }
                oContext.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
            },

            onExit: function () {
                this.getView().destroy();
            },

            _getDate: function () {
                var today = new Date();
                if (today.getDay() < 10) {
                    return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
                }
                else {
                    return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                }
            },

            _getIDforNewEntry: function () {
                var oItems = this.getView().byId("replyList").getItems();
                var oItem = oItems[oItems.length - 1];
                if (!oItem) {
                    var newID = "0001";
                }
                else {
                    var newID = (parseInt(oItems.length)).toString();
                    for (var i = newID.length; i < 4; i++) {
                        newID = "0" + newID;
                    }
                }
                return newID;
            },

            _setBusy: function (bIsBusy) {
                var oModel = this.getView().getModel("tableView");

                oModel.setProperty("/busy", bIsBusy);
            },

            onCreate: function () {
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "blogs.view.fragment.createReply"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onDialogCancelPress: function () {
                this.byId("createReplyDialog").close();
            },

            onDialogOkPress: function (oEvent) {
                var oBinding = this.byId("replyList").getModel().bindList("/Replys");
                var oData = {
                    ID: this._getIDforNewEntry(),
                    content: this.getView().byId("contentInput").getValue(),
                    createdBy_dbKey: "b7bc472f-a784-4db1-8d54-15ead1c99844",
                    createdAt: this._getDate(),
                    blog_dbKey: this.blogDBKey
                };
                var fnSuccess = function () {
                    this._setBusy(false);
                    this.getView().getModel().refresh();
                    MessageToast.show("Reply Succeed");
                }.bind(this),

                    fnError = function (oError) {
                        this._setBusy(false);
                        MessageBox.error("Reply Failed");
                    }.bind(this);

                this._setBusy(true);
                oBinding.create(oData);
                oBinding.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess, fnError);
                this.byId("createReplyDialog").close();
            },

            onAfterDialogClose:function () {
                this.getView().byId("contentInput").setValue("");
            }

        })
    });
