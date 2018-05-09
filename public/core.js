(function(){
    var data;
    var chartData;
    var timeData;

    $.ajax('/api/chartingData').then(function(response){
        chartData = response;
    }, function (error){
        console.log('Error' + error);
    });

    $.ajax('/api/timeChartData').then(function(response){
        timeData = response;
    }, function (error){
        console.log('Error' + error);
    });
}());