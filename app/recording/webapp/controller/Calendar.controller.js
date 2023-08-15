sap.ui.define(['sap/ui/core/mvc/Controller',
	'sap/ui/unified/DateRange',
	'sap/ui/core/format/DateFormat',
	"sap/ui/core/UIComponent",
	'sap/ui/core/library',
	'sap/ui/model/json/JSONModel'],
	function (Controller, DateRange, DateFormat, UIComponent, coreLibrary, JSONModel) {
		"use strict";

		var CalendarType = coreLibrary.CalendarType;
		var sCurrentBreakpoint, oDynamicSideView;
		return Controller.extend("recording.controller.Calendar", {
			oFormatYyyymmdd: null,
			onInit: function () {
				oDynamicSideView = this.byId("DynamicSideContent");
				this.oFormatYyyymmdd = DateFormat.getInstance({ pattern: "yyyy-MM-dd", calendarType: CalendarType.Gregorian });
				this.oModel = new JSONModel(
					{
						"multiline": [
							{
								"leftBottomLabel": "20 Aug",
								"rightBottomLabel": "27 Aug",
								"lines": [
									{
										"points": [
											{ "x": 5, "y": 2 },
											{ "x": 10, "y": 3 },
											{ "x": 15, "y": 2 },
											{ "x": 20, "y": 1 },
											{ "x": 25, "y": 4 },
											{ "x": 30, "y": 2 },
											{ "x": 35, "y": 5 }
										]
									},
									{
										"points": [
											{ "x": 5, "y": 1 },
											{ "x": 10, "y": 1 },
											{ "x": 15, "y": 1 },
											{ "x": 20, "y": 4 },
											{ "x": 25, "y": 3 },
											{ "x": 30, "y": 2 },
											{ "x": 35, "y": 1 }
										]
									},
									{
										"points": [
											{ "x": 5, "y": 5 },
											{ "x": 10, "y": 4 },
											{ "x": 15, "y": 3 },
											{ "x": 20, "y": 2 },
											{ "x": 25, "y": 1 },
											{ "x": 30, "y": 2 },
											{ "x": 35, "y": 5 }
										]
									}
								]
							}
						]
					});
				this.getView().setModel(this.oModel);
			},

			getRouter: function () {
				return UIComponent.getRouterFor(this);
			},

			handleClose: function () {
				if (sCurrentBreakpoint === "S") {
					oDynamicSideView.toggle();
				} else {
					oDynamicSideView.setShowSideContent(false);
				}
			},

			handleCalendarSelect: function (oEvent) {
				var oCalendar=this.byId("Calendar");
				var oText = this.byId("selectedDate");
				var oDate=oCalendar.getSelectedDates()[0].getStartDate();
				var sDate=this.oFormatYyyymmdd.format(oDate);
				oText.setProperty("text",sDate);
				if (sCurrentBreakpoint === "S") {
					oDynamicSideView.toggle();
				} else {
					oDynamicSideView.setShowSideContent(true);
				}
			},

			_updateText: function (oCalendar) {
				var oText = this.byId("selectedDate"),
					aSelectedDates = oCalendar.getSelectedDates(),
					oDate = aSelectedDates[0].getStartDate();

				var sDate=this.oFormatYyyymmdd.format(oDate)

				oText.setProperty("text",sDate);
			},

			handleSelectToday: function () {
				var oCalendar = this.byId("Calendar");

				oCalendar.removeAllSelectedDates();
				oCalendar.addSelectedDate(new DateRange({ startDate: new Date() }));
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
			}
// <<<<<<< I558674
// 			let rowIndex = oEvent.getSource().getParent().getParent().getId().split("row")[2];
// 			this.byId("assignedSolutionProcessFlowTable").setSelectedIndex(Number(rowIndex));
// 		},
// 		_toggleEditMode: function () {
// 			var bEditable = this.oPageConrollerModel.getProperty("/editable");

// 			this._switchEdit(!bEditable);
// 			this.oPageConrollerModel.setProperty("/editable", !bEditable);
// 			this.byId("name").setValueState("None");
// 			this.oEntityDetailModel.updateBindings(true);
// 		},
// 	});
//   }
// );