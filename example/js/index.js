Ext.application({
	name: 'StarRatingExample',
	icon : 'resources/img/icon.png',
	tabletStartupScreen : 'resources/img/tablet_startup.png',
	phoneStartupScreen : 'resources/img/phone_startup.png',
	glossOnIcon : false,
	
	launch : function() {
		Ext.create('Ext.Panel', {
			fullscreen: true,
			layout: {
				animation: {
					duration: 250,
					easing: 'ease-in-out'
				}
			},
			scroll : 'vertical',
			items : [
					{
						xtype: 'toolbar',
						title: 'Star Rating',
						dock: 'top',
						items: [
							{
								xtype: 'button',
								iconCls: 'star',
								iconMask: true,
								ui: 'plain',
								handler: this.onRateTap,
								scope: this
							}
						]
					},
					{
						xtype: 'rating',						
						label : 'Star',
						itemsCount : 5,
						itemCls : 'x-rating-star',
						itemHoverCls : 'x-rating-star-hover'
					},
					{
						xtype: 'rating',
						label : 'Disabled',
						itemsCount : 5,
						value: 2, //zero-based!						
						itemCls : 'x-rating-star',
						itemHoverCls : 'x-rating-star-hover',
						disabled: true
					},
					{
						xtype: 'rating',
						label: 'Star w/ clear',							   
					    itemsCount: 5,
					    itemCls: 'x-rating-star',
					    itemHoverCls: 'x-rating-star-hover',
					    clearIcon: true //show clear icon right after stars
					},
                    new Ext.ux.touch.Rating({// you can create instance of the control in the following way as well
                        itemsCount: 5,
                        label: 'Image less',
                        cls: 'x-imageless-rating',
                        itemCls: 'x-imageless-star',
                        itemHoverCls: 'x-imageless-hover'
                    })]
		});		
	},
	
	onRateTap: function(){
		if(!this.ratingSheet){
			this.ratingSheet = Ext.create('Ext.ActionSheet', {//modal sheet to show rating control with a label
						id: 'modal-rating',
						hidden: true,
						modal: true,
						height: '5em',
						layout: 'vbox',
						hideOnMaskTap: true,
						items: [
							{
								xtype: 'rating',								
								itemsCount: 5,
								minValue: -1,								
								centered: true,
								cls: 'x-imageless-rating x-modal-rating',
								itemCls: 'x-imageless-star',
								itemHoverCls: 'x-imageless-hover',
								msg: ['Hate it', 'Don\'t like it', 'Like it', 'Love it', 'Even my cat love it!'],
								listeners: {
									change: {
										fn: function(ct, value, oldValue){
											var parent = this.getParent();
											if(parent){
												var label = parent.query('.label')[0];
												label.setHtml(this.getInitialConfig().msg[value]);
											}
										}
									}
								}
							},
							{								
								xtype: 'label',
								cls: 'rating-desc',
								centered: true,
								html: ''
							}
						]
					});
		}
		Ext.Viewport.add(this.ratingSheet);
		this.ratingSheet.show();
	}
});