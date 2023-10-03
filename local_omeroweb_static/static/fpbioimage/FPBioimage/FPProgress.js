function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module)
    return;
  var style = UnityLoader.Progress.Styles[gameInstance.Module.splashScreenStyle];
  var progressLogoUrl = gameInstance.Module.progressLogoUrl ? gameInstance.Module.resolveBuildUrl(gameInstance.Module.progressLogoUrl) : style.progressLogoUrl;
  var progressEmptyUrl = gameInstance.Module.progressEmptyUrl ? gameInstance.Module.resolveBuildUrl(gameInstance.Module.progressEmptyUrl) : style.progressEmptyUrl;
  var progressFullUrl = gameInstance.Module.progressFullUrl ? gameInstance.Module.resolveBuildUrl(gameInstance.Module.progressFullUrl) : style.progressFullUrl;
  var commonStyle = "position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);";
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    gameInstance.logo.style.cssText = commonStyle + "background: url('" + progressLogoUrl + "') no-repeat center / contain; width: 200px; height: 200px;";
    gameInstance.container.appendChild(gameInstance.logo);
  }
  if (!gameInstance.progress) {
    gameInstance.progress = document.createElement("div");
    gameInstance.progress.style.cssText = commonStyle + " height: 18px; width: 200px; ";
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.style.cssText = "background: url('" + progressEmptyUrl + "') no-repeat right / cover; float: right; width: 100%; height: 100%; display: inline-block; margin-top:120px";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.style.cssText = "background: url('" + progressFullUrl + "') no-repeat left / cover; float: left; width: 0%; height: 100%; display: inline-block; margin-top:-18px; ";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }
  if (progress == "complete"){
    gameInstance.progress.empty.style.width = 100 + "%";
    gameInstance.logo.style.display = "none";
    gameInstance.progress.style.display = "none";
    return;
  }
  gameInstance.progress.full.style.width = (98 * progress) + "%";
}

if (fpb.pathToFPBioimage == undefined){
  fpb.pathToFPBioimage = "https://fpb.ceb.cam.ac.uk/4";
}

if (document.getElementById("jsHolder") == null){
  jsHolder = document.createElement("div");
  jsHolder.id = "jsHolder";
  document.body.appendChild(jsHolder);
}

var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = fpb.pathToFPBioimage + "/UnityLoader.js";
    s2.innerHTML = null;
    document.getElementById("jsHolder").appendChild(s2);

var s3 = document.createElement("script");
    s3.type = "text/javascript";
    s3.src = fpb.pathToFPBioimage + "/download.js";
    s3.innerHTML = null;
    document.getElementById("jsHolder").appendChild(s3);
