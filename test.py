import student



test = student.Test("Ideal Gas Law Test")

test.addQuestion("""A sample of H2 (g) is contained in a cylinder with a moveable piston at an initial pressure of P1. The volume of the sample is increased from 3.0L to 6.0L while the temperature is held constant. What is the final pressure in the cylinder? """,1,"P1/2")

fileMgr = student.FileManager("Ideal Gas Laws._test")
test.runTest()
fileMgr.writeTestObject(test)