$(window).on("load", function() {

    $("#logoutBtn").on("click", function() {

        location.href = "logout.php";

    })

    $("#map").on("click", function() {

        location.href = "../maps/index.html";

    })

    $("#docs").on("click", function() {

        location.href = "../docs/index.php";

    })

    if ($("#canStay").text() != "1") {

        location.href = "login.html";

    }

})