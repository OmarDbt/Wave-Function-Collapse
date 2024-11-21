const celdas = [];
let RETICULA = document.getElementById("cellSize").value;
let ancho; //ancho de la celda
let alto; //alto de la celda
const startButton = document.getElementById("start");

const azulejos = [];

const reglas = [
    //reglas de los bordes de la cada azulejo
    {
        //title 0
        UP:0,
        RIGHT:1,
        DOWN: 1,
        LEFT: 0,
    },
    {
        //title 1
        UP:0,
        RIGHT:0,
        DOWN: 1,
        LEFT: 1,
    },{
        //title 2
        UP:0,
        RIGHT:0,
        DOWN: 0,
        LEFT: 1,
    },{
        //title 3
        UP:0,
        RIGHT:0,
        DOWN: 0,
        LEFT: 0,
    },{
        //title 4
        UP:1,
        RIGHT:1,
        DOWN: 0,
        LEFT: 0,
    },{
        //title 5
        UP: 1,
        RIGHT:0,
        DOWN: 0,
        LEFT: 1,
    },{
        //title 6
        UP:0,
        RIGHT:1,
        DOWN: 1,
        LEFT: 0,
    },{
        //title 7
        UP:0,
        RIGHT:0,
        DOWN: 1,
        LEFT: 1,
    },{
        //title 8
        UP:0,
        RIGHT:0,
        DOWN: 0,
        LEFT: 0,
    },{
        //title 9
        UP:1,
        RIGHT:1,
        DOWN: 0,
        LEFT: 0,
    },{
        //title 10
        UP:1,
        RIGHT:1,
        DOWN: 0,
        LEFT: 0,
    },{
        //title 11
        UP:1,
        RIGHT:0,
        DOWN: 0,
        LEFT: 1,
    },
];

const NA = reglas.length;  //numero de azulejos

function preload(){
    for (let i = 0; i < NA; i++){
        azulejos[i] = loadImage(`azulejos/tile${i}.png`);
    }
}

function setup() {
    createCanvas(1080, 1080);

    ancho = width / RETICULA;
    alto = height / RETICULA;

    let opcionesI = [];
    for (let i = 0; i < azulejos.length; i++) {
        opcionesI.push(i);    
    }
    for(let i = 0; i < RETICULA * RETICULA; i++){
        celdas[i] = {
            colapsada: false,
            opciones: opcionesI,
        };
    }
    //print(celdas);
    //celdas[8].colapsada = true;
    //celdas[3].colapsada = true;
    startButton.addEventListener("click", resetAll)
}

function draw() {
    
    
    const celdasConOpciones = celdas.filter((celda) => {
        return celda.opciones.length > 0;
    });

    const celdasDisponibles = celdasConOpciones.filter((celda) => celda.colapsada == false);
    if(celdasDisponibles.length > 0){
        celdasDisponibles.sort((a,b)=>a.opciones.length - b.opciones.length);
        const celdasPorColapsar = celdasDisponibles.filter((celda)=> {
            return celda.opciones.length == celdasDisponibles[0].opciones.length;
        })

        const celdaSeleccionada = random(celdasPorColapsar);
        celdaSeleccionada.colapsada = true;

        const opcionSeleccionada = random(celdaSeleccionada.opciones);
        celdaSeleccionada.opciones = [opcionSeleccionada]

        //print(celdaSeleccionada);
        
        for(let x = 0; x < RETICULA; x++){
        for(let y = 0; y < RETICULA; y++){
            const celdaIndex = x + y * RETICULA;
            const celdaActual = celdas[celdaIndex];
            if(celdaActual.colapsada){
                const indiceDeAzulejo = celdaActual.opciones[0];
                const reglasActuales = reglas[indiceDeAzulejo];
                //print(reglasActuales);
                image(azulejos[indiceDeAzulejo], x * ancho, y * alto, ancho, alto);
                //Cambiar entropía UP
                if(y > 0){
                    const indeceUP = x + (y - 1) * RETICULA;
                    const celdaUP = celdas[indeceUP];
                    if(!celdaUP.colapsada){
                        cambiarEntropia(celdaUP, reglasActuales["UP"],"DOWN");
                    }
                }
                //Cambiar entropía RIGHT
                if(x < RETICULA - 1){
                    const indeceRIGHT = x + 1 + y * RETICULA;
                    const celdaRIGHT = celdas[indeceRIGHT];
                    if(!celdaRIGHT.colapsada){
                        cambiarEntropia(celdaRIGHT, reglasActuales["RIGHT"],"LEFT");
                    }
                }
                //Cambiar entropía DOWN
                if(y < RETICULA - 1){
                    const indeceDOWN = x + (y + 1) * RETICULA;
                    const celdaDOWN = celdas[indeceDOWN];
                    if(!celdaDOWN.colapsada){
                        cambiarEntropia(celdaDOWN, reglasActuales["DOWN"],"UP");
                    }
                }
                //Cambiar entropía LEFT
                if(x > 0){
                    const indeceLEFT = x - 1 + y * RETICULA;
                    const celdaLEFT = celdas[indeceLEFT];
                    if(!celdaLEFT.colapsada){
                        cambiarEntropia(celdaLEFT, reglasActuales["LEFT"],"RIGHT");
                    }
                }
            }else{
                //rect(x * ancho, y * alto, ancho, alto);
            }
        }
        }
        
    }
    //noLoop();
}

function cambiarEntropia(_celda, _regla, _opuesta) {
    const nuevasOpciones = [];
        for(let i = 0; i <_celda.opciones.length; i++){
            if(_regla == reglas[_celda.opciones[i]][_opuesta]){
                const celdaCompatible = _celda.opciones[i];
                nuevasOpciones.push(celdaCompatible);
            }
        }
        _celda.opciones = nuevasOpciones;
        print(nuevasOpciones);
}

function resetAll() {
RETICULA = document.getElementById("cellSize").value;
ancho = width / RETICULA;
alto = height / RETICULA;
background(240);

    let opcionesI = [];
    for (let i = 0; i < azulejos.length; i++) {
        opcionesI.push(i);
    }
    for (let i = 0; i <RETICULA * RETICULA; i++) {
        celdas[i] = {
            colapsada: false,
            opciones: opcionesI,
        };
    }
}