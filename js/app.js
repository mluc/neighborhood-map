/*
 * Open the drawer when the menu icon is clicked.
 */
var menu = document.querySelector('#menu');
var main = document.querySelector('main');
var drawer = document.querySelector('#drawer');

//click the hambuger to open menu
menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
});

//click main section area to close menu
main.addEventListener('click', function() {
    drawer.classList.remove('open');
});

var restaurantViewModel;
var inputViewModel;
var restaurantInfoViewModel;
var infoWindowView;
function initMap() {

    try
    {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 1,
            minZoom: 1,
            center: {lat: 0, lng: 0}
        });
    }
    catch (e)
    {
        alert(e.message);
    }


    restaurantViewModel = new RestaurantViewModel();
    ko.applyBindings(restaurantViewModel,  document.getElementById('restaurant-section'));
    inputViewModel = new InputModelView();
    ko.applyBindings(inputViewModel, document.getElementById('input-section'));

    infoWindowView = document.getElementById('infowindow-text');
    restaurantInfoViewModel = new RestaurantInfoViewModel();
    ko.applyBindings(restaurantInfoViewModel, infoWindowView);

    //set dedault city so markers can be displayed on page load
    var cityState = "Austin, Texas";
    inputViewModel.city(cityState);
    loadAllRestaurantsFromFoursquare(cityState);
    inputViewModel.showFilterTextBox(true);

}

function mapError() {
    alert("Cannot load google map.");
}




