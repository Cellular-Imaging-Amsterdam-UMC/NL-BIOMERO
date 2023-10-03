// COPY all of this file into the bottom of UnityLoader every re-compile

// Change pathToImages to an absolute path
var link = document.createElement("a");
link.href = fpb.pathToImages;
fpb.pathToImages = (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);

// Get paths in a consistent format: if last character in string is / then remove it!
if (fpb.pathToImages.slice(-1) === "/"){
  fpb.pathToImages = fpb.pathToImages.slice(0,-1);
}
if (fpb.pathToFPBioimage.slice(-1) === "/"){
  fpb.pathToFPBioimage = fpb.pathToFPBioimage.slice(0,-1);
}

// Calculate how much memory we need to request
var memorySize = 536870912;  // Half a gigabyte as the default size.

function nextPow2( aSize ){
  return Math.pow( 2, Math.ceil( Math.log( aSize ) / Math.log( 2 ) ) );
}

if (fpb.fileType != "obj"){
  firstImage = fpb.pathToImages + "/" + fpb.imagePrefix + fpb.numberingFormat + ".png";
} else {
  firstImage = fpb.pathToFPBioimage + "/logo.png";
}
function debounce(func, wait, immediate) {
  // Debounce function from https://john-dugan.com/javascript-debounce/
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if ( !immediate ) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if ( callNow ) {
            func.apply(context, args);
        }
    };
};

window.addEventListener('resize', debounce(function(){fpcanvas.SendMessage("Full Screen Quad", "updateQuality")}, 200));

var img = new Image();

img.onload = function(){

  var imHeight = img.height;
  var imWidth = img.width;

  // code here to use the dimensions
  var maxTexturesPerSlice = Math.ceil(fpb.numberOfImages/8.0);
  var atlasWidth = nextPow2(imWidth);
  var atlasHeight = nextPow2(imHeight * fpb.numberOfImages);

  if (fpb.atlasMode == undefined){fpb.atlasMode = 'false';}

  if (fpb.atlasMode == 'true'){
    atlasWidth = imWidth;
    atlasHeight = imHeight;
  } else {
    while ((atlasHeight > 2*atlasWidth) && (atlasHeight > imHeight)){
      atlasHeight /= 2;
      atlasWidth *= 2;
    }
  }

  // Now how much memory do we need?
  var numPixels = atlasHeight * atlasWidth * 8;
  var textureMemory = numPixels * 4;

  if (atlasWidth < 4096 || atlasHeight < 4096){
    memorySize = textureMemory + 134217728; // Add 128MB for other things
  } else if (atlasWidth < 8192 || atlasHeight < 8192){
    memorySize = 1073741824;
  } else {
    memorySize = 1761607680; // Large textures have disproportionaly large memory requirements
  }

  if (isNaN(memorySize)){
    memorySize = 268435456; // 256MB
  }

  console.log("Total memory requested from browser: " + memorySize + " bytes (" + (memorySize/Math.pow(2,30)).toPrecision(4) + " GiB)");

  fpcanvas = UnityLoader.instantiate("fpbDiv", fpb.pathToFPBioimage + "/FPBioimage.json", {onProgress: UnityProgress, Module: {TOTAL_MEMORY: memorySize,
      onRuntimeInitialized: function () {
      UnityProgress(fpcanvas, "complete");
      }
    }
  });

}

//Load in that image, which should start everything else!
var fpcanvas = null;
img.src = firstImage;
