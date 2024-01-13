$(document).ready(function () {
	$('input[type=checkbox]').on('click', function () {
		let amenlist = [];
		$('input"checked').each(function () {
			amenlist.push($(this).attr('data-name'));
		});
		$('.amenities h4').text(amenlist.join(','));
		if (amenlist.length == 0) {
			$('amenities h4').html('&nbsp;');
		}
	});
});
