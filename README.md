"# inbox-app" 
Descripción General del Proyecto
Este proyecto implementa un módulo completo tipo Inbox estilo plataforma de soporte, cumpliendo con los requisitos establecidos en la prueba técnica:
•	Autenticación JWT
•	Listado de hilos de conversación
•	Visualización de mensajes dentro de un hilo
•	Envío de nuevas respuestas
•	UI profesional
•	Comunicación entre backend y frontend mediante API REST
•	Separación clara de responsabilidades o arquitectura
El sistema permite que un usuario:
1.	Inicie sesión
2.	Cree nuevos hilos
3.	Liste todos sus hilos
4.	Abra un hilo para ver los mensajes
5.	Envíe respuestas dentro de ese hilo

Arquitectura del Sistema
El proyecto está dividido en dos aplicaciones:
inbox-app
•	backend      	Laravel 10 API (JWT, routes, controllers, models)
•	frontend     	React + Vite + TypeScript (UI, routing, context)
•	README.md  (Descripción de proyecto)
Backend – Laravel
•	MVC con controladores REST
•	Autenticación basada en JWT
•	Middlewares para rutas
•	Modelos: User, Thread, Message
•	Migraciones y relaciones Eloquent
•	Validaciones y control de errores
Frontend – React + TypeScript
•	Manejo global de sesión con AuthContext
•	Consumo de API vía Axios con Interceptors
•	Navegación con React Router
•	Estilos profesionales CSS
•	Componentes reutilizables
•	Estado manejado con Hooks

Autenticación (JWT)
Endpoints principales:
Método	Ruta	Descripción
POST	/api/login	Iniciar sesión y recibir token
GET	/api/user	Datos del usuario autenticado
POST	/api/logout	Cerrar sesión
POST	/api/refresh	Refrescar token
El frontend almacena el token en localStorage y lo envía automáticamente mediante un interceptor Axios.

APIs del Inbox
Conversaciones / Threads
Método	Ruta	            Descripción
GET	/api/threads	            Listar hilos del usuario
GET	/api/threads/  	        Mensajes
POST	/api/threads	         Crear hilo nuevo con mensaje inicial
		

Mensajes
Método	Ruta	Descripción
POST	/api/threads/messages	Enviar respuesta

Instalación y Ejecución
Requisitos
•	PHP 8.1+
•	Composer
•	MySQL 
•	Node.js 18+
•	NPM 9+
•	XAMPP 

Backend – Instalación
cd backend
composer install
cp .env.example .env
php artisan key:generate
Configurar base de datos en .env
DB_DATABASE=inbox
DB_USERNAME=root
DB_PASSWORD=
Ejecutar migraciones:
php artisan migrate
Iniciar servidor:
php artisan serve
•	Backend correrá en:
•	http://127.0.0.1:8000

Frontend – Instalación
cd frontend
npm install
npm run dev
Frontend correrá en:
http://localhost:5173

Puntos Técnicas Importantes
1. JWT como mecanismo de autenticación
Elegido por:
•	Seguridad
•	Simplicidad para APIs
•	Facilidad de uso con Axios interceptors
•	Estándar para proyectos modernos
Solicitado en el proyecto con JWT.
2. React + Vite + TypeScript
Razones:
•	Vite ofrece un entorno rápido y moderno
•	TypeScript 
•	React Router permite navegación clara entre pantallas (Login, Inbox, Thread )
•	Context API solo las llamas
3. Arquitectura limpia
•	Api con clientes Axios 
•	Pages como vistas principales
•	Components para elementos UI reutilizables
•	Context para sesión
4. UI 
•	Layout 
•	Componentes fáciles
•	Estilos CSS organizados en index.css

 Capturas de Pantalla 
http://localhost:5173/login
 <img width="684" height="559" alt="image" src="https://github.com/user-attachments/assets/b19b900c-5cdf-4abe-bccf-fcfab727f61e" />

Descripción: Es el Loguin principal para iniciar sesión, por default esta el correo y el password cargado. Solo hay que presionar el botón de Entrar.
 <img width="921" height="340" alt="image" src="https://github.com/user-attachments/assets/40171c8c-df32-435a-a207-a3ef8182d668" />

