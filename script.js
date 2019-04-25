if ('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("./sw.js")
        .then(registration => {
            console.log(registration)
            console.log(
                'Service Worker enregistré',
                registration.scope
            )
        })
        .catch( Error => console.log('registro de service worker fallido', Error))
    })
}