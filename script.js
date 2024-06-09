let contadorProyectos = 2; // Empezamos con dos proyectos
let contadorProyectosIndividual = 1; // Empezamos con dos proyectos
function mostrarFormulario() {
    const opcion = document.getElementById('opcion').value;
    const formulaDiv = document.querySelector('.formula');
    const formularioDiv = document.getElementById('formulario');
    const calcularBtn = document.getElementById('calcularBtn');
    const pasosBtn = document.getElementById('pasosBtn');

    if (opcion === '1' || opcion === '2') {
        formulaDiv.style.display = 'block';
        formularioDiv.style.display = 'block';
      calcularBtn.style.display = 'block';
       // pasosBtn.style.display = 'block';   pasosBtn.style.display = 'block';

        let html = '';

        if (opcion === '1') {
            html = generarFormularioIndividual2();
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
       // pasosBtn.style.display = 'none';
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

function generarFormularioIndividual2() {
    let html = '';
    for (let i = 1; i <= contadorProyectosIndividual; i++) {
        if (i % 2 !== 0 || i === 1) { // Comienza una nueva fila cada dos proyectos o al principio
            html += '<div class="row">';
        }
        if (i === 1 && contadorProyectosIndividual <= 1) { // Si es el primer proyecto, ocupar todo el ancho
            html += '<div class="col2">';
        } else {
           
            html += '<div class="col">';
        }

        
        html += `
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
                            <label for="i${i}">Interés Anual (i):</label>
                            <input type="number" id="i${i}" placeholder="Interés Anual (%)">
                        </div>
                        <div class="input-group">
                            <label for="k${i}">Valor de salvamento (k):</label>
                            <input type="number" id="k${i}" placeholder="Valor residual">
                        </div>
                        <div class="input-group">
                            <label for="n${i}">Cantidad de años (n):</label>
                            <input type="number" id="n${i}" placeholder="Número de períodos">
                        </div>
                        <div class="input-group">
                            <label for="resultado${i}">Resultado:</label>
                            <span id="resultado${i}"></span>
                        </div>
                        <div class="input-group">
                            <label for="conveniencia${i}">Conveniencia:</label>
                            <span id="conveniencia${i}"></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (i % 2 === 0 || i === contadorProyectosIndividual) { // Cierra la fila cada dos proyectos o al final del loop
            html += '</div>'; // Cerrar la fila
        }
    }
    html += `
        <button class="agregar" onclick="agregarProyectoIndividual()">Agregar Proyecto</button>
          `;
          if (contadorProyectosIndividual > 1) {
            html += `<button class="eliminar" onclick="eliminarProyectoIndividual()">Eliminar Proyecto</button>`;
        }
    
    return html;
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
        <button class="agregar" onclick="agregarProyecto()">Agregar Proyecto</button>  `;
        if (contadorProyectos > 2) {
            html += `<button class="eliminar" onclick="eliminarProyecto()">Eliminar Proyecto</button>`;
        }
      
  
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
    /*const contenedor = document.querySelector('.container');
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
        contenedor.style.marginTop = `50%`;
        contenedor.style.marginBottom =`10%`;
    } else {
        contenedor.style.marginTop = "0px"; // Margen predeterminado
        contenedor.style.marginBottom =`0px`;
    }*/
}

function agregarProyectoIndividual() {
    contadorProyectosIndividual++;
    mostrarFormulario();
}

function eliminarProyectoIndividual() {
    if (contadorProyectosIndividual > 1) {
        contadorProyectosIndividual--;
        mostrarFormulario();
    }
}function agregarProyecto() {
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

       
        for (let i = 1; i <= contadorProyectosIndividual; i++) {
            const ingreso = parseFloat(document.getElementById(`in${i}`).value);
            const costo = parseFloat(document.getElementById(`costo${i}`).value);
            const tasa = parseFloat(document.getElementById(`i${i}`).value);
            const periodos = parseFloat(document.getElementById(`n${i}`).value);
            const salvamento = parseFloat(document.getElementById(`k${i}`).value);
            const inversion = parseFloat(document.getElementById(`mi${i}`).value);
    
            const A = ingreso - costo;
            const parte1 = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
            let P = A * parte1;
    
            if (!isNaN(salvamento)) {
                const parte2 = salvamento / Math.pow(1 + tasa, periodos);
                P += parte2;
            }
            P = P/inversion;

          
    
            let conveniencia = "";
            if (P <= 1) {
                conveniencia = "No es conveniente";
            } else {
                conveniencia = "Es conveniente";
            }
    
            // Mostrar resultados y conveniencia
            const resultadoElement = document.getElementById(`resultado${i}`);
            resultadoElement.textContent = `$$P = ${P.toFixed(5)}$$`;
            MathJax.typeset([resultadoElement]);
    
            const convenienciaElement = document.getElementById(`conveniencia${i}`);
            convenienciaElement.textContent = conveniencia;
        }


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
                id: i, // Identificador del proyecto
                inversion: inversion,
                ingreso: ingreso,
                costo: costo,
                tasa: tasa,
                periodos: periodos,
                salvamento: salvamento
            });
        }

          //paso  1 Calcular cual es el proyecto con mas inversion 
        proyectos.sort((a, b) => b.inversion - a.inversion); // Ordenar por inversion descendente

        const inversionMayor = proyectos[0].inversion;
        const inversionSegundaMayor = proyectos[1].inversion;

        const inversionNeto =inversionMayor-inversionSegundaMayor;


        //paso  2 
        const ingresoNetoMayor = proyectos[0].ingreso ;
        const costoNetoMayor = proyectos[0].costo;
        const aMayor= ingresoNetoMayor-costoNetoMayor;
        const ingresoNetoSegundaMayor = proyectos[1].ingreso ;

        const costoNetoSegundaMayor =proyectos[1].costo;
        const aSegundaMayor=ingresoNetoSegundaMayor-costoNetoSegundaMayor;
        const salvamentoMayor= proyectos[0].salvamento;
        const salvamentoSegundaMayor= proyectos[1].salvamento;


        const ingresoNetoAjustadoMayor =aMayor - aSegundaMayor;
        //paso  3
        const A = ingresoNetoAjustadoMayor;
        const parte1 = (1 - Math.pow(1 + proyectos[0].tasa, -proyectos[0].periodos)) / proyectos[0].tasa;
        let P = A * parte1;
    
            if (!isNaN(salvamentoMayor) &&  !isNaN(salvamentoSegundaMayor)) {
                const parte2 = (salvamentoMayor-salvamentoSegundaMayor) / Math.pow(1 + proyectos[0].tasa, proyectos[0].periodos);   
                P += parte2;
            }
            P = P/inversionNeto;

        let conveniencia = "";
        if (P <= 1) {
            conveniencia = `Es conveniente el proyecto con menor inversión (${inversionSegundaMayor}) que pertenece al proyecto (${proyectos[1].id}).`;
        } else {
            conveniencia = `Es conveniente el proyecto con mayor inversión (${inversionMayor}) que pertenece al proyecto (${proyectos[0].id}).`;
        }

        

        document.getElementById('resultado').innerHTML = `$$P = ${P.toFixed(5)}$$`;
        document.getElementById('conveniencia').innerText = conveniencia;
        MathJax.typeset();

    }
    
    const pasost = document.getElementById('pasosBtn');
    pasost.style.display = "block";
    
}

