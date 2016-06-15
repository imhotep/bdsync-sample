/**
 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
 * type is very memory intensive, even with a low quality setting. Using it
 * can result in out of memory errors and application crashes. Use FILE_URI
 * or NATIVE_URI instead.
 */

var currentEm = null;

function toggleElement(id) {
  var element = document.getElementById(id);
  element.disabled = (element.disabled === true ? false : true);
}

function deviceDemo() {
  console.log("Device Demo");
  // Remove existing element
  if(currentEm !== null) {
    document.body.removeChild(currentEm);
  }
  
  function onSuccess(device) {
    var deviceEm = document.createElement("p");
    deviceEm.style.position = "absolute";
    deviceEm.style.top = "0px";
    deviceEm.style.left = "0px";
    deviceEm.innerText = "Cordova: " + device.cordova + '\n' +
                         "Model: " + device.model + '\n' +
                         "Platform: " + device.platform + '\n' +
                         "UUID: " + device.uuid + '\n' +
                         "Version: " + device.version + '\n' +
                         "Manufacturer: " + device.manufacturer + '\n' +
                         "Serial: " + device.serial + '\n';
    document.body.appendChild(deviceEm);
    currentEm = deviceEm;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }
  
  device.getInfo(onSuccess, onFail);
  
}

function cameraDemo() {
  console.log("Camera Demo");
  // Remove existing element
  if(currentEm !== null) {
    document.body.removeChild(currentEm);
  }
  
  function onSuccess(imageData) {
    var image = document.createElement("img");
    image.style.position = "absolute";
    image.style.top = "0px";
    image.style.left = "0px";
    image.style.width = "256px";
    image.src = "data:image/jpeg;base64," + imageData;
    document.body.appendChild(image);
    currentEm = image;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

  navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
                              destinationType: Camera.DestinationType.DATA_URL
  });
}

/*
 * cordova-plugin-device-motion
 */
var accelWatchID = null;
function accelerometerDemo() {
  console.log("Accelerometer Demo");
  
  var accelBtn = document.getElementById("accelerometer"),
      accelEm = document.getElementById("accel");
  
  if(accelWatchID !== null && accelEm !== null && accelBtn !== null) {
    console.log("clearing watch");
    navigator.accelerometer.clearWatch(accelWatchID);
    accelWatchID = null;
    accelBtn.innerText = "accelerometer.watchAcceleration"
    document.body.removeChild(accelEm);
    currentEm = null;
    toggleElement("compass");
    return;
  }
  
  // Remove existing element
  if(currentEm !== null) {
    document.body.removeChild(currentEm);
  }
  
  function onSuccess(acceleration) {
    if(accelEm === null) {
      accelEm = document.createElement("p");
      accelEm.id = "accel";
      accelEm.style.position = "absolute";
      accelEm.style.top = "0px";
      accelEm.style.left = "0px";
      document.body.appendChild(accelEm);
      currentEm = accelEm;
    }
    accelEm.innerText = 'Acceleration X: ' + acceleration.x + '\n' +
      'Acceleration Y: ' + acceleration.y + '\n' +
        'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n';
  }

  function onError() {
    alert('onError!');
  }

  var options = { frequency: 1000 };
  accelWatchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
  accelBtn.innerText = "accelerometer.clearWatch"
  toggleElement("compass");
}

/*
 * cordova-plugin-device-orientation
 */
var compassWatchID = null;
function compassDemo() {
  console.log("Compass Demo");

  var compassBtn = document.getElementById("compass"),
      compassEm = document.getElementById("heading");

  if(compassWatchID !== null && compassEm !== null && compassBtn !== null) {
    navigator.compass.clearWatch(compassWatchID);
    compassWatchID = null;
    compassBtn.innerText = "compass.watchHeading";
    document.body.removeChild(compassEm);
    currentEm = null;
    toggleElement("accelerometer");
    return;
  }
  
  // Remove existing element
  if(currentEm !== null) {
    document.body.removeChild(currentEm);
  }

  function onSuccess(heading) {
    if(compassEm === null) {
      compassEm = document.createElement("p");
      compassEm.id = "heading";
      compassEm.style.position = "absolute";
      compassEm.style.top = "0px";
      compassEm.style.left = "0px";
      document.body.appendChild(compassEm);
      currentEm = compassEm;
    }
    compassEm.innerText = 'Heading: ' + heading.magneticHeading;
  };

  function onError(error) {
    alert('CompassError: ' + error.code);
  };

//  navigator.compass.getCurrentHeading(onSuccess, onError);
  var options = { frequency: 1000 };
  compassWatchID = navigator.compass.watchHeading(onSuccess, onError, options);
  compassBtn.innerText = "compass.clearWatch";
  toggleElement("accelerometer");
}
/*
 *  cordova-plugin-network-information
 */

function connectionDemo() {
  console.log("Connection Demo");
  
  // Remove existing element
  if(currentEm !== null) {
    document.body.removeChild(currentEm);
  }

  function onSuccess(connection) {
    connectionEm = document.createElement("p");
    connectionEm.id = "connection";
    connectionEm.style.position = "absolute";
    connectionEm.style.top = "0px";
    connectionEm.style.left = "0px";
    document.body.appendChild(connectionEm);
    currentEm = connectionEm;
    connectionEm.innerText = 'Connection type: ' + connection.type;
  }

  function onError(e) {
    alert("Connection type Error");
  }

  navigator.connection.getInfo(onSuccess, onError);
}


/*
 * cordova-plugin-vibration
 */
function vibrationDemo() {
  navigator.vibrate(3000);
}

/*
 * cordova-plugin-file
 */

function fileDemo() {
  console.log("File Demo");

  function onErrorLoadFs(e) {
    console.log("error loading FS: "+e.message);
  }
  function onErrorCreateFile(e) {
    console.log("error creating file: "+e.message);
  }
  function onErrorReadFile(e) {
    console.log("error reading file: "+e.message);
  }

  function readFile(fileEntry) {

      fileEntry.file(function (file) {
          var reader = new FileReader();

          reader.onloadend = function() {
              console.log("Successful file read: " + this.result);
              //displayFileData(fileEntry.fullPath + ": " + this.result);
          };

          reader.readAsText(file);

      }, onErrorReadFile);
  }


  function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

      fileWriter.onwriteend = function() {
        console.log("Successful file read...");
        readFile(fileEntry);
      };

      fileWriter.onerror = function (e) {
        console.log("Failed file read: " + e.toString());
      };

      // If data object is not passed in,
      // create a new Blob instead.
      if (!dataObj) {
        dataObj = new Blob(['some file data'], { type: 'text/plain' });
      }

      fileWriter.write(dataObj);
    });
  }


  function createFile(dirEntry, fileName, isAppend) {
      // Creates a new file or returns the file if it already exists.
      dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fileEntry) {

          writeFile(fileEntry, null, isAppend);

      }, onErrorCreateFile);

  }

  window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

      console.log('file system open: ' + fs.name);
      createFile(fs.root, "newTempFile.txt", false);

  }, onErrorLoadFs);
}

document.addEventListener('deviceready', function(e) {
  document.getElementById("accelerometer").onclick = accelerometerDemo;
  document.getElementById("compass").onclick = compassDemo;
  document.getElementById("camera").onclick = cameraDemo
  document.getElementById("device").onclick = deviceDemo;
  document.getElementById("connection").onclick = connectionDemo;
});
