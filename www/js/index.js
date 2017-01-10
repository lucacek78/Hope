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

var app={
    // Application Constructor
    initialize: function(){
      //document.addEventListener('deviceready',this.onDeviceReady.bind(this),false);
      document.addEventListener('deviceready',this.onDeviceReady.bind(this),false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function(){
      //Event...
      document.addEventListener('resume',this.onResume,false);
      //Controllo se il Bluetooth è attivo
      this.bluetoothStatus();
    },
    bluetoothStatus: function(){
      bluetoothSerial.isEnabled(
        function(){
          console.log("Bluetooth abilitato");
        },
        function(){
          console.log("Bluetooth non abilitato");
          $("#aalert").click();
        }
      );
      document.addEventListener('resume',this.onResume,false);
    },
    onResume: function(){
      //this.onDeviceReady();
    }
};

var ble={
    gradi: function(){
      var gradi=$("#points").val();
      console.log("Send to BLE: "+gradi);
    },
    setble: function(){
      if(typeof cordova.plugins.settings.openSetting!=undefined){
          cordova.plugins.settings.openSetting("bluetooth",function(){
            console.log("opened BLE settings")
          },
          function(){
            console.log("failed to open BLE settings")
          });
      }
    }
};

$(document).ready(function(){
    app.initialize();

    $("#points").change(function(){
      ble.gradi();
    });

    $("#setblue").on("tap",function(){
      console.log("BLE SETTINGS...");
      ble.setble();
    });

});
