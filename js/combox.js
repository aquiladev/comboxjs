/* ========================================================================
 * ComboxJs: combox.js v0.1 - 2013-31-07
 * https://github.com/aquiladev/comboxjs.git
 * ========================================================================
 * Copyright 2013 Sergii Bomko.
 * ======================================================================== */

(function( $, undefined ) { 'use strict';
	$.widget('custom.combox', {
		version: '0.1',
		defaultElement: "<div>",
		options: {
			minHeight: 20
		},
		
		_create: function() {
			var options = this.options;
						
			this._draw();
			this._on( this._events );
		},
		
		_events: {
			'click .ui-combox-select': function( event ) {
				var selectDiv = $(event.currentTarget);
				var position = selectDiv.position();
				selectDiv.find('ul')
					.css({
						'top': selectDiv.height(),
						'width': selectDiv.width()
					})
					.toggle();
			},
			'click .ui-combox-select li': function( event ) {
				var item = $(event.currentTarget);
				var selectDiv = item.closest('.ui-combox-select');
				var option = $('#' + selectDiv.attr('src-fld') + ' option[value=' + item.val() + ']')
					.attr('selected', 'selected')
					.prop('selected', true);
				selectDiv.find('span').text(item.text());
			}
		},
		
		_draw: function() {
			var obj = this;
			var wrapper = $('<div></div>')
				.addClass('ui-combox');
			this.element.wrapInner(wrapper);
			this.comboxElement = this.element.find('.ui-combox');
			
			this.comboxElement
				.find('input[type=text], select[id]')
				.each(function () {
					var field = $(this);
					if(field.is("input"))
					{
						var inputWrapper = $('<div></div>')
							.addClass('ui-combox-input');
						field.wrap(inputWrapper);
					} else {
						var height = Math.max(obj.options.minHeight, obj.comboxElement.height());
						var selectWrapper = $('<div></div>')
							.attr({'src-fld': field.attr('id')})
							.addClass('ui-combox-select')
							.css({
								'width': field.width(),
								'height': height
							})
							.append('<span></span>');
						$('<div></div>')
							.addClass('ui-combox-pointer')
							.css({
								'height': height - 4
							})
							.appendTo(selectWrapper);
						var optionsWrapper = $('<ul></ul>')
							.appendTo(selectWrapper);
						
						field.hide()
							.after(selectWrapper)
							.children()
							.each(function() {
								var option = $(this);
								$('<li></li>').val(option.val())
											  .text(option.text())
											  .appendTo(optionsWrapper);
							});
					}
				});
		}
	});
})( jQuery );