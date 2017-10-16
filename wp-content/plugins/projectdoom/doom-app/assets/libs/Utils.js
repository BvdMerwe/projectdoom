/**
* Copyright (c) 2013 - 2015 @MaxVerified on behalf of 5ive Design Studio (Pty) Ltd.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
*/
define( function ( require, exports, module ) {

    "use strict";

     /**
     * @constructor
     * Creates a queue of async operations that will be executed sequentially. Operations can be added to the
     * queue at any time. If the queue is empty and nothing is currently executing when an operation is added,
     * it will execute immediately. Otherwise, it will execute when the last operation currently in the queue
     * has finished.
     */
    function Utils() {
    }

    Utils.prototype =  {

        /**
         * Equivelant to $(el).on( eventName, eventHandler );
         *
         * @param Object.el
         * @param String.eventName
         * @param Function.handler
         *
         * @return null
         */
        addEventListener: function ( el, eventName, handler ) {

			this._strict( [ Object, String, Function ], arguments );

			if( el.addEventListener ) {

                el.addEventListener( eventName, handler );

            } else {

                el.attachEvent( 'on' + eventName, function() {

                    handler.call(el);
                });

            }

        },

		removeEventListener: function (el, eventName, handler) {

			this._strict( [ Object, String, Function ], arguments );

			if ( el.removeEventListener )
				el.removeEventListener(eventName, handler);
			else
				el.detachEvent( 'on' + eventName, handler );

		},

        hide: function ( el ) {

            this._strict( [ Object ], arguments );

            el.style.display = 'none';

        },

        show: function ( el ) {

            this._strict( [ Object ], arguments );

            el.style.display = '';

        },

		fadeIn: function ( el ) {

            var opacity = 0;

            el.style.opacity = 0;
            el.style.filter = '';

            var last = +new Date();
            var tick = function() {

                opacity += ( new Date() - last ) / 400;

                el.style.opacity = opacity;
                el.style.filter = 'alpha(opacity=' + (100 * opacity)|0 + ')';

                last = +new Date();

                if( opacity < 1 ) {

                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                }
            }

            tick();

		},
        // Class Handlers
		hasClass: function ( elem, className ) {

			if( elem === null ) {
				return;
			}

			return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');

		},

		addClass: function ( elem, className ) {

			if( elem === null ) {
				return;
			}

			if (document.documentElement.classList) {

    			elem.classList.add(className);

    		} else {

				if ( !this.hasClass(elem, className) ) {
					elem.className += ' ' + className;
				}

			}

		},

		removeClass: function ( elem, className ) {

			if( elem === null ) {
				return;
			}

    		if (document.documentElement.classList) {

    			elem.classList.remove(className);

    		} else {

				var _self 	 = this,
					newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';

				if ( _self.hasClass(elem, className)) {

					while ( newClass.indexOf(' ' + className + ' ') >= 0 ) {
						newClass = newClass.replace(' ' + className + ' ', ' ');
					}

					elem.className = newClass.replace(/^\s+|\s+$/g, '');
				}

			}

		},

		toggleClass: function ( elem, className ) {

			if( elem === null ) {
				return;
			}

			if (document.documentElement.classList) {

    			elem.classList.toggle(className);

    		} else {

				var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ' ) + ' ';

				if ( this.hasClass(elem, className) ) {

					while (newClass.indexOf(' ' + className + ' ') >= 0 ) {

						newClass = newClass.replace( ' ' + className + ' ' , ' ' );
					}

					elem.className = newClass.replace(/^\s+|\s+$/g, '');

				} else {

					elem.className += ' ' + className;
				}

			}

		},

        getParents: function ( elem ) {

            if( elem === null ) {
                return;
            }

			var parents = [],
				p = el.parentNode;

			while ( p !== null ) {

				var o = p;

				parents.push(o);

				p = o.parentNode;
			}

            return parents; // returns an Array []

        },

		browserSupportsCSSProperty: function ( propertyName ) {

			var elm = document.createElement('div');
			propertyName = propertyName.toLowerCase();

			if ( elm.style[propertyName] != undefined )
				return true;

			var propertyNameCapital = propertyName.charAt(0).toUpperCase() + propertyName.substr(1),
				domPrefixes = 'Webkit Moz ms O'.split(' '),
				domPrefixesLength = domPrefixes.length;

			for ( var i = 0; i < domPrefixesLength; i++ ) {
				if (elm.style[domPrefixes[i] + propertyNameCapital] != undefined)
					return true;
			}

			return false;

		},

        /**
         * Returns Boolean about email parameter
         *
         * @param String.emailAddress
         *
         * @return Boolean
         */
        isEmail: function ( emailAddress ) {

            this._strict( [ String ], arguments );

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            return pattern.test( emailAddress );

        },

       isPhone: function ( phone ) {

            this._strict( [ String ], arguments );
            
            var pattern = new RegExp(/^(\+27|27)?(\()?0?[876][123467](\))?( |-|\.|_)?(\d{3})( |-|\.|_)?(\d{4})/g);
            
            return pattern.test( phone );


        },

        /**
         * Test whether parameter is an integer
         *
         * @param Number.str
         *
         * @return Boolean
         */
        testint: function( str ) {

            //this._strict( [ Number ], arguments );

            var intRegex = /^\d+$/;
            if(intRegex.test(str)) {
                return true;
            }
            return false;

        },

        testNumber: function( str ) {

            //this._strict( [ Number ], arguments );

            //var numberRegex  = /^-?\\d{1,9}(\\.\\d{1,6})?$/;
            var numberRegex = /^([+-](?=\.?\d))?(\d+)?(\.\d+)?$/;
            if(numberRegex.test(str)) {
                return true;
            }
            return false;

        },

        /**
         * Test whether parameter is an integer
         *
         * @param Number.str
         *
         * @return Boolean
         */
        formatPhone: function( phonenum ) {

            this._strict( [ String ], arguments );

            var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;

            if ( regexObj.test(phonenum) ) {

                var parts = phonenum.match(regexObj);
                var phone = "";

                if ( parts[1] ) {
                    phone += "(" + parts[1] + ") ";
                }

                phone += parts[2] + "-" + parts[3];

                return phone;
            } else {
                //invalid phone number
                return phonenum;
            }

        },

        /**
         * Remove all whitespace
         *
         * @param String.str
         *
         * @return String
         *
         * @note: Doesn't work with other types of whitespace though,
         * for instance &#8239; (thin space) or &nbsp; (non-breaking space)
         */
        removeSpace: function ( str ) {

            return str.replace(/\s+/g, '');

        },

        /**
         * Remove leading and trailing whitespace
         *
         * @param String.str
         *
         * @return String
         *
         * @note: Doesn't work with other types of whitespace though,
         * for instance &#8239; (thin space) or &nbsp; (non-breaking space)
         */
        trim: function ( str ) {

            this._strict( [ String ], arguments );

            return str.replace( /(^\s+|\s+$)/g, '' );

        },

        /**
         * Check for Alpha Numeric Characters Only
         *
         * @param String.str
         *
         * @return String | Boolean
         *
         */
        alphanumeric: function ( str ) {

            this._strict( [ String ], arguments );

            var regex = /^[a-z]+$/,
                _self = this;

            if( str.match(regex) ) {

                return _self.trim(str);

            } else {

                return false;
            }

        },

        /**
         * Returns a random integer between min and max
         *
         * @param Number min - lower bound
         * @param Number max - upper bound
         * @return Number - a random number between min and max
         */
        getRandomInt: function ( min, max ) {

            this._strict( [ Number, Number ], arguments );

            return Math.floor(Math.random() * (max - min + 1)) + min;

        },

        scrollTo: function ( element, to, duration ) {

            var _self = this;

            if( duration < 0 ) {
                return;
            }

            var difference = to - element.scrollTop;
            var perTick = difference / duration * 10;

            setTimeout( function(){

                element.scrollTop = element.scrollTop + perTick;

                if( element.scrollTop == to ) {
                    return;
                }

                _self.scrollTo ( element, to, duration - 10 );

            }, 10 ) ;

        },

        /**
         * Scrolls specified element into view of its parent.
         * element {Object} The element to be visible.
         * spot {Object} The object with the top property -- offset from the top edge.
         */
        scrollIntoView: function ( element, spot ) {

            // Assuming offsetParent is available (it's not available when viewer is in
            // hidden iframe or object). We have to scroll: if the offsetParent is not set
            // producing the error. See also animationStartedClosure.
            var parent = element.offsetParent;
            var offsetY = element.offsetTop + element.clientTop;

            if ( !parent ) {
                console.error('offsetParent is not set -- cannot scroll');
                return;
            }

            while (parent.clientHeight == parent.scrollHeight) {

                offsetY += parent.offsetTop;
                parent = parent.offsetParent;

                if ( !parent )
                    return; // no need to scroll
            }

            if ( spot )
                offsetY += spot.top;
                parent.scrollTop = offsetY;

        },

        /**
         * Start an animation by adding the given class to the given target. When the
         * animation is complete, removes the class, clears the event handler we attach
         * to watch for the animation to finish, and resolves the returned promise.
         *
         * @param {Element} target The DOM node to animate.
         * @param {string} animClass The class that applies the animation/transition to the target.
         * @return {$.Promise} A promise that is resolved when the animation completes. Never rejected.
         *c/
        animateUsingClass: function ( target, animClass ) {

            var result = new $.Deferred();

            function finish(e) {
                if (e.target === target) {
                    $(target)
                        .removeClass(animClass)
                        .off("webkitTransitionEnd", finish);
                    result.resolve();
                }
            }

            // Note that we can't just use $.one() here because we only want to remove
            // the handler when we get the transition end event for the correct target (not
            // a child).
            $(target)
                .addClass(animClass)
                .on("webkitTransitionEnd", finish);

            return result.promise();

        },

        /**
         * Event handler to suppress context menu.
         */
        noContextMenuHandler: function (e) {

            e.preventDefault();

        },

        extend: function ( a, b ) {

            for( var key in b ) {
                if( b.hasOwnProperty( key ) ) {
                    a[key] = b[key];
                }
            }

            return a;

        },

        // http://coveroverflow.com/a/11381730/989439
        mobilecheck: function () {
            var check = false;
            (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
            return check;

        },

        // Helper function that chains a series of promise-returning
        // functions together via their done callbacks.
        chain: function () {

            //this._strict( [ Array, String ], arguments );

            var self = this,
                functions = Array.prototype.slice.call(arguments, 0);
            if (functions.length > 0) {
                var firstFunction = functions.shift();
                var firstPromise = firstFunction.call();

                firstPromise.done(function () {
                    chain.apply(null, functions);
                });
            }

        },

        /**
         * Returns the first index in 'array' for which isMatch() returns true, or -1 if none
         *
         * @param {*} object The object to test
         * @return {boolean}
         */
        _isObjEmpty: function ( obj ) {

            //this._strict( [ Object ], arguments );

            // Speed up calls to hasOwnProperty
            var hasOwnProperty = Object.prototype.hasOwnProperty;

             // null and undefined are empty
            if ( obj == null ) return true;
            // Assume if it has a length property with a non-zero value that that property is correct.
            if ( obj.length && obj.length > 0 ) return false;
            if ( obj.length === 0 )  return true;

            for (var key in obj) {
                if (hasOwnProperty.call(obj, key))    return false;
            }

            // Doesn't handle toString and toValue enumeration bugs in IE < 9
            return true;

        },

        /**
         * Returns the first index in 'array' for which isMatch() returns true, or -1 if none
         *
         * @param {!Array.<*>|jQueryObject} array
         * @param {!function(*, Number):boolean} isMatch Passed (item, index), same as with forEach()
         */
        _indexOf: function ( array, isMatch ) {
            // Old-fashioned loop, instead of Array.some, to support jQuery "arrays"
            var i,
                arrLen;
            for ( i = 0, arrLen = array.length; i < arrLen; i++ ) {
                if (isMatch(array[i], i)) {
                    return i;
                }
            }
            return -1;

        },

        /**
         * Iterates over all the properties in an object or elements in an array. Differs from
         * $.each in that it always iterates over the properties of an object, even if it has a length
         * property making it look like an array.
         *
         * @param {*} object The object or array to iterate over.
         * @param {function(value, key)} callback The function that will be executed on every object.
         */
        forEach: function ( object, callback ) {

            this._strict( [ Object, Array ], arguments );

            var keys = Object.keys(object),
                len = keys.length,
                i;

            for (i = 0; i < len; i++) {
                callback(object[keys[i]], keys[i]);
            }

        },

        forEachElement: function ( selector, fn ) {

			var elements = document.querySelectorAll(selector),
				ellen = elements.length;

			for ( var i = 0; i < ellen; i++ ){
				fn( elements[i], i );
			}

		},
    numberWithCommas: function (x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    },
    toHHMMSS: function (secs) {
      var sec_num = parseInt(secs, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds;
    },
    toDHMS: function (secs) {
      var sec_num   = parseInt(secs, 10); // don't forget the second param
      var days      = Math.floor( sec_num / 86400);
      var hours     = Math.floor((sec_num - (days * 86400)) / 3600);
      var minutes   = Math.floor((sec_num - (days * 86400) - (hours * 3600)) / 60);
      var seconds   =             sec_num - (days * 86400) - (hours * 3600) - (minutes * 60);
      var daysS     = "";
      var hoursS    = "";
      var minutesS  = "";
      var secondsS  = "";

      if (days    > 0) {daysS    = days   + (days     > 1 ? " days "    : " day ");}
      if (hours   > 0) {hoursS   = hours  + (hours    > 1 ? " hours "   : " hour ");}
      if (minutes > 0) {minutesS = minutes+ (minutes  > 1 ? " minutes " : " minute ");}
      if (seconds > 0) {secondsS = seconds+ (seconds  > 1 ? " seconds " : " second");}
      return daysS+hoursS+minutesS+secondsS;
    },
    timer: function()
    {
        var timer = {
            running: false,
            iv: 5000,
            timeout: false,
            cb : function(){},
            start : function(cb,iv,sd){
                var elm = this;
                clearInterval(this.timeout);
                this.running = true;
                if(cb) this.cb = cb;
                if(iv) this.iv = iv;
                if(sd) elm.execute(elm);
                this.timeout = setTimeout(function(){elm.execute(elm)}, this.iv);
            },
            execute : function(e){
                if(!e.running) return false;
                e.cb();
                e.start();
            },
            stop : function(){
                this.running = false;
            },
            set_interval : function(iv){
                clearInterval(this.timeout);
                this.start(false, iv);
            }
        };
        return timer;
    },

        /**
         * Iterates over all the properties in an object or elements in an array. If a callback returns a
         * truthly value then it will immediately return true, if not, it will return false. Differs from
         * $.each in that it always iterates over the properties of an object, even if it has a length
         * property making it look like an array.
         *
         * @param {*} object The object or array to iterate over.
         * @param {function(value, key)} callback The function that will be executed on every object.
         * @return {boolean}
         */
        some: function ( object, callback ) {

            this._strict( [ Object, Function ], arguments );

            var keys = Object.keys(object),
                len = keys.length,
                i;

            for (i = 0; i < len; i++) {
                if (callback(object[keys[i]], keys[i])) {
                    return true;
                }
            }
            return false;

        },

        /**
         * Returns true if the object has the specified property.
         * This calls the Object.prototype.hasOwnProperty function directly, rather than
         * depending on the object having a function named "hasOwnProperty". This way the
         * object *can* have a property named "hasOwnProperty" that is not a function.
         *
         * @param {*} object The object to test
         * @param {string} property The name of the property to query
         * @return {boolean} True if the object contains the property
         */
        hasProperty: function ( object, property ) {

            this._strict( [ Object, String ], arguments );

            return Object.prototype.hasOwnProperty.call(object, property);

        },

        _serialize: function ( obj ) {

            this._strict( [ Object ], arguments );

            var str = [];
            for(var p in obj) {
                // checking for hasOwnProperty prevents accidentlty serializing methods of the object or other ish
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
            return str.join("&");

        },

        _strict: function ( types, args ) {

            // Make sure that the number of types and args matches
            if ( types.length != args.length ) {
                // If they do not, throw a useful exception
                throw "Invalid number of arguments. Expected " + types.length + ", received " + args.length + " instead.";
            }
            // Go through each of the arguments and check their types
            for ( var i = 0; i < args.length; i++ ) {
                if ( args[i].constructor != types[i] ) {
                    throw "Invalid argument type. Expected " + types[i].name + ", received " + args[i].constructor.name + " instead.";
                }
            }

        }

    }

    // Define public API
    exports.Utils       = Utils;

});