function mostrarpasos() {
    const pasost = document.getElementById('pasosContainer');
  

    // Verificar el estado actual de visualización
    const isHidden = pasost.style.display === "none" || pasost.style.display === "";

    // Cambiar el estado de visualización
    if (isHidden) {
        pasost.style.display = "block";
    } else {
        pasost.style.display = "none";
    }
    
    const opcion = document.getElementById('opcion').value;

    const pasosTextarea = document.getElementById('pasos');
   if (opcion === '1') {
    let pasos = ''; // Variable para almacenar los pasos
    for (let i = 1; i <= contadorProyectosIndividual; i++) {
        const ingreso = parseFloat(document.getElementById(`in${i}`).value);
        const costo = parseFloat(document.getElementById(`costo${i}`).value);
        const tasa = parseFloat(document.getElementById(`i${i}`).value);
        const periodos = parseFloat(document.getElementById(`n${i}`).value);
        const salvamento = parseFloat(document.getElementById(`k${i}`).value);
        const inversion = parseFloat(document.getElementById(`mi${i}`).value);

        // Calcular los pasos uno por 
        if (!isNaN(ingreso)) {
            pasos += `Pasos para Proyecto ${i}:\n`;
            pasos += `1. Calcular A (Ingreso Neto):\n`;
            pasos += `   A = Ingreso - Costo\n`;
            pasos += `   A = ${ingreso} - ${costo}\n`;
            const A = ingreso - costo;
            pasos += `   A = ${A}\n\n`;
    
            pasos += `2. Calcular el factor de Anualidad:\n`;

          
                pasos += `   Parte 1: [1 - (1 + i)^(-n)] / i\n`;

          
           
            const parte1 = (1 - Math.pow(1 + tasa, -periodos)) / tasa;
            pasos += `       = [1 - (1 + ${tasa})^(-${periodos})] / ${tasa}\n`;
            pasos += `       = [1 - ${(1 + tasa) ** (-periodos)}] / ${tasa}\n`;
            pasos += `       = ${parte1}\n`;
    
            let parte2 = '';
            if (!isNaN(salvamento)) {
                pasos += `   Parte 2: k / (1 + i)^n\n`;
                parte2 = salvamento / Math.pow(1 + tasa, periodos);
                pasos += `       = ${salvamento} / (1 + ${tasa})^${periodos}\n`;
                pasos += `       = ${parte2}\n`;
            }
    
            pasos += `3. Calcular P (Relación Beneficio/Costo):\n`;
            if (!isNaN(salvamento)) {

                pasos += `   P = (A * Parte 1) + Parte 2\n`;

            }else{

                pasos += `   P = (A * Parte 1)\n`;
            }
            
         

            if (!isNaN(salvamento)) {
                pasos += `     = (${A} * ${parte1}) + ${parte2}\n`;
            }else{

                pasos += `     = (${A} * ${parte1}) \n`;
            }
         
            let P = A * parte1;
            if (!isNaN(salvamento)) {
                P += parte2;
            }
            pasos += `     = ${P}\n\n`;
    
            pasos += `   Resultado =  P/inversion :\n`;
            pasos += `     = ${P} / ${inversion}\n`;
            const resultadoFinal = P / inversion;
            pasos += `     = ${resultadoFinal.toFixed(5)}\n\n`;
            
    
        }
    
        

        }

                // Mostrar los pasos en el textarea
        const pasosDiv = document.getElementById('pasos');
        pasosDiv.textContent = pasos;
        // Mostrar los pasos en el textarea
        pasosTextarea.textContent = pasos;
        pasosTextarea.style.fontFamily = "Arial, sans-serif";
        pasosTextarea.style.fontSize = "14px";
        pasosTextarea.style.lineHeight = "1.5";
        pasosTextarea.style.padding = "10px";
        pasosTextarea.style.border = "1px solid #ccc";
        pasosTextarea.style.borderRadius = "5px";
        pasosTextarea.style.width = "100%";
        pasosTextarea.style.height = "400px";
            
} else if (opcion === '2') {
    const proyectos = [];
    let pasos = ''; // Variable para almacenar los pasos

    // Paso 1: Obtener datos de los proyectos y ordenar por inversión descendente
    pasos += `Pasos para Beneficio Costo Incremental:\n`;
    pasos += `1. Obtener datos de los proyectos y ordenar por inversión descendente:\n`;

    for (let i = 1; i <= contadorProyectos; i++) {
        const inversion = parseFloat(document.getElementById(`mi${i}`).value);
        const ingreso = parseFloat(document.getElementById(`in${i}`).value);
        const costo = parseFloat(document.getElementById(`costo${i}`).value);
        const tasa = parseFloat(document.getElementById(`i${i}`).value);
        const periodos = parseFloat(document.getElementById(`n${i}`).value);
        const salvamento = parseFloat(document.getElementById(`k${i}`).value);

        proyectos.push({
            id: i, // Identificador del proyecto
            inversion: inversion,
            ingreso: ingreso,
            costo: costo,
            tasa: tasa,
            periodos: periodos,
            salvamento: salvamento
        });
    }

    proyectos.sort((a, b) => b.inversion - a.inversion); // Ordenar por inversión descendente

    // Paso 2: Calcular diferencia de inversión entre el proyecto con mayor inversión y el segundo mayor
    const inversionMayor = proyectos[0].inversion;
    const inversionSegundaMayor = proyectos[1].inversion;
    const inversionNeto = inversionMayor - inversionSegundaMayor;
    pasos += `2. Calcular la diferencia de inversión entre el proyecto con mayor inversión y el segundo mayor:\n`;
    pasos += `   Diferencia de Inversión = Inversión Mayor - Inversión Segunda Mayor\n`;
    pasos += `                            = ${inversionMayor} - ${inversionSegundaMayor}\n`;
    pasos += `                            = ${inversionNeto}\n\n`;

    // Paso 3: Calcular diferencia en ingreso neto entre los dos proyectos
    const ingresoNetoMayor = proyectos[0].ingreso - proyectos[0].costo;
    const ingresoNetoSegundaMayor = proyectos[1].ingreso - proyectos[1].costo;
    const ingresoNetoAjustadoMayor = ingresoNetoMayor - ingresoNetoSegundaMayor;
    pasos += `3. Calcular la diferencia en ingreso neto entre el proyecto con mayor inversión y el segundo mayor:\n`;
    pasos += `   Ingreso Neto Ajustado Mayor = (Ingreso Neto Mayor - Ingreso Neto Segunda Mayor)\n`;
    pasos += `                                = (${proyectos[0].ingreso} - ${proyectos[0].costo}) - (${proyectos[1].ingreso} - ${proyectos[1].costo})\n`;
    pasos += `                                = ${ingresoNetoMayor} - ${ingresoNetoSegundaMayor}\n`;
    pasos += `                                = ${ingresoNetoAjustadoMayor}\n\n`;

    // Paso 4: Calcular la relación beneficio/costo incremental (P)
    const parte1 = (1 - Math.pow(1 + proyectos[0].tasa, -proyectos[0].periodos)) / proyectos[0].tasa;
    let P = ingresoNetoAjustadoMayor * parte1;
    if (!isNaN(proyectos[0].salvamento) && !isNaN(proyectos[1].salvamento)) {
        const parte2 = (proyectos[0].salvamento - proyectos[1].salvamento) / Math.pow(1 + proyectos[0].tasa, proyectos[0].periodos);
        P += parte2;
    }
    P = P / inversionNeto;

    // Paso 5: Determinar conveniencia
    let conveniencia = "";
    if (P <= 1) {
        conveniencia = `Es conveniente el proyecto con menor inversión (${inversionSegundaMayor}) que pertenece al proyecto (${proyectos[1].id}).`;
    } else {
        conveniencia = `Es conveniente el proyecto con mayor inversión (${inversionMayor}) que pertenece al proyecto (${proyectos[0].id}).`;
    }

    // Paso 6: Mostrar resultado y conveniencia
    pasos += `4. Calcular la relación beneficio/costo incremental (P):\n`;
    pasos += `   P = (Ingreso Neto Ajustado Mayor * Parte 1) + Parte 2\n`;
    pasos += `     = (${ingresoNetoAjustadoMayor} * ${parte1})`;
    if (!isNaN(proyectos[0].salvamento) && !isNaN(proyectos[1].salvamento)) {
        pasos += ` + (${proyectos[0].salvamento} - ${proyectos[1].salvamento}) / (1 + ${proyectos[0].tasa})^${proyectos[0].periodos}`;
    }
    pasos += `\n`;
    pasos += `     = ${P}\n\n`;

    pasos += `5. Determinar conveniencia:\n`;
    pasos += `   ${conveniencia}\n`;

    // Mostrar los pasos en el textarea
    const pasosTextarea = document.getElementById('pasos');
    pasosTextarea.textContent = pasos;
    pasosTextarea.style.fontFamily = "Arial, sans-serif";
    pasosTextarea.style.fontSize = "14px";
    pasosTextarea.style.lineHeight = "1.5";
    pasosTextarea.style.padding = "10px";
    pasosTextarea.style.border = "1px solid #ccc";
    pasosTextarea.style.borderRadius = "5px";
    pasosTextarea.style.width = "100%";
    pasosTextarea.style.height = "400px";
}

}