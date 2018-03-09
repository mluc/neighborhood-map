var map;
var defaultIcon ;
var highlightedIcon;
function displayMap(cityStr, places) {

    createAllRestaurants(places);
    restaurantViewModel.setRestaurantList();
}

function createAllRestaurants(places) {

    try
    {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            zoom: 8
        });

        defaultIcon = makeMarkerIcon('ff0000');
        highlightedIcon = makeMarkerIcon('00ff87');

        var bounds = new google.maps.LatLngBounds();
        var items = [];
        for (var i = 0; i < places.length; i++) {

            var place = places[i];
            var item = {'name': place.name,
                'address': place.address,
                'lat': place.lat,
                'lon': place.lon,
                'url': place.url};

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: defaultIcon,
                animation: google.maps.Animation.DROP,
                title: place.name + ' ' + place.address,
                position: place.location
            });

            item['marker'] = marker;
            // Create a single infowindow to be used with the place details information
            // so that only one is open at once.
            var placeInfoWindow = new google.maps.InfoWindow();
            // If a marker is clicked, do a place details search on it in the next function.
            marker.addListener('click', function() {
                restaurantViewModel.getPlacesDetailsFromName(this.title);
            });
            item['infoWindow'] = placeInfoWindow;

            bounds.extend(place.location);

            items.push(item);
        }
        map.fitBounds(bounds);
        restaurantViewModel.setAllRestaurants(items);

        function makeMarkerIcon(markerColor) {
            var markerImage = new google.maps.MarkerImage(
                'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
                '|40|_|R',
                new google.maps.Size(21, 34),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34),
                new google.maps.Size(21,34));
            return markerImage;
        }
    }
    catch (e)
    {
        alert(e.message);
    }
}

function getPlacesDetails(marker, name, address, url, infowindow) {
    restaurantViewModel.closeAllInfoWindow();
    //set all restaurant default color
    restaurantViewModel.setAllRestaurantsDefaultIcon();
    //set current marker different color
    marker.setIcon(highlightedIcon);

    infowindow.marker = marker;

    var info = {};
    info['restaurantName'] = name;
    info['restaurantAddess'] = address;
    info['restaurantUrl'] = url;

    restaurantInfoViewModel.setRestaurantInfo(info);

    infowindow.setContent(infoWindowView.cloneNode(true));
    restaurantInfoViewModel.setRestaurantInfo({});
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
    });
}

