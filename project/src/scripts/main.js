(function(){



	var menuToggleContainer = document.querySelector('.menuToggleContainer');

	menuToggleContainer.addEventListener( 'click', toggleMenuDisplay, false );

	function toggleMenuDisplay ( e ) {
		menuToggleContainer.classList.toggle( 'menuToggleContainer--open' );
	}



}());