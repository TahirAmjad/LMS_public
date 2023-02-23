$(function(e) {
	//   $('#example').DataTable().destroy();
	$("#example").DataTable({
		dom:
			"<'row'<'col-sm-3'i><'col-sm-2'l><'col-sm-3'f><'col-sm-4'p>>" +
			"<'row'<'col-sm-12'tr>>",
		columnDefs: [
			{
				targets: "no-sort",
				orderable: false
			}
		]
	});

	$("#example1").DataTable({
		columnDefs: [
			{
				targets: "no-sort",
				orderable: false
			}
		]
	});
	var table = $("#exampleCust").DataTable({
		columnDefs: [
			{
				targets: "no-sort",
				orderable: false
			}
		]
	});
	$("#exampleCust tfoot th").each(function() {
		var title = $(this).text();
		console.log(this);
		if (title) {
			$(this).html('<input type="text" placeholder="Search ' + title + '" />');
		}
	});

	// Apply the search
	table.columns().every(function() {
		var that = this;

		$("input", this.footer()).on("keyup change", function() {
			if (that.search() !== this.value) {
				that.search(this.value).draw();
			}
		});
	});
});
