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

@app.route("/registerTest")
def testRegister():
	name = request.args['name']
	id = str(random.randint(111111,999999))
	quizRegistry[id] = {"name":name,'questions':[],'questionPoints':[],'totalPoints':0,'answers':[],"id":id}
	return str(id)

@app.route("/submitQuestion")
def questionSubmit():

	question =  request.args['question']
	pointCount = request.args['pc']
	answer = request.args['answer']
	qid = request.args['id']
	quizRegistry[qid]['questions'].append(question)
	quizRegistry[qid]['questionPoints'].append(pointCount)
	quizRegistry[qid]['answers'].append(answer)
	quizRegistry[qid]['link'] = 'localhost/test/{id}'.format(id=qid)
	return str(quizRegistry[qid])


@app.route('/test/<id>')
def runTest(id):
	print(quizRegistry.keys())
	if id in quizRegistry.keys():
		test = quizRegistry[id]
		return flask.render_template("test.html",questions=test['questions'],len=len(test['questions']),testname=test['name'])
	return "This test is not registered."

@app.route('/submitInstance')
def submitInstance():
	return str(request.args)

@app.route("/getQuestions/<testID>")
def getQuestions(testID):
	if testID in quizRegistry.keys():
		return json.dumps(quizRegistry[testID]['questions'])
	else:
		return "This test is not registered."
app.run(host="0.0.0.0",port=80)