(function() {
	"use strict";

	var slideMenu = $(".side-menu");

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		alert("here");
		$(".app").toggleClass("sidenav-toggled");
	});

	if ($(window).width() > 739) {
		$(".app-sidebar").hover(function(event) {
			event.preventDefault();
			$(".app").removeClass("sidenav-toggled");
		});
	}
})();
