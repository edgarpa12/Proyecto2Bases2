class Formula:
    def __init__(self, pRuta, pCoeficientesA, pCoeficienteB):
        self.ruta = pRuta
        self.coeficientesA = pCoeficientesA
        self.coeficienteB = pCoeficienteB
    
    def __repr__(self):
        return '{}: {} {} {}'.format(self.__class__.__name__,
                                     self.ruta,
                                     self.coeficientesA,
                                     self.coeficienteB)
