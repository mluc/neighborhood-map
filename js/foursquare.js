function loadAllRestaurantsFromFoursquare(formattedCityState) {
    var foursquareUrl = 'https://api.foursquare.com/v2/venues/search?client_id=5JJKKC2KRAMGVWICPDZ4ZNRRJUZCWED0SRVHCAUBXHTXESC3&client_secret=XFLG0BWG1ARWMHQKT5RXUAU3RR3SUCJLWNWBUB43KDX3SXNQ&v=20161016&near=' + formattedCityState +'&limit=10&categoryId=4bf58dd8d48988d142941735';
    var places = [];
    $.getJSON(foursquareUrl, function (data) {

        var restaurants = data['response']['venues'];

        restaurants.forEach(function (restaurant) {
            var item = {'name': restaurant.name,
                'address': restaurant.location.formattedAddress,
                'lat': restaurant.location.lat,
                'lon': restaurant.location.lng,
                'url': restaurant.url};

            var lat = parseFloat(item.lat);
            var lon = parseFloat(item.lon);
            var loc = {lat: lat, lng: lon};
            item['location'] = loc;

            places.push(item);
        });
        restaurantViewModel.setAllRestaurants(places);

    }).fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        alert( "Request Failed: " + err );
    }).done(function () {

        displayMap(formattedCityState, places);
    });

};
//Asian Restaurant