$(function(e) {
    $('#searchButton').click( function() {
         
        var searchKey= $('#searchUser').val();
        alert(searchKey);
        $.ajax({
            
            url: "http://localhost/marketing_crm/searchEbayMemebers",
            dataType: 'json',
            type: 'post',
            data : {'searchKey':searchKey},
            success: function(response){
            alert(response);
          }});
        $('#searchResult').removeClass('hide');
        return false;
    });
    
} );