Es la pantalla principal, de lado izquierdo se crean los hilos donde describes el asunto y el mensaje, al crear un hilo se registra y queda almacenado en la base de datos, después es agregado de lado derecho de la pantalla.
De lado derecho, es el listado de los hilos existentes dados de alta con anterioridad, al darle clic a cada hilo se envía al historial de todos los mensajes escritos en el hilo seleccionado.
 <img width="921" height="525" alt="image" src="https://github.com/user-attachments/assets/36e98fe2-79fe-4512-a492-6a622bdc4d43" />

Al seleccionar el hilo se aparece como titulo resaltado en negrita y se muestra el listado completo de todos los mensajes resaltando el texto, la fecha y la hora del envió del mensaje, en la parte posterior podemos agregar nuevos textos al hilo y agregarlos con el botón inferior.


Uso de IA (ChatGPT) 
IA utilizada:
•	ChatGPT fue utilizado como asistente técnico durante el desarrollo.
Adaptaciones realizadas:
•	Todo el código generado fue revisado, corregido y adaptado manualmente.
•	Se modificaron estructuras para ajustarse a buenas prácticas:
o	Separación de responsabilidades
o	Nombres claros de variables
o	Manejo de errores
o	Verificacion correcto en TypeScript
o	Estilos CSS condensados en estructura 
Justificación:
•	La IA se utilizó como apoyo para acelerar tareas, pero la arquitectura, decisiones técnicas y correcciones fueron realizadas manualmente.
•	Se verificó funcionalidad real tanto en backend como frontend.

Pruebas Incluidas
Backend
•	Validación de entradas (request validation)
•	Manejo de tokens
•	Comprobación de autorizaciones por middleware
Frontend
•	Validación de formularios
•	Manejo de sesión
•	Render condicional de vistas según autenticación

Control de Versiones (Git)
Para cumplir la prueba:
•	Commits ordenados, con mensajes descriptivos
•	Historial donde se modificaron los Commits (no un solo commit gigante) 
•	Reescritura de historial para claridad profesional en diferentes commits
Ejemplo de commits:
Setup Laravel backend con JWT,  inbox  y API


Prompt utlizados en ChatGPT

Tú dijiste:
ahora al crear la base de datos me aparece el siguiente error Error MySQL ha dicho: Documentación No se estableció la conexión: los parámetros están incorrectos. mysqli::real_connect(): (HY000/2002): No se puede establecer una conexión ya que el equipo de destino denegó expresamente dicha conexión La conexión para controluser, como está definida en su configuración, fracasó. mysqli::real_connect(): (HY000/2002): No se puede establecer una conexión ya que el equipo de destino denegó expresamente dicha conexión phpMyAdmin intentó conectarse con el servidor MySQL, y el servidor rechazó esta conexión. Deberá revisar el host, nombre de usuario y contraseña en config.inc.php y asegurarse que corresponden con la información provista por el administrador del servidor MySQL.
ChatGPT Plus
Pensó durante 29s
Ese error ya no es de Laravel ni de Composer, es MySQL que no está aceptando conexiones.
Traducción rápida: el servidor MySQL no está corriendo o está mal configurado en XAMPP/phpMyAdmin.
Tú dijiste:
al instalar y configurar JWT para autenticación aparece el siguiente error Installation failed, reverting ./composer.json and ./composer.lock to their original content.
ChatGPT Plus
Pensó durante 2m 4s
Buen ojo en capturar el mensaje 👌
Esa línea de:
Installation failed, reverting ./composer.json…
no es el error real, es solo lo que Composer hace al final cuando algo salió mal.
Lo importante está unas líneas arriba, casi seguro diciendo algo como:
lcobucci/jwt X.X.X requires ext-sodium

Tú dijiste:
si dice esto To enable extensions, verify that they are enabled in your .ini files: - C:\xampp\php\php.ini You can also run php --ini in a terminal to see which files are used by PHP in CLI mode. Alternatively, you can run Composer with --ignore-platform-req=ext-sodium to temporarily ignore these required extensions. You can also try re-running composer require with an explicit version constraint, e.g. "composer require php-open-source-saver/jwt-auth:*" to figure out if any version is installable, or "composer require php-open-source-saver/jwt-auth:^2.1" if you know which you need.
ChatGPT Plus
Pensó durante 20s
Perfecto, justo ahí está la pista: falta una extensión de PHP (muy probablemente ext-sodium) en tu archivo php.ini de XAMPP.
Ese mensaje de Composer te está diciendo:


