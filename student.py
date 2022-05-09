import json
import time
class FileManager:
	def __init__(self,fileName):
		self.fileObj = open(fileName,"w+")
	def writeTestObject(self,test):
		object = {"testName":test.name,"testTotalPoints":test.ptsTotal,"testTotalQuestions":test.questionsTotal,"testQuestionPoints":test.questionsPoints,"questions":[],"testStartTime":test.testStartTime,"testEndTime":test.testFinishTime}
		for x in range(len(test.questions)):
			object['questions'].append([test.questions[x]['question'],test._studentAnswers[x],test._correctAnswers[x]])
		jsonObject = json.dumps(object)
		self.fileObj.write(jsonObject)
		self.fileObj.close()


class Test:
	def __init__(self,name):
		self.name = name
		self.ptsTotal = 0
		self.questionsTotal = 0
		self.questionsPoints = []
		self.questions = []
		self._correctAnswers = []
		self._studentAnswers = []

	def addQuestion(self,question:str,pointCount:int,answer:str):			
		self.questions.append({"question":question,"ptCt":pointCount,"answer":answer,"questionNumber":self.questionsTotal+1})
		self.questionsPoints.append(pointCount)
		self.questionsTotal+=1
		self.ptsTotal+=pointCount
		self._correctAnswers.append(answer)
	def runTest(self):
		fileMgr = FileManager(self.name+'._test')
		self.testStartTime = time.time()
		for question in self.questions:
			studentAnswer = input(str(question["questionNumber"])+":"+" "+question['question'])
			self._studentAnswers.append(studentAnswer)
		self.testFinishTime = time.time()
		fileMgr.writeTestObject(self)
		

