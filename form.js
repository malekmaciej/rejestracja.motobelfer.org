function submitToAPI(e) {
    e.preventDefault();
    var URL = "https://mvbiuixes7.execute-api.eu-central-1.amazonaws.com/01";

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
             alert ("Please enter valid email address");
             return;
         }

    var name = $("#name-input").val();
    var email = $("#email-input").val();
    var data = {
       name : name,
       email : email,
     };

    $.ajax({
      type: "POST",
      url : "https://mvbiuixes7.execute-api.eu-central-1.amazonaws.com/01",
      dataType: "json",
      crossDomain: "true",
      useDefaultXhrHeader: false,
      contentType: "application/json; charset=utf-8",
      async: false,
      data: JSON.stringify(data),
      statusCode: {
            200: function() {
                alert("Wyslano zgloszenie, dziekuje!");
            },
            400: function() {
                alert("Wastapił bład przy wysyłaniu - proszę napisz do maciej.malek@motorolasolutions.com")
            }
      }});
  }