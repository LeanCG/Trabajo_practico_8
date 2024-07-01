document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const idempleado = urlParams.get('id');
    console.log(idempleado);

    if (idempleado){
        document.getElementById('CrearEvaluacion').addEventListener('submit', function(){
            contenido= {
                puntualidad: document.getElementById('puntualidad').value,
                comapnierismo: document.getElementById('companierismo').value,
                autoconciencia: document.getElementById('autoconciencia').value,
                liderazgo: document.getElementById('liderazgo').value,
            };
            let xhr = new XMLHttpRequest();
            xhr.open('POST','crear.php', true);
            xhr.setRequestHeader('Content-type', 'aplication/x-www-form-urlencoded');
            xhr.onreadystatechange = function(){
                if (xhr.readyState === 4 && xhr.status ===200){
                    console.log(xhr.responseText);
                    document.getElementById('CrearEvaluacion').reset();
                }
            }
            let params = `puntualidad=${encodeURIComponent(contenido.puntualidad)}&companierismo=${encodeURIComponent(contenido.comapanierismo)}&autoconciencia=${encodeURIComponent(contenido.autoconciencia)}&liderazgo=${encodeURIComponent(contenido.value)}`;

            xhr.send(params);
            window.history.back();
        })
    }

})