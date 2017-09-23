(function(cityData){
	function CitySelector(options){
		this.settings = options || {};
		this.city = this.settings.city || "";
		this.country = this.settings.country || "";
		this.item = this.settings.item || "";
		this.showBox = this.settings.showBox || "";
		this.cityIndex = 0;
		this.countryIndex = 0;
		this.itemIndex = 0;
		this.cityArr = [];
		this.init();
	}
	CitySelector.prototype = {
		constructor: CitySelector,
		init: function(){
			var self = this;

			this.getCityArr();
			this.renderfirst();
			this.renderTwice(0);

			//一级城市切换
			this.city.onchange = function(){
				self.cityIndex = self.city.selectedIndex;
				self.renderTwice(self.cityIndex);
			}
			//二级城市切换
			this.country.onchange = function(){
				self.countryIndex = self.country.selectedIndex;
				var grandchild = cityData[self.cityIndex].child[self.countryIndex].child;
				self.renderThird(grandchild);
			}
			//三级城市切换
			this.item.onchange = function(){
				// self.itemIndex = this.item.selectedIndex;
				self.showCitys();
			}
		},
		getCityArr: function(){
			for(var i = 0, len = cityData.length; i < len; i++){
				this.cityArr.push(cityData[i].name);
			}
		},
		renderfirst: function(){
			var self = this;

			this.cityArr.forEach(function(val, i){
				var option = new Option(val, val);
				self.city.add(option);
			});

			this.showCitys();
		},
		renderTwice: function(index){
			var self = this;

			this.empty(this.country);
			var child = cityData[index].child;

			child.forEach(function(val, i){
				var childName = val.name;
				var option = new Option(childName, childName);
				self.country.add(option);
			});

			var n = this.country.selectedIndex;
			var grandchild = child[n].child;
			this.renderThird(grandchild);
		},
		renderThird: function(grandchild){
			var self = this;

			this.empty(this.item);
			grandchild.forEach(function(val, i){
				var grandchildName = val.name;
				var option = new Option(grandchildName, grandchildName);
				self.item.add(option);
			});

			this.showCitys();
		},
		empty: function(select){
			for(var i = select.options.length; i > 0; i--){
				select.remove(0);
			}
		},
		showCitys: function(){
			var result = "";
			if(this.city.value){
				result = this.city.value;
			}
			if(this.country.value){
				result += '-' + this.country.value;
			}
			if(this.item.value){
				result += '-' + this.item.value;
			}

			this.showBox.innerHTML = "<b>" + result + "</b>";
		}
	}

	window.CitySelector = CitySelector;
})(city);