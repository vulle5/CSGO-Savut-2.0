//Go back to previous page
function goBack() {
    window.history.back();
}

//Create panel
var panel = '<div data-role="panel" id="mypanel" data-position="left" data-display="push"><h1>Panel</h1><p>stuff</p></div>';

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
