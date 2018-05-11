(function(){
    var data;
    var chartData;
    var timeData;
    console.log('done')
    $.ajax('/api/chartingData').then(function(response){
        window.chartData = response;
      
    }, function (error){
        console.log('Error' + error);
    });

    $.ajax('/api/timeChartData').then(function(response){
        timeData = response;
    }, function (error){
        console.log('Error' + error);
    });
}());