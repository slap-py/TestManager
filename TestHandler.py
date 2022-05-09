import json
import flask

app = flask.Flask("Test Handler")


@app.route('/<testID>')
def mainPage(testID):
	f = open(testID+"._test",'r')
	h = f.read()
	f.close()
	h = json.loads(h)
	questions = h["questions"]
	theQs = []
	questionCorrectAnswers = []
	questionStudentAnswers = []
	for q in questions:
		
	return flask.render_template("index.html",questions=questions,len=len(questions))


app.run(host="0.0.0.0",port=80)