document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);

    if (idempleado) {
        console.log("Entro en el if");

        document.getElementById('CrearEvaluacion').addEventListener('submit', function(event){
            event.preventDefault();

            // Obtener los valores de los campos del formulario
            const puntualidad = document.getElementById('puntualidad').value;
            const companierismo = document.getElementById('companierismo').value;
            const autoconciencia = document.getElementById('autoconciencia').value;
            const liderazgo = document.getElementById('liderazgo').value;

            // Construir el contenido a enviar 
            const contenido = {
                idempleado: idempleado,
                puntualidad: puntualidad,
                companierismo: companierismo,
                autoconciencia: autoconciencia,
                liderazgo: liderazgo
            };

            console.log("El contenido:", contenido);

            // Crear objeto XMLHttpRequest
            if (puntualidad && companierismo && autoconciencia && liderazgo) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'crear.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        console.log(xhr.responseText);
                        document.getElementById('form').reset(); // Resetear el formulario si es necesario
                        // Guardar bandera en localStorage
                        localStorage.setItem('recargarDesempenio', 'true');
                        window.history.back();
                    } else {
                        console.error('Error al enviar datos:', xhr.statusText);
                    }
                }
            };
            let params = `id=${encodeURIComponent(contenido.idempleado)}&puntualidad=${encodeURIComponent(contenido.puntualidad)}&companierismo=${encodeURIComponent(contenido.companierismo)}&autoconciencia=${encodeURIComponent(contenido.autoconciencia)}&liderazgo=${encodeURIComponent(contenido.liderazgo)}`;
            xhr.send(params);
    }});
    }
});
