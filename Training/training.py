import random
import math
from sklearn import linear_model
from sklearn.model_selection import train_test_split

from place import *
from formula import *


# CAPACIDAD 100
def profitPerTotal(pPriceCost, pPrice):
    return round(((pPrice - pPriceCost) / pPriceCost) * 100, 2)


def training(
    pPriceCost, pProfitPercentage, pPlacePercentage, pSeasonPercentage, pPurchase, pDate
):
    percentage = 1
    price = pPriceCost * (1 + pProfitPercentage)
    # print("Cant de Compras: " + str(pPurchase) + " Dias Faltantes: " + str(pDate))
    price = math.ceil(price * ((1 + pSeasonPercentage) * (1 + pPlacePercentage)))
    # print("Precio sin tiempo y ventas $" + str(price))
    if 20 > pDate >= 40 and pPurchase >= 75:
        percentage = 1.45
    elif 10 < pDate <= 20 and pPurchase >= 75:
        percentage = 1.35
    elif pDate <= 10 and pPurchase >= 75:
        percentage = 0.82

    elif 20 > pDate >= 40 and 25 <= pPurchase < 75:
        percentage = 1.38
    elif 10 < pDate <= 20 and 25 <= pPurchase < 75:
        percentage = 1.28
    elif pDate <= 10 and 25 <= pPurchase < 75:
        percentage = 0.78

    elif 20 > pDate >= 40 and pPurchase <= 25:
        percentage = 0.98
    elif 10 < pDate <= 20 and pPurchase <= 25:
        percentage = 0.91
    elif pDate <= 10 and pPurchase <= 25:
        percentage = 0.55

    price = math.ceil(price * percentage)
    # print("Precio: $" + str(price) + " " + str(percentage) + "%")
    # print("Ganancia:" + str(profitPerTotal(pPriceCost, price)) + "%")
    # print("____________________________________________________")
    return price


seasonTamarindo = [
    0.1193,
    0.1153,
    0.1283,
    0.0928,
    0.0623,
    0.0614,
    0.1914,
    0.038,
    0.0319,
    0.0328,
    0.0325,
    0.0938,
]
seasonLiberia = [
    0.12,
    0.1147,
    0.1284,
    0.0932,
    0.0623,
    0.0607,
    0.1919,
    0.0377,
    0.0322,
    0.033,
    0.0326,
    0.0933,
]
seasonSanJose = [
    0.1195,
    0.115,
    0.1278,
    0.0932,
    0.0626,
    0.0610,
    0.1918,
    0.0385,
    0.032,
    0.0327,
    0.0321,
    0.0937,
]
seasonMonteverde = [
    0.1198,
    0.1147,
    0.1281,
    0.0924,
    0.0623,
    0.0617,
    0.1911,
    0.0378,
    0.0325,
    0.0323,
    0.0322,
    0.0949,
]
seasonFortuna = [
    0.1207,
    0.1155,
    0.1272,
    0.0928,
    0.0625,
    0.0617,
    0.1915,
    0.0380,
    0.0321,
    0.0327,
    0.0316,
    0.0938,
]
places = []
places.append(Place("SanJose-Tamarindo", 0.2856, 5500, seasonTamarindo))
# places.append(Place('SanJose-Liberia', 0.1431, 3500, seasonLiberia))
# places.append(Place('Tamarindo-San Jose', 0.2856, 4750, seasonSanJose))
# places.append(Place('SanJose-Monteverde', 0.1429, 4500, seasonMonteverde))
# places.append(Place('SanJose-Fortuna', 0.1429, 6000, seasonFortuna))


def sacarRegresionLineal():
    global places
    x_multiple = []
    y_multiple = []
    listaFormulas = []

    for place in places:
        # print("- - - - - - - -")
        #  print(place.getName())
        # print("Lugar: " + str(place.getPlacePercentage()) + "%")
        for season in place.getSeasonPercentage():
            for i in range(0, 15):
                # print("Temporada: " + str(season) + "%")
                purchase = random.randint(1, 100)
                date = random.randint(1, 35)
                price = training(
                    place.getCostPrice(),
                    0.9,
                    place.getPlacePercentage(),
                    season,
                    purchase,
                    date,
                )
                # x_multiple.append([purchase, date, place.getPlacePercentage(), season])
                x_multiple.append([purchase, date, season])
                y_multiple.append(price)

        X_train, X_test, y_train, y_test = train_test_split(
            x_multiple, y_multiple, test_size=0.2
        )
        # Algoritmo a Utilizar
        lr_multiple = linear_model.LinearRegression()
        # Entreno el modelo
        lr_multiple.fit(X_train, y_train)
        # Realizo una prediccion
        y_pred_multiple = lr_multiple.predict(X_test)
        # print(X_train, X_test, y_train, y_test)
        # print(X_test)
        # print(y_train)
        # print(y_test)
        # print(y_pred_multiple)

        # print("Datos del modelo de Regresion Lineal Multiple")
        # print('Valor de las pendientes o coeficientes "a":')
        # print(lr_multiple.coef_)
        coeficientesA = []
        for coeficienteA in lr_multiple.coef_:
            coeficientesA.append(float(coeficienteA))
        # print(coeficientesA)

        # print('Valord de la interseccion o coeficiente b:')
        coeficienteB = lr_multiple.intercept_
        # print(lr_multiple.intercept_)
        # print("Precision del Modelo:")
        # print(lr_multiple.score(X_train, y_train))
        # print("Precios:")

        formula = Formula(place.name, coeficientesA, coeficienteB)
        listaFormulas.append(formula)

        x_multiple = []
        y_multiple = []

    return listaFormulas


def calcularPrecio(asientos, dias, temporada, ruta):
    listaFormulas = sacarRegresionLineal()

    for formula in listaFormulas:
        if formula.ruta == ruta:
            return math.ceil(
                asientos * formula.coeficientesA[0]
                + dias * formula.coeficientesA[1]
                + temporada * formula.coeficientesA[2]
                + formula.coeficienteB
            )
        else:
            return "No existe esa ruta"


print("Precio en Julio")
print(calcularPrecio(80, 30, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(80, 15, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(80, 7, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))

print(calcularPrecio(50, 30, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(50, 15, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(50, 7, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))

print(calcularPrecio(10, 30, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(10, 15, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))
print(calcularPrecio(10, 7, places[0].getSeasonPercentage()[6], "SanJose-Tamarindo"))

print("____________________________________________________")
print("Precio en Noviembre")

print(calcularPrecio(80, 30, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(80, 15, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(80, 7, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))

print(calcularPrecio(50, 30, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(50, 15, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(50, 7, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))

print(calcularPrecio(10, 30, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(10, 15, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
print(calcularPrecio(10, 7, places[0].getSeasonPercentage()[10], "SanJose-Tamarindo"))
