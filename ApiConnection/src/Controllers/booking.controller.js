const mysql = require("mysql");
const { restDates, subtractYear, subtractDays } = require("../Misc/misc");
const { acumulada, crecimientoCompras } = require("./predict.controller");
var pool = mysql.createPool({
  host:
    "svc-1eba693f-1307-4647-87c8-c4315127ed60-ddl.aws-virginia-1.db.memsql.com",
  user: "admin",
  password: "Sqj161198",
  database: "proyectobases",
  connectionLimit: 10, // this is the max number of connections before your pool starts waiting for a release
  multipleStatements: true, // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
});

async function executeQuery(connection, sqlFunction) {
  return new Promise((resolve, reject) => {
    connection.query(sqlFunction, function (err, rows) {
      let list = [];

      if (err) {
        connection.release();
        reject(err);
      }
      for (let i = 0; i < rows.length; i++) {
        let current = rows[i];
        list.push(Object.assign({}, current));
      }
      resolve(list);
    });
  });
}

class bookingController {
  search = (req, res) => {
    const { origen, destino, fechaDeseada, fechaHoy } = req.body;

    pool.getConnection(async function (err, conn) {
      if (err) return res.send(400);

      //Promise que trae todas las busquedas entre el dia de hoy y 7 dias hacia atras
      const promiseBusquedas = executeQuery(
        conn,
        `SELECT * FROM crecimientoBusquedas where destino =  "${destino}"
          and Date(fecha) between Date("${subtractDays(
            fechaHoy,
            7
          )}") and Date("${fechaHoy}") ORDER BY Date(fecha) ASC`
      );

      let busquedas = await promiseBusquedas.catch((err) =>
        res.status(400).send("Couldn't get a connection")
      );

      //Promise que trae el crecimiento de las compras cada 100 busquedas entre el dia de hoy y 7 dias atras
      const promiseCrecimientoCompras = executeQuery(
        conn,
        `SELECT * FROM crecimientoCompras  where destino =  "${destino}" and fecha between "${subtractDays(
          fechaHoy,
          7
        )}" and "${fechaHoy}" ORDER BY Date(fecha) ASC`
      );

      let crecimientoComprasData = await promiseCrecimientoCompras.catch(
        (err) => res.status(400).send("Couldn't get a connection")
      );

      //Promise que trae los precios historicos desde la fecha actual hasta la deseada de años anteriores.
      const promiseHistorico = executeQuery(
        conn,
        `SELECT * FROM historico where destino = "${destino}" and fecha between "${subtractYear(
          fechaHoy
        )}" and "${subtractYear(fechaDeseada)}"ORDER BY Date(fecha) ASC`
      );

      let historicos = await promiseHistorico.catch((err) =>
        res.status(400).send("Couldn't get a connection")
      );

      //Returna un promise con las cantidad de compras por cada ruta para una cierta fecha.
      const promiseCompras = executeQuery(
        conn,
        `SELECT * FROM cantidadCompras where destino = "${destino}" and origen = "${origen}"
      and fechaViaje = "${fechaDeseada}" ORDER BY Date(fechaViaje) ASC`
      );

      let quant_compras = await promiseCompras.catch((err) =>
        res.status(400).send("Couldn't get a connection")
      );

      //Promise que devuelve los preciosBases
      const promisePreciosBase = executeQuery(
        conn,
        `SELECT precio FROM precios where destino = "${destino}"
            and origen = "${origen}"`
      );

      let precioBase = (
        await promisePreciosBase.catch((err) =>
          res.status(400).send("Couldn't get a connection")
        )
      )[0];

      var dias_restantes = restDates(
        new Date(fechaHoy),
        new Date(fechaDeseada)
      );
      conn.release();
      let proyeccion = acumulada(
        busquedas,
        crecimientoComprasData,
        0.6,
        historicos,
        dias_restantes
      );
      console.log("Precio Base",precioBase.precio);
      let diferencia = proyeccion - (100 - quant_compras[0].cantidad);
      let factorIncidencia = crecimientoCompras(crecimientoComprasData);
      let suma = precioBase.precio * (diferencia / 100) * factorIncidencia;
      let precioFinal = precioBase.precio + suma;

      console.log("Dias Restantes", dias_restantes);
      console.log("Proyeccion", proyeccion);
      console.log(
        "Cantidad de Compras al dia de hoy:",
        quant_compras[0].cantidad
      );
      console.log("Diferencia", diferencia);
      console.log("Factor", factorIncidencia);
      console.log("Cambio",suma);
      console.log("Precio Final", precioFinal);
      res.send({ precioFinal: precioFinal });
    });
  };
}

module.exports = bookingController;
