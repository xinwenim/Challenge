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
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("profile.controller.Profile", {

            onInit: function () {
                var pType = "ISFJ";
                this._popLogin();
            },

            onRetakeTest: function () {
                this._popQeustionDialog();
            },

            _popLogin: function () {
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "profile.view.fragment.login"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onNotKnowPress: function () {
                this.byId("idLoginDia").close();
                this._popQeustionDialog();
            },

            _popQeustionDialog: function () {
                if (!this.tDialog) {
                    this.tDialog = this.loadFragment({
                        name: "profile.view.fragment.question"
                    });
                }

                this.tDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onKnowPress: function () {
                this.byId("idLoginDia").close();
                this._popAuthDialog();
            },

            _popAuthDialog: function () {
                if (!this.wDialog) {
                    this.wDialog = this.loadFragment({
                        name: "profile.view.fragment.auth"
                    });
                }

                this.wDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },

            onLoginUserAlex: function () {
                this.pType = this.getView().byId("idInputType").getValue();
                this.byId("idAuthDia").close();
                this.getView().byId("idInputType").setValue("");
                this.setUserValue();
            },

            onSubmitPress: function () {
                this.getPersonality();
                this.byId("idQuestionDia").close();
                this.getPersonality();
                this.setUserValue();
            },

            setUserValue: function () {
                this.getView().byId("idProfilePic").setProperty("src", "./profilePic.jpg");
                this.getView().byId("idName").setProperty("text", "Alex Li");
                this.getView().byId("labelRegion").setProperty("text", "Dalian, China");
                this.getView().byId("labelEmail").setProperty("text", "alex.li10@sap.com");
                this.getView().byId("textType").setProperty("text", this.pType);
                //这里再加一个赋值人格类型描述的

                if (pType = "ISFJ") {
                    this.getView().byId("textDes").setProperty("text", "这里写对应type的description");
                }
                else if (pType = "ISFP") {
                    this.getView().byId("textDes").setProperty("text", "这里写对应type的description");
                }
            },

            //根据测试的选择判断类型返回
            getPersonality: function () {
                var resType = ""
                var res1 = this.byId('question1').getProperty("selectedIndex");
                var res2 = this.byId('question2').getProperty("selectedIndex");
                var res3 = this.byId('question3').getProperty("selectedIndex");
                var res4 = this.byId('question4').getProperty("selectedIndex");
                if (res1 == 0) {
                    resType = resType + "I";
                }
                else {
                    resType = resType + 'E';
                }
                if (res2 == 0) {
                    resType = resType + "N";
                }
                else {
                    resType = resType + 'S';
                }
                if (res3 == 0) {
                    resType = resType + "T";
                }
                else {
                    resType = resType + 'F';
                }
                if (res4 == 0) {
                    resType = resType + "P";
                }
                else {
                    resType = resType + 'J';
                }
                this.pType = resType;
            },


            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },



            // onToView2: function (oEvent) {
            //     console.log(1);
            //     this.getRouter().navTo("Profiledetail");
            //     console.log(2);
            // }
        });


    });
