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
								itemCls : 'x-rating-star',
								itemHoverCls : 'x-rating-star-hover',
								clearIcon: false
							}),
							new Ext.ux.touch.Rating({
								itemsCount : 5,
								value: 2, //zero-based!
								label : 'Disabled',
								itemCls : 'x-rating-star',
								itemHoverCls : 'x-rating-star-hover',
								disabled: true,
								showClear: true
							}),
							new Ext.ux.touch.Rating({
							    itemsCount: 5,
							    minValue: -1,
							    label: 'Star w/ clear',							   
							    itemCls: 'x-rating-star',
							    itemHoverCls: 'x-rating-star-hover',
							    clearIcon: true
							}), ]
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

		if (Ext.os.is.iOS) {
			formBase.fullscreen = true;
		} else {
			Ext.apply(formBase, {
						autoRender : true,
						modal : true,
						centered : true,
						hideOnMaskTap : false,
						height : 385,
						width : 480
					});
		}
		
		//var form = Ext.create new Ext.form.FormPanel(formBase);
		Ext.Viewport.add(formBase);
	}
});