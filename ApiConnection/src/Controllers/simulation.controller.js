const destiny = require("../Models/destino");
const bookingController = require("../Controllers/booking.controller");
const {
  randomInt,
  subtractDays,
  increaseDays,
  getWeekDay,
  getRandom,
} = require("../Misc/misc");

const bookController = new bookingController();
//Destinos
const tamarindo = new destiny(
  "Tamarindo",
  [5348, 5288, 15784],
  [0.129, 0.593, -0.384]
);
const liberia = new destiny(
  "Liberia",
  [2628, 2689, 7892],
  [-0.458, 0.873, -0.503]
);
const san_jose = new destiny(
  "San Jose",
  [5332, 5322, 16008],
  [-0.058, 0.678, -0.157]
);
const monteverde = new destiny(
  "Monteverde",
  [2644, 2658, 7953],
  [-0.011, 0.419, -0.188]
);

function sacarLugar(origen, destino) {
  if (origen != destino) {
    return origen;
  } else {
    return sacarLugar(destinos[randomInt(0, destinos.length)].nombre, destino);
  }
}

function aplicarFactor(fecha, ventasAprox) {
  let day = getWeekDay(fecha);
  if (day == "Sabado" || day == "Domingo") {
    return ventasAprox * (1 + getRandom(0.1, 0.5));
  } else {
    return ventasAprox * (1 + getRandom(-0.5, -0.1));
  }
}

destinos = [tamarindo, liberia, san_jose, monteverde];
cant_dias = [31, 30, 31];
class simulationController {
  simulationBookings =  (req, res) => {
    destinos.forEach((lugar) =>{
      for (let index = 0; index < lugar.listaVentas.length; index++) {
        let ventasMes = lugar.listaVentas[index];
        let diasMes = cant_dias[index];        
        let fechaDeseada = `2020-${5 + index}-01`;
        for (let dia = 0; dia < diasMes; dia++) {
          let vProxDia = Math.ceil((ventasMes + ventasMes * lugar.listaTasas[index]) / diasMes);
          console.log("Ventas Aprox", vProxDia, "Dias por Mes", diasMes);
          vProxDia = Math.ceil(aplicarFactor(fechaDeseada, Math.ceil((ventasMes + ventasMes * lugar.listaTasas[index]) / diasMes)));
          console.log("Ventas Aprox", vProxDia, "Dias por Mes", diasMes);
          for (let v = 0; v < vProxDia; v++) {
            console.log(v);
            let book = {
              fechaHoy: subtractDays(fechaDeseada, randomInt(1, diasMes + 1)),
              fechaDeseada: fechaDeseada,
              origen: sacarLugar(destinos[randomInt(0, destinos.length)].nombre, lugar.nombre),
              destino: lugar.nombre,
            };
            console.log(book);
            //bookController.book();
          }
          fechaDeseada = increaseDays(fechaDeseada, 1);
        }
      }
    });
  };
}

module.exports = simulationController;
