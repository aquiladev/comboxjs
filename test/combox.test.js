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
	equal(inputWrapper.hasClass('ui-combox-input'), 1, 
		'wrapper for input created');
	equal(inputWrapper.find('input').length == 1, 1, 'input exist');
});

test('input wrappers properties', function() {
	//arrange
	var props = {
		'maxHeight': 33,
		'minInputsWidth': 143
		};
	$fixture.append(
		$('<div></div>').append(
			$('<input></input>')
				.attr('type', 'text')));
	
	//act
	$fixture.find('div').combox(props);
	
	//assert
	var wrapper = $('div', $fixture ).first();
	var inputWrapper = wrapper.find('div.ui-combox-input').first();
	var input = inputWrapper.find('input');
	equal(inputWrapper.css('width'), input.width() + 'px', 
		'width of wrapper equal fields width');
	equal(inputWrapper.css('max-height'), props.maxHeight + 'px', 
		'max heigth of wrapper equal prop');
	equal(inputWrapper.css('min-width'), props.minInputsWidth + 'px', 
		'min width of wrapper equal prop');
});

test('input width less then min width', function(){
	//arrange
	var props = {
		'minInputsWidth': 143
		};
	$fixture.append(
		$('<div></div>').append(
			$('<input></input>')
				.attr('type', 'text')
				.css('width', 80)));
				
	//act
	$fixture.find('div').combox(props);
	
	//assert
	var wrapper = $('div', $fixture ).first();
	var inputWrapper = wrapper.find('div.ui-combox-input').first();
	equal(inputWrapper.css('width'), props.minInputsWidth + 'px', 
		'set min width for wrapper');
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
	equal(selectWrapper.hasClass('ui-combox-select'), 1, 
		'wrapper for select created');
	equal(selectWrapper.find('label').length == 1, 1, 'label exist');
	equal(selectWrapper.find('ul').length == 1, 1, 'list exist');
	equal(selectWrapper.find('div.ui-combox-pointer').length == 1, 1, 
		'pointer exist');
	var select = selectWrapper.next('select');
	equal(select.length == 1, 1, 'select exist');
	equal(selectWrapper.attr('src-fld') == select.attr('id'), 1, 
		'link with select exist');
});

test('select wrappers properties', function() {
	//arrange
	var props = {
		'maxHeight': 20,
		'minSelectsWidth': 130
		};
	$fixture.append(
		$('<div></div>')
			.append(
				$('<select></select>')
					.attr('Id', 'qwerty')
					.css('width', 200)));
	
	//act
	$fixture.find('div').combox(props);
	
	//assert
	var wrapper = $('div', $fixture).first();
	var selectWrapper = wrapper.find('div.ui-combox-select');
	var select = selectWrapper.next('select');
	equal(selectWrapper.css('width'), select.width() + 'px', 
		'width of wrapper equal fields width');
	equal(selectWrapper.css('max-height'), props.maxHeight + 'px', 
		'max heigth of wrapper equal prop');
	equal(selectWrapper.css('min-width'), props.minSelectsWidth + 'px', 
		'min width of wrapper equal prop');
	equal(selectWrapper.find('label').css('line-height'), 
		select.css('height'), 'line heigth of label equal fields heigth');
	equal(selectWrapper.find('div.ui-combox-pointer').css('height'), 
		(select.height() - 2) + 'px', 'pointer exist'); //magic
});

test('select width less then min width', function(){
	//arrange
	var props = {
		'minSelectsWidth': 130
		};
	$fixture.append(
		$('<div></div>')
			.append(
				$('<select></select>')
					.attr('Id', 'qwerty')
					.css('width', 80)));
	
	//act
	$fixture.find('div').combox(props);
	
	//assert
	var wrapper = $('div', $fixture).first();
	var selectWrapper = wrapper.find('div.ui-combox-select');
	equal(selectWrapper.css('width'), props.minSelectsWidth + 'px', 
		'set min width for wrapper');
});

test('select height less then min height', function(){
	//arrange
	var props = {
		'minHeight': 50
		};
	$fixture.append(
		$('<div></div>')
			.append(
				$('<select></select>')
					.attr('Id', 'qwerty')
					.css('height', 20)));
	
	//act
	$fixture.find('div').combox(props);
	
	//assert
	var wrapper = $('div', $fixture).first();
	var selectWrapper = wrapper.find('div.ui-combox-select');
	equal(selectWrapper.find('label').css('line-height'), 
		props.minHeight + 'px', 'set min height for label');
	equal(selectWrapper.find('div.ui-combox-pointer').css('height'), 
		(props.minHeight - 4) + 'px', 'pointer exist'); //magic
});

test('few elements in combox', function(){
	//arrange
	$fixture.append(
		$('<div></div>')
			.append(
				$('<input></input>')
					.attr('type', 'text'))
			.append(
				$('<select></select>')
					.attr('Id', 'qwerty'))
			.append(
				$('<input></input>')
					.attr('type', 'text')))
			.append(
				$('<select></select>'));
	
	//act
	$fixture.find('div').combox();
	
	//assert
	var wrapper = $('div', $fixture ).first();
	equal(wrapper.children('div.ui-combox-input').length == 2, 1, 
		'count input elements correct');
	equal(wrapper.children('div.ui-combox-select').length == 1, 1, 
		'count select elements correct');
});