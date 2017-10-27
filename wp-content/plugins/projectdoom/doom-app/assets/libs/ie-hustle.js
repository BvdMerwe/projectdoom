
/*-------------------------------------------------------------------------------------------------------------------------------*
 *
 *  IE POLYFILLS
 *
 * init is the root of the app codebase. *
 *
 *-------------------------------------------------------------------------------------------------------------------------------*/
//define( function ( require, exports, module ) {

	"use strict";

    var path = "wp-content/plugins/projectdoom/doom-app/assets/libs/";
    Date.prototype.addDays = function(days) {
	    var dat = new Date(this.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	};

	// This script is released to the public domain and may be used, modified and
	// distributed without restrictions. Attribution not necessary but appreciated.
	// Source: http://weeknumber.net/how-to/javascript

	// Returns the ISO week of the date.
	Date.prototype.getWeek = function() {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	};

	/* EXTEND ARRAY OBJ for IE8 < */
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			var lenny = this.length;
			for(var i = 0; i < lenny; i++) {
				if(this[i] === needle) {
					return i;
				}
			}
			return -1;
		};
	}

	/* Add Includes to old browsers */
	if (!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, 'includes', {
		  value: function(searchElement, fromIndex) {
	  
			// 1. Let O be ? ToObject(this value).
			if (this == null) {
			  throw new TypeError('"this" is null or not defined');
			}
	  
			var o = Object(this);
	  
			// 2. Let len be ? ToLength(? Get(O, "length")).
			var len = o.length >>> 0;
	  
			// 3. If len is 0, return false.
			if (len === 0) {
			  return false;
			}
	  
			// 4. Let n be ? ToInteger(fromIndex).
			//    (If fromIndex is undefined, this step produces the value 0.)
			var n = fromIndex | 0;
	  
			// 5. If n ≥ 0, then
			//  a. Let k be n.
			// 6. Else n < 0,
			//  a. Let k be len + n.
			//  b. If k < 0, let k be 0.
			var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
	  
			function sameValueZero(x, y) {
			  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
			}
	  
			// 7. Repeat, while k < len
			while (k < len) {
			  // a. Let elementK be the result of ? Get(O, ! ToString(k)).
			  // b. If SameValueZero(searchElement, elementK) is true, return true.
			  // c. Increase k by 1. 
			  if (sameValueZero(o[k], searchElement)) {
				return true;
			  }
			  k++;
			}
	  
			// 8. Return false
			return false;
		  }
		});
	  }
	// Array Remove - By John Resig (MIT Licensed)
	/*
	if(!Array.prototype.remove) {
		Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};
	}*/

	/**
	 * Yepnope IE detection prefix
	 * 
	 * Use a combination of any of these, and they should work
	 * Usage: ['ie6!ie6styles.css', 'ie7!ie7styles.css', 'ie!allIEstyles.css', 'ie6!ie7!oldIEstyles.css']
	 * Usage: ['iegt5!iebutnot5.css', 'iegt6!ieHigherThan6.css', 'iegt7!gt7.css', 'iegt8!gt8.css']
	 * Usage: ['ielt7!ieLessThan7.css', 'ielt8!lt8.css', 'ielt9!lt9.css']
	 * 
	 * A logical OR will be applied to any combination of the supported prefixes.
	 *
	 * Official Yepnope Plugin
	 *
	 * WTFPL License
	 *
	 * by Alex Sexton | AlexSexton@gmail.com
	 */
	(function(yepnope){
	
		// hasOwnProperty shim by kangax needed for Safari 2.0 support
		var _hasOwnProperty = ({}).hasOwnProperty, hasOwnProperty;
		if (typeof _hasOwnProperty !== 'undefined' && typeof _hasOwnProperty.call !== 'undefined') {
			hasOwnProperty = function (object, property) {
				return _hasOwnProperty.call(object, property);
			};
		}
		else {
			hasOwnProperty = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
				return ((property in object) && typeof object.constructor.prototype[property] === 'undefined');
			};
		}
	
		// ----------------------------------------------------------
		// A short snippet for detecting versions of IE in JavaScript
		// without resorting to user-agent sniffing
		// ----------------------------------------------------------
		// If you're not in IE (or IE version is less than 5) then:
		//     ie === undefined
		// If you're in IE (>=5) then you can determine which version:
		//     ie === 7; // IE7
		// Thus, to detect IE:
		//     if (ie) {}
		// And to detect the version:
		//     ie === 6 // IE6
		//     ie > 7 // IE8, IE9 ...
		//     ie < 9 // Anything less than IE9
		// ----------------------------------------------------------
	
		// UPDATE: Now using Live NodeList idea from @jdalton
	
		var ie = (function(){
	
				var undef,
					v = 3,
					div = document.createElement('div'),
					all = div.getElementsByTagName('i');
				
				while (
				  div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
				  all[0]
				);
				
				return v > 4 ? v : undef;
				
		}()),
	
		iePrefixes = {
				ie:    !!ie,
				ie5:   (ie === 5),
				ie6:   (ie === 6),
				ie7:   (ie === 7),
				ie8:   (ie === 8),
                ie9:   (ie === 9),
                ie10:   (ie === 10),
				iegt5: (ie > 5),
				iegt6: (ie > 6),
				iegt7: (ie > 7),
				iegt8: (ie > 8),
				ielt7: (ie < 7),
				ielt8: (ie < 8),
                ielt9: (ie < 9),
                ielt10: (ie < 10)
		},
		checkAllIEPrefixes = function(resource) {
				var prefixes = resource.prefixes,
					pfx, k;
				
				// go through all other prefixes
				for (k = 0; k < prefixes.length; k++) {
				  pfx = prefixes[k];
				  // find other ie related prefixes that aren't this one
				  if (hasOwnProperty(iePrefixes, pfx)) {
					// If any of the tests pass, we return true. Logical OR
					if (iePrefixes[pfx]) {
					  return true;
					}
				  }
				}
				return false;
		},
		i;
			  
		// Add each test as a prefix
		for (i in iePrefixes) {
				if (hasOwnProperty(iePrefixes, i)) {
				  // add each prefix
				  yepnope.addPrefix(i, function(resource){
					// if they all all fail, set a bypass flag
					if (!checkAllIEPrefixes(resource)) {
					  resource.bypass = true;
					}
					// otherwise, carry on
					return resource;
				  });
				}
		}
    })(this.yepnope);
    
    /*	--------------------------------------------------
	 *	:: POLYFILLS
    /*	--------------------------------------------------*/
    yepnope({
		load: {
			'ieselector':	'ielt9!' + window.location.protocol + '//cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js'
		}
    });

    yepnope({
		load: {
			'ievport':	'ielt10!'+path+'prefixfree.viewport-units.js'
		}
    });
    
    yepnope({
		load: {
			'ievport':	'ielt10!'+path+'classList.js'
		}
	});

	if ( Modernizr.input.placeholder === false ) {

		yepnope({
			load:	{
				'placeholders':		path+'placeholders.min.js'
			}
		});

    }
    
    if ( Modernizr.flexbox === false ) {

        yepnope({
			load:	{
                'ieselector'        :	'ielt9!' + window.location.protocol + '//cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js',
				'flexbox-polyfill'  :	path+'flexie.min.js'
			}
		});

	}

		// yepnope({
		// 	load:	{
		// 		'flex-fix':		path+'../css/flex.fix.css'
		// 	}
		// });

		/***************************
		*	Check For IE
		****************************/
		if ( !Modernizr.smil ) {
			yepnope({
				load:	{
					'ie-style-fix':		path+'../css/ie.fix.css',
					// 'jquery': "https://code.jquery.com/jquery-3.2.1.min.js",
					// 'ie-pointer-events' : window.location.protocol + "//code.jquery.com/pep/0.4.3/pep.js",
					// 'ie-pointer-events-1' : path + "pointer.events.min.js",
					'init-ie-stuff' : path+'initIe.js'
				}
			});

		}

	//var md = new MobileDetect(window.navigator.userAgent);

	//console.log('MobileDetect:', md );

	window.BrowserDetect = {
			init: function() {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function(data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
				} else if (dataProp) return data[i].identity;
			}
		},
		searchVersion: function(dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},
		dataBrowser: [{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		}, {
			string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		}, {
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		}, {
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		}, {
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		}, {
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		}, {
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		}, {
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		}, { // for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		}, {
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		}, {
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		}, { // for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}],
		dataOS: [{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		}, {
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		}, {
			string: navigator.userAgent,
			subString: "iPhone",
			identity: "iPhone/iPod"
		}, {
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}]
	};

	window.BrowserDetect.init();

	//console.log('SAFARI CHECK:', window.BrowserDetect.browser);

	if ( window.BrowserDetect.browser == "Safari" && window.BrowserDetect.version == "10.1" ) {

		console.log('Problem safari browsing:', window.BrowserDetect.version);

		yepnope({
			load:	{
				'safari10-css':		path+'../css/safari10.css'
				//'ios-mobile-flex-css':		path+'../css/layout.fix.min.css'
			}
		});
	}
	
	if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {

		console.log('iPhone|iPad|iPod safari browsing:');

		var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]');

		if (viewportmeta) {
            viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, minimal-ui';
		}

		window.addEventListener("load",function() {
			// Set a timeout...
			setTimeout(function(){
				// Hide the address bar!
				window.scrollTo(0, 1);
			}, 0);

		});

		var ua = navigator.userAgent.toLowerCase(); 
		if (ua.indexOf('safari') != -1) { 
		  if (ua.indexOf('chrome') > -1) {
			//alert("1") // Chrome
		  } else {
			//alert("2") // Safari
		  }
		}

		/*! calc-polyfill 25-01-2016 * /
		!function(win,doc){"use strict";function contentLoaded(a,b){var c=!1,d=!0,e=a.document,f=e.documentElement,g=e.addEventListener,h=g?"addEventListener":"attachEvent",i=g?"removeEventListener":"detachEvent",j=g?"":"on",k=function(d){("readystatechange"!=d.type||"complete"==e.readyState)&&(("load"==d.type?a:e)[i](j+d.type,k,!1),!c&&(c=!0)&&b.call(a,d.type||d))},l=function(){try{f.doScroll("left")}catch(a){return void setTimeout(l,50)}k("poll")};if("complete"==e.readyState)b.call(a,"lazy");else{if(!g&&f.doScroll){try{d=!a.frameElement}catch(m){}d&&l()}e[h](j+"DOMContentLoaded",k,!1),e[h](j+"readystatechange",k,!1),a[h](j+"load",k,!1)}}if(function(){for(var a,b=function(){},c=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeline","timelineEnd","timeStamp","trace","warn"],d=c.length,e=window.console=window.console||{};d--;)a=c[d],e[a]||(e[a]=b)}(),!doc.querySelectorAll)return!1;var EMPTY="",CALC_RULE="^(\\s*?[\\s\\S]*):(\\s*?[\\s\\S]*?((\\-(webkit|moz)\\-)?calc\\(([\\s\\S]+)\\))[\\s\\S]*)?$",CSSRULES="((\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",KEYFRAMES=new RegExp("((@(-webkit-)?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi"),FONTFACE=new RegExp("((@font-face\\s*?){([\\s\\S]*?)})","gi"),COMMENTS=new RegExp("(\\/\\*[\\s\\S]*?\\*\\/)","gi"),IMPORTS=new RegExp("@import .*?;","gi"),CHARSET=new RegExp("@charset .*?;","gi"),PERCENT=/[\d\.]+%/,PT=/\d+pt/,PIXEL=/(\d+)px/g,REMEM=/[\d\.]+r?em/,REM=/[\d\.]+rem/,EM=/[\d\.]+em/,MATH_EXP=/[\+\-\/\*]?[\d\.]+(px|%|em|rem)?/g,PLACEHOLDER="$1",ONLYNUMBERS=/[\s\-0-9]/g,FONTSIZE="font-size",ADDMEDIA="@media",onTextResize=[],onWindowResize=[],cssTexts=[],docLoaded=!1,utilities={camelize:function(a){return a.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})},trim:function(a){var b=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;return String.prototype.trim?a.trim():a.replace(b,"")},indexOf:function(a,b,c){var d=a.length>>>0;for(c=Number(c)||0,c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=d);d>c;c++)if(c in a&&a[c]===b)return c;return-1},getStyle:function(a,b){return a.currentStyle?a.currentStyle[utilities.camelize(b)]:doc.defaultView&&doc.defaultView.getComputedStyle?doc.defaultView.getComputedStyle(a,null).getPropertyValue(b):a.style[utilities.camelize(b)]},getFontsize:function(a){var b,c=doc.createElement("span");return c.innerHTML="&nbsp;",c.style.position="absolute",c.style.lineHeight="1em",c.style.fontSize="1em",a.appendChild(c),b=c.offsetHeight,a.removeChild(c),b},addEvent:function(a,b,c){doc.addEventListener?a.addEventListener(b,c,!1):a.attachEvent("on"+b,c)},textResize:function(a){var b,c,d=function(){b=doc.createElement("span"),b.id="text-resize-control",b.innerHTML="&nbsp;",b.style.position="absolute",b.style.left="-9999px",b.style.lineHeight="1em",b.style.fontSize="1em",doc.body.insertBefore(b,doc.body.firstChild),c=b.offsetHeight},e=function(){var d=b.offsetHeight;return c===d?(win.requestAnimationFrame(e),!1):(c=d,a&&"function"==typeof a&&a(),void win.requestAnimationFrame(e))};d(),win.requestAnimationFrame(e)}},calcTest=function(){var a=document.createElement("div");return a.style.cssText="width: -moz-calc(10px); width: -webkit-calc(10px); width: calc(10px)",!!a.style.length},getStyleSheets=function(){for(var a,b=[],c=0,d=doc.styleSheets.length;d>c;c++)a=doc.styleSheets[c],cssTexts[c]="",a.href&&a.href!==EMPTY?a.rawCssText&&a.rawCssText!==EMPTY?cssTexts[c]=a.rawCssText:b.push(a.href):a.ownerNode&&"style"===a.ownerNode.nodeName.toLowerCase()&&(cssTexts[c]=a.ownerNode.textContent);(b.length>0||cssTexts.length>0)&&loadStylesheets(b)},loadStylesheets=function(a){var b,c=0,d=a.length;if(win.XMLHttpRequest)b=new XMLHttpRequest;else try{b=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){b=null}if(b)for(;d>c;c++)try{b.open("GET",a[c],!1),b.send(),200===b.status&&(cssTexts[c]=b.responseText)}catch(e){console.log("Error making request for file "+a[c]+": "+e.message)}cssTexts.length>0&&parseStylesheets(cssTexts)},parseStylesheets=function(a){for(var b=0,c=a.length;c>b;b++)a[b].length&&(a[b]=a[b].replace(COMMENTS,EMPTY).replace(CHARSET,EMPTY).replace(IMPORTS,EMPTY).replace(KEYFRAMES,EMPTY).replace(FONTFACE,EMPTY),dotheCalc(parseCSS(a[b])))},removeStyles=function(a){for(var b=0,c=a.length;c>b;b++)JSON.parse(a[b].getAttribute("data-calced"))||a[b].removeAttribute("style")},parseCSS=function(a,b){var c,d,e,f,g,h,i,j,k,l=[];for(b=b||"",e=new RegExp(CSSRULES,"gi");;){if(f=e.exec(a),null===f)break;if(g=utilities.trim((f[2]||f[5]).split("\r\n").join("\n")),-1!==g.indexOf(ADDMEDIA))h=f[3]+"\n}",l=l.concat(parseCSS(h,g.replace(ADDMEDIA,"")));else for(h=f[6].split("\r\n").join("\n").split(";"),c=0,d=h.length;d>c;c++){i=new RegExp(CALC_RULE,"gi").exec(h[c]);try{j=doc.querySelectorAll(g)}catch(m){console.log('Error trying to select "'+g+'": '+m.message);break}null!==i&&j.length&&(k={elements:j,media:b,values:utilities.trim(i[2]),formula:i[6],prop:utilities.trim(i[1]),placholder:utilities.trim(i[3])},k.formula.match(PERCENT)&&(k.onresize=!0),k.formula.match(REMEM)&&(k.ontextresize=!0),l.push(k))}}return l},dotheCalc=function(calcRules){for(var index=0,len=calcRules.length,obj,calc=function(obj){for(var i=0,len=obj.elements.length,refValue,modifier,matches,l,j,result,formula;len>i;i++){for(formula=obj.formula.replace(PIXEL,PLACEHOLDER),matches=formula.match(MATH_EXP),l=matches.length,j=0;l>j;j++)modifier=null,matches[j].match(PERCENT)&&(refValue=obj.elements[i].parentNode.clientWidth,modifier=parseFloat(matches[j],10)/100),matches[j].match(EM)&&(refValue=obj.elements[i].currentStyle?utilities.getFontsize(obj.elements[i]):parseInt(utilities.getStyle(obj.elements[i],FONTSIZE).replace(/px/,EMPTY),10),refValue.match&&refValue.match(PT)&&(refValue=Math.round(1.333333333*parseInt(refValue.replace(/pt/,""),10))),modifier=parseFloat(matches[j],10)),matches[j].match(REM)&&(refValue=utilities.getStyle(doc.body,FONTSIZE).match(PERCENT)?16*parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/%/,EMPTY),10)/100:utilities.getStyle(doc.body,FONTSIZE).match(PT)?Math.round(1.333333333*parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/pt/,""),10)):parseInt(utilities.getStyle(doc.body,FONTSIZE).replace(/px/,EMPTY),10),modifier=parseFloat(matches[j],10)),modifier&&(formula=formula.replace(matches[j],refValue*modifier));try{formula.match(ONLYNUMBERS)&&(result=eval(formula),obj.elements[i].style[utilities.trim(utilities.camelize(obj.prop))]=obj.values.replace(obj.placholder,result+"px"),obj.elements[i].setAttribute("data-calced",!0))}catch(e){}}};len>index;index++)obj=calcRules[index],obj.onresize&&-1===utilities.indexOf(onWindowResize,obj)&&onWindowResize.push(obj),obj.ontextresize&&-1===utilities.indexOf(onTextResize,obj)&&onTextResize.push(obj),obj.media!==EMPTY?win.matchMedia&&win.matchMedia(obj.media).matches?calc(obj):removeStyles(obj.elements):calc(obj)};win.dotheCalc=function(){cssTexts.length>0&&docLoaded&&parseStylesheets(cssTexts)},contentLoaded(win,function(){calcTest()||(docLoaded=!0,getStyleSheets(),onTextResize.length>0&&utilities.textResize(function(){dotheCalc(onTextResize)}),onWindowResize.length>0&&utilities.addEvent(win,"resize",function(){dotheCalc(onWindowResize)}))}),function(a){!function(){if(!a.requestAnimationFrame){a.webkitRequestAnimationFrame&&(a.requestAnimationFrame=a.webkitRequestAnimationFrame,a.cancelAnimationFrame=a.webkitCancelAnimationFrame||a.webkitCancelRequestAnimationFrame);var b=0;a.requestAnimationFrame=function(c){var d=(new Date).getTime(),e=Math.max(0,16-(d-b)),f=a.setTimeout(function(){c(d+e)},e);return b=d+e,f},a.cancelAnimationFrame=function(a){clearTimeout(a)}}}(),"function"==typeof define&&define(function(){return a.requestAnimationFrame})}(window)}(window,document);*/

		yepnope({
			load:	{
				'ios-mobile-css':		path+'../css/ios.mobile.css',
				'ios-mobile-flex-css':		path+'../css/layout.fix.min.css'
			}
		});
		
	}

	/** /
	if( isMobile.iOS() ) {
	
		//disables user scaling on iOS until the user tries to scale with pinch/zoom.
		var viewportmeta = document.querySelector('meta[name="viewport"]');
	
		if ( viewportmeta ) {
			
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
			
			document.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=10';
			}, false );
		};
		
		/** /
		if ( ("standalone" in window.navigator) && navigator.standalone ) { // IF in WEB-APP MODE?
		
			( function iOS_start_up_image(d) {
				
				var start_up,
					id = "apple-touch-startup-image",
					ref = d.getElementsByTagName("link")[2],
					media,
					a;
		
				if ( navigator.platform === "iPad" ){

					if( window.devicePixelRatio === 2 ) {

						a = window.orientation === 90 || window.orientation === -90 ? "apple-touch-startup-ipad-retina-portrait.jpg" : "apple-touch-startup-ipad-retina-landscape.jpg";

					} else {
					
						a = window.orientation === 90 || window.orientation === -90 ? "apple-touch-startup-ipad-portrait.jpg" : "apple-touch-startup-ipad-landscape.jpg";

					}
					
					if ( window.orientation === 90 || window.orientation === -90 ) {
					
						media = 'screen and (orientation: portrait)';
					
					} else {
						media = 'screen and (orientation: landscape)';
					};
			
				} else {
					a = window.devicePixelRatio === 2 ? "apple-touch-startup-iphone-retina.jpg" : "apple-touch-startup-iphone.jpg"
					//a= screen.height === 568 ? "img/startup/startup-retina-4in.png" : portrait;
				}
		
				if ( d.getElementById(id) ) {
					return;
				}
				start_up = d.createElement("link");
				start_up.id = id;
				if ( media !== "" ) {
					start_up.setAttribute( 'media', media );
				}

				start_up.href = window.global_templateUrl +  '/images/ios/' + a;

				ref.parentNode.insertBefore(start_up, ref);
			
			}(document));
		}/** /
	
	}/**/

//});
