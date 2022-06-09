import json
import flask
import random
import string
from flask import request
app = flask.Flask("Test Handler")

quizRegistry = {}
@app.route('/')
def mainPage():
	return flask.render_template("index.html")

def strsum(lst):
	total = 0
	for iter in lst:
		total+=int(iter)
	return total
@app.route("/registerTest")
def testRegister():
	name = request.args['name']
	id = str(random.randint(111111,999999))
	quizRegistry[id] = {"name":name,'questions':[],'questionPoints':[],'totalPoints':0,'answers':[],"id":id,"correctAnswers":[],'studentAnswers':[]}
	return str(id)

@app.route("/submitQuestion")
def questionSubmit():

	question =  request.args['question']
	pointCount = request.args['pc']
	a = request.args['a']
	b = request.args['b']
	c = request.args['c']
	d = request.args['d']
	correct = request.args['correct']
	if correct in ['a','b','c','d']:
		quizRegistry[request.args['id']]['correctAnswers'].append(correct)
	qid = request.args['id']
	quizRegistry[qid]['questions'].append(question)
	quizRegistry[qid]['questionPoints'].append(pointCount)
	quizRegistry[qid]['answers'].append({"a":a,"b":b,"c":c,"d":d})
	quizRegistry[qid]['link'] = 'localhost/test/{id}'.format(id=qid)
	return str(quizRegistry[qid])


@app.route('/test/<id>')
def runTest(id):
	print(quizRegistry.keys())
	if id in quizRegistry.keys():
		test = quizRegistry[id]
		aReg = []
		bReg = []
		cReg = []
		dReg = []
		for answer in quizRegistry[id]['answers']:
			aReg.append(answer["a"])
			bReg.append(answer["b"])
			cReg.append(answer["c"])
			dReg.append(answer["d"])
		
		return flask.render_template("test.html",questions=test['questions'],len=len(test['questions']),testname=test['name'],a=aReg,b=bReg,c=cReg,d=dReg)
	return "This test is not registered."

@app.route('/submitInstance')
def submitInstance():
	print("IN  REQUEST FUNCTION")
	pointCount = 0
	print("PC VAR ASSIGNED")
	print(request.args['answers'].split(','))
	print(quizRegistry[request.args['testID']]['studentAnswers'])
	try:
		quizRegistry[request.args['testID']]['studentAnswers'] = request.args['answers'].split(",")
		print("AFTER IN TRY")
		print(quizRegistry[request.args['testID']])
	except Exception as e:
		print("EXCEPTION:",e)
	print("RET")
	num = 0
	for question in quizRegistry[request.args['testID']]['studentAnswers']:
		idx = num
		correctAnswer = quizRegistry[request.args['testID']]['correctAnswers'][idx]
		if question == correctAnswer:
			pointCount+=int(quizRegistry[request.args['testID']]['questionPoints'][idx])
		num+=1
	print(pointCount)
	totalPoints = strsum(quizRegistry[request.args['testID']]['questionPoints'])
	t = "Points: "+str(pointCount)+"/"+str(totalPoints)
	return str(t)

@app.route("/getQuestions/<testID>")
def getQuestions(testID):
	if testID in quizRegistry.keys():
		print(quizRegistry[testID])
		return json.dumps(quizRegistry[testID]['questions'])
	else:
		return "This test is not registered."

@app.route('/grade/<id>')
def grade(id):
	if id in quizRegistry.keys():
		if "studentAnswers" in quizRegistry[id].keys():
			#STUDENT HAS ALREADY ATTEMPTED TEST
			print(len(quizRegistry[id]['studentAnswers']),quizRegistry[id]['studentAnswers'])
			return flask.render_template("grade.html",len=len(quizRegistry[id]['studentAnswers']),studentAnswers = quizRegistry[id]['studentAnswers'],questions=quizRegistry[id]['questions'])

@app.route('/questionCount/<id>')
def getQuestionCount(id):
	if id in quizRegistry.keys():
		return str(len(quizRegistry[id]['questions']))
	else:
		return "False"

@app.route('/progression')
def progression():
	return flask.render_template('progression.html')
app.run(host="0.0.0.0",port=80)

