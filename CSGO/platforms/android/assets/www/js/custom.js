//Create panel
var panel = '<div data-role="panel" id="mypanel" data-position="left" data-display="push"><h1>CSGO Smokes</h1><a href="#stats" data-transition="slide" class="ui-btn ui-corner-all">My Stats</a></div>';

$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend(panel);
    $("#mypanel").panel();
});

//Function to enable swipe right to open panel
$(document).on("pagecreate", function () {
    $(document).on("swiperight", function () {

        if ($.mobile.activePage.jqmData("panel") !== "open") {
            $("#mypanel").panel("open");
        }
    });
});

//Making url with steam userid
var user_id = "";
var url = "";
$("#url-1").on("keyup change", function() {
    user_id = this.value;
    console.log(user_id);
});
//Checking if form or list is empty
var $myStats = $('#myStats');

$("button").click(function() {

if ($('myStats').not(':empty')){
    $("#myStats").empty();
}
if (user_id.length < 1){
    alert("User id is empty");
    return;
} else {
    url = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=18C381D0049CCF7EFF870B99AA8B8C17&steamid=" + user_id;
    console.log(url);
    
    var $myStats = $('#myStats');
    var jsonarray = [];
    
    
//AJAX call
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        error: function (request) {
            alert("No id was found or profile is private");
            event.preventDefault();
        },
        success: function(stats) {
            console.log('success', stats);       
            for (i = 0; i < stats.playerstats.stats.length; i++){ 
                jsonarray.push(JSON.stringify(stats.playerstats.stats[i].name + ": " + stats.playerstats.stats[i].value));
            }
            //Convert seconds to hours in total time played
            var time = jsonarray[2];
            time = time.slice(20, 27);
            time = parseInt(time);
            hours = Math.round(time / 60 / 60);
            hours = hours.toString();
            hours = '"total_time_played: ' + hours + ' hours"';
            //Make li elements with unique id and add the to site;
            var str = '';
            for (i = 0; i < jsonarray.length; i++) {
               str += '<li id=\'li' + i + '\'>' + jsonarray[i] + '</li>';
            }
            $('#myStats').append(str);
            $( "#li2" ).replaceWith('<li id="li2">'+ hours +'</li>');   
        }
    });
    }
});