import json
import sys
import time
#define grading scale
def gradingScale(percentage):
	if percentage < 60:
		return "F"
	elif percentage > 59 and percentage < 67:
		return "D"
	elif percentage > 66 and percentage <70:
		return "D+"
	elif percentage > 69 and percentage < 73:
		return "C-"
	elif percentage > 72 and percentage < 77:
		return "C"
	elif percentage > 76 and percentage < 80:
		return "C+"
	elif percentage > 79 and percentage < 83 :
		return "B-"
	elif percentage > 82 and percentage < 87 :
		return "B"
	elif percentage >86 and percentage < 90 :
		return "B+"
	elif percentage > 89 and percentage < 93 :
		return "A-"
	elif percentage >90 and percentage <100 :
		return "A"
	elif percentage == 100:
		return "A"
	else:
		return None

#begin grading
testName = input("What is the name of the test you are grading? ")
testName+="._test"
try:
	f = open(testName,"r")
	data = json.loads(f.read())
	f.close()
except:
	print("====== TEST \"{}\" DOES NOT EXIST ======".format(testName.split(".")[0]))
	sys.exit()


print("====== \"{}\" TEST GRADING IN PROCESS ======".format(testName.split(".")[0]))
print("Test started at {}, and finished at {}".format(time.ctime(data['testStartTime']),time.ctime(data['testEndTime'])))
data['testQuestionPointsGiven'] = 0
data['pointsSoFar'] = 0
for question in data['questions']:
	q = question[0]
	studentAnswer = question[1]
	correctAnswer = question[2]
	while True:
		isCorrect = input("Question: {}\nStudent Answer: {}\nCorrect Answer: {}\nIs the student correct? (y/n) ".format(q,studentAnswer,correctAnswer))
		if isCorrect.lower() in ["y","n"]:
			break
	idx = data['questions'].index(question)
	#Condition if question is right
	if isCorrect == "y":
		data['testQuestionPointsGiven']+=data['testQuestionPoints'][idx]
		data['pointsSoFar']+=data['testQuestionPoints'][idx]
		print("The student is correct, {} points added. Updated test grade {}/{} ({}%)".format(data["testQuestionPoints"][idx],data['testQuestionPointsGiven'],data["testTotalPoints"],data['testQuestionPointsGiven']/data['pointsSoFar']*100))
	else:
		data['pointsSoFar']+=data['testQuestionPoints'][idx]
		print("The student is not correct, No points added. Updated test grade {}/{} ({}%)".format(data['testQuestionPointsGiven'],data["testTotalPoints"],data['testQuestionPointsGiven']/data['pointsSoFar']*100))

#Summarize Grading
print("====== GRADING COMPLETE ======")
data['gradingComplete'] = True
data['gradingCompleteTime'] = time.time()
data['score'] = data['testQuestionPointsGiven']/data['pointsSoFar']*100
print("TOTAL SCORE: {}/{} ({}%, {})".format(data['testQuestionPointsGiven'],data['testTotalPoints'],data['testQuestionPointsGiven']/data['pointsSoFar']*100,gradingScale(data['testQuestionPointsGiven']/data['pointsSoFar']*100)))
