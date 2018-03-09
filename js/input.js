var InputModelView = function () {
    var self = this;
    this.city = ko.observable();
    this.showFilterTextBox = ko.observable(false);

    this.population = ko.observable();

    this.searchButtonCick = function (clickedObject) {
        var cityStr = self.city();
        var validateResult = validateInputCity(cityStr);
        if(!validateResult.isValid)
        {
            self.city("");
            return;
        }

        var formattedCityState = validateResult.city + ', ' + validateResult.state;

        loadAllRestaurantsFromFoursquare(formattedCityState);

        self.showFilterTextBox(true);
    };

    this.filterRestaurant = ko.observable("");
    this.filterRestaurant.subscribe(function(newValue) {
        restaurantViewModel.closeAllInfoWindow();
        restaurantViewModel.setRestaurantList();
    });


    this.city.subscribe(function(newValue) {
        restaurantViewModel.hideAllMarkers();
        restaurantViewModel.restaurantList.removeAll();
        self.showFilterTextBox(false);
        self.filterRestaurant("");

    });

};
function validateInputCity(cityStr) {
    var result = {'isValid': false};
    if (cityStr == null || cityStr == '') {
        alert(cityStr + ' is not valid city, state. An example of valid input: Austin, Texas.');

        return result;
    }

    //check if input is valid
    var cityState = cityStr.split(',');
    if (cityState.length != 2 || cityState[0].trim() == '' || cityState[1].trim() == '') {
        alert(cityStr + ' is not valid city, state. An example of valid input: Austin, Texas.');

        return result;
    }
    var statesAbb = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
    var states = ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District Of Columbia", "Federated States Of Micronesia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Marshall Islands", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Palau", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

    var state = cityState[1].trim().toUpperCase();

    var foundInStates = false;
    var indexInStates = -1;
    for(var i =0; i < states.length; i++)
    {
        if(states[i].toUpperCase() == state)
        {
            foundInStates = true;
            indexInStates = i;
            break;
        }
    }


    if (!foundInStates && !statesAbb.includes(state)) {
        alert(cityState[1] + ' is not valid state. An example of valid input: Austin, Texas.');
        return result;
    }

    if(!foundInStates)
    {
        var indexInStatesAbb = statesAbb.indexOf(state);
        result['state'] = states[indexInStatesAbb];
    }
    else
    {
        result['state'] = states[indexInStates];
    }
    result['city'] = cityState[0].trim().toLowerCase();
    result['isValid'] = true;
    return result ;
}



