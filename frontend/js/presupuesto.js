
document.getElementById('simulator-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const material = document.getElementById('material').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const time = parseFloat(document.getElementById('time').value);
    const price = parseFloat(document.getElementById('price').value);
    const extra = parseFloat(document.getElementById('extra').value);
    const profit = parseFloat(document.getElementById('profit').value);

    const materialPrice = material === 'PLA' ? 25000 : material === 'ABS' ? 30000 : material === 'PETG' ? 27000 : 25;
    const cost = (materialPrice * weight / 1000) + (time * price) + extra;
    const finalPrice = cost + (cost * profit / 100);

    const result = `
        <h3>Presupuesto:</h3>
        <p>Material: ${material}</p>
        <p>Costo por material (basado en el peso): $${(materialPrice * weight / 1000).toFixed(2)}</p>
        <p>Costo por tiempo de impresión: $${(time * price).toFixed(2)}</p>
        <p>Otros costos: $${extra.toFixed(2)}</p>
        <p><strong>Total sin ganancia: $${cost.toFixed(2)}</strong></p>
        <p><strong>Total con ganancia: $${finalPrice.toFixed(2)}</strong></p>
    `;
    document.getElementById('presupuesto-result').innerHTML = result;
});
