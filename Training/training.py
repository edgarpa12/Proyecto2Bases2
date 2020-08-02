import random
import math
from sklearn import linear_model
from sklearn.model_selection import train_test_split

from place import *
from formula import *


# Datos del porcentaje que afecta las temporadas
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

# Se crean los lugares con su ruta, porcentaje de popularidad, precioCosto y
# la lista del porcentaje de la temporada
places = []
places.append(Place("SanJose-Tamarindo", 0.2856, 5500, seasonTamarindo))
places.append(Place('SanJose-Liberia', 0.1431, 3500, seasonLiberia))
places.append(Place('Tamarindo-San Jose', 0.2856, 4750, seasonSanJose))
places.append(Place('SanJose-Monteverde', 0.1429, 4500, seasonMonteverde))
places.append(Place('SanJose-Fortuna', 0.1429, 6000, seasonFortuna))

# Saca el porcentaje de ganancia que hubo en cada calculo
def profitPerTotal(pPriceCost, pPrice):
    return round(((pPrice - pPriceCost) / pPriceCost) * 100, 2)

# Aplica los porcentajes debidos dependiendo del porcentajeGanancia,
# porcentajePopularidad, porcentajeTemporada, cantidadCompras y diasRestantes
# para sacar el precio que se daria en esas condiciones
def training(
    pPriceCost, pProfitPercentage, pPlacePercentage, pSeasonPercentage, pPurchase, pDate
):
    percentage = 1
    # Se le aplica el porcentaje que se quiere de ganancia fija
    price = pPriceCost * (1 + pProfitPercentage)
    # Se le aplica el porcentaje de aumento segun la temporada y la zona
    price = math.ceil(price * ((1 + (pSeasonPercentage+0.3)/2) * (1 + pPlacePercentage)))

    # Dependiendo de las condiciones determina el peso
    # de la cantidad de dias y cantidad de asientos comprados
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

    # Se le aplica el porcentaje de dias y comprados
    price = math.ceil(price * percentage)
    return price

# Saca los valores para la formula de regresion Lineal de
# todas las rutas haciendo un muestreo y usando training
def sacarRegresionLineal():
    global places
    x_multiple = []
    y_multiple = []
    listaFormulas = []

    for place in places:
        for season in place.getSeasonPercentage():
            # Por temporada genera 15 casos para entrenar
            for i in range(0, 15):
                # Dias y compras se generan aleatorios
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
                # Se añaden los x de la regresion lineal
                x_multiple.append([purchase, date, season])
                # Se añaden el y de la regresion lineal
                y_multiple.append(price)

        # Prepara los datos para sacar la formula
        X_train, X_test, y_train, y_test = train_test_split(
            x_multiple, y_multiple, test_size=0.2
        )
        # Algoritmo a Utilizar
        lr_multiple = linear_model.LinearRegression()
        # Entreno el modelo
        lr_multiple.fit(X_train, y_train)
        # Realizo una prediccion
        y_pred_multiple = lr_multiple.predict(X_test)

        # Se castean los datos de los coeficientesA y se meten
        # en una lista
        coeficientesA = []
        for coeficienteA in lr_multiple.coef_:
            coeficientesA.append(float(coeficienteA))

        # Se saca el valor del coeficienteB
        coeficienteB = lr_multiple.intercept_

        # Se crea la formula para esa ruta
        formula = Formula(place.name, coeficientesA, coeficienteB)
        listaFormulas.append(formula)

        # Se resetea el la lista de 'xs' y 'y' para el proximo lugar
        x_multiple = []
        y_multiple = []

    return listaFormulas


# Se generan las formulas para las rutas
listaFormulas = sacarRegresionLineal()

# Calcula el precio de un asiento dependiendo de las situacion
# aplicando la formula de la ruta en especifico
def calcularPrecio(asientos, dias, temporada, ruta):
    global listaFormulas
    # Le aplica la formula de la ruta respectiva
    for formula in listaFormulas:
        if formula.ruta == ruta:
            return math.ceil(
                asientos * formula.coeficientesA[0]
                + dias * formula.coeficientesA[1]
                + temporada * formula.coeficientesA[2]
                + formula.coeficienteB
            )
    # Solo llega aqui si no estaba la ruta en las formulas
    return "No existe esa ruta"

def generadorSituaciones():
    global places
    diasFaltantes = [30,15,7]
    asientosComprados = [80,50,10]
    for place in places:
        temporadaAlta = place.getSeasonPercentage()[6]
        temporadaBaja = place.getSeasonPercentage()[10]
        nombreRuta = place.getName()
        print("Precios para la ruta: ", nombreRuta)
        print("Precio en Julio")
        for dias in diasFaltantes:
            for asientos in asientosComprados:
                print(calcularPrecio(asientos,dias,temporadaAlta,nombreRuta))
        print("____________________________________________________")
        print("Precio en Noviembre")
        for dias in diasFaltantes:
            for asientos in asientosComprados:
                print(calcularPrecio(asientos,dias,temporadaBaja,nombreRuta))
        print("____________________________________________________")
        print("____________________________________________________")


generadorSituaciones()
