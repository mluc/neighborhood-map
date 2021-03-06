# Neighborhood map
It is a single-page web application using Knockout framework to display a Google Map of an area and various points of interest. Included landmarks can be searched and additional information about the landmarks is queried from FourSquare and Wikipedia APIs.

===============================

### How to Run:
1. Click *index.html* to start the web page
2. By default, city name is "Austin, Texas". It can be changed by entering a different city, state to the text box. An example of valid input: Austin, Texas.
2. Select *Search* button:
- FourSqure api is used to load 10 Asian restaurants in the city:
	- Name, address, url, longitude, and latitude of the restaurants are saved to the restaurant objects.
	- If there is something wrong with the four square request, window alert will display.
- A list of restaurants in the area will show:
  	- Restaurant names will be displayed on the list view
  	- Markers of restaurants will be displayed on the map
3. Enter restaurant name on the filter text box will filter the restaurant list:
- Restaurant list on the list view will be filtered according to the input
- Markers on the map will be filtered according to the input
4. Click on a restaurant name on the list view:
- The corresponding Infowindow will show up on the map with the restaurant information.
- Selected restaurant marker will have different color
5. Click on a marker on the map:
- The corresponding Infowindow will show up on the map with the restaurant information.
- Selected restaurant marker will have different color