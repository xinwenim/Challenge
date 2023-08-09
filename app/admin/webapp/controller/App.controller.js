// sap.ui.define(
//     [
//         "sap/ui/core/mvc/Controller",
//         "sap/ui/core/UIComponent"
//     ],
//     function(BaseController,UIComponent) {
//       "use strict";
  
//       return BaseController.extend("ambms.admin.controller.Tile", {
//         onInit() {
//           this.oRouter = UIComponent.getRouterFor(this);
//         },
//         onCalendarPressed: function () {
//           this.oRouter.navTo("Calendar");
//         }
//       });
//     }
//   );
sap.ui.define(
  [
      "sap/ui/core/mvc/Controller"
  ],
  function(BaseController) {
    "use strict";

    return BaseController.extend("admin.controller.App", {
      onInit() {
      }
    });
  }
);
