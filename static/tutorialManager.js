function disableScroll() {
    document.body.classList.add("stop-scrolling");
}
  
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

function tutorialComplete(){
    document.getElementById("operationArea").hidden = false
    document.getElementById("scrollTo").scrollIntoView()

}
function gotoScreenshots(){
    
}