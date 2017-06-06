//$("body").append("<div class=\"row-centered streams\"><div class = ' col-centered col-xs-8 '><h3 class =' text-center'>" + data.display_name + "</h3><img class = ' img-circle logo'  src=\"" + data.logo + "\"><p class='situacao'>" + isOn(temp) + isOn(temp) + "</p></div></div>");

var clientID = "?client_id=7j0f9z02spskl0q7l9ka98p4xda3foq&callback=?",
streamers = ["leocardoso94","brtt", "ESL_SC2", "OgamingSC2", "hastad", "freecodecamp", "brunofin", "sonecarox", "Akrinuss"],
logo = [],
url = [];

function buscarStreamers() {
  function montarUrl(tipo, streamer) {
   return 'https://api.twitch.tv/kraken/'+ tipo  + '/' + streamer + clientID;
 };
 streamers.forEach(function(name) {
  $.getJSON(montarUrl("streams" , name), function(data) {
    
    var jogo,
    status;
    if (data.stream === null) {
      jogo = "offline";
      status = "offline";
    } else if (data.stream === undefined) {
      jogo = "Account Closed";
      status = "offline";
    } else {
      jogo = data.stream.game;
      status = "online";
    };
    
    $.getJSON(montarUrl("channels" , name), function(data) {
      var logo = ( jogo === "Account Closed") ? "http://www.telikin.com/blog/components/com_joomblog/images/user.png":data.logo;
      var url = data.url;
      var text = (status === "online") ? data.status: "";
      
      conteudo = "<div class='row "+status+"'> <div class=\"col-xs-2\"> <img class='logo' src ='"+logo+"' > </div>"+
      "<div class=\"col-xs-3\"><h3 class=''> <a target='_blank' href = '"+url+"'>"+name+"</a></h3> </div>"+
      "<div class=\"col-xs-7\"> <p>"+jogo+" - "+text+"</p> </div>"+
      "</div>";
      if(status === "online"){
        $(".main").prepend(conteudo)
      }else{
        $(".main").append(conteudo);
      };
    });
    
  });
  
});
 
};

$(document).ready(function() {
  
  buscarStreamers();
  
});