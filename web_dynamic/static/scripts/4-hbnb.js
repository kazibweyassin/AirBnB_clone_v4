$(document).ready(function () {
    const amenitiesId = {};

    // Update amenities list when checkboxes are clicked
    $('input[type="checkbox"]').click(function () {
        if ($(this).prop('checked')) {
            amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenitiesId[$(this).attr('data-id')];
        }
        $('.amenities h4').text(Object.values(amenitiesId).join(', '));
    });

    // Function to check API status and update UI
    function checkAPI() {
        $.ajax({
            type: 'GET',
            url: 'http://0.0.0.0:5001/api/v1/status/',
            timeout: 5000,
            success: function (data) {
                if (data.status === 'OK') {
                    $('#api_status').addClass('available');
                } else {
                    $('#api_status').removeClass('available');
                }
            },
            error: function () {
                $('#api_status').removeClass('available');
            }
        });
    }

    // Function to fetch and display places
    function loadPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                updatePlaces(data);
            },
            error: function (error) {
                console.log('Error loading places:', error);
            }
        });
    }

    // Function to filter and display places based on selected amenities
    function filterPlacesByAmenities() {
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            data: JSON.stringify({ amenities: Object.keys(amenitiesId) }),
            success: function (data) {
                updatePlaces(data);
            },
            error: function (error) {
                console.log('Error filtering places:', error);
            }
        });
    }

    // Function to update places in the UI
    function updatePlaces(places) {
        $('.places').empty();
        places.forEach(function (place) {
            $('.places').append('<article>' +
                '<div class="title_box">' +
                '<h2>' + place.name + '</h2>' +
                '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                '</div>' +
                '<div class="information">' +
                '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + '</div>' +
                '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                '</div>' +
                '<div class="description">' + place.description + '</div>' +
                '</article>');
        });
    }

    // Event listeners
    $('button').click(filterPlacesByAmenities);

    // Initial API check and places load
    checkAPI();
    setInterval(checkAPI, 15000);
    loadPlaces();
});
