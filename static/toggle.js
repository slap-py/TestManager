
function oppositeBool(bool){
    if (bool == true){
        return false
    }else{
        return true
    }
}


const toggle = function(id1,id2){
    document.getElementById(id1).addEventListener("click",function(){
        document.getElementById(id1).disabled = oppositeBool(document.getElementById(id1).disabled)
        document.getElementById(id2).disabled = false
    })
    document.getElementById(id2).addEventListener("click",function(){
        document.getElementById(id2).disabled = oppositeBool(document.getElementById(id2).disabled)
        document.getElementById(id1).disabled = false
    })
}


const toggle4 = function(id1,id2,id3,id4){
    document.getElementById(id1).addEventListener("click",function(){
        document.getElementById(id1).disabled = oppositeBool(document.getElementById(id1).disabled)
        document.getElementById(id2).disabled = false
        document.getElementById(id3).disabled = false
        document.getElementById(id4).disabled = false
    })
    document.getElementById(id2).addEventListener("click",function(){
        document.getElementById(id2).disabled = oppositeBool(document.getElementById(id2).disabled)
        document.getElementById(id1).disabled = false
        document.getElementById(id3).disabled = false
        document.getElementById(id4).disabled = false
    })
    document.getElementById(id3).addEventListener("click",function(){
        document.getElementById(id3).disabled = oppositeBool(document.getElementById(id1).disabled)
        document.getElementById(id2).disabled = false
        document.getElementById(id4).disabled = false
    })
    document.getElementById(id4).addEventListener("click",function(){
        document.getElementById(id4).disabled = oppositeBool(document.getElementById(id2).disabled)
        document.getElementById(id1).disabled = false
        document.getElementById(id2).disabled = false
        document.getElementById(id3).disabled = false
    })
}


