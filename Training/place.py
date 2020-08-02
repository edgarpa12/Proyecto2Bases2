class Place:
    def __init__(self, pName, pPlacePercentage, pCostPrice, pSeasonPercentages):
        self.name = pName
        self.placePercentage = pPlacePercentage
        self.costPrice = pCostPrice
        self.seasonPercentages = pSeasonPercentages

    def getPlacePercentage(self):
        return self.placePercentage

    def getSeasonPercentage(self):
        return self.seasonPercentages

    def getCostPrice(self):
        return self.costPrice

    def getName(self):
        return self.name
