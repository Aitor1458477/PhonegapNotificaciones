/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
        Automatico();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "696304011252"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
        	alert(data.registrationId);
            console.log('registration event: ' + data.registrationId);

           var id = localStorage.getItem('Id');
           var xmlhttp=new XMLHttpRequest();
           var oldRegId= localStorage.getItem('registrationId');

           if (oldRegId != data.registrationId && id!=null ) {
               // Save new registration ID
               alert("hola");
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
               var urlToken="https://siesoluciones.com/tickets2/movil/ajaxGuardarToken.php?idUsu="+id+"&token="+data.registrationId;
               xmlhttp.open("GET",urlToken,true);
			   xmlhttp.send();
			   }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
              // window.open("https://siesoluciones.com/tickets2/movil/notificaciones.php", "_blank", "location=no");
            );
       });
    }
};

function loadXMLDoc(){
	//2 - Recepción de la llamada
	var xmlhttp=new XMLHttpRequest();
	//var sharedPreferences = nuevo.plugins.SharedPreferences.getInstance("Login");
	var successCallback = function() {
    	console.log('OK');
	}
	var errorCallback = function(err) {
    	console.error(err);
	}	

	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4 && xmlhttp.status==200){
			//Trabajar respuesta
			if (xmlhttp.responseText == 0){
			document.getElementById("dAjax").innerHTML=xmlhttp.responseText;
			alert("usuario y/o contraseña incorrectos");
			
			document.getElementById("User").value="";
			document.getElementById("Pass").value="";
			}
			else{
			document.getElementById("dAjax").innerHTML=xmlhttp.responseText;
			//sharedPreferences.put('Usuario', user, successCallback, errorCallback);
			//sharedPreferences.put('Contrasena', pass, successCallback, errorCallback);
			//sharedPreferences.put('Id', xmlhttp.responseText, succesCallback, errorCallback);
			localStorage.setItem("Usuario", user);
			localStorage.setItem("Clave", pass);
			localStorage.setItem("Id", xmlhttp.responseText)
			window.open("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass, "_blank", "location=no");

		    var oldRegId = localStorage.getItem('registrationId');
            var id = localStorage.getItem('Id');
            var urlToken="https://siesoluciones.com/tickets2/movil/ajaxGuardarToken.php?idUsu="+id+"&token="+oldRegId;

            if ( id!=null ) {
            	alert("hola");
               // Save new registration ID
               localStorage.setItem('registrationId', data.registrationId);
               // Post registrationId to your app server as the value has changed
               xmlhttp.open("GET",urlToken,true);
			   xmlhttp.send();

            }

			}
		}
	}


	//1 - Envio de la llamada
	var user = document.getElementById("User").value;
	var pass = document.getElementById("Pass").value;
	var url = "http://siesoluciones.com/funcionesPHP/funcionesAndroid.php?login=1&usuario=" + user + "&clave=" + pass;	
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
};

function Automatico(){
	var user = localStorage.getItem("Usuario");
	var pass = localStorage.getItem("Clave");
	if(user!=null || pass!=null){

		window.open("https://siesoluciones.com/tickets2/movil/index2.php?usuario="+user+"&clave="+pass, "_blank", "location=no");
	}
	 
};


