var $fixture = $('#qunit-fixture');

test('create wrapper', function() {
	//arrange
	$fixture.append($('<div></div>'));
	
	//act
	$fixture.find('div').combox();
	
	//assert
	equal($('div', $fixture).first().hasClass('ui-combox'), 1, 'wrapper created');
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
	equal(inputWrapper.hasClass('ui-combox-input'), 1, 'wrapper for input created');
	equal(inputWrapper.find('input').length == 1, 1, 'input exist');
});

test('create wrapper for select', function() {
	//arrange
	$fixture.append(
		$('<div></div>')
			.append(
				$('<select></select>')
					.attr('Id', 'qwerty')));
	
	//act
	$fixture.find('div').combox();
	
	//assert
	var wrapper = $('div', $fixture).first();
	var selectWrapper = wrapper.find('div').first();
	equal(selectWrapper.hasClass('ui-combox-select'), 1, 'wrapper for select created');
	equal(selectWrapper.find('label').length == 1, 1, 'label exist');
	equal(selectWrapper.find('ul').length == 1, 1, 'list exist');
	var select = selectWrapper.next('select');
	equal(select.length == 1, 1, 'select exist');
	equal(selectWrapper.attr('src-fld') == select.attr('id'), 1, 'link with select exist');
});