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
      document.addEventListener('deviceready',this.onDeviceReady.bind(this),false);
      //document.addEventListener('deviceready',this.onDeviceReady,false);
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
          $("#palert").click();
        }
      );
      document.addEventListener('resume',this.onResume,false);
    },
    onResume: function(){
      //Resume function
    },
    connect: function(){
      //Attached pair BLE device
      alert("ATTACHED...");
    }
};

var ble={
    gradi: function(){
      var gradi=$("#points").val();
      console.log("Send to BLE: "+gradi);
    },
    setble: function(){
      /*if(typeof cordova.plugins.settings.openSetting!=undefined){
          cordova.plugins.settings.openSetting("bluetooth",function(){
            console.log("opened BLE settings")
          },
          function(){
            console.log("failed to open BLE settings")
          });
        }*/
        bluetoothSerial.showBluetoothSettings(
          function(){
              //SUCCESS
              cosole.log("BLUETOOTH SETTINGS ON DEVICE");
          },
          function(){
              //FAILURE
              console.log("NO BLUETOOTH SETTINGS ON DEVICE");
          });
    }
};

$(document).ready(function(){
    app.initialize();

    $("#listble").bind("touchstart click",function(e){
      alert(e.target.getAttribute('deviceId'));
    });

    $("#points").change(function(){
      ble.gradi();
    });

    $("#setblue").on("tap",function(){
      //Load Bluetooth preferencies
      console.log("BLE SETTINGS...");
      ble.setble();
    });

    $("#device").on("tap",function(){
      //Visualizzo la lista dei dispositivi associati
      console.log("BLE PAIR DEVICE...");
      var pairDevices=[];
      bluetoothSerial.list(
        function(devices){
          //SUCCESS
          $("#listble").html("Search Bluetooth Device");
          devices.forEach(function(device){
            if(device.hasOwnProperty("uuid")){
              console.log("uuid: "+device.uuid);
            }else if(device.hasOwnProperty("address")){
              console.log("address: "+device.address);
              pairDevices.push(device.address);
            }else{
              console.log("ERROR");
            }
            console.log("Name: "+device.name);
          });
          if(devices.length==0){
            //NO PAIR DEVICE
            $("#listble").html("NO BLUETOOTH DEVICE FOUND");
          }else{

            var output="<h2>FOUND: "+devices.length+"</h2><ul data-role=\"listview\">";
            for(i=0;i<=(devices.length-1);i++){
              output=output+"<li data-icon=\"plus\"><a href=\"#\" deviceId=\""+pairDevices[i]+"\">"+pairDevices[i]+"</a></li>";
            }
            output=output+"</ul>";
            $("#listble").html(output).trigger("create");
            $('.newlistview').listview("refresh");
          }
        },
        function(){
          //FAILURE
          $("#listble").html("NO BLUETOOTH DEVICE FOUND");
        }
      );
    });

});
