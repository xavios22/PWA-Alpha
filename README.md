### PWA

Il s’agit tout simplement d’un site web, combiné à certaines technologies lui permettant de s’enregistrer sur votre écran d’accueil et de s’ouvrir comme une application native. Ainsi les PWA ont les avantages d’une app native et sans ces inconvénients !

-   Elle s’affiche en plein écran, sans la barre du navigateur
-   Possibilité d’utiliser les fonctions du téléphone : notifications, API comme le GPS, la caméra…
-   Un chargement ultra rapide
-   Possibilité de l’utiliser même hors connexion


## 1. Creation de fichier  Manifest.json

Le Web App Manifest est un fichier JSON qui permet aux développeurs de centraliser les informations relatives à la PWA. Pour le navigateur, c’est uniquement ce fichier qui permet de faire la distinction entre un site web classique et une PWA, et ce, à condition qu’il soit référencé. Ce fichier permet de préciser des méta-données:

-   **name**  Le nom la de la PWA retrouvable au sein de l’environnement ayant installé la PWA
-   **short_name**  Le nom utilisé par l’environnement juste en dessous de l’icône de la PWA
-   **start_url**  Il faut renseigner l’url de démarrage de la PWA.  
    
-   **display**  Permet de spécifier comment la PWA va être présentée.  _fullscreen_permet d’ouvrir l’application en plein écran,  _stand-alone_  de garder la statusbar et le bouton back,  _minimal-ui_  avec aucun bouton et  _browser_  pour une vue par défaut (navigateur classique).
-   **orientation**  Permet de préciser le type d’affichage pour la PWA à savoir portrait, paysage ou les deux.
-   **background_color**  Force la couleur du background avant le chargement des CSS. On voit le background_color généralement au lancement de la PWA sur une très courte durée.
-   **scope** Par défaut c’est la start_url, il est possible de renseigner par exemple un scope spécifique pour chaque type de Service Workers.
-   **icons**  Peut contenir une collection d’icônes avec différentes tailles
-   **serviceworker**  Permet de renseigner un Service Worker, mais il est coutume d’enregistrer et instancier directement un Service Worker via JavaScript au sein de l’application.
Voici un exemple 


#### Voici  un exemple d'un fichier manifest.json:


   

     {
    
	    "name": "Xavier PWA Test",
	    "short-name": "Xavier PWA",
	    "desription": "Test d'une application PWA",
	    "backgroundcolor": "#F7DF1E",
	    "theme_color": "#000",
	    "orientation": "portrait",
	    "display": "standalone",
	    "start_url": "./?utm=homescreen",
	    "scope": "./",
	    "icons" : [
		    {
			    "src": "./images/iconos/icon_32x32.png",
			    "sizes": "32x32",
			    "type": "image/png"
			},
		    {
				"src": "./images/iconos/icon_64x64.png",
				"sizes": "64x64",
				"type": "image/png"
		    },
		    {
			    "src": "./images/iconos/icon_512x512.png",
				"sizes": "512x512",
				"type": "image/png"
			}
		 ]
	}


#### Plus de personnalisation

Les navigateurs proposent la gestion de balises link et meta spécifiques. Leur principal but est d’améliorer l’expérience utilisateur en modifiant les couleurs de l’environnement, la qualité des icônes, voir même modifier le rendu de la status bar ou l’écran de chargement sur iOS. 

#### Voici un exemple  de ces balises :

    
    <!-- Chrome --> <link rel="icon" sizes="192x192" href="icon.png"><link rel="apple-touch-icon" href="ios-icon.png">
   
    <!-- Safari --> <link rel="apple-touch-startup-image" href="icon.png">
  
    <!-- IE --> <meta name="msapplication-square310x310logo" content="icon_largetile.png"> 
    
    
    <!-- Chrome --> <meta name="theme-color" content="#4285f4"> 
    
    <!-- Safari --> <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
Safari se sert principalement des balises pour pallier sa “discutable” gestion du fichier Web App Manifest. Consulter la documentation officielle pour une liste exhaustive des possibilités sur Safari :  [https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)


##### La creation d'un fichier  manifest.json se fait  à la racine de notre projet,   de dans on a besoin juste des information ci dessous  et importer le link dans notre index.html

   ```html  <link  rel="manifest"  href="./manifest.json">```


## 2. Création d'un fichier sw.js

#### Service Worker 

 Un service worker va souvent prendre la forme d’un petit fichier JavaScript et jouer le rôle de proxy entre votre application, le réseau et le navigateur. C’est un peu le chef d’orchestre de la synchronisation des données entre ces trois éléments.
 
 Les service workers fonctionnent uniquement sur HTTPS, pour des raisons de sécurité.  Les service workers est destinés à permettre la création d'expériences de navigation déconnectée efficaces, en interceptant les requêtes réseau et en effectuant des actions appropriées selon que le réseau est disponible et que des ressources mises à jour sont à disposition sur le serveur. Ils permettront aussi d'accéder aux APIs de notifications du serveur (push) et de synchronisation en arrière-plan.

![enter image description here](https://lh3.googleusercontent.com/KxlLmQK_2T-Oo1rSMKCq9IWAWvdqEtImdAiAh48l6uSlAiwsZh0SdUK6o-q_cQvoLlBVSO_WohYb)

### Fichier script.js

Avant d'utiliser un Service Worker, il faut le faire enregistrer par l'application. On enregistre généralement le Service Worker au chargement de la page. Dans le fichier `scripts.js`, complétez la fonction appelée au chargement du document avec le code suivant : 


```js

 if ('serviceWorker'  in  navigator){
	window.addEventListener('load', () => {
		navigator.serviceWorker.register("./sw.js")
		then(registration  => {
			console.log(registration)
			console.log('Service Worker enregistré',registration.scope)
	})
	.catch( Error  =>  console.log('registro de service worker fallido',Error))
	})
}
```
Rechargez la page, le log suivant devrait apparaitre une fois la page chargée.

![enter image description here](https://lh3.googleusercontent.com/ukf-mNAuSYdhEGpi6T4p0ydeZ-o9uz1P9HLzjfok6lk-ctzl4BmyQNVq8L_OBnBIopoMO7UyXSYn)

Cela signifie que le Service Worker a bien été enregistré. On peut vérifier cela en regardant dans l'onglet **Application** des Chrome Developer Tools, puis dans la sous-section **Service Workers**.

![enter image description here](https://lh3.googleusercontent.com/gpQ-T7acOkCEArmTdHkuCcr0PDF6mLxFsy8y1byKSzq0wr0XsYqpHggiobC528YjuuhlyC3CruKT)  

### Cycle de vie du Service Worker

Quand on enregistre un Service Worker, son cycle de vie démarre.Le schéma suivant représente les différentes étapes du cycle de vie d'un Service Workers 
![enter image description here](https://lh3.googleusercontent.com/D9KDGYH24FZlm-Kav-NKjIZK2jCFbkrEcxOsPr5DbhefME-CCVLDoC4KOK22oFThvhM5dEbVWlK_)


## Fichier 
#####  Les premières étapes sont l'installation et l'activation. Vérifions cela en ajoutant le code suivant dans le fichier _sw.js_.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzkwNDc2ODc3LDE0MzI2MzQyOTEsMTk0OD
MzODEyNywtMTcyNjgxMTU4MSwzMjIzMDAxMjldfQ==
-->