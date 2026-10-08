//----------------------------------------------//
//--|funcionalidad_aplausometro_digital|--//
//----------------------------------------------//
// Obtenemos el contador principal.
const contador_aplausometro =
    document.getElementById("contador_aplausometro");
// Obtenemos el mensaje descriptivo.
const mensaje_aplausometro =
    document.getElementById("mensaje_aplausometro");
// Obtenemos los elementos de progreso.
const progreso_aplausometro =
    document.getElementById("progreso_aplausometro");
const porcentaje_aplausometro =
    document.getElementById("porcentaje_aplausometro");
// Obtenemos los botones principales.
const boton_aplaudir_aplausometro =
    document.getElementById("boton_aplaudir_aplausometro");
const boton_reiniciar_aplausometro =
    document.getElementById("boton_reiniciar_aplausometro");
// Obtenemos los datos secundarios.
const ultimo_aplauso_aplausometro =
    document.getElementById("ultimo_aplauso_aplausometro");
const total_aplausos_aplausometro =
    document.getElementById("total_aplausos_aplausometro");
// Obtenemos el mensaje de aviso.
const aviso_aplausometro =
    document.getElementById("aviso_aplausometro");
// Definimos la clave utilizada por localStorage.
const clave_aplausometro_digital =
    "contador_aplausometro_digital";
// Inicializamos el contador.
let cantidad_aplausos_aplausometro = 0;
// Definimos el máximo visual de la barra.
const maximo_aplausometro = 100;
// Guardamos el contador en localStorage.
function guardar_aplausometro() {
    const datos_aplausometro = {
        cantidad: cantidad_aplausos_aplausometro
    };
    localStorage.setItem(
        clave_aplausometro_digital,
        JSON.stringify(datos_aplausometro)
    );
}
// Recuperamos el contador guardado.
function recuperar_aplausometro() {
    const datos_guardados_aplausometro =
        localStorage.getItem(clave_aplausometro_digital);
    // Comprobamos si existen datos almacenados.
    if (!datos_guardados_aplausometro) {
        actualizar_aplausometro();
        return;
    }
    try {
        // Convertimos los datos almacenados nuevamente a objeto.
        const datos_aplausometro =
            JSON.parse(datos_guardados_aplausometro);
        // Verificamos que la cantidad sea un número válido.
        if (
            typeof datos_aplausometro.cantidad === "number" &&
            Number.isFinite(datos_aplausometro.cantidad) &&
            datos_aplausometro.cantidad >= 0
        ) {
            cantidad_aplausos_aplausometro =
                Math.floor(datos_aplausometro.cantidad);
        }
    } catch (error_aplausometro) {
        // Eliminamos información dañada.
        localStorage.removeItem(clave_aplausometro_digital);
        cantidad_aplausos_aplausometro = 0;
    }
    // Actualizamos la pantalla.
    actualizar_aplausometro();
}
// Actualizamos todos los elementos visuales.
function actualizar_aplausometro() {
    // Mostramos la cantidad actual de aplausos.
    contador_aplausometro.textContent =
        cantidad_aplausos_aplausometro;
    // Mostramos el total acumulado.
    total_aplausos_aplausometro.textContent =
        cantidad_aplausos_aplausometro;
    // Calculamos el porcentaje de progreso.
    const porcentaje =
        Math.min(
            cantidad_aplausos_aplausometro,
            maximo_aplausometro
        );
    // Actualizamos el ancho de la barra.
    progreso_aplausometro.style.width =
        porcentaje + "%";
    // Actualizamos el porcentaje mostrado.
    porcentaje_aplausometro.textContent =
        porcentaje + "%";
    // Actualizamos el mensaje dependiendo de los aplausos.
    actualizar_mensaje_aplausometro();
}
// Cambiamos el mensaje según la cantidad.
function actualizar_mensaje_aplausometro() {
    let mensaje_actual_aplausometro = "";
    if (cantidad_aplausos_aplausometro === 0) {
        mensaje_actual_aplausometro =
            "¡Todavía puedes comenzar!";
    } else if (cantidad_aplausos_aplausometro < 10) {
        mensaje_actual_aplausometro =
            "¡Buen comienzo! Sigue aplaudiendo.";
    } else if (cantidad_aplausos_aplausometro < 25) {
        mensaje_actual_aplausometro =
            "¡Muy bien! Los aplausos comienzan a aumentar.";
    } else if (cantidad_aplausos_aplausometro < 50) {
        mensaje_actual_aplausometro =
            "¡Excelente! El público está emocionado.";
    } else if (cantidad_aplausos_aplausometro < 100) {
        mensaje_actual_aplausometro =
            "¡Increíble! El nivel de aplausos es muy alto.";
    } else {
        mensaje_actual_aplausometro =
            "¡Espectacular! Has alcanzado un gran aplausómetro.";
    }
    // Mostramos el mensaje correspondiente.
    mensaje_aplausometro.textContent =
        mensaje_actual_aplausometro;
}
// Ejecutamos una pequeña animación visual.
function animar_contador_aplausometro() {
    contador_aplausometro.classList.remove("animar");
    // Forzamos la actualización de la animación.
    void contador_aplausometro.offsetWidth;
    // Activamos nuevamente la animación.
    contador_aplausometro.classList.add("animar");
    // Quitamos la clase después de la animación.
    setTimeout(function() {
        contador_aplausometro.classList.remove("animar");
    }, 150);
}
// Registramos un nuevo aplauso.
boton_aplaudir_aplausometro.addEventListener(
    "click",
    function() {
        // Aumentamos el contador en uno.
        cantidad_aplausos_aplausometro++;
        // El último incremento siempre es uno.
        ultimo_aplauso_aplausometro.textContent = "1";
        // Actualizamos la interfaz.
        actualizar_aplausometro();
        // Guardamos inmediatamente el nuevo valor.
        guardar_aplausometro();
        // Ejecutamos la animación del contador.
        animar_contador_aplausometro();
        // Mostramos una confirmación.
        aviso_aplausometro.textContent =
            "¡Aplauso registrado correctamente!";
    }
);
// Reiniciamos el contador.
boton_reiniciar_aplausometro.addEventListener(
    "click",
    function() {
        // Establecemos nuevamente el contador en cero.
        cantidad_aplausos_aplausometro = 0;
        // Reiniciamos el último incremento.
        ultimo_aplauso_aplausometro.textContent = "0";
        // Actualizamos la interfaz.
        actualizar_aplausometro();
        // Guardamos el nuevo valor.
        guardar_aplausometro();
        // Informamos al usuario.
        aviso_aplausometro.textContent =
            "El contador ha sido reiniciado.";
    }
);
// Recuperamos los datos al cargar la página.
recuperar_aplausometro();