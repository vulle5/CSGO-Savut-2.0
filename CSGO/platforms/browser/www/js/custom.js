//Go back to previous page
function goBack() {
    window.history.back();
}

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

//AJAX call
$("button").click(function() {

if (user_id.length < 1){
        alert("User id is empty");
        return;
} else {
    url = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=18C381D0049CCF7EFF870B99AA8B8C17&steamid=" + user_id;
    console.log(url);
    
    var $csgoStats = $('#csgoStats');
    var jsonarray = [];
    
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(stats) {
            console.log('success', stats);
            for (i = 0; i < 10; i++){ 
            jsonarray.push(JSON.stringify(stats.playerstats.stats[i].value));    
            }
            console.log(jsonarray);
       /*  $.each(jsonarray, function(i, stat){
                $csgoStats.append('<li>name: ' + stat.name + ', value: ' + stat.value + '</li>');            
            console.log(stats.playerstats.stats[0].name);    
           });*/
           //console.log(data.playerstats.stats[i].value);
           // console.log(data.playerstats.stats[0].value);
        }   
    });
    //JSON.parse(jsonarray);
    //console.log(jsonarray);
    }
});
