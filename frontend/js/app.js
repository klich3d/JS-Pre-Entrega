let costoPorHoraImpresora;
let costoPorGramoMaterial;
let tiempoDeImpresion;
let pesoModelo;
let otrosCostos;

function Material(nombre, costoPorGramo) {
    this.nombre = nombre;
    this.costoPorGramo = costoPorGramo;
}

let materiales = [
    new Material('PLA', 2),
    new Material('ABS', 3),
    new Material('PETG', 2.5),
    new Material('Resina', 4)
];

function calcularCostoPorHora() {
    return costoPorHoraImpresora * tiempoDeImpresion;
}

function calcularCostoMaterial(materialSeleccionado, pesoModelo) {
    const material = materiales.find(m => m.nombre === materialSeleccionado);
    if (material) {
    return material.costoPorGramo * pesoModelo;
    } else {
    alert("Material no encontrado");
    return 0;
    }
}

function calcularCostoTotal(materialSeleccionado, pesoModelo) {
    const costoHora = calcularCostoPorHora();
    const costoMaterial = calcularCostoMaterial(materialSeleccionado, pesoModelo);
    return costoHora + costoMaterial + otrosCostos;
}

function filtrarMaterialesPorCosto(maxCosto) {
    return materiales.filter(material => material.costoPorGramo <= maxCosto);
}

function mostrarPresupuesto(materialSeleccionado, pesoModelo) {
    const costoTotal = calcularCostoTotal(materialSeleccionado, pesoModelo);
    return `Presupuesto para impresión con material ${materialSeleccionado}: $${costoTotal.toFixed(2)}`;
}

function mostrarMaterialesFiltrados(maxCosto) {
    const materialesFiltrados = filtrarMaterialesPorCosto(maxCosto);
    let mensaje = `Materiales con costo menor o igual a $${maxCosto}:\n`;
    materialesFiltrados.forEach(material => {
    mensaje += `- ${material.nombre}: $${material.costoPorGramo}/gramo\n`;
    });
    return mensaje;
}

function iniciarCalculo() {

    costoPorHoraImpresora = parseFloat(prompt("Ingrese el costo por hora de la impresora ($):"));
    costoPorGramoMaterial = parseFloat(prompt("Ingrese el costo por gramo del material ($):"));
    tiempoDeImpresion = parseFloat(prompt("Ingrese el tiempo de impresión (en horas):"));
    pesoModelo = parseFloat(prompt("Ingrese el peso del modelo 3D (en gramos):"));
    otrosCostos = parseFloat(prompt("Ingrese otros costos adicionales ($):"));
    
    let materialSeleccionado = prompt("¿Qué material desea utilizar? (Opciones: PLA, ABS, PETG, Resina):");

    const presupuesto = mostrarPresupuesto(materialSeleccionado, pesoModelo);
    const materialesFiltrados = mostrarMaterialesFiltrados(0.06);

    document.getElementById('resultados').innerHTML = `
        <p>${presupuesto}</p>
        <p>${materialesFiltrados.replace(/\n/g, '<br>')}</p>
    `;
}