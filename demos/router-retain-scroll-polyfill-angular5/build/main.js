webpackJsonp([1],[,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function AbstractListViewComponent(t){this.name=t,this.isLoading=!0,this.items=null,this.timer=null}return AbstractListViewComponent.prototype.ngOnDestroy=function(){clearTimeout(this.timer)},AbstractListViewComponent.prototype.ngOnInit=function(){var t=this;this.isLoading=!0,this.timer=setTimeout(function(){t.isLoading=!1,t.items=[];for(var e=0;e<100;e++)t.items.push("Item "+e+" for view, "+t.name+".")},Math.floor(1e3*Math.random()))},AbstractListViewComponent}();e.AbstractListViewComponent=o},,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=/^_ng(host|content)\b/i,i=function(){function DomUtils(){}return DomUtils.prototype.exists=function(t){return!!this.select(t)},DomUtils.prototype.getScrollTop=function(t){return t instanceof Window?window.scrollY:t.scrollTop},DomUtils.prototype.getSelector=function(t){return t instanceof Window?"__window__":this.getSelectorForElement(t)},DomUtils.prototype.getTargetFromScrollEvent=function(t){var e=t.target;return e instanceof HTMLDocument?window:e instanceof Element?e:null},DomUtils.prototype.scrollTo=function(t,e){return t instanceof Window?(t.scrollTo(0,e),t.scrollY):t instanceof Element?(t.scrollTop=e,t.scrollTop):void 0},DomUtils.prototype.select=function(t){return"__window__"===t?window:document.querySelector(t)},DomUtils.prototype.getSelectorForElement=function(t){for(var e=[],n=t;n&&"BODY"!==n.nodeName;){for(var i=n.nodeName.toLowerCase(),r=0,a=Array.from(n.attributes);r<a.length;r++){var c=a[r];0===c.name.search(o)&&(i+="["+c.name+"]")}e.unshift(i),n=n.parentNode}return e.join(" > ")},DomUtils.prototype.isRootScrollableNode=function(t){return t instanceof HTMLDocument},DomUtils}();e.DomUtils=i},,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},i=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},r=this&&this.__param||function(t,e){return function(n,o){e(n,o,t)}};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(0),s=n(0),l=n(3),p=n(3),u=n(0),f=n(3),d=n(20);e.OPTIONS_TOKEN=new s.InjectionToken("RetainScrollPolyfillService.Options");var m=function(){function RetainScrollPolyfillService(t,e,n,o){this.domUtils=t,this.router=e,this.zone=n,this.supportsPushState()&&(this.applyStateToDomTimer=0,this.historyCounter=0,this.lastNavigationStartAt=0,this.pendingElements=new Set,this.pendingElementsTimer=0,this.pollCadence=o.pollCadence,this.pollDuration=o.pollDuration,this.poppedHistoryID=null,this.previousPageState=null,this.renderStates=Object.create(null),this.scrolledElements=new Map,this.currentHistoryID=this.getNextHistoryID(),this.setupPushStateMonkeyPatch(),this.setupScrollBinding(),this.setupPopstateBinding(),this.setupRouterBinding())}return RetainScrollPolyfillService.prototype.applyPageStateToDom=function(t){var e=this,n=Object.keys(t.elementStates).map(function(e){return t.elementStates[e]});n.length&&(console.group("Attempting to Reapply Page State In PopState Navigation"),console.log(JSON.stringify(n,null,4)),console.groupEnd(),this.zone.runOutsideAngular(function(){var t=Date.now();e.applyStateToDomTimer=setInterval(function(){for(var o=n.length-1;o>=0;o--){var i=n[o],r=e.domUtils.select(i.selector);if(r)if(e.scrolledElements.has(r))n.splice(o,1);else{var a=e.domUtils.scrollTo(r,i.scrollTop);a===i.scrollTop&&n.splice(o,1)}}(!n.length||Date.now()-t>=e.pollDuration)&&clearTimeout(e.applyStateToDomTimer)},e.pollCadence)}))},RetainScrollPolyfillService.prototype.commitPendingElements=function(){var t=this;this.pendingElements.forEach(function(e){t.scrolledElements.set(e,t.domUtils.getScrollTop(e))}),this.pendingElements.clear()},RetainScrollPolyfillService.prototype.ensurePageState=function(t,e){void 0===e&&(e=!1);var n=this.router.url;this.renderStates[n]||(this.renderStates[n]={url:n,pageStates:[]});for(var o=this.renderStates[n].pageStates,i=0,r=o;i<r.length;i++){var a=r[i];if(a.historyID===t)return a}var a={historyID:t,elementStates:Object.create(null)};return e&&o.length&&(console.warn("No PageState associated with popState - using recent values as fallback."),Object.assign(a.elementStates,o[0].elementStates)),o.unshift(a),o.length>15&&o.pop(),a},RetainScrollPolyfillService.prototype.getElementStatesFromNodes=function(t){var e=this,n=Object.create(null);return t.forEach(function(t,o){var i=e.domUtils.getSelector(o);n[i]={selector:i,scrollTop:t}}),n},RetainScrollPolyfillService.prototype.getNextHistoryID=function(){return"retain-scroll-"+ ++this.historyCounter+"-"+Date.now()},RetainScrollPolyfillService.prototype.setupPopstateBinding=function(){var t=this;this.zone.runOutsideAngular(function(){window.addEventListener("popstate",function(e){try{t.poppedHistoryID=e.state.id}catch(e){t.poppedHistoryID=t.getNextHistoryID()}})})},RetainScrollPolyfillService.prototype.setupPushStateMonkeyPatch=function(){var t=this,e=window.history.pushState;this.zone.runOutsideAngular(function(){window.history.pushState=function(n,o,i){console.warn("Intercepting .pushState()"),e.call(window.history,{id:t.currentHistoryID=t.getNextHistoryID(),originalState:n},o,i)}})},RetainScrollPolyfillService.prototype.setupRouterBinding=function(){var t=this;this.router.events.subscribe(function(e){if(e instanceof p.NavigationStart){t.lastNavigationStartAt=Date.now(),clearTimeout(t.applyStateToDomTimer),clearTimeout(t.pendingElementsTimer),t.pendingElements.clear();var n=t.ensurePageState(t.currentHistoryID);if(t.scrolledElements.size&&(Object.assign(n.elementStates,t.getElementStatesFromNodes(t.scrolledElements)),t.scrolledElements.clear()),t.previousPageState&&!t.poppedHistoryID)for(var o in t.previousPageState.elementStates)!n.elementStates[o]&&t.domUtils.exists(o)&&(console.group("Pulling Scroll Offset Forward from Previous State"),console.log(o),console.log(t.previousPageState.elementStates[o].scrollTop),console.groupEnd(),n.elementStates[o]={selector:o,scrollTop:t.previousPageState.elementStates[o].scrollTop});t.previousPageState=n}else if(e instanceof l.NavigationEnd&&t.poppedHistoryID){t.currentHistoryID=t.poppedHistoryID,t.poppedHistoryID=null;var n=t.ensurePageState(t.currentHistoryID,!0);t.applyPageStateToDom(n)}})},RetainScrollPolyfillService.prototype.setupScrollBinding=function(){var t=this;this.zone.runOutsideAngular(function(){window.addEventListener("scroll",function(e){if(!(Date.now()-t.lastNavigationStartAt<250)){var n=t.domUtils.getTargetFromScrollEvent(e);n&&(t.pendingElements.add(n),clearTimeout(t.pendingElementsTimer),t.pendingElementsTimer=setTimeout(function(){t.commitPendingElements()},250))}},!0)})},RetainScrollPolyfillService.prototype.supportsPushState=function(){return!!(window&&window.history&&window.history.pushState)},RetainScrollPolyfillService=o([c.Injectable(),r(3,a.Inject(e.OPTIONS_TOKEN)),i("design:paramtypes",[d.DomUtils,f.Router,u.NgZone,Object])],RetainScrollPolyfillService)}();e.RetainScrollPolyfillService=m},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function AbstractDetailViewComponent(t){this.name=t,this.isLoading=!0,this.timer=null}return AbstractDetailViewComponent.prototype.ngOnDestroy=function(){clearTimeout(this.timer)},AbstractDetailViewComponent.prototype.ngOnInit=function(){var t=this;this.isLoading=!0,this.timer=setTimeout(function(){t.isLoading=!1},Math.floor(1e3*Math.random()))},AbstractDetailViewComponent}();e.AbstractDetailViewComponent=o},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(36),i=n(91);o.platformBrowserDynamic().bootstrapModule(i.AppModule)},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(18),r=n(0),a=n(3),c=n(92),s=n(94),l=n(96),p=n(98),u=n(100),f=n(102),d=n(104),m=n(106),h=n(108),y=n(110),g=n(112),v=n(114),_=n(116),b=[{path:"app",children:[{path:"main",children:[{path:"section-a",component:f.SectionAViewComponent},{path:"section-b",component:d.SectionBViewComponent},{path:"section-c",component:y.SectionCViewComponent,children:[{path:"tab-1",component:m.SectionCTab1ViewComponent},{path:"tab-2",component:h.SectionCTab2ViewComponent}]}]},{outlet:"secondary",path:"secondary",component:u.SecondaryViewComponent,children:[{path:"",pathMatch:"full",component:p.SecondaryListViewComponent},{path:"detail",component:l.SecondaryDetailViewComponent}]},{outlet:"tertiary",path:"tertiary",component:_.TertiaryViewComponent,children:[{path:"",pathMatch:"full",component:v.TertiaryListViewComponent},{path:"detail",component:g.TertiaryDetailViewComponent}]}]},{path:"",pathMatch:"full",redirectTo:"app"}],S=function(){function AppModule(){}return AppModule=o([r.NgModule({bootstrap:[c.AppComponent],imports:[i.BrowserModule,s.RetainScrollPolyfillModule.forRoot({pollDuration:3e3,pollCadence:50}),a.RouterModule.forRoot(b,{useHash:!0,enableTracing:!1})],declarations:[c.AppComponent,l.SecondaryDetailViewComponent,p.SecondaryListViewComponent,u.SecondaryViewComponent,f.SectionAViewComponent,d.SectionBViewComponent,m.SectionCTab1ViewComponent,h.SectionCTab2ViewComponent,y.SectionCViewComponent,g.TertiaryDetailViewComponent,v.TertiaryListViewComponent,_.TertiaryViewComponent],providers:[]})],AppModule)}();e.AppModule=S},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function AppComponent(){}return AppComponent.prototype.ngDoCheck=function(){console.info("Angular is performing a dirty-check of its components at",Date.now())},AppComponent=o([i.Component({selector:"my-app",styles:[n(93)],template:'\n\t\t<div class="nav">\n\t\t\t<a routerLink="/app" class="nav__item">Home</a>\n\t\t\t<a routerLink="/app/main/section-a" class="nav__item">Section A</a>\n\t\t\t<a routerLink="/app/main/section-b" class="nav__item">Section B</a>\n\t\t\t<a routerLink="/app/main/section-c" class="nav__item">Section C</a>\n\t\t\t\n\t\t\t<a [routerLink]="[ \'/app\', { outlets: { secondary: \'secondary\' } } ]" class="nav__item nav__item--secondary">Secondary</a>\n\t\t\t<a [routerLink]="[ \'/app\', { outlets: { tertiary: \'tertiary\' } } ]" class="nav__item">Tertiary</a>\n\t\t</div>\n\n\t\t<h1>\n\t\t\tRestoring Scroll Position With A Polyfill In Angular 5.2.3\n\t\t</h1>\n\n\t\t<router-outlet></router-outlet>\n\t\t<router-outlet name="secondary"></router-outlet>\n\t\t<router-outlet name="tertiary"></router-outlet>\n\t'})],AppComponent)}();e.AppComponent=r},function(t,e){t.exports=":host {\n  display: block ;\n  font-size: 18px ;\n  padding: 50px 0px 0px 0px ;\n}\n.nav {\n  background-color: #F0F0F0 ;\n  border-bottom: 2px solid #999999 ;\n  box-sizing: border-box;\n  display: flex ;\n  height: 50px ;\n  line-height: 50px ;\n  justify-content: center ;\n  left: 0px ;\n  position: fixed ;\n  right: 0px ;\n  top: 0px ;\n}\n.nav__item {\n  padding: 0px 17px 0px 17px ;\n}\n.nav__item:hover {\n  background-color: gold ;\n}\n.nav__item--secondary {\n  border-left: 1px solid #CCCCCC ;\n}\nh1 {\n  text-align: center ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},i=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),a=n(20),c=n(38),s=n(38),l=n(95),p=function(){function RetainScrollPolyfillModule(t){console.group("Retain Scroll Polyfill Module"),console.warn("This module assumes push-state-based navigation."),console.warn("This module monkey-patches the .pushState() history method."),console.warn("This module assumes simulated encapsulation attributes for CSS selector generation."),console.groupEnd()}return t=RetainScrollPolyfillModule,RetainScrollPolyfillModule.forRoot=function(e){return void 0===e&&(e={}),{ngModule:t,providers:[a.DomUtils,s.RetainScrollPolyfillService,{provide:c.OPTIONS_TOKEN,useValue:{pollDuration:e.pollDuration||3e3,pollCadence:e.pollCadence||50}}]}},RetainScrollPolyfillModule=t=o([r.NgModule({exports:[l.RouterOutletDirective],declarations:[l.RouterOutletDirective]}),i("design:paramtypes",[s.RetainScrollPolyfillService])],RetainScrollPolyfillModule);var t}();e.RetainScrollPolyfillModule=p},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},i=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),a=n(0),c=n(3),s=n(3),l=n(3),p=n(20),u=function(){function RouterOutletDirective(t,e,n,o){this.domUtils=t,this.elementRef=e,this.router=n,this.routerOutlet=o,this.activateEventsSubscription=null,this.deactivateEventsSubscription=null,this.offsets=[],this.routerEventsSubscription=null}return RouterOutletDirective.prototype.ngOnDestroy=function(){this.activateEventsSubscription&&this.activateEventsSubscription.unsubscribe(),this.deactivateEventsSubscription&&this.deactivateEventsSubscription.unsubscribe(),this.routerEventsSubscription&&this.routerEventsSubscription.unsubscribe()},RouterOutletDirective.prototype.ngOnInit=function(){var t=this;this.activateEventsSubscription=this.routerOutlet.activateEvents.subscribe(function(e){t.handleActivateEvent()}),this.deactivateEventsSubscription=this.routerOutlet.deactivateEvents.subscribe(function(e){t.handleDectivateEvent()}),this.routerEventsSubscription=this.router.events.subscribe(function(e){t.handleNavigationEvent(e)})},RouterOutletDirective.prototype.handleActivateEvent=function(){if(this.offsets.length){console.group("Ensuring Ancestral Scroll Offsets in New Navigation"),console.log(this.offsets.slice()),console.groupEnd();for(var t=this.elementRef.nativeElement.parentNode;t;)1===t.nodeType&&this.domUtils.scrollTo(t,this.offsets.shift()),t=t.parentNode;this.domUtils.scrollTo(window,this.offsets.shift())}},RouterOutletDirective.prototype.handleDectivateEvent=function(){for(var t=this.elementRef.nativeElement.parentNode;t;)1===t.nodeType&&this.offsets.push(this.domUtils.getScrollTop(t)),t=t.parentNode;this.offsets.push(this.domUtils.getScrollTop(window))},RouterOutletDirective.prototype.handleNavigationEvent=function(t){t instanceof c.NavigationEnd&&this.offsets.splice(0,this.offsets.length)},RouterOutletDirective=o([r.Directive({selector:"router-outlet"}),i("design:paramtypes",[p.DomUtils,a.ElementRef,s.Router,l.RouterOutlet])],RouterOutletDirective)}();e.RouterOutletDirective=u},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(39),s=function(t){function SecondaryDetailViewComponent(){return t.call(this,"Secondary Detail")||this}return o(SecondaryDetailViewComponent,t),SecondaryDetailViewComponent=i([a.Component({selector:"secondary-detail-view",styles:[n(97)],template:'\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p class="loading">\n\t\t\t\t<strong class="loading__message">Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<h2>\n\t\t\t\tSecondary Detail\n\t\t\t</h2>\n\n\t\t\t<p>\n\t\t\t\t<a routerLink="../">Back</a>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\tThis is the {{ name }} view.\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],SecondaryDetailViewComponent)}(c.AbstractDetailViewComponent);e.SecondaryDetailViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  padding: 4px 20px 1000px 20px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(7),s=function(t){function SecondaryListViewComponent(){return t.call(this,"Secondary List")||this}return o(SecondaryListViewComponent,t),SecondaryListViewComponent=i([a.Component({selector:"secondary-list-view",styles:[n(99)],template:'\n\t\t<h2>\n\t\t\tSecondary List\n\t\t</h2>\n\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<p>\n\t\t\t\t<a [routerLink]="[ \'/app\', { outlets: { secondary: null } } ]">Close</a>\n\t\t\t</p>\n\n\t\t\t<p *ngFor="let item of items">\n\t\t\t\t<a routerLink="./detail">{{ item }}</a>\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],SecondaryListViewComponent)}(c.AbstractListViewComponent);e.SecondaryListViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  padding: 4px 20px 4px 20px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function SecondaryViewComponent(){}return SecondaryViewComponent=o([i.Component({selector:"secondary-view",styles:[n(101)],template:"\n\t\t<router-outlet></router-outlet>\n\t"})],SecondaryViewComponent)}();e.SecondaryViewComponent=r},function(t,e){t.exports=":host {\n  background-color: #FAFAFA ;\n  border-right: 1px solid #CCCCCC ;\n  bottom: 0px ;\n  left: 0px ;\n  overflow: auto ;\n  position: fixed ;\n  top: 50px ;\n  width: 350px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(7),s=function(t){function SectionAViewComponent(){return t.call(this,"Section A")||this}return o(SectionAViewComponent,t),SectionAViewComponent=i([a.Component({selector:"section-a-view",styles:[n(103)],template:'\n\t\t<h2>\n\t\t\tSection A\n\t\t</h2>\n\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<p *ngFor="let item of items">\n\t\t\t\t{{ item }}\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],SectionAViewComponent)}(c.AbstractListViewComponent);e.SectionAViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  text-align: center ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(7),s=function(t){function SectionBViewComponent(){return t.call(this,"Section B")||this}return o(SectionBViewComponent,t),SectionBViewComponent=i([a.Component({selector:"section-b-view",styles:[n(105)],template:'\n\t\t<h2>\n\t\t\tSection B\n\t\t</h2>\n\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<p *ngFor="let item of items">\n\t\t\t\t{{ item }}\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],SectionBViewComponent)}(c.AbstractListViewComponent);e.SectionBViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  text-align: center ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function SectionCTab1ViewComponent(){}return SectionCTab1ViewComponent=o([i.Component({selector:"section-c-tab-1-view",styles:[n(107)],template:"\n\t\t<h3>\n\t\t\tSection C &mdash; Tab 1\n\t\t</h3>\n\n\t\t<p>\n\t\t\tWelcome to Tab 1 - it's so hot right now.\n\t\t</p>\n\t"})],SectionCTab1ViewComponent)}();e.SectionCTab1ViewComponent=r},function(t,e){t.exports=":host {\n  display: block ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function SectionCTab2ViewComponent(){}return SectionCTab2ViewComponent=o([i.Component({selector:"section-c-tab-2-view",styles:[n(109)],template:"\n\t\t<h3>\n\t\t\tSection C &mdash; Tab 2\n\t\t</h3>\n\n\t\t<p>\n\t\t\tWelcome to Tab 2 - it's so hot right now.\n\t\t</p>\n\t"})],SectionCTab2ViewComponent)}();e.SectionCTab2ViewComponent=r},function(t,e){t.exports=":host {\n  display: block ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(7),s=function(t){function SectionCViewComponent(){return t.call(this,"Section C")||this}return o(SectionCViewComponent,t),SectionCViewComponent=i([a.Component({selector:"section-c-view",styles:[n(111)],template:'\n\t\t<h2>\n\t\t\tSection C\n\t\t</h2>\n\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<p *ngFor="let item of items">\n\t\t\t\t{{ item }}\n\t\t\t</p>\n\n\t\t\t<div class="tabs">\n\t\t\t\t<a routerLink="./tab-1" class="tabs__tab" routerLinkActive="tabs__tab--on">\n\t\t\t\t\tTab 1\n\t\t\t\t</a>\n\t\t\t\t<a routerLink="./tab-2" class="tabs__tab" routerLinkActive="tabs__tab--on">\n\t\t\t\t\tTab 2\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="tab-content">\n\t\t\t\t<router-outlet></router-outlet>\n\t\t\t</div>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],SectionCViewComponent)}(c.AbstractListViewComponent);e.SectionCViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  text-align: center ;\n}\n.tabs {\n  display: flex ;\n  border-bottom: 5px solid #CCCCCC ;\n  margin: 30px 380px 0px 380px ;\n}\n.tabs__tab {\n  background-color: #FAFAFA ;\n  flex: 1 0 auto ;\n  padding: 17px 0px 14px 0px ;\n  text-align: center ;\n}\n.tabs__tab--on {\n  background-color: #CCCCCC ;\n  font-weight: bold ;\n}\n.tab-content {\n  margin: 0px 380px 0px 380px ;\n  padding: 20px 20px 20px 20px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(39),s=function(t){function TertiaryDetailViewComponent(){return t.call(this,"Tertiary Detail")||this}return o(TertiaryDetailViewComponent,t),TertiaryDetailViewComponent=i([a.Component({selector:"tertiary-detail-view",styles:[n(113)],template:'\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<h2>\n\t\t\t\tTertiary Detail\n\t\t\t</h2>\n\n\t\t\t<p>\n\t\t\t\t<a routerLink="../">Back</a>\n\t\t\t</p>\n\n\t\t\t<p>\n\t\t\t\tThis is the {{ name }} view.\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],TertiaryDetailViewComponent)}(c.AbstractDetailViewComponent);e.TertiaryDetailViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  padding: 4px 20px 1000px 20px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function __(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(__.prototype=n.prototype,new __)}}(),i=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a},r=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),c=n(7),s=function(t){function TertiaryListViewComponent(){return t.call(this,"Tertiary List")||this}return o(TertiaryListViewComponent,t),TertiaryListViewComponent=i([a.Component({selector:"tertiary-list-view",styles:[n(115)],template:'\n\t\t<h2>\n\t\t\tTertiary List\n\t\t</h2>\n\n\t\t<ng-template [ngIf]="isLoading">\n\t\t\t<p>\n\t\t\t\t<strong>Loading....</strong>\n\t\t\t</p>\n\t\t</ng-template>\n\n\t\t<ng-template [ngIf]="! isLoading">\n\t\t\t<p>\n\t\t\t\t<a [routerLink]="[ \'/app\', { outlets: { tertiary: null } } ]">Close</a>\n\t\t\t</p>\n\n\t\t\t<p *ngFor="let item of items">\n\t\t\t\t<a routerLink="./detail">{{ item }}</a>\n\t\t\t</p>\n\t\t</ng-template>\n\t'}),r("design:paramtypes",[])],TertiaryListViewComponent)}(c.AbstractListViewComponent);e.TertiaryListViewComponent=s},function(t,e){t.exports=":host {\n  display: block ;\n  padding: 4px 20px 4px 20px ;\n}\n"},function(t,e,n){"use strict";var o=this&&this.__decorate||function(t,e,n,o){var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var c=t.length-1;c>=0;c--)(i=t[c])&&(a=(r<3?i(a):r>3?i(e,n,a):i(e,n))||a);return r>3&&a&&Object.defineProperty(e,n,a),a};Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),r=function(){function TertiaryViewComponent(){}return TertiaryViewComponent=o([i.Component({selector:"tertiary-view",styles:[n(117)],template:"\n\t\t<router-outlet></router-outlet>\n\t"})],TertiaryViewComponent)}();e.TertiaryViewComponent=r},function(t,e){t.exports=":host {\n  background-color: #FAFAFA ;\n  border-left: 1px solid #CCCCCC ;\n  bottom: 0px ;\n  overflow: auto ;\n  position: fixed ;\n  right: 0px ;\n  top: 50px ;\n  width: 350px ;\n}\n"}],[90]);