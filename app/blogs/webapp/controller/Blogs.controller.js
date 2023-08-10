
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
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "blogs/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Engine, SelectionController, SortController, GroupController, MetadataHelper, Sorter, ColumnListItem, UIComponent,  MessageToast, Filter,formatter) {
        "use strict";
        return Controller.extend("blogs.controller.Blogs", {
            formatter: formatter,
            onInit: function () {
                // this._getUserInfo();
                // this._registerForP13n();
            },

            _getUserInfo: function () {
                var oModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: "/service/challenge/", synchronizationMode: "None" });
                // var oModel = new JSONModel({});
                
                var userID = "b7bc472f-a784-4db1-8d54-15ead1c99844";
                // this.setModel(oModel, "userModel");
                oModel.read("/Users", {
					success: function (oData) {
                        console.log(oData)
					},
					filters: new Filter("dbKey", "EQ",userID)
				});
            },

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },

            onListItemPressed: function (oEvent) {
                var oItem, oCtx;

                oItem = oEvent.getSource();
                oCtx = oItem.getBindingContext();

                this.getRouter().navTo("Detail", {
                    dbKey: oCtx.getProperty("dbKey")
                });
            },


            onOpenDialog: function () {
                // create dialog lazily
                if (!this.pDialog) {
                    this.pDialog = this.loadFragment({
                        name: "blogs.view.fragment.createBlog"
                    });
                }

                this.pDialog.then(function (oDialog) {
                    oDialog.open();
                });
            },


            //delete a blog when create user matches
            onDeleteBlog: function () {
                var oTable = this.getView().byId("idBlogsTable");
                var oContext = oTable.getSelectedItem().getBindingContext();
                var oPage = this.getView();
                var fnSuccess = function () {
                    this.getView().getModel().refresh();
                    MessageToast.show("Blog deleted");
                }.bind(this);
                if (oPage.getBindingContext() === oContext) {
                    oPage.setBindingContext(null);
                }
                oContext.delete();
                oContext.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
            },

            onDialogCancelPress: function () {
                this.byId("createBlogDialog").close();
            },

            onDialogOkPress: function (oEvent) {

                var oBinding = this.byId("creationform").getModel().bindList("/Blogs");

                //this odata contains data for the created new entry in JSON format
                var oData = {
                    ID: this._getIDforNewEntry(),
                    title: this.getView().byId("titleInput").getValue(),
                    content: this.getView().byId("contentInput").getValue(),
                    Anonymous: this._getAnonymous(),
                    createdBy_dbKey: "b7bc472f-a784-4db1-8d54-15ead1c99844",
                    createdAt: this._getDate()

                };

                var fnSuccess = function () {
                    this.getView().getModel().refresh();
                    this.byId("createBlogDialog").destroy();
                    MessageToast.show("New Blog Created");
                }.bind(this);


                oBinding.create(oData);
                // this.getView().getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
                oBinding.getModel().submitBatch(this.getView().getModel().getUpdateGroupId()).then(fnSuccess);
            },

            _getDate: function () {
                var today = new Date();
                if (today.getDate() < 10) {
                    return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
                }
                else {
                    return today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
                }
            },

            _getIDforNewEntry: function () {
                var oItems = this.getView().byId("idBlogsTable").getItems();
                var oItem = oItems[oItems.length - 1];
                if (!oItem) {
                    var newID = "0001";
                }
                else {
                    var lastID = oItem.getCells()[0].getProperty('title');
                    var newID = (parseInt(lastID) + 1).toString();
                    for (var i = newID.length; i < 4; i++) {
                        newID = "0" + newID;
                    }
                }
                return newID;
            },

            _getAnonymous: function () {
                var ana = this.getView().byId("checkBox").getSelected();
                if (ana == true) {
                    return true;
                }
                else {
                    return false;
                }
            },

            _registerForP13n: function () {
                var oTable = this.byId("idBlogsTable");

                this.oMetadataHelper = new MetadataHelper([
                    { key: "title", label: "title", path: "title" },
                    { key: "ID", label: "ID", path: "ID" },
                    { key: "dbKey", label: "dbKey", path: "dbKey" }
                ]);

                Engine.getInstance().register(oTable, {
                    helper: this.oMetadataHelper,
                    controller: {
                        Columns: new SelectionController({
                            targetAggregation: "columns",
                            control: oTable
                        }),
                        Sorter: new SortController({
                            control: oTable
                        }),
                        Groups: new GroupController({
                            control: oTable
                        })
                    }
                });
                Engine.getInstance().attachStateChange(this.handleStateChange.bind(this));
            },
            
            openPersoDialog: function (oEvt) {
                var oTable = this.byId("idBlogsTable");
                Engine.getInstance().show(oTable, ["Columns", "Sorter", "Groups"], {
                    contentHeight: "35rem",
                    contentWidth: "32rem",
                    source: oEvt.getSource()
                });
            },
            _getKey: function (oControl) {
                return this.getView().getLocalId(oControl.getId());
            },

            handleStateChange: function (oEvt) {
                var oTable = this.byId("idBlogsTable");
                var oState = oEvt.getParameter("state");

                if (!oState) {
                    return;
                }

                var aSorter = [];
                oState.Sorter.forEach(function (oSorter) {
                    aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oSorter.key).path, oSorter.descending));
                });

                oState.Groups.forEach(function (oGroup) {
                    var oExistingSorter = aSorter.find(function (oSorter) {
                        return oSorter.sPath === oGroup.key;
                    });

                    if (oExistingSorter) {
                        oExistingSorter.vGroup = true;
                    } else {
                        aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oGroup.key).path, false, true));
                    }
                }.bind(this));

                oTable.getColumns().forEach(function (oColumn, iIndex) {
                    oColumn.setVisible(false);
                });

                oState.Columns.forEach(function (oProp, iIndex) {
                    var oCol = this.byId(oProp.key);
                    oCol.setVisible(true);

                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));
                var aCells = oState.Columns.map(function (oColumnState) {
                    return new Text({
                        text: "{" + oColumnState.key + "}"
                    });
                });

                oTable.bindItems({
                    templateShareable: false,
                    path: '/Blogs',
                    sorter: aSorter,
                    template: new ColumnListItem({
                        cells: aCells
                    })
                });
            },
            onItemPress: function (oEvent) {
                this._showObject(oEvent.getSource());
            },
            _showObject: function (oItem) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("object", {
                    dbKey: oItem.getBindingContext().getProperty("dbKey")
                });
            },

            onFilterSelect: function (oEvent) {
                var oBinding = this.byId("idBlogsTable").getBinding("items"),
                    sKey = oEvent.getParameter("key"),
                    // Array to combine filters
                    aFilters = [],
                    // Values for Filter
                    myUserDBKEY = "b7bc472f-a784-4db1-8d54-15ead1c99844";

                if (sKey === "own") {
                    aFilters.push(
                        new Filter([
                            new Filter([new Filter("createdBy_dbKey", "EQ", myUserDBKEY)], true)
                        ], false)
                    );
                    this.byId("btnAdd").setProperty("enabled",true);
                    this.byId("btnDelete").setProperty("enabled",true);
                } else if (sKey === "others") {
                    aFilters.push(
                        new Filter([
                            new Filter([new Filter("createdBy_dbKey", "NE",myUserDBKEY )], true)
                        ], false)
                    );
                    this.byId("btnAdd").setProperty("enabled",false);
                    this.byId("btnDelete").setProperty("enabled",false);

                }
                else{
                    this.byId("btnAdd").setProperty("enabled",false);
                    this.byId("btnDelete").setProperty("enabled",false);
                }       

                oBinding.filter(aFilters);
            },

            onUpdateFinished : function (oEvent) {
                var oHeader=this.byId("idtbHeaderTxt");
                oHeader.setProperty("text","Blogs("+oEvent.getParameter("total")+")");
            },

            onAfterDialogClose:function () {
                this.getView().byId("titleInput").setValue("");
                this.getView().byId("contentInput").setValue("");
                this.getView().byId("checkBox").setProperty("selected",false);
            }
        })
    });
