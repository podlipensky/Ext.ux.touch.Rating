Ext.setup({
	icon : 'icon.png',
	tabletStartupScreen : 'tablet_startup.png',
	phoneStartupScreen : 'phone_startup.png',
	glossOnIcon : false,
	onReady : function() {

		var form;

		var formBase = {
			scroll : 'vertical',
			items : [{
						xtype : 'fieldset',
						title : 'Star Rating',
						defaults : {
							required : true,
							labelAlign : 'left',
							labelWidth : '40%'
						},
						items : [
							new Ext.ux.touch.Rating({
								itemsCount : 5,
								minValue: -1,
								label : 'Star',
								inputCls : 'x-rating-star-input',
								itemCls : 'x-rating-star',
								itemHoverCls : 'x-rating-star-hover',
								showClear: true
							}),
							new Ext.ux.touch.Rating({
								itemsCount : 5,
								value: 2, //zero-based!
								label : 'Disabled',
								inputCls : 'x-rating-star-input',
								itemCls : 'x-rating-star',
								itemHoverCls : 'x-rating-star-hover',
								disabled: true,
								showClear: true
							}),
							new Ext.ux.touch.Rating({
								singleColorPerValue: true,
								label : 'Color Value',
								inputCls : 'x-rating-star-color',
								items : [{
											hoverCls : 'x-rating-0'
										}, {
											hoverCls : 'x-rating-1'
										}, {
											hoverCls : 'x-rating-2'
										}, {
											hoverCls : 'x-rating-3'
										}, {
											hoverCls : 'x-rating-4'
										}]
							})]
					}, 
					/*{
						xtype : 'fieldset',
						title : 'Themed Star Rating',
						defaults : {
							required : true,
							labelAlign : 'left',
							labelWidth : '40%'
						},
						items: [
							new Ext.ux.touch.Rating({
								itemsCount : 5,
								label : 'Star',
								inputCls : 'x-themed',
								itemCls : 'star',
								itemHoverCls : 'x-themed-hover'
							})
						]
					},*/
							{
						xtype : 'fieldset',
						title : 'Circle Rating (fun)',
						defaults : {
							required : true,
							labelAlign : 'left',
							labelWidth : '40%'
						},
						items : [
							new Ext.ux.touch.CircleRating({
								singleColorPerValue: true,
								inputCls : 'x-round-rating',
								items : [{
											hoverCls : 'x-rating-0'
										}, {
											hoverCls : 'x-rating-1'
										}, {
											hoverCls : 'x-rating-2'
										}, {
											hoverCls : 'x-rating-3'
										}, {
											hoverCls : 'x-rating-4'
										}],
								label : 'Rating'
							}), 
							new Ext.ux.touch.CircleRating({
								inputCls : 'x-round-rating',
								itemsCount : 4,
								label : 'Rating'
							}), 
							new Ext.ux.touch.CircleRating({
								inputCls : 'x-round-rating',
								items : [{
											hoverCls : 'x-rating-0'
										}, {
											hoverCls : 'x-rating-1'
										}, {
											hoverCls : 'x-rating-2'
										}, {
											hoverCls : 'x-rating-3'
										}, {
											hoverCls : 'x-rating-4'
										}],
								label : 'Rating'
							}), 
							new Ext.ux.touch.CircleRating({
								singleColorPerValue: true,
								inputCls : 'x-gradient-rating',
								itemCls : 'x-gradient-rating-item',
								items : [{
											hoverCls : 'x-gradient-rating-item-0'
										}, {
											hoverCls : 'x-gradient-rating-item-1'
										}, {
											hoverCls : 'x-gradient-rating-item-2'
										}, {
											hoverCls : 'x-gradient-rating-item-3'
										}, {
											hoverCls : 'x-gradient-rating-item-4'
										}],
								label : 'Rating'
						})]
					}],
			listeners : {
				submit : function(form, result) {
					console.log('success', Ext.toArray(arguments));
				},
				exception : function(form, result) {
					console.log('failure', Ext.toArray(arguments));
				}
			}
		};

		if (Ext.is.Phone) {
			formBase.fullscreen = true;
		} else {
			Ext.apply(formBase, {
						autoRender : true,
						floating : true,
						modal : true,
						centered : true,
						hideOnMaskTap : false,
						height : 385,
						width : 480
					});
		}

		form = new Ext.form.FormPanel(formBase);
		form.show();
	}
});