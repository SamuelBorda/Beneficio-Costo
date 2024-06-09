let contadorProyectos = 2; // Empezamos con dos proyectos

function mostrarFormulario() {
    const opcion = document.getElementById('opcion').value;
    const formulaDiv = document.querySelector('.formula');
    const formularioDiv = document.getElementById('formulario');
    const calcularBtn = document.getElementById('calcularBtn');

    if (opcion === '1' || opcion === '2') {
        formulaDiv.style.display = 'block';
        formularioDiv.style.display = 'block';
        calcularBtn.style.display = 'block';

        let html = '';

        if (opcion === '1') {
            html = generarFormularioIndividual();
        } else if (opcion === '2') {
            html = generarFormularioIncremental();
            ajustarMargenMostrar();
        }

        formularioDiv.innerHTML = html;

        MathJax.typesetPromise().then(() => {
            formulaDiv.style.visibility = 'visible';
        });

    } else {
        formulaDiv.style.display = 'none';
        formularioDiv.style.display = 'none';
        calcularBtn.style.display = 'none';
        formularioDiv.innerHTML = '';
    }
}

function generarFormularioIndividual() {
    return `
        <div class="input-group">
            <label for="mi">Inversión:</label>
            <input type="number" id="mi" placeholder="Inversión">
        </div>
        <div class="input-group">
            <label for="in">Ingreso Anual:</label>
            <input type="number" id="in" placeholder="Ingreso Anual">
        </div>
        <div class="input-group">
            <label for="costo">Costo Anual:</label>
            <input type="number" id="costo" placeholder="Costo Anual">
        </div>
        <div class="input-group">
            <label for="i">Interes Anual (i):</label>
            <input type="number" id="i" placeholder="Interes Anual (%)">
        </div>
        <div class="input-group">
            <label for="k">Valor de salvamento (k):</label>
            <input type="number" id="k" placeholder="Valor residual">
        </div>
        <div class="input-group">
            <label for="n">Cantidad de años (n):</label>
            <input type="number" id="n" placeholder="Número de períodos">
        </div>
    `;
}

