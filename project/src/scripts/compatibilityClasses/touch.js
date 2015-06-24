if( 'ontouchstart' in window ) {
	document.body.classList.add( 'HAS-touch' );
} else {
	document.body.classList.add( 'NO-touch' );
}