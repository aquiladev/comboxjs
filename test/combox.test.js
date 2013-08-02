var $fixture = $('#qunit-fixture');

test('create wrapper', function() {
	//arrange
	$fixture.append($('<div></div>'));
	
	//act
	$fixture.find('div').combox();
	
	//assert
	equal( $('div', $fixture ).first().hasClass('ui-combox'), 1, 'wrapper created');
});

test('create wrapper for input', function() {
	//arrange
	$fixture.append(
		$('<div></div>').append(
			$('<input></input>')
				.attr('type', 'text')));
	
	//act
	$fixture.find('div').combox();
	
	//assert
	var wrapper = $('div', $fixture ).first();
	var inputWrapper = wrapper.find('div').first();
	equal( inputWrapper.hasClass('ui-combox-input'), 1, 'wrapper for input created');
});