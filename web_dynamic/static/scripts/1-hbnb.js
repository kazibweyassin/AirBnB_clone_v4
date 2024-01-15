$(document).ready(function () {
    $('input[type=checkbox]').on('click', function () {
        let amenlist = [];
        $('input:checked').each(function () {  // Fix selector for checked checkboxes
            amenlist.push($(this).attr('data-name'));
        });
        $('.amenities h4').text(amenlist.join(','));  // Fix typo in the class selector
        if (amenlist.length == 0) {
            $('.amenities h4').html('&nbsp;');  // Fix typo in the class selector
        }
    });
});
