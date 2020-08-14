/**
 * Obtiene la tasa de crecimiento de los elementos de `datos`
 * aplicando a cada uno una función `f`
 *
 * @param {[any]} busquedas
 * @return {number}
 */
function crecimientoBusquedas(busquedas) {
  if (busquedas.length <= 2) return 0;

  let crecimiento = 0;
  let i = 1;

  for (let busqueda of busquedas)
    crecimiento += busqueda.tasa;

  return crecimiento / (busquedas.length - 1);
};

function crecimientoCompras(compras) {
  if (compras.length <= 2) return 0;

  let crecimiento = 0;
  let i = 1;

  for (let compra of compras)
    crecimiento += compra.tasa;

  return crecimiento / (compras.length - 1);
}

/**
 * Predice la cantidad de búsquedas,
 *  utilizando solamente los datos de días anteriores
 *
 * @param {[any]} datos
 * @param {number} cantDiasDespues
 * @return {number}
 */
function predecirBusquedas(datos, cantDiasDespues) {
  let tasa = crecimientoBusquedas(datos);
  let val = (datos[datos.length - 1]).cantidad;

  for (let i = 0; i < cantDiasDespues; i++) val += val * tasa;

  return val;
}

/**
 * Predice la cantidad de compras, 
 * utilizando solamente los datos de días anteriores
 *
 * @param {[any]} datos
 * @param {number} cantDiasDespues
 * @return {number}
 */
function predecirPorcentajeCompras(datos, cantDiasDespues) {
  let tasa = crecimientoCompras(datos);
  
  

  let val = (datos[datos.length - 1]).porcentajeCompra;

  for (let i = 0; i < cantDiasDespues; i++) val += val * tasa;
  
  return val;
}

/**
 *
 *
 * @param {[any]} dataBusquedas
 * @param {[any]} dataCompras
 * @param {number} cantDiasDespues
 * @return {[number]}
 */
function comprasEsperadas(dataBusquedas, dataCompras, cantDiasDespues) {
  const tasaCompras = predecirPorcentajeCompras(dataCompras, cantDiasDespues);
  const cantBusquedas = predecirBusquedas(dataBusquedas, cantDiasDespues);

  return [cantBusquedas, cantBusquedas * tasaCompras];
}

/**
 *
 *
 * @param {[any]} historico
 * @param {number} cantDiasDespues
 * @return {[number]}
 */
function promHistoricoSegmentado(historico, cantDiasDespues) {
  const indiceInicio = historico.length - cantDiasDespues;
  let result = [];
  let sumCompras = 0;

  for (let i = 0; i < indiceInicio; i++) sumCompras += historico[i].cantidad;

  for (let i = indiceInicio; i < historico.length; i++) {
    sumCompras += historico[i].cantidad;
    const compras = sumCompras / (i + 1);

    result.push(compras);
  }

  return result;
}

/**
 * crecimientoBusquedas
 * historico
 *
 * @param {{destino: string, fecha: any, cantidad: number, tasa: number}} busquedasActuales
 * @param {number} porcImpactoActuales
 * @param {{destino: string, fecha: any, cantidad: number}} historicos
 * @param {number} cantDiasDespues
 * @return {number} 
 */

// stevenq161198@gmail.com
// Sqj161198
// mis locos, mi mama ya me regaño xd dice que ya me duerma
// esa es la cuenta para el memsql
// para el memsql studio es admin y Sqj161198, ahi les queda los querys que he hecho
function acumulada(busquedasActuales, comprasActuales, porcImpactoActuales, historicos, cantDiasDespues) {
  //console.log('busquedasActuales', busquedasActuales);
  //console.log('comprasActuales', comprasActuales);
  //console.log('historicos', historicos);

  const historicoSegmentado = promHistoricoSegmentado(
    historicos,
    cantDiasDespues
  );
  let suma = 0;


  for (let i = 1; i <= cantDiasDespues; i++) {
    const compras = comprasEsperadas(busquedasActuales, comprasActuales, i)[1];

    const historicoCompras = historicoSegmentado[i - 1];

    suma +=
      compras * porcImpactoActuales +
      historicoCompras * (1 - porcImpactoActuales);
  }
  return suma;
}

module.exports = {acumulada: acumulada, crecimientoCompras: crecimientoCompras};