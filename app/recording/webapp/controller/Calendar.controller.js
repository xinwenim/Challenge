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
						"size": "L",
						"lines": [
							{
								"points": [
									{ "x": 0, "y": 50 },
									{ "x": 20, "y": 68 },
									{ "x": 40, "y": 25 },
									{ "x": 60, "y": 45 },
									{ "x": 80, "y": 67 },
									{ "x": 100, "y": 88 }
								]
							}
						],
						"multiline": [
							{
								"description": "2 lines, threshold line, labels shown",
								"threshold": 50,
								"leftTopLabel": "120 M",
								"rightTopLabel": "140 M",
								"leftBottomLabel": "Sept 2016",
								"rightBottomLabel": "Oct 2016",
								"showPoints": true,
								"lines": [
									{
										"points": [
											{ "x": 0, "y": 50 },
											{ "x": 8, "y": 68 },
											{ "x": 20, "y": 25 },
											{ "x": 30, "y": 45 },
											{ "x": 40, "y": 67 },
											{ "x": 100, "y": 88 }
										]
									},
									{
										"points": [
											{ "x": 2, "y": 55 },
											{ "x": 8, "y": 40 },
											{ "x": 15, "y": 20 },
											{ "x": 30, "y": 75 },
											{ "x": 40, "y": 30 },
											{ "x": 100, "y": 50 }
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

				oText.setText(this.oFormatYyyymmdd.format(oDate));
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
		});
	}
);