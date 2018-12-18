$(document).ready(function() {

	const plus = $('#plus');
	const empty = document.createElement("li");
	let done   = false;
	let lists  = JSON.parse(localStorage.getItem('lists')) || [];
	// declare all variabel======================
	

	for (const list of lists) {
		if (list.done) {
			plus.before('<li draggable="true" class="done list bg-white mt-2 form-control"><input type="checkbox" class="float-left my-1" checked>' +list.text+ '<button type="button" class="remove close" aria-label="Close">&times;</button></li>');
		} else {
			plus.before('<li draggable="true" class="list bg-white mt-2 form-control"><input type="checkbox" class="float-left my-1">' +list.text+ '<button type="button" class="remove close" aria-label="Close">&times;</button></li>');
		}
	}
	// fetch data==============

	
	$('.container').on('click', function(e) {
		if ( e.target.parentElement.id == "plus") newInput(e)
		// add new input and list
		if ( e.target.classList.contains('remove') ) removeList(e);
		// remove list
		if ( e.target.type == 'checkbox') isDone(e);
		// console.log(e.target.type == 'checkbox');

	})
	// ==========================================


	function newInput(e) {
		$(e.target.parentElement).before('<input type="text" class="mx-auto mt-2 d-block form-control">').attr('disabled', true);
		const input = $('.form-control');

		input.focus().on('blur', function(e) {
			if( $(this).val().trim() == ""){
				$(this).next().attr('disabled', false)
				$(this).remove();
			}
		})


		input.on('keyup', addList)
	}
	// add new input==============

	function addList(e) {
		if (e.keyCode == 13) {
			if ($(this).val().trim() !== ""){
				$(this).replaceWith('<li draggable="true" class="list bg-white mt-2 form-control"><input type="checkbox" class="float-left my-1">' +$(this).val()+ '<button type="button" class="remove close" aria-label="Close">&times;</button></li>');
				$('.list').on({
					'dragstart' : dragstart,
					'dragend' 	: dragend,
					'dragleave'	: dragleave
				});
				lists.push({ text: $(this).val(), done: done, order: $('.list').last().index() });
				localStorage.setItem('lists', JSON.stringify(lists));
				plus.attr('disabled', false);
			}
		}
	}
	// add list====================

	function removeList(e) {
		lists.splice($(e.target).parent().index(), 1);
		$(e.target).parent().remove();
		localStorage.setItem('lists', JSON.stringify(lists));
	}
	// remove list==============

	function isDone(e) {
		if (e.target.checked){
			$(e.target).parent().addClass('done');
			done = !done;
			lists[$(e.target).parent().index()].done = !lists[$(e.target).parent().index()].done;
			localStorage.setItem('lists', JSON.stringify(lists));
		}else{
			$(e.target).parent().removeClass('done');
			done = !done;
			lists[$(e.target).parent().index()].done = ! lists[$(e.target).parent().index()].done;
			localStorage.setItem('lists', JSON.stringify(lists));
		}
		done = false;
	}
	// Set "done"==============
// End Main func====================


	// Drag Event ============
	empty.className += "list empty mt-2 form-control";

	let listBoxes = $('.list');
	let currIndex;


	listBoxes.on({
		'dragstart' : dragstart,
		'dragend' 	: dragend,
		'dragleave'	: dragleave
	});
	
	
	function dragstart() {
		setTimeout(() => this.hidden = true,0);
		currIndex = $(this).index();
	}

	function dragend(e) {
		if ($('ul li.list.empty.mt-2.form-control').length !== 0) {
			$('ul li.list.empty.mt-2.form-control').replaceWith(this);
			this.hidden = false;
			lists = []
			for (let list of $('.list')){
				lists.push({ text: list.innerText.split('×',1).toString(), done: list.children[0].checked, order: $(list).index() });
				
			}
			localStorage.setItem('lists', JSON.stringify(lists));
		} else {
			this.hidden = false;
		}
	}

	function dragleave(e) {
		if (e.pageY > e.target.offsetTop){
			e.target.after(empty);
		}else {
			e.target.before(empty);
			
		}
	}


// end document ready
})
