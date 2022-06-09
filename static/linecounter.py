lineCount = 0
while True:
    main = input("put the code here: ")
    lineCount+=len(main.split("\n"))
    print("TOTAL:",lineCount)
    