$.getScript("https://www.google.com/recaptcha/api.js?onload=onloadreCaptchaCallback&render=" + getreCaptchaSiteKeyV3());

let canLogin = false;
let recaptcha = null;

function onloadreCaptchaCallback() {
    
    recaptcha = grecaptcha.render("captcha", {
        "sitekey": getreCaptchaSiteKeyCheckbox(),
        "callback": async (token) => {
            
            let data = await ajax("php/recaptchaapi.php", {
                
                mode: "v2checkbox",
                token: token
                
            }, "POST", "json");
            
            if (data.success) {
                
                canLogin = true;
                
            } else {
                
                canLogin = false;
                
            }
            
        },
        "expired-callback": () => {
            
            canLogin = false;
            
        }
    });
    
}

$(window).on("load", async function() {
    
    $(".form").show();
    
    $(".loading").hide();
    
    
    $("#cUser").on("click", async function() {
        
        if (canLogin) {
            
            $(".loading").show();
            $(".form").hide();
            
            let usernameE = $("#usernameE");
            let passwordE = $("#passwordE");
            
            let user = {
                
                username: usernameE.val(),
                password_hash: sha256(passwordE.val())
                
            };
            
            if (user.username == "") {
                
                $(".loading").hide();
                $(".form").show();
                canLogin = false;
                grecaptcha.reset(recaptcha);
                return;
                
            }
            if (passwordE.val() == "") {
                
                $(".loading").hide();
                $(".form").show();
                canLogin = false;
                grecaptcha.reset(recaptcha);
                return;
                
            }
            
            let userFromDB = await ajax("php/getuserbyusername.php", {
                
                username: user.username
                
            }, "POST", "json");
            
            if (userFromDB.length <= 0) {
                
                $(".loading").hide();
                $(".form").show();
                canLogin = false;
                grecaptcha.reset(recaptcha);
                return;
                
            }
            
            if (userFromDB[0].password_hash != user.password_hash) {
                
                $(".loading").hide();
                $(".form").show();
                canLogin = false;
                grecaptcha.reset(recaptcha);
                return;
                
            }
            
            let isNowLogedIn = await ajax("php/loginaction.php", {
                
                username: user.username
                
            }, "POST", "json");
            
            
            if (isNowLogedIn == true) {
                
                grecaptcha.ready(() => {
                    grecaptcha.execute(getreCaptchaSiteKeyV3(), {
                        action: "Login"
                    }).then(async (token) => {
                        
                        let data = await ajax("php/recaptchaapi.php", {
                        
                            mode: "v3",
                            token: token

                        }, "POST", "json");

                        if (data.score >= 0.5) {

                            location.href = "../dash.php";

                        } else {

                            $(".loading").hide();
                            $(".form").show();
                            canLogin = false;
                            grecaptcha.reset(recaptcha);

                        }
                
                    })
                })

            }

        } else {

            alert("You have to verify you are a human")

        }
        

    })
    
})