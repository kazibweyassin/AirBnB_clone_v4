$(document).ready(function () {
    $('input[type=checkbox]').on('click', function () {
        let amenList = [];
        $('input:checked').each(function () {
            amenList.push($(this).attr('data-name'));
        });
        $('.amenities h4').text(amenList.join(', '));
        if (amenList.length === 0) {
            $('.amenities h4').html(' ');
        }
    });

    function checkAPI() {
        $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        }).fail(function () {
            $('#api_status').removeClass('available');
        });
    }

    function loadPlaces() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function (data) {
                $('.places').empty();
                data.forEach(function (place) {
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
            },
            error: function (error) {
                console.log('Error loading places:', error);
            }
        });
    }

    checkAPI();
    setInterval(checkAPI, 15000);
    loadPlaces();
});
