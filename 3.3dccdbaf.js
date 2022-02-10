webpackJsonp([3,14],{537:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__dbIntegrations__=__webpack_require__(650),__WEBPACK_IMPORTED_MODULE_0__dbIntegrations___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dbIntegrations__);__webpack_exports__.default=__WEBPACK_IMPORTED_MODULE_0__dbIntegrations___default.a},550:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_axios__=__webpack_require__(168),__WEBPACK_IMPORTED_MODULE_0_axios___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);__webpack_exports__.a=function(config){if(localStorage.getItem("jwt")){var headers={"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")};return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({baseURL:void 0,timeout:3e4,headers:headers})}}},553:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__Service__=__webpack_require__(550);__webpack_require__.d(__webpack_exports__,"b",function(){return Geo}),__webpack_require__.d(__webpack_exports__,"a",function(){return DbIntegration});var Geo={getStates:function(){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().get("/states")},getCities:function(state_id){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().get("/states/"+state_id+"/cities")}},DbIntegration={get:function(id,params){var _id="";return id&&(_id="/"+id),__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().get("/admin/dbIntegrations"+_id,{params:params})},store:function(data){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().post("/admin/dbIntegrations",data)},update:function(id,data){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().put("/admin/dbIntegrations/"+id,data)},delete:function(id){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().delete("/admin/dbIntegrations/"+id)},testConnection:function(data){return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Service__.a)().post("/admin/dbIntegrations/testConnection",data)}}},575:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0__modalIntegration__=__webpack_require__(651),__WEBPACK_IMPORTED_MODULE_0__modalIntegration___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__modalIntegration__);__webpack_exports__.a=__WEBPACK_IMPORTED_MODULE_0__modalIntegration___default.a},590:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__modalIntegration__=__webpack_require__(575),__WEBPACK_IMPORTED_MODULE_1_services_general_service__=__webpack_require__(553);__webpack_exports__.default={components:{ModalDbIntegration:__WEBPACK_IMPORTED_MODULE_0__modalIntegration__.a},data:function(){return{dbIntegrations:[],selectedIntegration:null,loading:!1,page:1,resetState:0,filter:{},loadingTests:{}}},computed:{fields:function(){return"smartphone"!==this.$store.state.currentDeviceDisplay?[{key:"name",label:this.$t("NAME"),sortable:!1},{key:"driver",label:this.$t("DRIVER"),sortable:!1},{key:"server",label:this.$t("HOST"),sortable:!1},{key:"port",label:this.$t("PORT"),sortable:!1},{key:"db_user",label:this.$t("CELPHONE"),sortable:!1},{key:"actions",label:"",sortable:!1}]:[{key:"name",label:this.$t("Dizimista"),sortable:!1}]}},methods:{infiniteHandler:function($state){this.getDbIntegrations($state)},getDbIntegrations:function(infiniteState){var _this=this,params=Object.assign({page:this.page},this.filter);__WEBPACK_IMPORTED_MODULE_1_services_general_service__.a.get(null,params).then(function(res){var _dbIntegrations;res.data.data.length?(_this.page+=1,(_dbIntegrations=_this.dbIntegrations).push.apply(_dbIntegrations,function(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}(res.data.data)),infiniteState.loaded()):infiniteState.complete()})},saveIntegration:function(data){alert(data)},openModalDbIntegration:function(){this.$bvModal.show("modalDbIntegration")},selectIntegration:function(item){this.selectedIntegration=item.shift()||{}},editDbIntegration:function(id){console.log("Todo: implementar edição")},testConnection:function(data){var _this2=this;data.id in this.loadingTests?this.loadingTests[data.id]=!0:this.$set(this.loadingTests,data.id,!0),__WEBPACK_IMPORTED_MODULE_1_services_general_service__.a.testConnection(data).then(function(res){res.data.connected&&_this2.$notify({msg:"Conexão bem sucedida!",type:"success"})}).catch(function(err){console.log(err)}).finally(function(){_this2.loadingTests[data.id]=!1})}}}},591:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={computed:{},data:function(){return{invalidFeedback:"O Campo está invalido",formIntegration:{id:null,name:"",driver:"",server:"",port:"",db_user:"",db_password:""},drivers:[{label:"MySql",driver:"mysql"},{label:"Oracle",driver:"oracle"},{label:"Postgree Sql",driver:"pgsql"},{label:"SQL Server",driver:"sqlsrv"}]}},methods:{save:function(){var _this=this;this.$refs.observer.validate().then(function(success){success&&alert(JSON.stringify(_this.formIntegration))})}}}},600:function(module,exports,__webpack_require__){(module.exports=__webpack_require__(549)()).push([module.i,"","",{version:3,sources:[],names:[],mappings:"",file:"dbIntegrations.vue",sourceRoot:"webpack://"}])},606:function(module,exports,__webpack_require__){(module.exports=__webpack_require__(549)()).push([module.i,"","",{version:3,sources:[],names:[],mappings:"",file:"modalIntegration.vue",sourceRoot:"webpack://"}])},621:function(module,exports,__webpack_require__){var content=__webpack_require__(600);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);(0,__webpack_require__(536).default)("3b0ed376",content,!0,{})},627:function(module,exports,__webpack_require__){var content=__webpack_require__(606);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[module.i,content,""]]),content.locals&&(module.exports=content.locals);(0,__webpack_require__(536).default)("6aa9e69a",content,!0,{})},650:function(module,exports,__webpack_require__){__webpack_require__(621);var Component=__webpack_require__(38)(__webpack_require__(590),__webpack_require__(655),"data-v-273ae1a2",null);module.exports=Component.exports},651:function(module,exports,__webpack_require__){__webpack_require__(627);var Component=__webpack_require__(38)(__webpack_require__(591),__webpack_require__(661),"data-v-550be38c",null);module.exports=Component.exports},655:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("BaseView",{scopedSlots:_vm._u([{key:"header",fn:function(){return[_c("div",{staticClass:"px-3 w-100 h-100 d-flex align-items-center justify-content-between"},[_c("div",{staticClass:"d-flex"},[_c("i",{staticClass:"material-icons mr-2"},[_vm._v("cloud_circle")]),_c("h5",[_vm._v(_vm._s(_vm.$t("dbIntegrations")))])]),_vm._v(" "),_c("div",[_c("b-button",{attrs:{variant:"primary"},on:{click:function($event){return _vm.openModalDbIntegration()}}},[_c("i",{staticClass:"fas fa-plus mr-2"}),_vm._v(_vm._s(_vm.$t("NEW_CONNECTION")))])],1)])]},proxy:!0}])},[_vm._v(" "),_c("b-container",{attrs:{fluid:""}},[_c("div",[_c("b-table",{ref:"table",attrs:{hover:"",items:_vm.dbIntegrations,fields:_vm.fields,selectable:!0,"select-mode":"single"},on:{"row-selected":_vm.selectIntegration},scopedSlots:_vm._u([{key:"cell(actions)",fn:function(ref){var item=ref.item;return[_c("b-button",{staticClass:"rounded-circle",attrs:{variant:"primary"}},[_c("span",{staticClass:"fas fa-edit",on:{click:function($event){return _vm.editDbIntegration(item.id)}}})]),_vm._v(" "),_c("b-button",{staticClass:"rounded-circle",attrs:{variant:"info"}},[_vm.loadingTests[item.id]?_vm._e():_c("span",{staticClass:"fas fa-wifi",on:{click:function($event){return _vm.testConnection(item)}}}),_vm._v(" "),_vm.loadingTests[item.id]?_c("span",{staticClass:"fas fa-spinner fa-pulse",on:{click:function($event){return _vm.testConnection(item)}}}):_vm._e()]),_vm._v(" "),_c("b-button",{staticClass:"rounded-circle",attrs:{variant:"danger"}},[_c("span",{staticClass:"fas fa-trash",on:{click:function($event){return _vm.deleteConnection(item.id)}}})])]}}])}),_vm._v(" "),_c("infinite-loading",{attrs:{identifier:_vm.resetState},on:{infinite:_vm.infiniteHandler}})],1)]),_vm._v(" "),_c("ModalDbIntegration",{on:{save:_vm.saveIntegration}})],1)},staticRenderFns:[]}},661:function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",[_c("b-modal",{attrs:{id:"modalDbIntegration","no-close-on-backdrop":"",title:_vm.$t("DB_INTEGRATION"),size:"lg"},on:{ok:function($event){return _vm.emit("saveDbIntegration",_vm.formIntegration)}},scopedSlots:_vm._u([{key:"modal-footer",fn:function(ref){var cancel=ref.cancel;return[_c("div",{staticClass:"d-flex w-100 justify-content-between"},[_c("div",[_c("b-button",{attrs:{size:"sm",variant:"info"},on:{click:function($event){return cancel()}}},[_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(_vm.$t("TEST_CONNECTION"))+"\n\t\t\t\t\t\t")])],1),_vm._v(" "),_c("div",[_c("b-button",{attrs:{size:"sm",variant:"secondary"},on:{click:function($event){return cancel()}}},[_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(_vm.$t("CANCEL"))+"\n\t\t\t\t\t\t")]),_vm._v(" "),_c("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:function($event){return _vm.save()}}},[_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(_vm.$t("SAVE"))+"\n\t\t\t\t\t\t")])],1)])]}}])},[_vm._v(" "),_c("ValidationObserver",{ref:"observer"},[_c("form",{attrs:{action:""}},[_c("div",{staticClass:"row"},[_c("div",{staticClass:"col-12"},[_c("label",{attrs:{for:""}},[_vm._v(_vm._s(_vm.$t("NAME")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("NAME"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("b-form-input",{model:{value:_vm.formIntegration.name,callback:function($$v){_vm.$set(_vm.formIntegration,"name",$$v)},expression:"formIntegration.name"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1),_vm._v(" "),_c("div",{staticClass:"col-12"},[_c("label",[_vm._v(_vm._s(_vm.$t("DRIVER")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("DRIVER"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("v-select",{attrs:{options:_vm.drivers,reduce:function(item){return item.driver}},model:{value:_vm.formIntegration.driver,callback:function($$v){_vm.$set(_vm.formIntegration,"driver",$$v)},expression:"formIntegration.driver"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1),_vm._v(" "),_c("div",{staticClass:"col-9"},[_c("label",[_vm._v(_vm._s(_vm.$t("HOST")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("HOST"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("b-form-input",{model:{value:_vm.formIntegration.server,callback:function($$v){_vm.$set(_vm.formIntegration,"server",$$v)},expression:"formIntegration.server"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1),_vm._v(" "),_c("div",{staticClass:"col-3"},[_c("label",[_vm._v(_vm._s(_vm.$t("PORT")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("PORT"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("b-form-input",{attrs:{type:"number"},model:{value:_vm.formIntegration.port,callback:function($$v){_vm.$set(_vm.formIntegration,"port",$$v)},expression:"formIntegration.port"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1),_vm._v(" "),_c("div",{staticClass:"col-6"},[_c("label",[_vm._v(_vm._s(_vm.$t("USERNAME")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("USERNAME"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("b-form-input",{model:{value:_vm.formIntegration.db_user,callback:function($$v){_vm.$set(_vm.formIntegration,"db_user",$$v)},expression:"formIntegration.db_user"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1),_vm._v(" "),_c("div",{staticClass:"col-6"},[_c("label",[_vm._v(_vm._s(_vm.$t("PASSWORD")))]),_vm._v(" "),_c("ValidationProvider",{attrs:{name:_vm.$t("PASSWORD"),rules:"required"},scopedSlots:_vm._u([{key:"default",fn:function(ref){var errors=ref.errors;return[_c("b-form-input",{attrs:{type:"password"},model:{value:_vm.formIntegration.db_password,callback:function($$v){_vm.$set(_vm.formIntegration,"db_password",$$v)},expression:"formIntegration.db_password"}}),_vm._v(" "),_c("small",{staticClass:"text-danger"},[_vm._v(_vm._s(errors[0]))])]}}])})],1)])])])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=3.3dccdbaf.js.map