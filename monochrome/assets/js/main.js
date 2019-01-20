$(document).ready(function() {

	// Set Width of main Nav ==========
	const mainNav 	= $('.main-nav');
	mainNav.children().children().each(function (index, li) {
		const divider	= 100 / mainNav.children().length;
		$(li).css('width', divider+"%");
	})
	// Set Width of main Nav ==========


	// toggle mobile nav ===========
	$('.side-nav ul').hide();

	$('#toggle-nav').on('click', function() {

		$(this).toggleClass('change');
		$('.side-nav ul').slideToggle();
		
	})
	// toggle mobile nav ===========


	// T-Scroll ====================
	$('.next-post').children().each(function(index,box) {
		if (index %2 == 0) {
			$(box).addClass('fadeLeft');
		} else {
			$(box).addClass('fadeRight');
		}
	})

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
