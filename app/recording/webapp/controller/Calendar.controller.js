sap.ui.define(['sap/ui/core/mvc/Controller',
 'sap/ui/unified/DateRange', 
 'sap/ui/core/format/DateFormat',
 "sap/ui/core/UIComponent",
  'sap/ui/core/library'],
	function(Controller, DateRange, DateFormat, UIComponent, coreLibrary) {
	"use strict";

	var CalendarType = coreLibrary.CalendarType;
	var sCurrentBreakpoint, oDynamicSideView;
	return Controller.extend("recording.controller.Calendar", {
		oFormatYyyymmdd: null,
		onInit: function() {
			oDynamicSideView = this.byId("DynamicSideContent");
			this.oFormatYyyymmdd = DateFormat.getInstance({pattern: "yyyy-MM-dd", calendarType: CalendarType.Gregorian});
			// var odataModel = new sap.ui.model.odata.v4.ODataModel({ serviceUrl: '/service/challenge/Users?$filter=dbKey eq "5a981480-9c44-454c-ab00-85bac68febf7"/ ',synchronizationMode: 'None' });
			// this.getView().setModel(odataModel);
		},

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		handleClose:function () {
			if (sCurrentBreakpoint === "S") {
				oDynamicSideView.toggle();
			} else {
				oDynamicSideView.setShowSideContent(false);
			}	
		},

		handleCalendarSelect: function(oEvent) {
			if (sCurrentBreakpoint === "S") {
				oDynamicSideView.toggle();
			} else {
				oDynamicSideView.setShowSideContent(true);
			}
                // // console.log(1);
                // var oCalendar, oCalendarData;

                // oCalendar = oEvent.getSource();
                // oCalendarData = oCalendar.getBindingContext();

                // this.getRouter().navTo("SidePanel");
			// this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oText = this.byId("selectedDate"),
				aSelectedDates = oCalendar.getSelectedDates(),
				oDate = aSelectedDates[0].getStartDate();

			oText.setText(this.oFormatYyyymmdd.format(oDate));
		},

		handleSelectToday: function() {
			var oCalendar = this.byId("Calendar");

			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({startDate: new Date()}));
			this._updateText(oCalendar);
		},
		onClickCalendarButtonPresss(oEvent) {
			let mAssignedSPF = oEvent.getSource().getBindingContext("assignedSolutionProcessFlow").getObject();
			// 这一行是获取数据
			this.getOwnerComponent().getModel("replaceSPFVersion").setProperty("/SPStatus", this.oEntityDetailModel.getProperty("/status"));
			this.getOwnerComponent().bReload = false;
			if (this.getOwnerComponent().getModel().getData().layout === "OneColumn") {
				this.setSidePanelData(mAssignedSPF);
			}
			let rowIndex = oEvent.getSource().getParent().getParent().getId().split("row")[2];
			this.byId("assignedSolutionProcessFlowTable").setSelectedIndex(Number(rowIndex));
		},
		_toggleEditMode: function () {
			var bEditable = this.oPageConrollerModel.getProperty("/editable");

			this._switchEdit(!bEditable);
			this.oPageConrollerModel.setProperty("/editable", !bEditable);
			this.byId("name").setValueState("None");
			this.oEntityDetailModel.updateBindings(true);
		},
	});
  }
);