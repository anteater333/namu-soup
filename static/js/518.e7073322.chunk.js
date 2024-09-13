"use strict";(self.webpackChunknamu_soup=self.webpackChunknamu_soup||[]).push([[518],{9396:function(e,t,n){var r=n(5861),s=n(7757),a=n.n(s),c=n(4569),o=n.n(c),i="http://soup.anteater-lab.link/api",u={getTrendingList:function(){var e=(0,r.Z)(a().mark((function e(){var t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o().get(i);case 3:return t=e.sent,e.abrupt("return",t.data);case 7:throw e.prev=7,e.t0=e.catch(0),console.error("error \ubc1c\uc0dd\ud588\uc74c. \uac1c\ubc1c\uc790\uc5d0\uac8c \uc5f0\ub77d\ud574\uc8fc\uc138\uc694."),console.error(e.t0),e.t0;case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),getMemoList:function(){var e=(0,r.Z)(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o().get(i+"/".concat(encodeURIComponent(t)));case 3:return n=e.sent,e.abrupt("return",n.data);case 7:if(e.prev=7,e.t0=e.catch(0),404!==e.t0.response.status){e.next=13;break}return e.abrupt("return",!1);case 13:throw console.error(e.t0),e.t0;case 15:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),writeMemo:function(){var e=(0,r.Z)(a().mark((function e(t,n,r,s){var c;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c={uuid:n||"tmp",memo:r,slot:s},e.prev=1,e.next=4,o().post(i+"/".concat(encodeURIComponent(t)),c);case 4:return e.abrupt("return",[!0,"done"]);case 7:if(e.prev=7,e.t0=e.catch(1),404!==e.t0.response.status){e.next=13;break}return e.abrupt("return",[!1,"notFound"]);case 13:if(409!==e.t0.response.status){e.next=17;break}return e.abrupt("return",[!1,"duplicated"]);case 17:if(410!==e.t0.response.status){e.next=21;break}return e.abrupt("return",[!1,"missed"]);case 21:if(419!==e.t0.response.status){e.next=25;break}return e.abrupt("return",[!1,"tooLong"]);case 25:if(429!==e.t0.response.status){e.next=27;break}return e.abrupt("return",[!1,"tooMany"]);case 27:if(console.error(e.t0),!e.t0.response){e.next=30;break}return e.abrupt("return",[!1,"notDefined"]);case 30:throw e.t0;case 31:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,n,r,s){return e.apply(this,arguments)}}()};t.Z=u},3518:function(e,t,n){n.r(t);var r=n(5861),s=n(885),a=n(7757),c=n.n(a),o=n(9396),i=n(2791),u=n(9186),l=n(3360),m=n(5247),d=n(5267),p=n(923),f=n(6871),x=n(2426),h=n.n(x),v=(n(3528),n(3692)),b=n(2499),j=n(6907),k=n(184);t.default=function(){var e=(0,i.useState)([]),t=(0,s.Z)(e,2),n=t[0],a=t[1],x=(0,i.useState)(""),w=(0,s.Z)(x,2),Z=w[0],N=w[1],g=(0,i.useState)(),y=(0,s.Z)(g,2),S=y[0],M=y[1],C=(0,i.useState)(""),E=(0,s.Z)(C,2),L=E[0],D=E[1],F=(0,i.useState)(!1),I=(0,s.Z)(F,2),T=I[0],U=I[1],_=(0,i.useState)(!1),z=(0,s.Z)(_,2),A=z[0],K=z[1],R=(0,i.useState)(""),X=(0,s.Z)(R,2),q=X[0],H=X[1],O=(0,i.useState)(-1),W=(0,s.Z)(O,2),B=W[0],G=W[1],J=(0,i.useState)(""),P=(0,s.Z)(J,2),Q=P[0],V=P[1],Y=(0,f.UO)()["*"],$=(0,i.useCallback)((0,r.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return U(!0),e.prev=1,e.next=4,o.Z.getMemoList(Y);case 4:(t=e.sent)?(a(t[0]),N((0,b.Z)(t[1]))):location.href="/namu-soup",e.next=12;break;case 8:e.prev=8,e.t0=e.catch(1),console.error(e.t0),M(e.t0);case 12:U(!1);case 13:case"end":return e.stop()}}),e,null,[[1,8]])}))),[Y]);(0,i.useEffect)((function(){$()}),[$]),(0,i.useEffect)((function(){var e=function(e){"Escape"===e.key&&(e.preventDefault(),K(!1))};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}),[]),(0,i.useEffect)((function(){window.matchMedia("(max-width: 800px)").matches&&window.scrollTo(0,A?document.body.scrollHeight:0)}),[A]);var ee,te=function(){var e=(0,r.Z)(c().mark((function e(){var t;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(q){e.next=3;break}return D("\ub0b4\uc6a9\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694."),e.abrupt("return");case 3:if(!(q.length>140)){e.next=6;break}return D("\ub0b4\uc6a9\uc774 \ub108\ubb34 \uae41\ub2c8\ub2e4."),e.abrupt("return");case 6:return e.next=8,o.Z.writeMemo(Y,Q,q,B);case 8:if((t=e.sent)[0]){e.next=28;break}e.t0=t[1],e.next="notFound"===e.t0?13:"duplicated"===e.t0?16:"missed"===e.t0?18:"tooLong"===e.t0?21:"tooMany"===e.t0?23:25;break;case 13:return D(""),ne(),e.abrupt("break",26);case 16:return D("\uac19\uc740 \ub0b4\uc6a9\uc774 \uc874\uc7ac\ud569\ub2c8\ub2e4."),e.abrupt("break",26);case 18:return D("\uc557"),H(""),e.abrupt("break",26);case 21:return D("\ub0b4\uc6a9\uc774 \ub108\ubb34 \uae41\ub2c8\ub2e4."),e.abrupt("break",26);case 23:return D("\uc7a0\uc2dc\ub9cc \uae30\ub2e4\ub824\uc8fc\uc138\uc694."),e.abrupt("break",26);case 25:D("\uc54c \uc218 \uc5c6\ub294 \uc624\ub958 \ubc1c\uc0dd");case 26:e.next=30;break;case 28:D(""),K(!1);case 30:$();case 31:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ne=function(){K(!A)};A&&(ee=(0,k.jsx)(k.Fragment,{children:(0,k.jsxs)("div",{className:"input-form-container",children:[(0,k.jsx)(u.Z.Control,{className:"input-form-control",as:"input",value:q,placeholder:"\uc9e7\uace0 \uac04\uacb0\ud558\uac8c \uc801\uc5b4\ubd05\uc2dc\ub2e4.",onChange:function(e){H(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&(e.preventDefault(),te())}}),(0,k.jsxs)("div",{className:"input-button-container",children:[(0,k.jsx)("div",{className:"input-error-message",children:L}),(0,k.jsxs)("div",{children:[B,"\ubc88 \uc2ac\ub86f"]}),(0,k.jsxs)("div",{className:"input-length-counter",children:[q.length,"/140"]}),(0,k.jsxs)("div",{className:"input-button-inner-container",children:[(0,k.jsx)(l.Z,{className:"soup-button",onClick:te,children:"\uae30\ub85d"}),(0,k.jsx)(l.Z,{className:"soup-button soup-button-reject",onClick:ne,children:"\ub2eb\uae30"})]})]})]})}));var re,se=T?v.w.map((function(e){var t=(0,v.X)(1,10);return(0,k.jsxs)(m.Z,{as:"li",className:"memo-list-item-container list-item-container",children:[(0,k.jsx)("div",{className:"memo-list-item list-item-text fw-bold",children:(0,k.jsx)(d.Z,{animation:"glow",xs:9,children:(0,k.jsx)(d.Z,{xs:t,bg:"success"})})}),(0,k.jsx)(l.Z,{className:"soup-button list-item-button fw-bold",children:"\uae30\ub85d"})]},e)})):n.map((function(e,t){var n=(0,k.jsx)(l.Z,{className:"soup-button list-item-button fw-bold",onClick:function(){return function(e,t){V(e.uuid),H(e.context?e.context:""),G(t),D(""),K(!A||t!==B)}(e,t)},children:"\uae30\ub85d"});return e.context?(0,k.jsxs)(m.Z,{as:"li",className:"memo-list-item-container list-item-container",children:[(0,k.jsxs)("div",{className:"memo-list-item list-item-text fw-bold",children:[(0,k.jsx)("div",{className:"memo-text",children:e.context}),(0,k.jsxs)("div",{className:"last-writer",children:[e.lastWriter," -"," ",h()(e.memoAt).tz("Asia/Seoul").format("yyyy-MM-DD hh:mm:ss z")]})]}),n]},e.uuid):(0,k.jsxs)(m.Z,{as:"li",className:"list-item-container",children:[(0,k.jsx)("div",{className:"memo-list-item list-item-text fw-bold",children:(0,k.jsx)("div",{className:"empty-memo-text",children:"< \ube48 \uae30\ub85d \uc2ac\ub86f >"})}),n]},t)}));return S&&(re=(0,k.jsx)("div",{className:"error-page",children:(0,k.jsx)("span",{className:"error-message",children:"\uc11c\ubc84\uc5d0 \uc811\uc18d\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4."})})),(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)(j.ql,{children:[(0,k.jsxs)("title",{children:["\uc232Soup - ",Y]}),(0,k.jsx)("meta",{name:"description",content:"\ub098\ubb34\uc704\ud0a4 ".concat(Y,", \uc232Soup - \ub098\ubb34\uc704\ud0a4 \uc2e4\uc2dc\uac04 \uac80\uc0c9\uc5b4")}),(0,k.jsx)("meta",{name:"keywords",content:"namu, wiki, \uc232, \ub098\ubb34\uc704\ud0a4, \uc778\uae30, \uac80\uc0c9\uc5b4, \uc2e4\uac80, \uc2e4\uc2dc\uac04 \uac80\uc0c9\uc5b4, \uc2e4\uc2dc\uac04 \uc778\uae30 \uac80\uc0c9\uc5b4, \ub098\ubb34\uc704\ud0a4 \uc2e4\uac80 \uc54c\ub824\uc8fc\ub294 \ucc44\ub110, \uc2e4\uac80 \ucc44\ub110, ".concat(Y)}),(0,k.jsx)("meta",{property:"og:title",content:"\uc232Soup - ".concat(Y)})]}),(0,k.jsxs)("div",{className:"memo-list-scene",children:[(0,k.jsx)("div",{}),(0,k.jsxs)("div",{className:"list-container",children:[re,(0,k.jsx)(p.Z,{as:"ol",children:se}),(0,k.jsx)("a",{href:"https://namu.wiki/w/"+Y,target:"_blank",rel:"noreferrer",children:(0,k.jsx)("div",{className:"current-keyword",children:Y})}),(0,k.jsxs)("div",{className:"crawled-at",children:["\uae30\uc900 \uc2dc\uac01 : ",Z]})]}),(0,k.jsx)("div",{className:"memo-list-scene-side",children:ee})]})]})}},3692:function(e,t,n){function r(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}n.d(t,{X:function(){return r},w:function(){return s}});var s=[0,1,2,3,4,5,6,7,8,9]},2499:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(2982);function s(e){var t=(0,r.Z)(e.split(" ")),n=t[0],s=t[1];t[2];return s=s.split(":"),[n,s="".concat(((parseInt(s[0])+9)%24).toString().padStart(2,"0"),":").concat(s[1]),"KST"].join(" ")}}}]);
//# sourceMappingURL=518.e7073322.chunk.js.map