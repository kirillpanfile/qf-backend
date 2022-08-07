"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var _excluded=["password"];function _objectWithoutProperties(t,e){if(null==t)return{};var r,n=_objectWithoutPropertiesLoose(t,e);if(Object.getOwnPropertySymbols)for(var o=Object.getOwnPropertySymbols(t),i=0;i<o.length;i++)r=o[i],0<=e.indexOf(r)||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r]);return n}function _objectWithoutPropertiesLoose(t,e){if(null==t)return{};for(var r,n={},o=Object.keys(t),i=0;i<o.length;i++)r=o[i],0<=e.indexOf(r)||(n[r]=t[r]);return n}function _regeneratorRuntime(){_regeneratorRuntime=function(){return a};var a={},t=Object.prototype,u=t.hasOwnProperty,e="function"==typeof Symbol?Symbol:{},n=e.iterator||"@@iterator",r=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function i(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{i({},"")}catch(t){i=function(t,e,r){return t[e]=r}}function s(t,e,r,n){var o,i,a,s,e=e&&e.prototype instanceof l?e:l,e=Object.create(e.prototype),n=new b(n||[]);return e._invoke=(o=t,i=r,a=n,s="suspendedStart",function(t,e){if("executing"===s)throw new Error("Generator is already running");if("completed"===s){if("throw"===t)throw e;return _()}for(a.method=t,a.arg=e;;){var r=a.delegate;if(r){r=function t(e,r){var n=e.iterator[r.method];if(void 0===n){if(r.delegate=null,"throw"===r.method){if(e.iterator.return&&(r.method="return",r.arg=void 0,t(e,r),"throw"===r.method))return f;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return f}n=c(n,e.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,f;n=n.arg;return n?n.done?(r[e.resultName]=n.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,f):n:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,f)}(r,a);if(r){if(r===f)continue;return r}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if("suspendedStart"===s)throw s="completed",a.arg;a.dispatchException(a.arg)}else"return"===a.method&&a.abrupt("return",a.arg);s="executing";r=c(o,i,a);if("normal"===r.type){if(s=a.done?"completed":"suspendedYield",r.arg===f)continue;return{value:r.arg,done:a.done}}"throw"===r.type&&(s="completed",a.method="throw",a.arg=r.arg)}}),e}function c(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}a.wrap=s;var f={};function l(){}function h(){}function p(){}var e={},y=(i(e,n,function(){return this}),Object.getPrototypeOf),y=y&&y(y(x([]))),d=(y&&y!==t&&u.call(y,n)&&(e=y),p.prototype=l.prototype=Object.create(e));function m(t){["next","throw","return"].forEach(function(e){i(t,e,function(t){return this._invoke(e,t)})})}function v(a,s){var e;this._invoke=function(r,n){function t(){return new s(function(t,e){!function e(t,r,n,o){var i,t=c(a[t],a,r);if("throw"!==t.type)return(r=(i=t.arg).value)&&"object"==_typeof(r)&&u.call(r,"__await")?s.resolve(r.__await).then(function(t){e("next",t,n,o)},function(t){e("throw",t,n,o)}):s.resolve(r).then(function(t){i.value=t,n(i)},function(t){return e("throw",t,n,o)});o(t.arg)}(r,n,t,e)})}return e=e?e.then(t,t):t()}}function g(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function b(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(g,this),this.reset(!0)}function x(e){if(e){var r,t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return r=-1,(t=function t(){for(;++r<e.length;)if(u.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t}).next=t}return{next:_}}function _(){return{value:void 0,done:!0}}return i(d,"constructor",h.prototype=p),i(p,"constructor",h),h.displayName=i(p,o,"GeneratorFunction"),a.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,i(t,o,"GeneratorFunction")),t.prototype=Object.create(d),t},a.awrap=function(t){return{__await:t}},m(v.prototype),i(v.prototype,r,function(){return this}),a.AsyncIterator=v,a.async=function(t,e,r,n,o){void 0===o&&(o=Promise);var i=new v(s(t,e,r,n),o);return a.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},m(d),i(d,o,"Generator"),i(d,n,function(){return this}),i(d,"toString",function(){return"[object Generator]"}),a.keys=function(r){var t,n=[];for(t in r)n.push(t);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=!1,t}return t.done=!0,t}},a.values=x,b.prototype={constructor:b,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&u.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return i.type="throw",i.arg=r,n.next=t,e&&(n.method="next",n.arg=void 0),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=u.call(o,"catchLoc"),s=u.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return t(o.catchLoc,!0);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&u.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var i=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),w(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r,n,o=this.tryEntries[e];if(o.tryLoc===t)return"throw"===(r=o.completion).type&&(n=r.arg,w(o)),n}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:x(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},a}function asyncGeneratorStep(t,e,r,n,o,i,a){try{var s=t[i](a),u=s.value}catch(t){return void r(t)}s.done?e(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(s){return function(){var t=this,a=arguments;return new Promise(function(e,r){var n=s.apply(t,a);function o(t){asyncGeneratorStep(n,e,r,o,i,"next",t)}function i(t){asyncGeneratorStep(n,e,r,o,i,"throw",t)}o(void 0)})}}var _require=require("../config/auth.config"),jwtSecret=_require.jwtSecret,jwt=require("jsonwebtoken"),User=require("../models/user.model"),bcrypt=require("bcrypt"),saltRounds=10,signUp=function(){var r=_asyncToGenerator(_regeneratorRuntime().mark(function t(e,r){var n,o,i,a,s,u;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=e.body,n=i.username,o=i.email,i=i.password,n&&o&&i){t.next=3;break}return t.abrupt("return",r.status(400).json({msg:"Please enter all fields"}));case 3:return t.next=5,User.findOne({username:n});case 5:return a=t.sent,t.next=8,User.findOne({email:o});case 8:if(s=t.sent,a||s)return t.abrupt("return",r.status(400).json({msg:"User already exists"}));t.next=11;break;case 11:return t.next=13,bcrypt.genSalt(saltRounds);case 13:return s=t.sent,t.next=16,bcrypt.hash(i,s);case 16:return u=t.sent,u=new User({username:n,email:o,password:u,roles:["ROLE_USER"]}),t.next=20,u.save();case 20:r.status(201).json("User created");case 21:case"end":return t.stop()}},t)}));return function(t,e){return r.apply(this,arguments)}}(),signInRemember=function(){var r=_asyncToGenerator(_regeneratorRuntime().mark(function t(e,r){var n,o;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.headers["x-access-token"],n=jwt.verify(n,jwtSecret),t.next=4,User.findById(n.user._id);case 4:return n=t.sent,o=n._doc,o.password,o=_objectWithoutProperties(o,_excluded),t.abrupt("return",r.status(200).json(o));case 7:case"end":return t.stop()}},t)}));return function(t,e){return r.apply(this,arguments)}}(),signIn=function(){var r=_asyncToGenerator(_regeneratorRuntime().mark(function t(e,r){var n,o,i;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.body,i=n.username,n=n.password,t.next=3,User.findOne({username:i});case 3:if(o=t.sent){t.next=6;break}return t.abrupt("return",r.status(400).json({msg:"User not found"}));case 6:return t.next=8,bcrypt.compare(n,o.password);case 8:if(t.sent){t.next=11;break}return t.abrupt("return",r.status(400).json({msg:"Invalid password"}));case 11:i=jwt.sign({user:o},jwtSecret,{expiresIn:604800}),r.status(200).json({id:o._id,username:o.username,email:o.email,roles:o.roles,accessToken:i});case 13:case"end":return t.stop()}},t)}));return function(t,e){return r.apply(this,arguments)}}(),getMe=function(){var r=_asyncToGenerator(_regeneratorRuntime().mark(function t(e,r){var n;return _regeneratorRuntime().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.headers["x-access-token"],n=jwt.verify(n,jwtSecret),t.next=4,User.findById(n.user._id);case 4:n=t.sent,r.status(200).json({id:n._id,username:n.username,email:n.email,roles:n.roles});case 6:case"end":return t.stop()}},t)}));return function(t,e){return r.apply(this,arguments)}}();module.exports={signUp:signUp,signIn:signIn,getMe:getMe,signInRemember:signInRemember};