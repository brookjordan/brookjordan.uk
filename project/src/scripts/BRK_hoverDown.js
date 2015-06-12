(function(){

window.brk = window.brk || {};


//	Variables
var hoverDown	=	{};
var hovers		=	document.querySelectorAll( '[ brk-hoverdown ]' );
var setHoverDownOn = function () {

	//	Touch devices
	if ( !!('ontouchstart' in window) ) {

		return touchHoverDown;

	}
	//	Non touch devices
	else {

		return nonTouchHoverDown;

	}

}();

Array.prototype.forEach.call( hovers, setHoverDownOn );



//	Faux return
window.brk.hoverDown = hoverDown;


//	Functions
function addHoverDowns ( currentValue, index, array ) {
	setHoverDownOn( currentValue );
}

function touchHoverDown ( elt ) {

	var CL	=	elt.classList;
	var baseClass		=	elt.getAttribute( 'brk-hoverdown' );

	var touchClass		=	!!baseClass ?
		baseClass + '--hover' :
		'hover';

	if ( !!baseClass ) {
		CL.add( baseClass );
	}

	elt.addEventListener( 'touchstart', addTouch, false );
	elt.addEventListener( 'touchend', removeTouch,   false );


	function addTouch ( e ) {
		//e.preventDefault();

		if ( CL.contains( touchClass ) ) {

			//	setTouch( elt, baseClass );

		} else {

			setTouch( elt, baseClass );

		}

	}

	function removeTouch ( e ) {

		if ( CL.contains( touchClass ) ) {

			setNone( elt, baseClass );

		} else {

			//	setNone( elt, baseClass );

		}

	}

	//	Set hover down or hoverDown classes
	function setNone ( elt, baseClass ) {

		CL.remove( touchClass );

	}
	function setTouch ( elt, baseClass ) {

		CL.add( touchClass );

	}

}

function nonTouchHoverDown ( elt ) {

	var CL	=	elt.classList;
	var baseClass		=	elt.getAttribute( 'brk-hoverdown' );

	var hoverClass		=	!!baseClass ?
		baseClass + '--hover' :
		'hover';
	var downClass		=	!!baseClass ?
		baseClass + '--down' :
		'down';
	var hoverDownClass	=	!!baseClass ?
		baseClass + '--hoverdown' :
		'hoverdown';

	if ( !!baseClass ) {
		CL.add( baseClass );
	}

	elt.addEventListener( 'mouseenter', addHover, false );
	elt.addEventListener( 'mouseleave', removeHover,   false );
	elt.addEventListener( 'mousedown', addDown, false );
	elt.addEventListener( 'dragstart', function(e){e.preventDefault();}, false );


	function addHover ( e ) {

		if ( CL.contains( hoverClass ) ) {

			//	setHover( elt, baseClass );

		} else if ( CL.contains( downClass ) ) {

			setHoverDown( elt, baseClass );

		} else if ( CL.contains( hoverDownClass ) ) {

			//	setHoverDown( elt, baseClass );

		} else {

			setHover( elt, baseClass );

		}

	}

	function removeHover ( e ) {

		if ( CL.contains( hoverClass ) ) {

			setNone( elt, baseClass );

		} else if ( CL.contains( downClass ) ) {

			//	setDown( elt, baseClass );

		} else if ( CL.contains( hoverDownClass ) ) {

			setDown( elt, baseClass );

		} else {

			//	setNone( elt, baseClass );

		}

	}

	function addDown ( e ) {

		elt.removeEventListener( 'mousedown', addDown, false );

		elt.addEventListener( 'mouseup', removeDown,   false );
		window.addEventListener( 'mouseup', removeDown,   false );

		if ( CL.contains( hoverClass ) ) {

			setHoverDown( elt, baseClass );

		} else if ( CL.contains( downClass ) ) {

			//	setDown( elt, baseClass );

		} else if ( CL.contains( hoverDownClass ) ) {

			//	setHoverDown( elt, baseClass );

		} else {

			setDown( elt, baseClass );

		}

	}

	function removeDown ( e ) {

		elt.removeEventListener( 'mouseup', removeDown,   false );
		window.removeEventListener( 'mouseup', removeDown,   false );

		elt.addEventListener( 'mousedown', addDown, false );

		if ( CL.contains( hoverClass ) ) {

			//	setHover( elt, baseClass );

		} else if ( CL.contains( downClass ) ) {

			setNone( elt, baseClass );

		} else if ( CL.contains( hoverDownClass ) ) {

			setHover( elt, baseClass );

		} else {

			//	setNone( elt, baseClass );

		}

	}

	//	Set hover down or hoverDown classes
	function setNone ( elt, baseClass ) {

		CL.remove( hoverClass );
		CL.remove( hoverDownClass );
		CL.remove( downClass );

	}
	function setHover ( elt, baseClass ) {

		CL.remove( downClass );
		CL.remove( hoverDownClass );

		CL.add( hoverClass );

	}
	function setDown ( elt, baseClass ) {

		CL.remove( hoverClass );
		CL.remove( hoverDownClass );

		CL.add( downClass );

	}
	function setHoverDown ( elt, baseClass ) {

		CL.remove( hoverClass );
		CL.remove( downClass );

		CL.add( hoverDownClass );

	}

}







}());