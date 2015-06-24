(function(){"use strict";



var headLogo_elt = document.querySelector( '.headLogo' );
var stall;

setLogoSize();
window.addEventListener( 'scroll', stallLogoResize, false );

function stallLogoResize () {
	if ( stall ) {
		clearTimeout( stall );
	}

	stall = setTimeout( setLogoSize, 300 );
}

function setLogoSize ( e ) {
	stall = false;

	if( scrollY > 25 ) {
		headLogo_elt.classList.add( 'headLogo--fit' );
	} else {
		headLogo_elt.classList.remove( 'headLogo--fit' );
	}
}



}());