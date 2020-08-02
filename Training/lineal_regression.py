from sklearn import linear_model

# Preparar los datos la regresion
from sklearn.model_selection import train_test_split

x_multiple = [[1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3]]

y_multiple = [1, 2, 3, 1, 2, 3]

X_train, X_test, y_train, y_test = train_test_split(x_multiple, y_multiple, test_size=0.2)
# Algoritmo a Utilizar
lr_multiple = linear_model.LinearRegression()

"""
# Entreno el modelo
lr_multiple.fit(X_train, y_train)

# Realizo una prediccion

y_pred_multiple = lr_multiple.predict(X_test)
print(X_train, X_test, y_train, y_test)
print(X_test)
print(y_train)
print(y_test)
print(y_pred_multiple)

print("Datos del modelo de Regresion Lineal Multiple")

print('Valor de las pendientes o coeficientes "a":')
print(lr_multiple.coef_)
"""