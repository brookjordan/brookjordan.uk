(function(){




//	Variable decalrations
var viewerUnderlay     = document.createElement('div');
var	viewerImgContainer = document.createElement('div');
var	viewerImg          = document.createElement('img');
var viewerSpeed        = 0.5;

var imageBounds;



viewerUnderlay.className     = 'imageViewer';
viewerImgContainer.className = 'imageViewerImageContainer';
viewerImg.className          = 'imageViewerImage';



viewerImgContainer.appendChild( viewerImg );
document.body.appendChild( viewerUnderlay );
document.body.appendChild( viewerImgContainer );

viewerImgContainer.style.transitionDuration = viewerSpeed + 's';
viewerUnderlay.style.transitionDuration = viewerSpeed + 's';

//	Add viewer to all created sites
Array.prototype.forEach.call( document.querySelectorAll('.builtSite'), attachViewerToElement );





//	Functions
function attachViewerToElement ( attachedTo_elt ) {

	var clickedImage             = attachedTo_elt;
	var clickedImageIllustration = clickedImage.querySelector( '.builtSite__image' );
	var imgBackgroundImage       = clickedImageIllustration.style.backgroundImage;
	var src                      = imgBackgroundImage.slice(
			imgBackgroundImage.indexOf('(') + 1,
			imgBackgroundImage.lastIndexOf(')')
		);
	var src_big                  = src.replace( /(\.\w{3,4})$/, '-big$1' );
	var imagePreloader = new Image();

	//	Preload the full preview
	imagePreloader.src = src_big;
	attachedTo_elt.addEventListener( 'click', openInViewer, false );

	function openInViewer ( e ) {
		e.preventDefault();

		imageBounds = clickedImage.getBoundingClientRect();

		viewerImg.src = src_big;

		viewerImgContainer.style.top        = imageBounds.top + 'px';
		viewerImgContainer.style.left       = imageBounds.left + 'px';
		viewerImgContainer.style.width      = imageBounds.width + 'px';
		viewerImgContainer.style.height     = imageBounds.height + 'px';
		viewerImgContainer.style.display = 'block';


		viewerUnderlay.style.display = 'block';
		document.body.style.overflow = 'hidden';

		setTimeout( centerViewerImage, 4 );

		viewerImgContainer.addEventListener('click', closeViewer, false);
		viewerUnderlay.addEventListener('click', closeViewer, false);

	}

	function centerViewerImage () {
		setTransitions();

		viewerImgContainer.style.top    = '5%';
		viewerImgContainer.style.left   = '5%';
		viewerImgContainer.style.width  = '90%';
		viewerImgContainer.style.height = '90%';
		viewerImgContainer.style.opacity = 1;

		viewerUnderlay.style.opacity = '0.9';
	}

	function closeViewer () {
		viewerImgContainer.removeEventListener('click', closeViewer, false);
		viewerUnderlay.removeEventListener('click', closeViewer, false);



		viewerImgContainer.scrollTop  = 0;
		viewerImgContainer.scrollLeft = 0;

		viewerImgContainer.style.top        = imageBounds.top + 'px';
		viewerImgContainer.style.left       = imageBounds.left + 'px';
		viewerImgContainer.style.width      = imageBounds.width + 'px';
		viewerImgContainer.style.height     = imageBounds.height + 'px';
		viewerImgContainer.style.opacity = 0;

		viewerUnderlay.style.opacity = 0;

		document.body.style.overflow = 'auto';



		setTimeout( hideViewer, viewerSpeed*1000 );
	}

	function hideViewer () {
		viewerImgContainer.style.display = 'none';
		viewerUnderlay.style.display = 'none';

		imageBounds = undefined;

		unsetTransitions();
	}

	function setTransitions () {
		viewerUnderlay.style.transitionProperty     = 'opacity';
		viewerImgContainer.style.transitionProperty = 'top, left, width, height, opacity';
	}

	function unsetTransitions () {
		viewerUnderlay.style.transitionProperty     = 'none';
		viewerImgContainer.style.transitionProperty = 'opacity';
	}



}





}());