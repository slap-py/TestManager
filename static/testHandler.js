function h(id){
	console.log()
	content = document.getElementById(`thing-${id}`).value
	if (content != ""){
		console.log("valid")
	}
}
function onlyNumbers(str) {
	return /^[0-9.,]+$/.test(str);
  }

function get(theUrl,headers) {
	if (headers == undefined){
		headers = {}
	}
	let xmlHttpReq = new XMLHttpRequest();
	
	
	
	for(i=0;i<Object.keys(headers);i++) {
		key = Object.keys(headers)[i]
		value = headers[key]
		xmlHttpReq.setRequestHeader(parseString(key),parseString(value))
	}
	xmlHttpReq.open("GET", theUrl, false); 
	xmlHttpReq.send(null);
	return xmlHttpReq.responseText;
  }
  

num=1
function getTotalPoints(){
	totalPoints = 0
	rows = document.getElementById("testTable").rows
	for(var i=1;i<rows.length+1;i++){
		pointCount = parseFloat(document.getElementById("point-"+i).value)
		totalPoints+=pointCount
	}
	return totalPoints
}
function submit(){
	pointCount = getTotalPoints()
	testName = document.getElementById("test-name").value
	id = get(`/registerTest?name=${testName}&pc=${pointCount}`)
	document.getElementById("testlink").innerHTML = `<a target = "_blank" href=http://localhost/test/${id}>Click to go to test</a>`
	rows = document.getElementById("testTable").rows
	for(var i=1;i<rows.length+1;i++){
		console.log("in for")
		row = rows[i-1]
		question = document.getElementById("question-"+i).value
		pointCount = document.getElementById("point-"+i).value
		answer = document.getElementById("canswer-"+i).value
		if(onlyNumbers(pointCount) == false){
			alert("The point count must contain only numbers.")
		}
		get(`/submitQuestion?question=${question}&pc=${pointCount}&answer=${answer}&id=${id}`)
	}
	
}
function test(){
	table = document.getElementById("testTable")
	row = table.insertRow()
	cell1 = row.insertCell()
    qid1 = "question-"+num
    qid2 = "point-"+num
    qid3 = "canswer-"+num
	cell1.innerHTML = `<div class="input-group">
		<textarea class="form-control" aria-label="With textarea" id=${qid1} placeholder="Question"></textarea>
	</div>`
	cell2 = row.insertCell()
	cell2.innerHTML = `<div class="input-group">
		<textarea class="form-control" aria-label="With textarea" id=${qid2} placeholder="Point Count"></textarea>
	</div>`

    cell3 = row.insertCell()
        cell3.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid3} placeholder="Correct Answer"></textarea>
        </div>`
    num++
	}
    
function submittest(){
	answers = []
	questions = get(`/getQuestions/${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
	for(i=0;i<=num;i++){
		answer = document.getElementById(`thing-${i}`)
		answers.push(JSON.parse(questions)[i])
	}
	document.getElementById("submit").disabled = true
	get(`/submitInstance?testID=${window.location.href.split('/')[window.location.href.split('/').length-1]}&answers=${answers}`)
}