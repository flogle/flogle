$(window).on("load", async function () {
    
    if ($("#canStay").text() != "1") {

        location.href = "../../login.html";

    }

    let username = $("#userName").text();

    let userData = await ajax("../../php/getuserbyusername.php", {

        username: username

    }, "POST", "json");

    if (userData.length <= 0) {

        location.href = "../../login.html";

    }

    
    let messageData = await ajax("../../php/getmessagebymessageid.php", {

        messagesID: $("#messageID").text()

    }, "POST", "json");


    if (messageData.length <= 0) {

        location.href = "index.php";

    }

    let chatData = await ajax("../../php/getchatdatabychatuuid.php", {

        chatUUID: messageData[0].chat_uuid

    }, "POST", "json");

    if (chatData.length <= 0) {

        location.href = "index.php";

    }

    let safeToDelete = (chatData[0].from_id == userData[0].id || chatData[0].to_id == userData[0].id);

    if (!safeToDelete) {

        location.href = "index.php";

    }

    $("#title").text("Delete");

    let message = $("<span></span>");

    message.text(`Are you sure you want to permanently delete the message "${atob(messageData[0].message)}" in the chat "${chatData[0].title}"?`);

    let yBtn = $("<button></button>");
    let nBtn = $("<button></button>");

    yBtn.addClass("btn btn-danger");
    yBtn.text("Yes");

    nBtn.addClass("btn btn-primary");
    nBtn.text("No");

    yBtn.on("click", async function () {
        
        let succed = await ajax("../../php/deletemessage.php", {

            messageID: messageData[0].id

        }, "POST", "json");

        if (succed[0]) {

            location.href = "chat.php?chatUUID=" + chatData[0].uuid;

        }

    })


    nBtn.on("click", function () {
        
        location.href = "chat.php?chatUUID=" + chatData[0].uuid;

    });


    $("body").append(message);
    $("body").append($("<br>"));
    $("body").append(yBtn);
    $("body").append(nBtn);



})