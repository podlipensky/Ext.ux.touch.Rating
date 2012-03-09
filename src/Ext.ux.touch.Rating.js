/**
 * @author Pavel Podlipensky - http://podlipensky.com
 * @class Ext.ux.touch.Rating
 * <p>This is an extension for Ext.form.Field which works with Sencha Touch. 
 * The Rating control provides an intuitive rating experience that allows users to select the number of stars (or other symbols) that represents their rating.</p>
 * <p>Sample Usage</p>
 * <pre><code>
 * 		new Ext.ux.touch.Rating({
 * 			itemsCount : 5,
 * 			label : 'Rating',
 * 			inputCls : 'x-rating-star-input',
 * 			itemCls : 'x-rating-star',
 * 			itemHoverCls : 'x-rating-star-hover'
 * 		})
 * 	</code></pre>
 * 	<p>More detailed rating control configuration</p> 
 * 	<pre><code>						 
 * 		new Ext.ux.touch.Rating({
 * 			label : 'Rating',
 * 			inputCls : 'x-rating-star-color',
 * 			items : [{
 * 						hoverCls : 'x-rating-0'
 * 					}, {
 * 						hoverCls : 'x-rating-1'
 * 					}, {
 * 						hoverCls : 'x-rating-2'
 * 					}, {
 * 						hoverCls : 'x-rating-3'
 * 					}, {
 * 						hoverCls : 'x-rating-4'
 * 					}]
 * 		})
 * </code></pre> 
 */
Ext.namespace('Ext.ux.touch');
 
