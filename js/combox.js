/* ========================================================================
 * ComboxJs: combox.js v0.1 - 2013-07-31
 * https://github.com/aquiladev/comboxjs.git
 * ========================================================================
 * Copyright 2013 Sergii Bomko.
 * ComboxJs may be freely distributed under the MIT license.
 * ======================================================================== */

(function ($) {
	'use strict';
	$.widget('custom.combox', {
		version: '0.1',
		defaultElement: '<div>',
		options: {
			minHeight: 20,
			maxHeight: 32,
			minSelectsWidth: 80,
			minInputsWidth: 80
		},

		_create: function () {
			this._draw();
			this._on(this._events);
			this._refresh();
		},

		_events: {
			'click .ui-combox-select': function (event) {
				var selectDiv = $(event.currentTarget);
				window.clearTimeout(this.timer);
				selectDiv.find('ul')
					.css({
						'top': selectDiv.height(),
						'left': -1,
						'width': selectDiv.outerWidth()
					})
					.toggle();
			},
			'click .ui-combox-select li': function (event) {
				var item = $(event.currentTarget);
				this._refreshSelect(item);
				var selectDiv = item.closest('.ui-combox-select');
				$('#' + selectDiv.attr('src-fld')).trigger('change');
			},
			'mouseleave .ui-combox-select ul': function (event) {
				var list = $(event.currentTarget);
				this.timer = this._delay(function () {
					list.hide();
				}, 200);
			}
		},

		_draw: function () {
			var obj = this;
			var combox = this.combox = this.element
				.addClass('ui-combox');

			//add fields
			combox.find('input[type=text], select[id]')
				.each(function () {
					var field = $(this);
					if (field.is("input")) {
						obj._buildInputHtml(field);
					} else {
						obj._buildSelectHtml(field);
					}
				});
		},

		_refresh: function () {
			var item = this.combox.find(".ui-combox-select li[selected]");
			if (item.length == 0) {
				item = this.combox.find('.ui-combox-select li:first');
			}
			this._refreshSelect(item);
			item.removeAttr("selected")
				.parent().hide();
		},
		
		_refreshSelect: function(item) {
			var selectDiv = item.closest('.ui-combox-select');
			var select = $('#' + selectDiv.attr('src-fld'));
			var option = select.find('option[value=' + item.attr('value') + ']');
			if (option.length == 0) {
				option = select.find('option:first');
			}
			select
				.children("option:selected")
				.removeAttr("selected")
				.prop('selected', false);
			option
				.attr('selected', 'selected')
				.prop('selected', true);
			selectDiv.find('label').text(item.text());
		},

		_buildInputHtml: function (field) {
			var width = Math.max(this.options.minInputsWidth, field.width());
			var inputWrapper = $('<div></div>')
				.addClass('ui-combox-input')
				.css({
					'width': width,
					'max-height': this.options.maxHeight,
					'min-width': this.options.minInputsWidth
				});
			field.wrap(inputWrapper)
				.width('100%');
		},
		
		_buildSelectHtml: function (field) {
			var height = Math.max(this.options.minHeight, field.height());
			var width = Math.max(this.options.minSelectsWidth, field.width());
			var selectWrapper = $('<div></div>')
				.attr({'src-fld': field.attr('id')})
				.addClass('ui-combox-select')
				.css({
					'width': width,
					'min-width': this.options.minSelectsWidth,
					'max-height': this.options.maxHeight,
				})
				.append(
					$('<label></label>')
						.css({'line-height': height + 'px'})
				);
			
			//adding pointer
			$('<div></div>')
				.addClass('ui-combox-pointer')
				.css('height', height - 4)
				.appendTo(selectWrapper);

			//adding options
			var optionsWrapper = $('<ul></ul>')
				.appendTo(selectWrapper);

			field
				.hide()
				.before(selectWrapper)
				.children()
				.each(function () {
					var option = $(this);
					$('<li></li>').text(option.text())
								  .attr('value', option.val())
								  .attr('selected', option.is(':selected'))
								  .appendTo(optionsWrapper);
				});
		}
	});
})(jQuery);