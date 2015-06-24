(function(){"use strict";



var mainHeadContainer_elt = document.querySelector( '.mainHeadContainer' );
//	Setting this to infinity ensures the header isn't hidden on page load
var prevScroll = Infinity;

var showMargin_top = 60;
var showMargin_bottom = 60;

window.addEventListener( 'scroll', setHeadDisplay, false );

function setHeadDisplay () {
	//	If we're:
	//	 -	scrolling up
	//	 -	near the top
	//	 -	near the bottom
	//	then show the header
	if ( scrollY < prevScroll  ||  scrollY < showMargin_top  || scrollY > getDocHeight() - innerHeight - showMargin_bottom ) {
		mainHeadContainer_elt.classList.remove( 'mainHeadContainer--hidden' );

	} else {
		mainHeadContainer_elt.classList.add( 'mainHeadContainer--hidden' );
	}

	//	Reset the previous scroll variable
	prevScroll = scrollY;
}

function getDocHeight () {
	return Math.max( document.body.scrollHeight, document.body.offsetHeight,
	                 document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
}



}());