if ('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("./sw.js")
        .then(registration => {
            // console.log(registration)
            console.log(
                'Service Worker enregistré',
                registration.scope
            )
        })
        .catch( Error => console.log('registro de service worker fallido', Error))
    })
}

if( window.Notification && Notification.permission !== 'denied' ) {
    Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('Título', {
        body: 'Notification Push ',
        icon: './images/iconos/icon_64x64.png'
      })
    })
  }