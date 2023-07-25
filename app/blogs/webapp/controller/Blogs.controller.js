
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
    function (Controller, JSONModel, Engine,SelectionController, SortController, GroupController,MetadataHelper,Sorter,ColumnListItem,UIComponent) {
        "use strict";
        return Controller.extend("blogs.controller.Blogs", {
            onInit: function () {
                var odataModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: '/service/challenge/' });
                this.getView().setModel(odataModel);
                this._registerForP13n();
            },
            _registerForP13n: function() {
                var oTable = this.byId("idBlogsTable");
    
                this.oMetadataHelper = new MetadataHelper([
                    {key: "title", label: "title", path: "title"},
                    {key: "ID", label: "ID", path: "ID"},
                    {key:"dbKey", label:"dbKey",path:"dbKey"}
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
            _getKey: function(oControl) {
                return this.getView().getLocalId(oControl.getId());
            },
    
            handleStateChange: function(oEvt) {
                var oTable = this.byId("idBlogsTable");
                var oState = oEvt.getParameter("state");
    
                if (!oState) {
                    return;
                }
    
                var aSorter = [];
                oState.Sorter.forEach(function(oSorter) {
                    aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oSorter.key).path, oSorter.descending));
                });
    
                oState.Groups.forEach(function(oGroup) {
                    var oExistingSorter = aSorter.find(function(oSorter){
                        return oSorter.sPath === oGroup.key;
                    });
    
                    if (oExistingSorter) {
                        oExistingSorter.vGroup = true;
                    } else {
                        aSorter.push(new Sorter(this.oMetadataHelper.getProperty(oGroup.key).path, false, true));
                    }
                }.bind(this));
    
                oTable.getColumns().forEach(function(oColumn, iIndex){
                    oColumn.setVisible(false);
                });
    
                oState.Columns.forEach(function(oProp, iIndex){
                    var oCol = this.byId(oProp.key);
                    oCol.setVisible(true);
    
                    oTable.removeColumn(oCol);
                    oTable.insertColumn(oCol, iIndex);
                }.bind(this));
                var aCells = oState.Columns.map(function(oColumnState) {
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
            onItemPress:function (oEvent) {
                this._showObject(oEvent.getSource());
            },
            _showObject:function (oItem) {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("object", {
                    dbKey: oItem.getBindingContext().getProperty("dbKey")
                });
            }
        })
    });
