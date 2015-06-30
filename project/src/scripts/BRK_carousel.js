//	PLUGIN -- BRK_Carousel

(function( document, window, undefined ){

window.brk = window.brk || {};

brk.carousel = BRK_carousel;




//	Functions

function BRK_carousel ( options ) { // CLOSURE BEGIN -- setCarousel

//	Variables
var o = options || {};

//	 - Element class names
var carousel_class = 'carousel';
var viewFinder_class = 'viewFinder';
var film_class = 'film';
var item_class = 'item';
var itemFocus_class = 'item--focused';

//	 - DOM Elements
//	The container for all of the carousel parts.
var carousel_elt = document.querySelector( '.' + carousel_class );
//	A box the same size as an item which is always
//		in the same position as the current item.
var viewFinder_elt = carousel_elt.querySelector( '.' + viewFinder_class );
//	The container element for all of the items.
//	This film is 'threaded' through the viewfinder.
var film_elt = viewFinder_elt.querySelector( '.' + film_class );
//	The items.
var item_elts = film_elt.querySelectorAll( '.' + item_class );

//	 - Simulation data
var w = o.width || 100;
var n = item_elts.length;
var i = 0;



setActiveClass();
viewFinder_elt.style.width = w + 'px';
film_elt.style.width       = ( w*n ) + 'px';
Array.prototype.forEach.call( item_elts, function ( item_elt ) {
	item_elt.style.width = w + 'px';
});


//	Return
return {
	inc: incrementPosition.bind( null, false ),

	next: function(){
		incrementPosition();
	},
	nextSet: nextSet,

	prev: function(){
		incrementPosition({
			by: -1
		});
	},
	prevSet: previousSet,

	goto: incrementPosition.bind( null, true ),

	get: {
		position: function(){ return i },
		count:    function(){ return n }
	}
}

//	Functions
function incrementPosition ( options ) {
	var o = options || {};

	var explicit = o.explicit || false;
	var by       = o.by        || 1;
	var overflow = o.overflow || 'wrap';


	removeActiveClass();

	//  Make sure by is an integer
	by = parseInt( by, 10 );

	//	Increment the film as desired
	if ( explicit ) {
		i = by;
	} else {
		i += by;
	}

	settlePosition( overflow );

	//	Move the film elements to their new positions
	renderFilm();
}

function nextSet () {
	var carouselWidth = carousel_elt.getBoundingClientRect().width;
	var incBy = Math.max( 1, Math.floor( carouselWidth / w ) );

	incrementPosition({
		by:       incBy,
		overflow: 'stop'
	});
}

function previousSet () {
	var carouselWidth = carousel_elt.getBoundingClientRect().width;
	var incBy = Math.max( 1, Math.floor( carouselWidth / w ) );

	incrementPosition({
		by:       -incBy,
		overflow: 'stop'
	});
}

function settlePosition ( overflow ) {

	if ( overflow === 'wrap' ) {
		//	Make sure the position is positive
		while ( i < 0 ) {
			i += n;
		}

		//	Make sure the number isn't too big
		i = i%n;
	} else if ( overflow === 'stop' ) {
		i = Math.max( 0, Math.min( i, n-1 ) )
	}

	else{
		alert('broken');
	}
}

//	Style the film elements to represent the data
function renderFilm () {
	setActiveClass();

	film_elt.style.left = -( i*w ) + 'px';

	viewFinder_elt.style.left = ( i*( 1/( n - 1 ) ) )*100 + '%';
	viewFinder_elt.style.marginLeft = -( i*( 1/( n - 1 ) ) )*w + 'px';
}

//	Remove the active class from all items
function removeActiveClass () {
	Array.prototype.forEach.call(
		film_elt.querySelectorAll( '.' + itemFocus_class ),
		function ( item_elt ) {
			item_elt.classList.remove( itemFocus_class );
		}
	);
}

//	Add the active class to the currently active item
function setActiveClass () {
	item_elts[ i ].classList.add( itemFocus_class );
}

} // CLOSURE END -- setCarousel







}( document, window ));