
$(document).ready(function() {

	const mainNav 	= $('.main-nav');
	mainNav.children().children().each(function (index, li) {
		const divider	= 100 / mainNav.children().length;
		$(li).css('width', divider+"%");
	})
	// Set Width of main Nav ==========

	$('.side-nav ul').hide();

	$('#toggle-nav').on('click', function() {

		$(this).toggleClass('change');
		$('.side-nav ul').slideToggle();
		
	})
	// toggle mobile nav ===========


	Tu.tScroll({
		't-element'	: '.fadeLeft'
	})
	Tu.tScroll({
		't-element'	: '.fadeRight'
	})
	Tu.tScroll({
		't-element'	: '.fadeIn'
	})
	// T-Scroll ====================

})
