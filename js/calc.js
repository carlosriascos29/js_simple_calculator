// Obteniendo los elementos HTML con los que se interactuara.
const $calculadora = document.getElementById("calculadora"),
    $opInfoInput = document.getElementById("op_info_input")
    $resultado = document.getElementById("resultado");

// Variables de apoyo para los procesos de calculo.    
let auxOpInfo = "";
let activarUsoTeclaDeBackspace = false;

// Objeto para validar cuando se da clic en los botones.
const datos = { n1: 1, n2: 2, n3: 3, n4: 4, n5: 5, n6: 6, n7: 7, n8: 8, n9: 9, n0: 0,
    op_suma: '+', op_resta: '-', op_multi: '*', op_division: '/', n_p_abierto: '(', n_p_cerrado: ')', nComa: '.'
};


/** 
 * Función para validar los caracteres del teclado que serán permitidos.
 * 
 * Recibe de parámetro el caracter enviado desde un evento de teclado.
 * Retorna falso o verdadero, si el caracter existe en el arreglo de los permitidos.
*/
const codigoCaracterTecleadoValido = (codigoCaracterTecleado) => {
    const codigoCaracteresValidos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "=", "+", "-", "*", "/", , "(", ")", "Enter", "Backspace"];
    let respuesta = codigoCaracteresValidos.includes(codigoCaracterTecleado);
    
    return respuesta;
}



/**
 * Procesos del evento de teclado.
 */
$calculadora.addEventListener("click", (e) => {

    if (datos.hasOwnProperty(e.target.id)) {
        auxOpInfo += datos[e.target.id];
        $opInfoInput.value = auxOpInfo;
    }

    if (e.target.id === "celan") {
        $resultado.textContent = 0;
        $opInfoInput.value = "";
        auxOpInfo = "";
    }

    if (e.target.id === "igual") auxOpInfo ? $resultado.textContent = eval(auxOpInfo) : alert("No has ingresado valores.");

    if (e.target.id === "backspace") backspace();

    if (e.target.id === "op_info_input") activarUsoTeclaDeBackspace = true;

});



/**
 * Procesos del evento de teclado.
 */
document.addEventListener("keydown", (e) => {

    if (codigoCaracterTecleadoValido(e.key)) {
 
        if (e.key === "Backspace") {
            e.preventDefault();
            backspace();
            
            return false;
        }
        
        if (e.key === "=" || e.key === "Enter") {
            e.preventDefault();
            auxOpInfo ? $resultado.textContent = eval(auxOpInfo) : alert("No has ingresado valores.");


            return false;
        }

        auxOpInfo += e.key;
        
        if (!activarUsoTeclaDeBackspace) {
            $opInfoInput.value = auxOpInfo;
        }
    
    }

});



/**
 * Función para eliminar un caracter como si fuera la tecla backspace.
 */
const backspace = () => {
    let arreglo = auxOpInfo.split("");
    arreglo.pop();
    auxOpInfo = "";

    arreglo.forEach((value) => {
        auxOpInfo += value;
    });

    $opInfoInput.value = auxOpInfo;

}