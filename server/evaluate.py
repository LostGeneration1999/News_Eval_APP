import oseti

class Eval():

    def __init__(self):

        self.analyzer = oseti.Analyzer()
        self.evaluate = []
        self.sum_posi = 0.0
        self.sum_nega = 0.0

    def evaluateComment(self, commentsList, positiveList, negativeList):
        for comment in commentsList:
            comment = comment.replace('\t', '')
            result = self.analyzer.analyze(comment)
            print(comment)
            print(result)
            self.evaluate.append(sum(result))
        for i in range(len(commentsList)):
            self.sum_posi += self.evaluate[i]*int(positiveList[i])
            self.sum_posi += self.evaluate[i]*int(negativeList[i])
        return {'positive': self.sum_posi, 'negative': self.sum_nega}