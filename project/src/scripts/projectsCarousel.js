(function(){



var prev_elt  = document.querySelector( '.carouselPrev' );
var next_elt  = document.querySelector( '.carouselNext' );
var container_elt  = document.querySelector( '.carouselContainer' );

var carousel = brk.carousel({
	width: 200
});

prev_elt.addEventListener( 'click', goToPreviousPosition, false );
next_elt.addEventListener( 'click', goToNextPosition, false );

setClasses();
container_elt.classList.remove( 'carouselContainer--inactive' );


//	FUNCTIONS

function goToPreviousPosition () {
	carousel.prevSet();

	setClasses();
}

function goToNextPosition () {
	carousel.nextSet();

	setClasses();
}

function setClasses () {

	prev_elt.classList.remove( 'carouselPrev--disabled' );
	next_elt.classList.remove( 'carouselPrev--disabled' );

	if ( carousel.get.position() === 0 ) {
		prev_elt.classList.add( 'carouselPrev--disabled' );
	}

	if ( carousel.get.position() === carousel.get.count()-1 ) {
		next_elt.classList.add( 'carouselPrev--disabled' );
	}
}



}());