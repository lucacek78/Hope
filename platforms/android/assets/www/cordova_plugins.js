cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "id": "com.phonegap.plugins.nativesettingsopener.Settings",
        "file": "plugins/com.phonegap.plugins.nativesettingsopener/www/settings.js",
        "pluginId": "com.phonegap.plugins.nativesettingsopener",
        "clobbers": [
            "cordova.plugins.settings"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-bluetooth-serial": "0.4.6",
    "cordova-plugin-whitelist": "1.3.1",
    "cordova-plugin-console": "1.0.5",
    "com.phonegap.plugins.nativesettingsopener": "1.2"
};
// BOTTOM OF METADATA
});