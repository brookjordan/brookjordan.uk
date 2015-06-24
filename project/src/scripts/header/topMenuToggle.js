(function(){"use strict";



var menuToggleContainer_elt = document.querySelector('.menuToggleContainer');
var pageTitle_elt = document.querySelector('.pageTitle');


menuToggleContainer_elt.addEventListener( 'click', toggleMenuDisplay, false );



//	Functions
function toggleMenuDisplay ( e ) {
	menuToggleContainer_elt.classList.toggle( 'menuToggleContainer--open' );
	pageTitle_elt.classList.toggle( 'pageTitle--hidden' );
}



}());