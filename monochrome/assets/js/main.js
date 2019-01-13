
$(document).ready(function() {

	$('.side-nav ul').hide();

	$('#toggle-nav').on('click', function() {

		$(this).toggleClass('change');
		$('.side-nav ul').slideToggle();
		
	})
	// toggle mobile nav ===========

	// console.log($('.next-post').children('.box-dashed'));
	$('.next-post').children('.box-dashed').each(function(index,el) {
		// console.log($(el).index() )
		if ($(el).index() % 2 == 0) {
		// 	$(el).addClass('fadeLeft');
		console.log($(el));
		console.log('genap');

		} else {
		console.log($(el));
		// 	$(el).addClass('fadeRight');
		console.log('ganjil');

		}
	});

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
