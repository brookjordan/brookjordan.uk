(function(){"use strict";



var menuToggleContainer_elt = document.querySelector('.menuToggle');
var pageTitle_elt = document.querySelector('.pageTitle');


menuToggleContainer_elt.addEventListener( 'click', toggleMenuDisplay, false );



//	Functions
function toggleMenuDisplay ( e ) {
	menuToggleContainer_elt.classList.toggle( 'menuToggle--open' );
	pageTitle_elt.classList.toggle( 'pageTitle--hidden' );
}



}());