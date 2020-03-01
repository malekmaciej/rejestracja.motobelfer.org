function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://mvbiuixes7.execute-api.eu-central-1.amazonaws.com/01/rejestracja";


         var Namere = /[A-Za-z]{1}[A-Za-z]/;
         if (!Namere.test($("#name-input").val())) {
                      alert ("Imie i Nazwisko za krotkie.");
             return;
         }
         if ($("#email-input").val()=="") {
             alert ("Prosze podac adres email.");
             return;
         }

         var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
         if (!reeamil.test($("#email-input").val())) {
             alert ("Bledny adres email.");
             return;
         }

    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var passphrase = $("#passphrase-input").val();
    var accountdetails = document.getElementById("account-details");
    var data = {
       name : name,
       email : email,
       passphrase: passphrase
     };
    console.log(data)
    $.ajax({
      type: "POST",
      url : "https://mvbiuixes7.execute-api.eu-central-1.amazonaws.com/01/rejestracja",
      dataType: "json",
      crossDomain: "true",
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":"rejestracja.motobelfer.org"},
      useDefaultXhrHeader: false,
      contentType: "application/json; charset=utf-8",
      async: true,
      data: JSON.stringify(data),
      statusCode: {
            200: function(response) {
                console.log(response);
                var htmlString = "";
                htmlString += '<p>Dane do logowania się do AWS Management Console:</p><p><b>URL: </b><a href="https://521762730475.signin.aws.amazon.com/console" target=”_blank”>https://521762730475.signin.aws.amazon.com/console</a>';
                htmlString += "<p><b>IAM user name: </b><pre>" + response.email + "</pre></p>";
                htmlString += "<p><b>Password: </b><pre>" + response.password + "</pre></p>";
                htmlString += "</p>Przy pierwszym logowaniu system poprosi cię o natychmiastowa zmiane hasla.";
                htmlString += "<p></p>Wymagania odnosnie nowego haslo to:<br>";
                htmlString += "<ul><li>Minimum password length is 12 characters</li>";
                htmlString += "<li>Require at least one uppercase letter from Latin alphabet (A-Z)</li>";
                htmlString += "<li>Require at least one lowercase letter from Latin alphabet (a-Z)</li>";
                htmlString += "<li>Require at least one number</li>";
                htmlString += "</ul></p><p>Twój aktualny poziom dostępu to : <i>Read-Only</i></p>";
                htmlString += "<p>Pozdrawiam<br>Maciej Malek</p>";
                accountdetails.insertAdjacentHTML('beforeend', htmlString);
            },
            401: function(response) {
                var htmlString = "";
                htmlString += 'Wystapil blad przy zakladaniu konta.';
                htmlString += "<pre>" + "Bledne haslo !!" + "</pre>";
                htmlString += "Napisz prosze mail do maciej.malek@motorolasolutions.com"
                accountdetails.insertAdjacentHTML('beforeend', htmlString);
            },
            409: function(response) {
                var htmlString = "";
                htmlString += 'Wystapil blad przy zakladaniu konta.';
                htmlString += "<pre>" + "Taki uzytkownik juz istnieje !!" + "</pre>";
                accountdetails.insertAdjacentHTML('beforeend', htmlString);
            }
      }
    });
}

