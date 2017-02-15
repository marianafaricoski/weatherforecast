var city;
$(document).ready(function(){

    $(".previsao").hide();
    $(".tempo-atual").hide();

    $("#atual_modal").click(function(){
        city = $("#barra").val();
        manager.Ajax("weather");

    })
    $("#prox_modal").click(function(){
        city = $("#barra").val();
        manager.Ajax("forecast");
    });
});
var manager = {
    Ajax: function(tipo){
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/" + tipo, 
            data: { 
                q: city,
                lang: "pt",
                units: "metric",
                APPID: "cfcbc954e0e664e68d48d253e9eab322",
            },
            dataType: "json",
            success: function(response) {
                console.log(response);
                if (tipo == "forecast"){
                    $("#meumodal").modal("hide");
                    $(".previsao").show();
                    $(".tempo-atual").hide();
                    builder.getPrevisao(response);
                    
                }else{
                    $("#meumodal").modal("hide");
                    $(".previsao").hide();
                    $(".tempo-atual").show();
                    builder.getAtual(response);
                    
                }
            },
            failure: function(response) {
                console.error(response);
            }
        });
    }
}

var builder = {
    getAtual: function(response){
        var temp_atual = response.main.temp;
        var max = response.main.temp_max
        var min = response.main.temp_min;
        var icone = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var city = response.name + "<img src='" + icone + "'/>";
        var umidade = response.main.humidity;
        var descricao = response.weather[0].description.toLowerCase();
        $(".tempo-atual").html(
            '<div class="cabeca">\
                </div>\
                <div>\
                    <h3 id="city">' + city  + temp_atual+ '°</h3>\
                    <h6 id="condicao"> Descrição: ' + descricao + '</h6>\
                    <h6 id ="min">Mínima: ' + min + 'º</h6>\
                    <h6 id ="max">Máxima: ' + max + 'º</h6>\
                    <h6 id ="umidade">Umidade: ' + umidade + '%</h6>\
                </div>\
            </div>');
    },

    getPrevisao: function(response){
        var i = 0;
        var date2 = 0;
        var i2 = -1;
        var j;
    
	$("#forecast-container").html("");
        for(j of response.list){
            var date = j.dt_txt.slice(8,10) + "/" + j.dt_txt.slice(5,7);
            var temp = j.main.temp;
            var min = j.main.temp_min;
            var max = j.main.temp_max;
            var icone = "http://openweathermap.org/img/w/" + j.weather[0].icon + ".png";
            var city = response.city.name + "<img src='" + icone + "'/>";
            var descricao = j.weather[0].description.toLowerCase();
            var umidade = j.main.humidity;
            
	
            if (date != date2){
                date2 = date;
                ++i;
                ++i2;
		
		
		$("#forecast-container").append("<h3>" + city + "</h3>");	
		$("#forecast-container").append("<h6> Descrição: " + descricao + "</h6>");
		$("#forecast-container").append("<h6> Temperatura mínima: " + min + "º</h6>");
		$("#forecast-container").append("<h6> Temperatura máxima: " + max + "º</h6>");
		$("#forecast-container").append("<h6> Umidade do ar: " + umidade + "%</h6>");
		$("#forecast-container").append("<hr>");
           }
        }
        
    }
}
