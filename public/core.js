(function(){
    var data = [];
    $.ajax('/api/getData').then(function(response){
        data = response.data;
        console.log(response);
    }, function(error){
        console.log('Error: ' + error);
    });
}());