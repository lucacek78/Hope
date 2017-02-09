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
      var myList=document.getElementById("listble");
      var pairDevices=[];
      bluetoothSerial.list(
        function(devices){
          //SUCCESS
          myList.innerHTML="Search Bluetooth Device...";
          devices.forEach(function(device){
            if(device.hasOwnProperty("uuid")){
              console.log("uuid: "+device.uuid);
            }else if(device.hasOwnProperty("address")){
              console.log("address: "+device.address);
              pairDevices.push(device.address);
            }else{
              console.log("ERROR");
            }
          });
          if(devices.length==0){
            //NO PAIR DEVICE
            myList.innerHTML="NO BLUETOOTH DEVICE FOUND";
          }else{
            //myList.innerHTML="FOUND "+devices.length+" DEVICES";
            //myList.innerHTML=pairDevices;
            myList.innerHTML="";
            myList.innerHTML="<h2>FOUND: "+devices.length+"</h2><ul data-role=\"listview\"><li data-icon=\"plus\"><a href=\"#\">"+pairDevices[0]+"</a></li><li data-icon=\"plus\"><a href=\"#\">"+pairDevices[1]+"</a></li></ul>";
          }
        },
        function(){
          //FAILURE
          myList.innerHTML="NO BLUETOOTH DEVICES FOUND";
        }
      );
    });

});
