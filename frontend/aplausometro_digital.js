//----------------------------------------//
//--|funcionalidad_aplausometro_digital|--//
//----------------------------------------//
const contador_aplausometro = document.getElementById("contador_aplausometro");
const mensaje_aplausometro = document.getElementById("mensaje_aplausometro");
const progreso_aplausometro = document.getElementById("progreso_aplausometro");
const porcentaje_aplausometro = document.getElementById("porcentaje_aplausometro");
const boton_aplaudir_aplausometro = document.getElementById("boton_aplaudir_aplausometro");
const boton_reiniciar_aplausometro = document.getElementById("boton_reiniciar_aplausometro");
const ultimo_aplauso_aplausometro = document.getElementById("ultimo_aplauso_aplausometro");
const total_aplausos_aplausometro = document.getElementById("total_aplausos_aplausometro");
const aviso_aplausometro = document.getElementById("aviso_aplausometro");
const clave_aplausometro_digital = "contador_aplausometro_digital";
let cantidad_aplausos_aplausometro = 0;
const maximo_aplausometro = 100;
//---------------------------------------------------------//
//--|guardamos_y_recuperamos_el_contador_en_localstorage|--//
//---------------------------------------------------------//
function guardar_aplausometro() {
    const datos_aplausometro = {
        cantidad: cantidad_aplausos_aplausometro
    };
    localStorage.setItem(clave_aplausometro_digital, JSON.stringify(datos_aplausometro));
}
function recuperar_aplausometro() {
    const datos_guardados_aplausometro = localStorage.getItem(clave_aplausometro_digital);
    if (!datos_guardados_aplausometro) {
        actualizar_aplausometro();
        return;
    }
    try {
        const datos_aplausometro = JSON.parse(datos_guardados_aplausometro);
        if (typeof datos_aplausometro.cantidad === "number" && Number.isFinite(datos_aplausometro.cantidad) && datos_aplausometro.cantidad >= 0) {
            cantidad_aplausos_aplausometro = Math.floor(datos_aplausometro.cantidad);
        }
    } 
    catch (error_aplausometro) {
        localStorage.removeItem(clave_aplausometro_digital);
        cantidad_aplausos_aplausometro = 0;
    }
    actualizar_aplausometro();
}
//---------------------------------------//
//--|actualizar_los_elementos_visuales|--//
//---------------------------------------//
function actualizar_aplausometro() {
    contador_aplausometro.textContent = cantidad_aplausos_aplausometro;
    total_aplausos_aplausometro.textContent = cantidad_aplausos_aplausometro;
    const porcentaje = Math.min(cantidad_aplausos_aplausometro, maximo_aplausometro);
    progreso_aplausometro.style.width = porcentaje + "%";
    porcentaje_aplausometro.textContent = porcentaje + "%";
    actualizar_mensaje_aplausometro();
}
//------------------------------------------//
//--|mostrar_el_mensaje_segun_la_cantidad|--//
//------------------------------------------//
function actualizar_mensaje_aplausometro() {
    let mensaje_actual_aplausometro = "";
    if (cantidad_aplausos_aplausometro === 0) {
        mensaje_actual_aplausometro = "¡Todavía puedes comenzar!";
    } 
    else if (cantidad_aplausos_aplausometro < 10) {
        mensaje_actual_aplausometro = "¡Buen comienzo! Sigue aplaudiendo.";
    } 
    else if (cantidad_aplausos_aplausometro < 25) {
        mensaje_actual_aplausometro = "¡Muy bien! Los aplausos comienzan a aumentar.";
    } 
    else if (cantidad_aplausos_aplausometro < 50) {
        mensaje_actual_aplausometro = "¡Excelente! El público está emocionado.";
    } 
    else if (cantidad_aplausos_aplausometro < 100) {
        mensaje_actual_aplausometro = "¡Increíble! El nivel de aplausos es muy alto.";
    } 
    else {
        mensaje_actual_aplausometro = "¡Espectacular! Has alcanzado un gran aplausómetro.";
    }
    mensaje_aplausometro.textContent = mensaje_actual_aplausometro;
}
//-----------------------------------//
//--|ejecutar_una_animacion_visual|--//
//-----------------------------------//
function animar_contador_aplausometro() {
    contador_aplausometro.classList.remove("animar");
    void contador_aplausometro.offsetWidth;
    contador_aplausometro.classList.add("animar");
    setTimeout(function() {
        contador_aplausometro.classList.remove("animar");
    }, 150);
}
//--------------------------------//
//--|registrar_un_nuevo_aplauso|--//
//--------------------------------//
boton_aplaudir_aplausometro.addEventListener(
    "click", function() {
        cantidad_aplausos_aplausometro++;
        ultimo_aplauso_aplausometro.textContent = "1";
        actualizar_aplausometro();
        guardar_aplausometro();
        animar_contador_aplausometro();
        aviso_aplausometro.textContent = "¡Aplauso registrado correctamente!";
    }
);
//---------------------------//
//--|reiniciar_el_contador|--//
//---------------------------//
boton_reiniciar_aplausometro.addEventListener(
    "click", function() {
        cantidad_aplausos_aplausometro = 0;
        ultimo_aplauso_aplausometro.textContent = "0";
        actualizar_aplausometro();
        guardar_aplausometro();
        aviso_aplausometro.textContent = "El contador ha sido reiniciado.";
    }
);
recuperar_aplausometro();