Ext.ux.touch.Rating = Ext.extend(Ext.form.Field, {
 	//TODO: add theming support
	//TODO: investigate form submition options
	/**
     * @cfg {Boolean} singleColorPerValue
     * If true, apply/override @hoverCls class from latest selected item to all preceding items
     */
 	singleColorPerValue: false, 
 	
 	/**
     * @cfg {Boolean} 
     * 
     */
 	layoutOnOrientationChange: true,
 	
 	/**
     * @cfg {Number} minValue  
     * Minimum value which can be selected by user
     */
 	minValue: 0,
 	
 	/**
     * @cfg {Number} value 
     * Value represents index of far right selected star, i.e. if 4 stars selected value will be equal to 3
     */
 	value: undefined, 
 	
 	/**
     * @cfg {Array} items 
     * List of items/stars to display. The configuration property is optional in case when @itemsCount specified
     * Valid items for the array should have the following structure
     * {
     * 		{String} cls - applied to the item when its not selected
     * 		{String} hoverCls - applied to the item when it is selected
     * }
     */
 	items: undefined, 
 	
 	/**
     * @cfg {Number} itemsCount 
     * If @items collection is not specified, the it will generate it with total amount of items equal to @itemsCount
     * NOTE: @itemCls and @itemHoverCl should be specified for proper items collection generation and control rendering.
     */
 	itemsCount: undefined,
 	
 	/**
     * @cfg {String} itemCls
     * Class to apply to the item when it is not selected
     */
 	itemCls: undefined,
 	
 	/**
     * @cfg {String} itemHoverCls
     * Class to apply to the item when it is selected
     */
 	itemHoverCls: 'x-rating-item-hover',
 	
 	/**
     * @cfg {String} clearCls
     * Class to apply to the clear button
     */
 	clearCls: 'x-rating-clear',
 	
 	/**
     * @cfg {Boolean} showClear
     * Determine whether to show clear button
     */
 	showClear: false,
	 	
 	renderTpl: [
 		'<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div class="x-form-field-container">',
	            '<div id="{inputId}" class="{fieldCls} {cls} x-rating-field" name="{name}" ',
	                	'<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
	                	'<tpl if="style">style="{style}" </tpl>',
	                '>',
	                '<tpl for="items">',
	                	'<div index="{[xindex - 1]}" class="{cls} x-rating-item"',
	                	'>{tooltip}</div>',
	                '</tpl>',
	                '<tpl if="showClear">',
	                	'<div class="{clearCls}">',
	                	'</div>',
	                '</tpl>',
	            '</div>',
            	'<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>',
            '</div>',
        '</tpl>'
    ],
    
    initComponent: function(){
    	Ext.ux.touch.Rating.superclass.initComponent.call(this);
    	//if there is no items collection - generate it based on @itemsCount, @itemCls and @itemHoverCls
    	if(!this.items){
    		this.itemsCount = this.itemsCount || 0;
    		this.items = [];
    		for(var i = 0; i < this.itemsCount; i++){
    			this.items.push({
    				hoverCls: this.itemHoverCls,
    				cls: this.itemCls
    			});
    		}
    	}
    	else{
    		Ext.each(this.items, function(item){
    			if(!item.cls && this.itemCls){
    				item.cls = this.itemCls;
    			}
    			if(!item.hoverCls && this.itemHoverCls){
    				item.hoverCls = this.itemHoverCls;
    			}
    		}, this);
    	}
    	this.on('orientationchange', this.onOrientationChanged, this);
    },
   
    /**
     * @private
     */
    initRenderData: function() {
        Ext.form.Field.superclass.initRenderData.apply(this, arguments);
        
        Ext.applyIf(this.renderData, {
            disabled        :   this.disabled,
            cls				:	this.cls,
            fieldCls        :   'x-input-' + this.inputType + (this.inputCls ? ' ' + this.inputCls: ''),
            fieldEl         :   !this.fieldEl && this.autoCreateField,
            inputId         :   Ext.id(),
            label           :    this.label,
            labelAlign      :   'x-label-align-' + this.labelAlign,
            name            :   this.getName(),
            required        :   this.required,
            style           :   this.style,
            tabIndex        :   this.tabIndex,
            inputType       :   this.inputType,
            useMask         :   this.useMask,
            items			:	this.items,
            showClear		:	this.showClear,
            clearCls		:	this.clearCls
        });
        
        return this.renderData;
    },
    
    onRender: function(){
    	Ext.ux.touch.Rating.superclass.onRender.apply(this, arguments);
    	
    	var dq = Ext.DomQuery;
		var items = dq.select('.x-rating-field > .x-rating-item', this.el.dom);
    	Ext.each(items, function(item, index){
    		var el = Ext.get(item);
    		el.id = Ext.id();
    		Ext.applyIf(el, this.items[index]);
    		this.items[index] = el;
    	}, this);

    	this.mon(this.fieldEl, {
            touchstart: this.onTouchStart,
            touchmove: this.onTouchMove,
            preventDefault: true,
            scope: this
        });
		if(this.showClear && this.clearCls){
			this.clearBtn = this.el.down('.' + this.clearCls, false);
			this.clearBtn.on('click', this.onClear, this);
		}
    },
    
    onOrientationChanged: function(ctl, orientation, w, h) {
        Ext.ux.touch.Rating.superclass.onOrientationChange.apply(this, arguments);
        //TODO: re-arrange control on orientation change
    },
    
    /*
     * Start assigning values (selecting stars) when user touched the control.
     */
    onTouchStart: function(e){
    	if(this.clearBtn && e.target == this.clearBtn.dom){
    		this.onClear();
    		return;
    	}
    	this.onTouchMove(e);
    },
    
    /*
     * Calculate the position of thumb related to control's items and determine what value is selected
     */
    onTouchMove: function(e){
    	if(this.disabled){
    		return;
    	}
    	var offset = this.fieldEl.getXY();
    	var x = e.touches[0].pageX - offset[0];
    	if(!Ext.isDefined(this.diameter)){
    		if(this.items.length){
    			var size = this.items[0].getSize();
    			this.diameter = Math.min(size.height, size.width);
    		}
    		else{
    			this.diameter = 0;
    		}
    	}
    	var targetIndex = Math.floor(x / this.diameter);
    	if(targetIndex > -1){
	    	this.setValue(targetIndex);
    	}
    },
    
    /*
     * This method overrides original Sencha Touch's method because of support 0 value 
     */
    initValue: function() {
    	var value = this.value != undefined && Ext.isNumber(this.value) ? this.value : this.minValue;
        this.setValue(value, true);

        /**
         * The original value of the field as configured in the {@link #value} configuration, or
         * as loaded by the last form load operation if the form's {@link Ext.form.BasicForm#trackResetOnLoad trackResetOnLoad}
         * setting is <code>true</code>.
         * @type mixed
         * @property originalValue
         */
        this.originalValue = this.getValue();
    },
    
    /*
     * Display value's representation in UI
     * @param {Number} value - index of item to select to
     */
    displayValue: function(value){
    	if(!this.rendered){
    		this.on('afterrender', Ext.createDelegate(this.displayValue, this, [value]), this, {single: true});
    		return;
    	}
    	var items = this.items;
    	for(var i = 0; i < items.length; i++){
	    		if(this.singleColorPerValue){
		    			for(var j = value + 1; j < items.length; j++){
		    				var nextCls = items[j].hoverCls;
		    				if(items[i].hasCls(nextCls)){
		    					items[i].removeCls(nextCls);
		    				}
		    			}
	    		}
	    		if(i > value){
	    			items[i].removeCls(items[i].hoverCls);
	    			if(items[i].cls){
	    				items[i].addCls(items[i].cls);
	    			}
	    		}
	    		else{
	    			var cls = this.singleColorPerValue ? items[value].hoverCls : items[i].hoverCls;
	    			items[i].addCls(cls);
	    			if(items[i].cls){
	    				items[i].removeCls(items[i].cls);
	    			}
	    		}
    	}
    },
    
    setValue: function(value){
    	if(!Ext.isNumber(value)){
    		throw 'Argument exception: value argument is not a number.';
    	}
    	var minValue = this.minValue;
    	if(Ext.isNumber(minValue) && value < minValue){
    		value = minValue;
    	}
    	var count = this.items ? this.items.length : this.itemsCount;
    	if(value > this.items.length){
    		value = this.items.length - 1;
    	}
    	this.value = value;
    	this.displayValue(value);
    },
    
    getValue: function(){
    	return this.value;
    },
    
    onClear: function(){
    	if(!this.disabled){
    		this.setValue(this.minValue);
    	}
    }
 });