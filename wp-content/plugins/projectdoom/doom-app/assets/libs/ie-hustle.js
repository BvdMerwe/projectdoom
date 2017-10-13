
/*-------------------------------------------------------------------------------------------------------------------------------*
 *
 *  IE POLYFILLS
 *
 * init is the root of the app codebase. *
 *
 *-------------------------------------------------------------------------------------------------------------------------------*/
//define( function ( require, exports, module ) {

    "use strict";
    
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
	// Array Remove - By John Resig (MIT Licensed)
	if(!Array.prototype.remove) {
		Array.prototype.remove = function(from, to) {
			var rest = this.slice((to || from) + 1 || this.length);
			this.length = from < 0 ? this.length + from : from;
			return this.push.apply(this, rest);
		};
	}

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
			'ievport':	'ielt10!prefixfree.viewport-units.js'
		}
    });
    
    yepnope({
		load: {
			'ievport':	'ielt10!classList.js'
		}
	});

	if ( Modernizr.input.placeholder === false ) {

		yepnope({
			load:	{
				'placeholders':		'placeholders.min.js'
			}
		});

    }
    
    if ( Modernizr.input.flexbox === false ) {

        yepnope({
			load:	{
				'flexbox-polyfill':		'flexie.min.js'
			}
		});

    }

    if ( Modernizr.input.localstorage === false ) {

        yepnope({
			load:	{
				//'localstorage-polyfill':		'localstorage.min.js'
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
