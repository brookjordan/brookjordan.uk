/*
(function(){"use strict";



var imgs = document.querySelectorAll( '[style]' );

Array.prototype.forEach.call( imgs, upgradeImages );



//	Functions
function upgradeImages ( elt ) {
	var imageURL = elt.style.backgroundImage;

	if ( imageURL.indexOf( '-sml.' ) > -1 ) {
		loadImage( elt, imageURL );
	}
};

function loadImage ( elt, imageURL ) {
	elt.classList.add( 'brk-enhancing' );

	var image = new Image();
	var newImageURL = imageURL
		.match( /url\('?"?([^)'"]+)'?"?\)/ )[1]
		.replace( '-sml.', '.' );

	image.addEventListener( 'load', replaceImage, false );
	image.src    = newImageURL;



	//	Functions
	function replaceImage () {
		elt.classList.remove( 'brk-enhancing' );

		elt.style.backgroundImage = 'url(' + newImageURL + ')';
	}
}



}());
*/