function generarFormularioIncremental() {
    let html = '';
    for (let i = 1; i <= contadorProyectos; i++) {
        if (i % 2 !== 0 || i === 1) { // Comienza una nueva fila cada dos proyectos o al principio
            html += '<div class="row">';
        }
        html += `
            <div class="col">
                <div class="proyecto">
                    <h2>Proyecto ${i}</h2>
                    <button onclick="toggleProyecto(${i})">Mostrar Proyecto ${i}</button>
                    <div class="responsive" id="proyecto${i}" style="display:none;">
                        <div class="input-group">
                            <label for="mi${i}">Inversión:</label>
                            <input type="number" id="mi${i}" placeholder="Inversión">
                        </div>
                        <div class="input-group">
                            <label for="in${i}">Ingreso Anual:</label>
                            <input type="number" id="in${i}" placeholder="Ingreso Anual">
                        </div>
                        <div class="input-group">
                            <label for="costo${i}">Costo Anual:</label>
                            <input type="number" id="costo${i}" placeholder="Costo Anual">
                        </div>
                        <div class="input-group">
                            <label for="i${i}">Interes Anual (i):</label>
                            <input type="number" id="i${i}" placeholder="Interes Anual (%)">
                        </div>
                        <div class="input-group">
                            <label for="k${i}">Valor de salvamento (k):</label>
                            <input type="number" id="k${i}" placeholder="Valor residual">
                        </div>
                        <div class="input-group">
                            <label for="n${i}">Cantidad de años (n):</label>
                            <input type="number" id="n${i}" placeholder="Número de períodos">
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (i % 2 === 0 || i === contadorProyectos) { // Cierra la fila cada dos proyectos o al final del loop
            html += '</div>'; // Cerrar la fila
        }
    }
    html += `
        <button class="agregar" onclick="agregarProyecto()">Agregar Proyecto</button>
        <button class="eliminar" onclick="eliminarProyecto()">Eliminar Proyecto</button>
        
    `;
    return html;
}

function toggleProyecto(numero) {
    const proyecto = document.getElementById(`proyecto${numero}`);
    const boton = proyecto.previousElementSibling;
    if (proyecto.style.display === 'none') {
        proyecto.style.display = 'block';
        boton.textContent = `Ocultar Proyecto ${numero}`;
        ajustarMargenMostrar();
    } else {
        proyecto.style.display = 'none';
        boton.textContent = `Mostrar Proyecto ${numero}`;
        
    }
}
function ajustarMargenMostrar() {
    const contenedor = document.querySelector('.container');
    const mostrarProyectos = document.querySelectorAll('.responsive[style="display: block;"]');
    let margenAdicional = 0;
    console.log(mostrarProyectos);
    // Calcula el margen adicional basado en el número de proyectos mostrados
    if (mostrarProyectos.length > 0) {
        margenAdicional = (mostrarProyectos.length - 1) * 500; // Cada proyecto adicional agrega 500px al margen
    }
    console.log("margen adicional es ");
    console.log(margenAdicional);
    // Establece el margen superior e inferior del contenedor solo si hay proyectos mostrados
    if (mostrarProyectos.length > 0) {
        contenedor.style.marginTop = `${500 + margenAdicional}px`;
        contenedor.style.marginBottom = `${500 + margenAdicional}px`;
    } else {
        contenedor.style.marginTop = "500px"; // Margen predeterminado
        contenedor.style.marginBottom = "500px"; // Margen predeterminado
    }
}

function agregarProyecto() {
    contadorProyectos++;
    mostrarFormulario();
}

function eliminarProyecto() {
    if (contadorProyectos > 2) {
        contadorProyectos--;
        mostrarFormulario();
    }
}

function calcular() {
    const opcion = document.getElementById('opcion').value;
    const resultadosDiv = document.getElementById('resultados');

    if (opcion === '1') {
        const ingreso = parseFloat(document.getElementById('in').value);
        const costo = parseFloat(document.getElementById('costo').value);
        const i = parseFloat(document.getElementById('i').value);
        const n = parseFloat(document.getElementById('n').value);
        const k = parseFloat(document.getElementById('k').value);
        const inversion = parseFloat(document.getElementById('mi').value);

        const A = ingreso - costo;
        const parte1 = (1 - Math.pow(1 + i, -n)) / i;
        const parte2 = k / Math.pow(1 + i, n);
        const P = (A * parte1 + parte2) / inversion;

        let conveniencia = "";
        if (P <= 1) {
            conveniencia = "No es conveniente";
        } else {
            conveniencia = "Es conveniente";
        }

        document.getElementById('resultado').innerHTML = `$$P = ${P.toFixed(5)}$$`;
        document.getElementById('conveniencia').innerText = conveniencia;
        MathJax.typeset();
    } else if (opcion === '2') {
        const proyectos = [];
        for (let i = 1; i <= contadorProyectos; i++) {
            const inversion = parseFloat(document.getElementById(`mi${i}`).value);
            const ingreso = parseFloat(document.getElementById(`in${i}`).value);
            const costo = parseFloat(document.getElementById(`costo${i}`).value);
            const tasa = parseFloat(document.getElementById(`i${i}`).value);
            const periodos = parseFloat(document.getElementById(`n${i}`).value);
            const salvamento = parseFloat(document.getElementById(`k${i}`).value);

            proyectos.push({
                inversion: inversion,
                ingreso: ingreso,
                costo: costo,
                tasa: tasa,
                periodos: periodos,
                salvamento: salvamento
            });
        }

        proyectos.sort((a, b) => b.inversion - a.inversion); // Ordenar por inversion descendente

        const inversionMayor = proyectos[0].inversion;
        const inversionSegundaMayor = proyectos[1].inversion;

        const inversionNeto =inversionMayor-inversionSegundaMayor;



        const ingresoNetoMayor = proyectos[0].ingreso ;
        const costoNetoMayor = proyectos[0].costo;
        const aMayor= ingresoNetoMayor-costoNetoMayor;
        const ingresoNetoSegundaMayor = proyectos[1].ingreso ;
        const costoNetoSegundaMayor =proyectos[1].costo;
        const aSegundaMayor=ingresoNetoSegundaMayor-costoNetoSegundaMayor;
        const salvamentoMayor= proyectos[0].salvamento;
        const salvamentoSegundaMayor= proyectos[1].salvamento;


        const ingresoNetoAjustadoMayor =aMayor - aSegundaMayor;

        const A = ingresoNetoAjustadoMayor;
        const parte1 = (1 - Math.pow(1 + proyectos[0].tasa, -proyectos[0].periodos)) / proyectos[0].tasa;
        const parte2 = (salvamentoMayor-salvamentoSegundaMayor) / Math.pow(1 + proyectos[0].tasa, proyectos[0].periodos);
        const P = (A * parte1 + parte2) / inversionNeto;

        let conveniencia = "";
        if (P <= 1) {
            conveniencia = `Es conveniente el proyecto con menor inversión (${inversionSegundaMayor}).`;
        } else {
            conveniencia = `Es conveniente el proyecto con mayor inversión (${inversionMayor}).`;
        }

        document.getElementById('resultado').innerHTML = `$$P = ${P.toFixed(5)}$$`;
        document.getElementById('conveniencia').innerText = conveniencia;
        MathJax.typeset();
    }

}