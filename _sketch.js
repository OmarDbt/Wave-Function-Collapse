const celdas = [];
const RETICULA = 10;
let ancho; //altura de la celda
let alto; //anchura de la celda

let opcionesI = []
const azulejos = [];
const NA = 5;  //número de azulejos
const reglas = [
    {
        //title 0
        UP:0,
        RIGHT:0,
        DOWN: 0,
        LEFT: 0,
    },
    {
        //title 1
        UP:0,
        RIGHT:1,
        DOWN: 1,
        LEFT: 0,
    },
    {
        //title 2
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 1,
    },
    {
        //title 3
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 1,
    },
    {
        //title 4
        UP:0,
        RIGHT:0,
        DOWN: 0,
        LEFT: 0,
    },
    {
        //title 5
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 0,
    },
    {
        //title 6
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 1,
    },
    {
        //title 7
        UP:1,
        RIGHT:0,
        DOWN: 1,
        LEFT: 1,
    },
    {
        //title 8
        UP:0,
        RIGHT:1,
        DOWN: 1,
        LEFT: 0,
    },
    {
        //title 9
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 1,
    },
    {
        //title 10
        UP:1,
        RIGHT:1,
        DOWN: 1,
        LEFT: 1,
    },
    
];

function preload(){
    for (let i = 0; i < NA; i++) {
        azulejos[i] = loadImage(`azulejos/tile${i}.png`);
    }
}

function setup (){
    createCanvas(1080, 1080);

    ancho = width / RETICULA;
    alto = height / RETICULA;

    
    for(let i = 0 ; i < azulejos.length; i++){
        opcionesI.push(i);
    }


    //celdas[8].colapsada = true;
    //celdas[3].colapsada = true;
}

function draw (){
    //background(100);
    const celdasDisponibles = celdas.filter((celda)=>{return celda.colapsada == false;
    });

    if(celdasDisponibles.length > 0 ){
        celdasDisponibles.sort((a,b)=> {
            return a.opciones.length - b.opciones.length;
    });

    const celdasPorColapsar = celdasDisponibles.filter((celda) => {
        return (
            celda.opciones.length == celdasDisponibles[0].opciones.length
        );
    });

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

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
                
                //cambiar entropia UP
                if(y > 0) {
                    const indiceUP = x + (y-1) * RETICULA;
                    const celdaUP = celdas[indiceUP];
                    if(!celdaUP.colapsada){
                        cambiarEntropia(celdaUP, reglasActuales["UP"], "DOWN");

                }
                //cambiar entropia RIGHT
                if (x < RETICULA - 1 ) {
                    const indiceRIGHT = x + 1 + y * RETICULA;
                    const celdaRIGHT = celdas[indiceRIGHT];
                    if(!celdaRIGHT.colapsada){
                        cambiarEntropia(celdaRIGHT, reglasActuales["RIGHT"], "LEFT")
                    }
                }
                //cambiar entropia DOWN
                if(y < RETICULA - 1){
                    const indiceDOWN = x + (y + 1) * RETICULA;
                    const celdaDOWN = celdas[indiceDOWN];
                    if(!celdaDOWN.colapsada){
                        cambiarEntropia(celdaDOWN, reglasActuales["DOWN"], "UP")
                    }
                    
                }
                //cambiar entropia LEFT
                if(x > 0){
                    const indiceLEFT = x - 1 + y * RETICULA;
                    const celdaLEFT = celdas[indiceLEFT];
                    if(!celdaLEFT.colapsada){
                        cambiarEntropia(celdaLEFT, reglasActuales["LEFT"], "RIGHT")
                    }

                }

                }
            }
        }
        //noLoop();
    }
}else{ 
    //for (let i = 0; i < RETICULA * RETICULA; i++){
       // celdas[i] = {
         //   colapsada: false,
          //  opciones: opcionesI,
    };
}
    

function cambiarEntropia(_celda, _regla, _opuesta){
    const nuevasOpciones= [];
    for(let i = 0; i < _celda.opciones.length; i++){           
        if(_regla == reglas[_celda.opciones[i]]["_opuesta"]){
            const celdaCompatible = _celda.opciones[i];
            nuevasOpciones.push()
        }
    }
    _celda.opciones = nuevasOpciones;
    print(nuevasOpciones);
    }


