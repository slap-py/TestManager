//Set the number of questions in the test to zero.
num=0

// Using REGEX, check if a string only contains numbers, if yes, return true, if not, return false.
function onlyNumbers(str) {
	return /^[0-9.,]+$/.test(str);
  }

// A function to send a web request to the specific URL
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
	//Open the request and send it.
	xmlHttpReq.open("GET", theUrl, false); 
	xmlHttpReq.send(null);
	//Return the data that the website provided.
	return xmlHttpReq.responseText;
  }
  

//Get the total amount of points out of all of the rows (questions).
function getTotalPoints(){
	totalPoints = 0
	rows = document.getElementById("testTable").rows
	for(var i=1;i<rows.length+1;i++){
		pointCount = parseFloat(document.getElementById("point-"+i).value)
		totalPoints+=pointCount
	}
	return totalPoints
}
//Submit the latest iteration of test to receive a URL for students to take the test.
function submit(){
	//Get the basic data of the test.
	pointCount = getTotalPoints()
	testName = document.getElementById("test-name").value
	//Register the test to the Server to receive an ID / Link.
	id = get(`/registerTest?name=${testName}&pc=${pointCount}`)
	//Generate the link based on the server's identifier of the test.
	document.getElementById("testlink").innerHTML = `<a target = "_blank" href=http://localhost/test/${id}>Click to go to test</a>`
	rows = document.getElementById("testTable").rows
	//For every question that has been made.
	for(var i=1;i<rows.length+1;i++){
		row = rows[i-1]
		//Get the question of the row we are on.
		question = document.getElementById("question-"+i).value
		//Get the point count and answers of the row.
		pointCount = document.getElementById("point-"+i).value
		a = document.getElementById("a-"+i).value
		b = document.getElementById("b-"+i).value
		c = document.getElementById("c-"+i).value
		d = document.getElementById("d-"+i).value
		//Get the correct answer (must be in [a,b,c,d])
		correct = document.getElementById("correct-"+i).value.toLowerCase()
		//Make sure the point count includes only numbers using the onlyNumbers function above.
		if(onlyNumbers(pointCount) == false){
			alert("The point count must contain only numbers.")
		}
		get(`/submitQuestion?question=${question}&pc=${pointCount}&a=${a}&b=${b}&c=${c}&d=${d}&id=${id}&correct=${correct}`)
	}
	
}
//Function to make a new question on the teacher view.
function newquestion(){
	num++
	table = document.getElementById("testTable")
	row = table.insertRow()
	cell1 = row.insertCell()
	//Create each Element ID to differentiate between each input or button.
    qid1 = "question-"+num
    qid2 = "point-"+num
    qid3 = "a-"+num
	qid4 = "b-"+num
	qid5 = "c-"+num
	qid6 = "d-"+num
	qid7 = "correct-"+num
	//Set the content of each of these element with the ID of the above listed.
	cell1.innerHTML = `<div class="input-group">
		<textarea class="form-control" aria-label="With textarea" id=${qid1} placeholder="Question"></textarea>
	</div>`
	cell2 = row.insertCell()
	cell2.innerHTML = `<div class="input-group">
		<textarea class="form-control" aria-label="With textarea" id=${qid2} placeholder="Point Count"></textarea>
	</div>`

    cell3 = row.insertCell()
        cell3.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid3} placeholder="Answer A"></textarea>
        </div>`
	cell4 = row.insertCell()
        cell4.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid4} placeholder="Answer B"></textarea>
        </div>`
	cell5 = row.insertCell()
        cell5.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid5} placeholder="Answer C"></textarea>
        </div>`
	cell6 = row.insertCell()
        cell6.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid6} placeholder="Answer D"></textarea>
        </div>`
	cell7 = row.insertCell()
        cell7.innerHTML = `<div class="input-group">
            <textarea class="form-control" aria-label="With textarea" id=${qid7} placeholder="Correct Answer (a-d)"></textarea>
        </div>`
    
	}
//Function to submit the test on the student view when the student has completed the test.
function submittest(){
	//Get the number of questions from the server.
	questionCount = get(`/questionCount/${window.location.href.split('/')[window.location.href.split('/').length-1]}`)
	//Make a blank list in which to store each of the student's answers.
	answers = []
	//For every question in the test.
	for(i=0;i<parseInt(questionCount);i++){
		//Get the status of each button (clicked/not clicked)
		aButton = document.getElementById("a-"+i)
		bButton = document.getElementById("b-"+i)
		cButton = document.getElementById("c-"+i)
		dButton = document.getElementById("d-"+i)
		//Blank variable to store the answer of this question
		thisAnswer = ""
		//If the A button is clicked.
		if(aButton.disabled == true){
			//The answer is displayed as A.
			answers.push("a")
			thisAnswer = "a"
		}
		//If the B button is clicked.
		if(bButton.disabled == true){
			//The answer is displayed as B.
			answers.push("b")
			thisAnswer = "b"
		}
		//If the C button is clicked.
		if(cButton.disabled == true){
			//The answer is displayed as C.
			answers.push("c")
			thisAnswer = "c"
		}
		//If the D button is clicked.
		if(dButton.disabled == true){
			//The answer is displayed as D.
			answers.push("d")
			thisAnswer = "d"
		}
		if (thisAnswer == ""){
		alert("You must answer every question.")
		break
	}
	}
	//If the question is not answered.
	if (thisAnswer == ""){

	}else{
		//Disable the submit button as the test has been submitted.
		document.getElementById("submit").disabled = true
	//Submit the test to the server.
	points = get(`/submitInstance?testID=${window.location.href.split('/')[window.location.href.split('/').length-1]}&answers=${answers}`)
	document.getElementById("pointAmount").innerText=points
	document.getElementById("pointAmount").hidden = false
	}
}
	
