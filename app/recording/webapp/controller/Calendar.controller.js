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
            onPlaceholderPressed: function () {
                this.MindDialog();
            },

            MindDialog: function () {
                if (!this.tDialog) {
                    this.tDialog = this.loadFragment({
                        name: "recording.view.fragment.Mind"
                    });
                }
            },
			handleCalendarSelect: function () {
				var oToday=new Date();
				var oCalendar=this.byId("Calendar");
				var oText = this.byId("selectedDate");
				var oDate=oCalendar.getSelectedDates()[0].getStartDate();
				var sDate=this.oFormatYyyymmdd.format(oDate);
				var sToday=this.oFormatYyyymmdd.format(oToday);
				oText.setProperty("text",sDate);
				if (sCurrentBreakpoint === "S") {
					oDynamicSideView.toggle();
				} else {
					oDynamicSideView.setShowSideContent(true);
				}
				if (sToday>sDate){
					this.setRandomDataForSidePanel();
					this.byId("idOverFlowToolBar").setProperty("visible",false);
					this.changePanelStatus(false);
				}
				else if (sToday==sDate){
					this.setRandomDataForSidePanel();
					this.byId("idOverFlowToolBar").setProperty("visible",true);
					this.changePanelStatus(true);
				}
				else{
					oDynamicSideView.setShowSideContent(false);
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
				// let mAssignedSPF = oEvent.getSource().getBindingContext("assignedSolutionProcessFlow").getObject();
				// // 这一行是获取数据
				// this.getOwnerComponent().getModel("replaceSPFVersion").setProperty("/SPStatus", this.oEntityDetailModel.getProperty("/status"));
				// this.getOwnerComponent().bReload = false;
				// if (this.getOwnerComponent().getModel().getData().layout === "OneColumn") {
				// 	this.setSidePanelData(mAssignedSPF);
				// }
				// let rowIndex = oEvent.getSource().getParent().getParent().getId().split("row")[2];
				// this.byId("assignedSolutionProcessFlowTable").setSelectedIndex(Number(rowIndex));
			},

			setRandomDataForSidePanel:function () {
				this.byId("pressVal").setValue((Math.floor(101*Math.random())).toString()+"%");
				this.byId("sleepVal").setValue((Math.floor(25*Math.random())).toString()+"h");
				this.byId("moodVal").setValue(Math.floor(5*Math.random()+1).toString());
				this.byId("motionVal").setValue((Math.floor(121*Math.random())).toString()+"min");
				this.byId("heightVal").setValue("1.8m");
				this.byId("weightVal").setValue((8+Math.random().toFixed(2)).toString()+"kg");
				this.byId("junkFoodVal").setValue(Math.floor(6*Math.random()).toString()+"time/day");
				this.byId("fruitVal").setValue(Math.floor(6*Math.random()).toString()+"time/day");
				this.byId("waterVal").setValue(Math.floor(11*Math.random()).toString()+"cup/day");
			},

			changePanelStatus:function (oCase) {
				this.byId("pressVal").setEditable(oCase);
				this.byId("sleepVal").setEditable(oCase);
				this.byId("moodVal").setEditable(oCase);
				this.byId("motionVal").setEditable(oCase);
				this.byId("heightVal").setEditable(oCase);
				this.byId("weightVal").setEditable(oCase);
				this.byId("junkFoodVal").setEditable(oCase);
				this.byId("fruitVal").setEditable(oCase);
				this.byId("waterVal").setEditable(oCase);
			},

			onSubmitButtonPress:function () {
				this.changePanelStatus(false);
				this.byId("idOverFlowToolBar").setProperty("visible",false);
			}
		});
	}
);