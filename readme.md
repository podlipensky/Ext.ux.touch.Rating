**Ext.ux.touch.Rating**

@author Pavel Podlipensky - http://podlipensky.com
@class Ext.ux.touch.Rating
<p>This is an extension for Ext.field.Field which works with Sencha Touch 2. 
The Rating control provides an intuitive rating experience that allows users to select the number of stars (or other symbols) that represents their rating.</p>
<p>Sample Usage</p>
`		new Ext.ux.touch.Rating({
			itemsCount : 5,
			label : 'Rating',
			inputCls : 'x-rating-star-input',
			itemCls : 'x-rating-star',
			itemHoverCls : 'x-rating-star-hover'
		})`

Control provides zero-based value (i.e. 0 - means 1 star selected)
Also there is an ability to clear current selected values by clicking on clear button. You may enable clear button by setting `clearIcon: true`. Once user clicked on clear button the control's value wil be reset to `defaultValue` prorperty value.
If you want to have empty star rating, set `minValue: -1`.
Live demo: podlipensky.com/sencha2/rating/example
