$(window).on("load", async function() {

    if ($("#canStay").text() != "1") {

        location.href = "login.html";

    }

    $("#goBack").on("click", function() {

        location.href = "index.php";

    })

    let docData = await ajax("../../php/loaddocdatabyid.php", {

        docUUID: $("#docID").text()

    }, "POST", "json");

    if (docData.length <= 0) {

        location.href = "index.php";

    }

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: $("#userName").text()

    }, "POST", "json");

    if (userData.length <= 0) {

        location.href = "../signup.html";

    }

    if (docData[0].user_id != userData[0].id) {

        location.href = "index.php";

    }


    $(".textedit").html(atob(docData[0].data))

    $("#titleI").val(docData[0].title);
    
    $("#colorE").attr("value", "#000000");
    
    $("#isSaved").text("Saved...");


    $("#bE").on("click", function() {

        document.execCommand("bold");

    })

    $("#iE").on("click", function () {
        
        document.execCommand("italic");

    })

    $("#uE").on("click", function () {

        document.execCommand("underline");

    })


    $("#colorE").on("change", function () {

        document.execCommand("foreColor", false, $("#colorE").val());

    })

    $("#changeSize").on("click", function () {
        
        document.execCommand("fontSize", false, $("#sizeE").val());

    })



    $("#saveBtn").on("click", async function() {

        let editE = $(".textedit");

        let data = editE.html();

        let res = await ajax("../../php/savedocbyid.php", {

            docUUID: docData[0].uuid,
            docData: data,
            docTitle: $("#titleI").val()

        }, "POST", "json");

        if (res[0]) {

            $("#isSaved").text("Saved...");

        } else {

            $("#isSaved").text("Not Saved...");

        }

    })


    $(".textedit").on("DOMSubtreeModified", function () {
        
        $("#isSaved").text("Not Saved...");

    })

    $("#titleI").on("DOMSubtreeModified", function () {

        $("#isSaved").text("Not Saved...");

    })

})