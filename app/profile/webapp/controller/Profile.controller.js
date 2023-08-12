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
                this.getView().byId("MindVal").setProperty("text", "30");
                this.getView().byId("SportVal").setProperty("text", "45");
                this.getView().byId("FoodVal").setProperty("text", "50");
                //这里再加一个赋值人格类型描述的

                if (pType = "INTJ") {
                    this.getView().byId("textDes").setProperty("text", "An Architect (INTJ) is a person with the Introverted, Intuitive, Thinking, and Judging personality traits. These thoughtful tacticians love perfecting the details of life, applying creativity and rationality to everything they do. Their inner world is often a private, complex one.");
                }
                else if (pType = "INTP") {
                    this.getView().byId("textDes").setProperty("text", "A Logician (INTP) is someone with the Introverted, Intuitive, Thinking, and Prospecting personality traits. These flexible thinkers enjoy taking an unconventional approach to many aspects of life. They often seek out unlikely paths, mixing willingness to experiment with personal creativity.");
                }
                else if (pType = "ENTJ") {
                    this.getView().byId("textDes").setProperty("text", "A Commander (ENTJ) is someone with the Extraverted, Intuitive, Thinking, and Judging personality traits. They are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them.");
                }
                else if (pType = "ENTP") {
                    this.getView().byId("textDes").setProperty("text", "A Debater (ENTP) is a person with the Extraverted, Intuitive, Thinking, and Prospecting personality traits. They tend to be bold and creative, deconstructing and rebuilding ideas with great mental agility. They pursue their goals vigorously despite any resistance they might encounter.");
                }
                else if (pType = "INFJ") {
                    this.getView().byId("textDes").setProperty("text", "An Advocate (INFJ) is someone with the Introverted, Intuitive, Feeling, and Judging personality traits. They tend to approach life with deep thoughtfulness and imagination. Their inner vision, personal values, and a quiet, principled version of humanism guide them in all things.");
                }
                else if (pType = "INFP") {
                    this.getView().byId("textDes").setProperty("text", "A Mediator (INFP) is someone who possesses the Introverted, Intuitive, Feeling, and Prospecting personality traits. These rare personality types tend to be quiet, open-minded, and imaginative, and they apply a caring and creative approach to everything they do.");
                }
                else if (pType = "ENFJ") {
                    this.getView().byId("textDes").setProperty("text", "A Protagonist (ENFJ) is a person with the Extraverted, Intuitive, Feeling, and Judging personality traits. These warm, forthright types love helping others, and they tend to have strong ideas and values. They back their perspective with the creative energy to achieve their goals.");
                }
                else if (pType = "ENFP") {
                    this.getView().byId("textDes").setProperty("text", "A Campaigner (ENFP) is someone with the Extraverted, Intuitive, Feeling, and Prospecting personality traits. These people tend to embrace big ideas and actions that reflect their sense of hope and goodwill toward others. Their vibrant energy can flow in many directions.");
                }
                else if (pType = "ISTJ") {
                    this.getView().byId("textDes").setProperty("text", "A Logistician (ISTJ) is someone with the Introverted, Observant, Thinking, and Judging personality traits. These people tend to be reserved yet willful, with a rational outlook on life. They compose their actions carefully and carry them out with methodical purpose.");
                }
                else if (pType = "ISFJ") {
                    this.getView().byId("textDes").setProperty("text", "A Defender (ISFJ) is someone with the Introverted, Observant, Feeling, and Judging personality traits. These people tend to be warm and unassuming in their own steady way. They’re efficient and responsible, giving careful attention to practical details in their daily lives.");
                }
                else if (pType = "ESTJ") {
                    this.getView().byId("textDes").setProperty("text", "An Executive (ESTJ) is someone with the Extraverted, Observant, Thinking, and Judging personality traits. They possess great fortitude, emphatically following their own sensible judgment. They often serve as a stabilizing force among others, able to offer solid direction amid adversity.");
                }
                else if (pType = "ESFJ") {
                    this.getView().byId("textDes").setProperty("text", "A Consul (ESFJ) is a person with the Extraverted, Observant, Feeling, and Judging personality traits. They are attentive and people-focused, and they enjoy taking part in their social community. Their achievements are guided by decisive values, and they willingly offer guidance to others.");
                }
                else if (pType = "ISTP") {
                    this.getView().byId("textDes").setProperty("text", "A Virtuoso (ISTP) is someone with the Introverted, Observant, Thinking, and Prospecting personality traits. They tend to have an individualistic mindset, pursuing goals without needing much external connection. They engage in life with inquisitiveness and personal skill, varying their approach as needed.");
                }
                else if (pType = "ISFP") {
                    this.getView().byId("textDes").setProperty("text", "An Adventurer (ISFP) is a person with the Introverted, Observant, Feeling, and Prospecting personality traits. They tend to have open minds, approaching life, new experiences, and people with grounded warmth. Their ability to stay in the moment helps them uncover exciting potentials.");
                }
                else if (pType = "ESTP") {
                    this.getView().byId("textDes").setProperty("text", "An Entrepreneur (ESTP) is someone with the Extraverted, Observant, Thinking, and Prospecting personality traits. They tend to be energetic and action-oriented, deftly navigating whatever is in front of them. They love uncovering life’s opportunities, whether socializing with others or in more personal pursuits.");
                }
                else if (pType = "ESFP") {
                    this.getView().byId("textDes").setProperty("text", "An Entertainer (ESFP) is a person with the Extraverted, Observant, Feeling, and Prospecting personality traits. These people love vibrant experiences, engaging in life eagerly and taking pleasure in discovering the unknown. They can be very social, often encouraging others into shared activities.");
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
