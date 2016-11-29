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
   user_id = this.value; // omit "var" to make it global
   //$("#dom_element").text(user_id);
    console.log(user_id);
});

$("button").click(function() {
    url = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=18C381D0049CCF7EFF870B99AA8B8C17&steamid=" + user_id;
    console.log(url);
    
   // var $csgoStats = $('#csgoStats');
    
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        success: function(data) {
            console.log('success', data);
            console.log(data.playerstats.steamID);
        }   
    });
});