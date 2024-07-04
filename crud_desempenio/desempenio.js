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

            // Aquí debes realizar la solicitud XMLHttpRequest o usar fetch para enviar los datos al servidor
            // ...

            // Ejemplo básico de cómo podrías usar fetch para enviar los datos
            fetch('crear.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `id=${encodeURIComponent(contenido.idempleado)}&puntualidad=${encodeURIComponent(contenido.puntualidad)}&companierismo=${encodeURIComponent(contenido.companierismo)}&autoconciencia=${encodeURIComponent(contenido.autoconciencia)}&liderazgo=${encodeURIComponent(contenido.liderazgo)}`
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                document.getElementById('form').reset(); // Resetear el formulario si es necesario
                window.history.back();
            })
            .catch(error => {
                console.error('Error al enviar datos:', error);
            });
        });
    }
});
