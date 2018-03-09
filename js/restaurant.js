var Restaurant = function (data) {
    this.name = ko.observable(data.name);
    this.marker = ko.observable(data.marker);
    this.infoWindow = ko.observable(data.infoWindow);

    this.address = ko.observable(data.address);
    this.lat = ko.observable(data.lat);
    this.lon = ko.observable(data.lon);
    this.location = ko.observable(data.location);
    this.url = ko.observable(data.url);
};


var RestaurantViewModel = function () {
    var self = this;
    this.allRestaurants = ko.observableArray([]);
    this.restaurantList = ko.observableArray([]);
    this.selectedRestaurant = ko.observable();

    this.setSelectedRestaurant = function (clickedRestaurantObject) {
        self.selectedRestaurant(clickedRestaurantObject);

        getPlacesDetails(clickedRestaurantObject.marker(), clickedRestaurantObject.name(),clickedRestaurantObject.address(), clickedRestaurantObject.url() , clickedRestaurantObject.infoWindow());
    };

    this.setAllRestaurants = function (restaurants) {
        self.allRestaurants.removeAll();
        restaurants.forEach(function (item) {
            self.allRestaurants.push(new Restaurant(item));
        });
    };

    this.setAllRestaurantsDefaultIcon = function () {
        ko.utils.arrayForEach(this.restaurantList(), function(restaurant){
            restaurant.marker().setIcon(defaultIcon);});
    };

    this.hideAllMarkers = function () {
        ko.utils.arrayForEach(this.restaurantList(), function(restaurant){
            restaurant.marker().setVisible(false);});
    };

    this.closeAllInfoWindow = function () {
        ko.utils.arrayForEach(this.allRestaurants(), function(restaurant){
            restaurant.infoWindow().close();
        });
    };

    this.getPlacesDetailsFromName = function (name) {

        ko.utils.arrayForEach(this.allRestaurants(), function(restaurant){
            if(restaurant.name() + ' ' + restaurant.address() == name)
            {
                getPlacesDetails(restaurant.marker(), restaurant.name(),restaurant.address(), restaurant.url() , restaurant.infoWindow());
                return;
            }
        });
    };

    this.setRestaurantList = function () {

        var filterRestaurant = inputViewModel.filterRestaurant().toLowerCase();
        self.restaurantList.removeAll();
        if(filterRestaurant.trim() == "")
        {
            //display all restaurant
            ko.utils.arrayForEach(this.allRestaurants(), function(restaurant){

                self.restaurantList.push(restaurant);
                restaurant.marker().setVisible(true);
            });
        }
        else
        {
            //only display restaurants that contains the filter text
            ko.utils.arrayForEach(this.allRestaurants(), function(restaurant){

                if(restaurant.name().toLowerCase().indexOf(filterRestaurant) >= 0)
                {
                    self.restaurantList.push(restaurant);
                    restaurant.marker().setVisible(true);
                }
                else
                {
                    restaurant.marker().setVisible(false);
                }

            });
        }
        this.closeAllInfoWindow();
        this.setAllRestaurantsDefaultIcon();
    }
};

var RestaurantInfo = function (data) {
  this.restaurantName = ko.observable(data.restaurantName);
  this.restaurantAddess = ko.observable(data.restaurantAddess);
  this.restaurantUrl = ko.observable(data.restaurantUrl);
};

var RestaurantInfoViewModel = function () {
  var self = this;
  this.restaurantInfo = ko.observable();
  this.setRestaurantInfo = function (info) {
      self.restaurantInfo(new RestaurantInfo(info));
  }
};