Tú dijiste:
me apareció este error Generating optimized autoload files > Illuminate\Foundation\ComposerScripts::postAutoloadDump > @php artisan package:discover --ansi Warning: Module "openssl" is already loaded in Unknown on line 0 PHP Warning: Module "openssl" is already loaded in Unknown on line 0 INFO Discovering packages. laravel/pail ......................... DONE laravel/sail ......................... DONE laravel/tinker ....................... DONE nesbot/carbon
ChatGPT Plus
Pensó durante 23s
Buenísimo: el paquete de JWT ya se instaló bien ✅
Lo importante es esta parte:
php-open-source-saver/jwt-auth ....... DONE
Using version ^2.8 for php-open-source-saver/jwt-auth
El único “feo” es el warning:

Tú dijiste:
en la ruta backend/app/Http/ no existe un archivo llamado Kernel.php
ChatGPT Plus
Pensó durante 39s
Buenísima observación, esto que te pasa tiene todo el sentido:
en Laravel 11 ya no existe app/Http/Kernel.php. Mis instrucciones anteriores eran del estilo Laravel 10, así que aquí corregimos el rumbo 💪
En Laravel 11:
•	El “Kernel” se reemplazó por configuración en bootstrap/app.php. Laravel News+1
•	Tú dijiste:
•	me muestra el siguiente error C:\xampp\htdocs\inbox-app\backend>backend/config/auth.php "backend" no se reconoce como un comando interno o externo, programa o archivo por lotes ejecutable. C:\xampp\htdocs\inbox-app\backend>cd backend/config/auth.php El sistema no puede encontrar la ruta especificada. C:\xampp\htdocs\inbox-app\backend>php artisan route:list --path=api ReflectionException Class "App\Http\Controllers\AuthController" does not exist at vendor\laravel\framework\src\Illuminate\Foundation\Console\RouteListCommand.php:235 231▕ if ($this->isFrameworkController($route)) { 232▕ return false; 233▕ } 234▕ ➜ 235▕ $path = (new ReflectionClass($route->getControllerClass())) 236▕ ->getFileName(); 237▕ } else { 238▕ return false; 239▕ } 1 vendor\laravel\framework\src\Illuminate\Foundation\Console\RouteListCommand.php:235 ReflectionClass::__construct("App\Http\Controllers\AuthController") 2 vendor\laravel\framework\src\Illuminate\Foundation\Console\RouteListCommand.php:149 Illuminate\Foundation\Console\RouteListCommand::isVendorRoute(Object(Illuminate\Routing\Route)) 
ChatGPT Plus
•	Pensó durante 31s
•	Buenísimo, ya con ese error vemos claramente qué falta 🙌
•	Están pasando dos cosas distintas:
Tú dijiste:
me aparece lo mismo efrai@one MINGW64 ~ $ cd /c/xampp/htdocs/inbox-app/backend efrai@one MINGW64 /c/xampp/htdocs/inbox-app/backend $ php artisan tinker Psy Shell v0.12.16 (PHP 8.2.12 — cli) by Justin Hileman New PHP manual is available (latest: 3.0.1). Update with doc --update-manual > \App\Models\User::all(); ParseError syntax error, unexpected token "<", expecting end of file. > \App\Models\User::all(); ParseError syntax error, unexpected token "<", expecting end of file. > 
ChatGPT Plus
•	Pensó durante 35s
•	Perfecto, gracias por insistir con el detalle 🙌
Viendo lo que pasa en Git Bash, ya está clarísimo:
•	👉 Tinker en tu máquina está roto (PsySH + consola + encoding raro)
👉 Pero NO lo necesitamos para seguir con el proyecto.
Así que: olvidémonos de Tinker por completo

Tú dijiste:
salio este error Status: 401 Unauthorized
ChatGPT Plus
Pensó durante 18s
Perfecto, ya estamos en la parte interesante: el servidor responde, pero ahora te marca:
Status: 401 Unauthorized
Ese código significa siempre:
“No estás autenticado correctamente”.
La causa exacta depende de qué endpoint estás llamando.
Tú dijiste:
en headers tengo User-Agent Thunder Client (https://www.thunderclient.com), Accept Application/json, Content-Type Application/json esto es correcto
ChatGPT Plus
Pensó durante 23s
Muy bien, gracias por los detalles.
Lo que tienes ahora en Thunder Client:
•	User-Agent: Thunder Client (https://www.thunderclient.com)
•	Accept: Application/json
•	Content-Type: Application/json
es suficiente y correcto para el endpoint /api/login.
El problema del 401 Unauthorized NO está en esos headers, sino en una de estas dos



