// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

// Place any jQuery/helper plugins in here.
/*!
 * Pikaday jQuery plugin
 * Copyright © 2012 David Bushell | BSD & MIT license | http://dbushell.com/
 */
(function(e){e.fn.pikaday=function(){var t=arguments;if(!t||!t.length)t=[{}];return this.each(function(){var n=e(this),r=n.data("pikaday");if(r instanceof window.Pikaday)typeof t[0]=="string"&&typeof r[t[0]]=="function"&&r[t[0]].apply(r,Array.prototype.slice.call(t,1));else if(typeof t[0]=="object"){var i=e.extend({},t[0]);i.field=n[0],n.data("pikaday",new Pikaday(i))}})}})(window.jQuery),function(e,t,n){"use strict";var r=typeof e.moment=="function",i=!!e.addEventListener,s=e.setTimeout,o=function(e,t,n,r){i?e.addEventListener(t,n,!!r):e.attachEvent("on"+t,n)},u=function(e,t,n,r){i?e.removeEventListener(t,n,!!r):e.detachEvent("on"+t,n)},a=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},f=function(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")!==-1},l=function(e,t){f(e,t)||(e.className=e.className===""?t:e.className+" "+t)},c=function(e,t){e.className=a((" "+e.className+" ").replace(" "+t+" "," "))},h=function(e){return/Array/.test(Object.prototype.toString.call(e))},p=function(e){return/Date/.test(Object.prototype.toString.call(e))&&!isNaN(e.getTime())},d=function(e){return e%4===0&&e%100!==0||e%400===0},v=function(e,t){return[31,d(e)?29:28,31,30,31,30,31,31,30,31,30,31][t]},m=function(e,t){return e.getTime()===t.getTime()},g=function(e,t,r){var i,s;for(i in t){s=e[i]!==n;if(s&&typeof t[i]=="object"&&t[i].nodeName===n)p(t[i])?r&&(e[i]=new Date(t[i].getTime())):h(t[i])?r&&(e[i]=t[i].slice(0)):e[i]=g({},t[i],r);else if(r||!s)e[i]=t[i]}return e},y={field:null,bound:n,format:"YYYY-MM-DD",defaultDate:null,setDefaultDate:!1,firstDay:0,minDate:null,maxDate:null,yearRange:10,minYear:0,maxYear:9999,minMonth:n,maxMonth:n,isRTL:!1,numberOfMonths:1,i18n:{months:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},onSelect:null,onOpen:null,onClose:null},b=function(e,t,n){t+=e.firstDay;while(t>=7)t-=7;return n?e.i18n.weekdaysShort[t]:e.i18n.weekdays[t]},w=function(e,t,n,r,i){if(i)return'<td class="is-empty"></td>';var s=[];return r&&s.push("is-disabled"),n&&s.push("is-today"),t&&s.push("is-selected"),'<td data-day="'+e+'" class="'+s.join(" ")+'"><button class="pika-button" type="button">'+e+"</button>"+"</td>"},E=function(e,t){return"<tr>"+(t?e.reverse():e).join("")+"</tr>"},S=function(e){return"<tbody>"+e.join("")+"</tbody>"},x=function(e){var t,n=[];for(t=0;t<7;t++)n.push('<th scope="col"><abbr title="'+b(e,t)+'">'+b(e,t,!0)+"</abbr></th>");return"<thead>"+(e.isRTL?n.reverse():n).join("")+"</thead>"},T=function(e){var t,n,r,i=e._o,s=e._m,o=e._y,u=o===i.minYear,a=o===i.maxYear,f='<div class="pika-title">',l=!0,c=!0;for(r=[],t=0;t<12;t++)r.push('<option value="'+t+'"'+(t===s?" selected":"")+(u&&t<i.minMonth||a&&t>i.maxMonth?"disabled":"")+">"+i.i18n.months[t]+"</option>");f+='<div class="pika-label">'+i.i18n.months[s]+'<select class="pika-select pika-select-month">'+r.join("")+"</select></div>",h(i.yearRange)?(t=i.yearRange[0],n=i.yearRange[1]+1):(t=o-i.yearRange,n=1+o+i.yearRange);for(r=[];t<n&&t<=i.maxYear;t++)t>=i.minYear&&r.push('<option value="'+t+'"'+(t===o?" selected":"")+">"+t+"</option>");return f+='<div class="pika-label">'+o+'<select class="pika-select pika-select-year">'+r.join("")+"</select></div>",u&&(s===0||i.minMonth>=s)&&(l=!1),a&&(s===11||i.maxMonth<=s)&&(c=!1),f+='<button class="pika-prev'+(l?"":" is-disabled")+'" type="button">Previous Month</button>',f+='<button class="pika-next'+(c?"":" is-disabled")+'" type="button">Next Month</button>',f+="</div>"},N=function(e,t){return'<table cellpadding="0" cellspacing="0" class="pika-table">'+x(e)+S(t)+"</table>"};e.Pikaday=function(n){var u=this,a=u.config(n);u._onMouseDown=function(t){if(!u._v)return;t=t||e.event;var n=t.target||t.srcElement;if(!n)return;if(!f(n,"is-disabled")){if(f(n,"pika-button")&&!f(n,"is-empty")){u.setDate(new Date(u._y,u._m,parseInt(n.innerHTML,10))),a.bound&&s(function(){u.hide()},100);return}f(n,"pika-prev")?u.prevMonth():f(n,"pika-next")&&u.nextMonth()}if(!f(n,"pika-select")){if(!t.preventDefault)return t.returnValue=!1;t.preventDefault()}else u._c=!0},u._onChange=function(t){t=t||e.event;var n=t.target||t.srcElement;if(!n)return;f(n,"pika-select-month")?u.gotoMonth(n.value):f(n,"pika-select-year")&&u.gotoYear(n.value)},u._onInputChange=function(t){if(r)u.setDate(e.moment(a.field.value,a.format).toDate());else{var n=new Date(Date.parse(a.field.value));u.setDate(p(n)?n:null)}u._v||u.show()},u._onInputFocus=function(e){u.show()},u._onInputClick=function(e){u.show()},u._onInputBlur=function(e){u._c||(u._b=s(function(){u.hide()},50)),u._c=!1},u._onClick=function(t){t=t||e.event;var n=t.target||t.srcElement,r=n;if(!n)return;!i&&f(n,"pika-select")&&(n.onchange||(n.setAttribute("onchange","return;"),o(n,"change",u._onChange)));do if(f(r,"pika-single"))return;while(r=r.parentNode);u._v&&n!==a.field&&u.hide()},u.el=t.createElement("div"),u.el.className="pika-single"+(a.isRTL?" is-rtl":""),o(u.el,"mousedown",u._onMouseDown,!0),o(u.el,"change",u._onChange),a.field&&(a.bound?t.body.appendChild(u.el):a.field.parentNode.insertBefore(u.el,a.field.nextSibling),o(a.field,"change",u._onInputChange),a.defaultDate||(r&&a.field.value?a.defaultDate=e.moment(a.field.value,a.format).toDate():a.defaultDate=new Date(Date.parse(a.field.value)),a.setDefaultDate=!0));var l=a.defaultDate;p(l)?a.setDefaultDate?u.setDate(l):u.gotoDate(l):u.gotoDate(new Date),a.bound?(this.hide(),u.el.className+=" is-bound",o(a.field,"click",u._onInputClick),o(a.field,"focus",u._onInputFocus),o(a.field,"blur",u._onInputBlur)):this.show()},e.Pikaday.prototype={config:function(e){this._o||(this._o=g({},y,!0));var t=g(this._o,e,!0);t.isRTL=!!t.isRTL,t.field=t.field&&t.field.nodeName?t.field:null,t.bound=!!(t.bound!==n?t.field&&t.bound:t.field);var r=parseInt(t.numberOfMonths,10)||1;t.numberOfMonths=r>4?4:r,p(t.minDate)||(t.minDate=!1),p(t.maxDate)||(t.maxDate=!1),t.minDate&&t.maxDate&&t.maxDate<t.minDate&&(t.maxDate=t.minDate=!1),t.minDate&&(t.minYear=t.minDate.getFullYear(),t.minMonth=t.minDate.getMonth()),t.maxDate&&(t.maxYear=t.maxDate.getFullYear(),t.maxMonth=t.maxDate.getMonth());if(h(t.yearRange)){var i=(new Date).getFullYear()-10;t.yearRange[0]=parseInt(t.yearRange[0],10)||i,t.yearRange[1]=parseInt(t.yearRange[1],10)||i}else t.yearRange=Math.abs(parseInt(t.yearRange,10))||y.yearRange,t.yearRange>100&&(t.yearRange=100);return t},toString:function(t){return p(this._d)?r?e.moment(this._d).format(t||this._o.format):this._d.toDateString():""},getMoment:function(){return r?e.moment(this._d):null},getDate:function(){return p(this._d)?new Date(this._d.getTime()):null},setDate:function(e){if(!e)return this._d=null,this.draw();typeof e=="string"&&(e=new Date(Date.parse(e)));if(!p(e))return;var t=this._o.minDate,n=this._o.maxDate;p(t)&&e<t?e=t:p(n)&&e>n&&(e=n),this._d=new Date(e.getTime()),this._d.setHours(0,0,0,0),this.gotoDate(this._d),this._o.field&&(this._o.field.value=this.toString()),typeof this._o.onSelect=="function"&&this._o.onSelect.call(this,this.getDate())},gotoDate:function(e){if(!p(e))return;this._y=e.getFullYear(),this._m=e.getMonth(),this.draw()},gotoToday:function(){this.gotoDate(new Date)},gotoMonth:function(e){isNaN(e=parseInt(e,10))||(this._m=e<0?0:e>11?11:e,this.draw())},nextMonth:function(){++this._m>11&&(this._m=0,this._y++),this.draw()},prevMonth:function(){--this._m<0&&(this._m=11,this._y--),this.draw()},gotoYear:function(e){isNaN(e)||(this._y=parseInt(e,10),this.draw())},draw:function(e){if(!this._v&&!e)return;var t=this._o,n=t.minYear,r=t.maxYear,i=t.minMonth,o=t.maxMonth;this._y<=n&&(this._y=n,!isNaN(i)&&this._m<i&&(this._m=i)),this._y>=r&&(this._y=r,!isNaN(o)&&this._m>o&&(this._m=o)),this.el.innerHTML=T(this)+this.render(this._y,this._m);if(t.bound){var u=t.field,a=u.offsetLeft,f=u.offsetTop+u.offsetHeight;while(u=u.offsetParent)a+=u.offsetLeft,f+=u.offsetTop;this.el.style.cssText="position:absolute;left:"+a+"px;top:"+f+"px;",s(function(){t.field.focus()},1)}},render:function(e,t){var n=this._o,r=new Date,i=v(e,t),s=(new Date(e,t,1)).getDay(),o=[],u=[];r.setHours(0,0,0,0),n.firstDay>0&&(s-=n.firstDay,s<0&&(s+=7));var a=i+s,f=a;while(f>7)f-=7;a+=7-f;for(var l=0,c=0;l<a;l++){var h=new Date(e,t,1+(l-s)),d=n.minDate&&h<n.minDate||n.maxDate&&h>n.maxDate,g=p(this._d)?m(h,this._d):!1,y=m(h,r),b=l<s||l>=i+s;u.push(w(1+(l-s),g,y,d,b)),++c===7&&(o.push(E(u,n.isRTL)),u=[],c=0)}return N(n,o)},isVisible:function(){return this._v},show:function(){this._v||(this._o.bound&&o(t,"click",this._onClick),c(this.el,"is-hidden"),this._v=!0,this.draw(),typeof this._o.onOpen=="function"&&this._o.onOpen.call(this))},hide:function(){var e=this._v;e!==!1&&(this._o.bound&&u(t,"click",this._onClick),this.el.style.cssText="",l(this.el,"is-hidden"),this._v=!1,e!==n&&typeof this._o.onClose=="function"&&this._o.onClose.call(this))},destroy:function(){this.hide(),u(this.el,"mousedown",this._onMouseDown,!0),u(this.el,"change",this._onChange),this._o.field&&(u(this._o.field,"change",this._onInputChange),this._o.bound&&(u(this._o.field,"click",this._onInputClick),u(this._o.field,"focus",this._onInputFocus),u(this._o.field,"blur",this._onInputBlur))),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}}}(window,window.document);

/*! http://responsiveslides.com v1.32 by @viljamis */
(function(d,D,v){d.fn.responsiveSlides=function(h){var b=d.extend({auto:!0,speed:1E3,timeout:4E3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!1,prevText:"Previous",nextText:"Next",maxwidth:"",controls:"",namespace:"rslides",before:function(){},after:function(){}},h);return this.each(function(){v++;var e=d(this),n,p,i,k,l,m=0,f=e.children(),w=f.size(),q=parseFloat(b.speed),x=parseFloat(b.timeout),r=parseFloat(b.maxwidth),c=b.namespace,g=c+v,y=c+"_nav "+g+"_nav",s=c+"_here",j=g+"_on",z=g+"_s",
o=d("<ul class='"+c+"_tabs "+g+"_tabs' />"),A={"float":"left",position:"relative"},E={"float":"none",position:"absolute"},t=function(a){b.before();f.stop().fadeOut(q,function(){d(this).removeClass(j).css(E)}).eq(a).fadeIn(q,function(){d(this).addClass(j).css(A);b.after();m=a})};b.random&&(f.sort(function(){return Math.round(Math.random())-0.5}),e.empty().append(f));f.each(function(a){this.id=z+a});e.addClass(c+" "+g);h&&h.maxwidth&&e.css("max-width",r);f.hide().eq(0).addClass(j).css(A).show();if(1<
f.size()){if(x<q+100)return;if(b.pager){var u=[];f.each(function(a){a=a+1;u=u+("<li><a href='#' class='"+z+a+"'>"+a+"</a></li>")});o.append(u);l=o.find("a");h.controls?d(b.controls).append(o):e.after(o);n=function(a){l.closest("li").removeClass(s).eq(a).addClass(s)}}b.auto&&(p=function(){k=setInterval(function(){f.stop(true,true);var a=m+1<w?m+1:0;b.pager&&n(a);t(a)},x)},p());i=function(){if(b.auto){clearInterval(k);p()}};b.pause&&e.hover(function(){clearInterval(k)},function(){i()});b.pager&&(l.bind("click",
function(a){a.preventDefault();b.pauseControls||i();a=l.index(this);if(!(m===a||d("."+j+":animated").length)){n(a);t(a)}}).eq(0).closest("li").addClass(s),b.pauseControls&&l.hover(function(){clearInterval(k)},function(){i()}));if(b.nav){c="<a href='#' class='"+y+" prev'>"+b.prevText+"</a><a href='#' class='"+y+" next'>"+b.nextText+"</a>";h.controls?d(b.controls).append(c):e.after(c);var c=d("."+g+"_nav"),B=d("."+g+"_nav.prev");c.bind("click",function(a){a.preventDefault();if(!d("."+j+":animated").length){var c=
f.index(d("."+j)),a=c-1,c=c+1<w?m+1:0;t(d(this)[0]===B[0]?a:c);b.pager&&n(d(this)[0]===B[0]?a:c);b.pauseControls||i()}});b.pauseControls&&c.hover(function(){clearInterval(k)},function(){i()})}}if("undefined"===typeof document.body.style.maxWidth&&h.maxwidth){var C=function(){e.css("width","100%");e.width()>r&&e.css("width",r)};C();d(D).bind("resize",function(){C()})}})}})(jQuery,this,0);

/*
	Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />')[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.keyCode,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():false}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);

// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
	jQuery(function($) {
		$("a[rel^='lightbox']").slimbox({/* Put custom options here */}, null, function(el) {
			return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
		});
	});
}