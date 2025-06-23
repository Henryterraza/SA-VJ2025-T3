[REGRESAR](../../README.md)

# **MANUAL DE TECNICO**

![icono](Img-tecnico/Tecnico.png)

## BookShelf API

## **INDICE**

- [**MANUAL DE TECNICO**](#manual-de-tecnico)
  - [BookShelf API](#bookshelf-api)
  - [**INDICE**](#indice)
  - [**SOBRE EL PROGRAMA**](#sobre-el-programa)
  - [**CONOCIMIENTOS PREVIOS**](#conocimientos-previos)
  - [**ESPECIFICACIONES TECNICAS**](#especificaciones-tecnicas)
  - [**Instalación de Docker y Docker Compose**](#instalación-de-docker-y-docker-compose)
    - [**Windows**](#windows)
    - [**Linux**](#linux)
    - [**En macOS (Intel o Apple Silicon)**](#en-macos-intel-o-apple-silicon)
  - [**Configuración de red y puertos.**](#configuración-de-red-y-puertos)
    - [**Configuracion de Dockerfile backend**](#configuracion-de-dockerfile-backend)
    - [**Configuracion de Dockerfile frontend**](#configuracion-de-dockerfile-frontend)
    - [**Configuracion de archivo .dockerignore para backend y frontend**](#configuracion-de-archivo-dockerignore-para-backend-y-frontend)
  - [**Uso del archivo docker-compose.yml**](#uso-del-archivo-docker-composeyml)
  - [**Conexión a la base de datos remota**](#conexión-a-la-base-de-datos-remota)
  - [Variables de entorno necesarias.](#variables-de-entorno-necesarias)
  - [Verificación del funcionamiento desde el navegador/postman.](#verificación-del-funcionamiento-desde-el-navegadorpostman)
  - [comandos para el despliegue con terraform](#comandos-para-el-despliegue-con-terraform)
  - [Evidencia gráfica de despliegue (capturas de pantalla, IPs expuestas,contenedores corriendo).](#evidencia-gráfica-de-despliegue-capturas-de-pantalla-ips-expuestascontenedores-corriendo)

## **SOBRE EL PROGRAMA**

Este manual técnico documenta el proceso de despliegue de la aplicación BookShelf API utilizando la infraestructura en la nube de Google Cloud Platform (GCP). La finalidad es validar la correcta integración y funcionamiento del módulo funcional desarrollado en la práctica anterior, dentro de un entorno que simula producción.

Los estudiantes accedieron a una máquina virtual (VM) provisionada con Google Compute Engine, conectándose mediante SSH o herramientas como Termius. En esta VM se realizó la instalación y configuración de Docker y Docker Compose, para gestionar la orquestación de los servicios backend y frontend.

La aplicación se clonó desde un repositorio remoto y fue desplegada a través de un archivo docker-compose.yml que integra el backend (API) y el frontend. Para la persistencia de datos, se configuró una instancia de PostgreSQL gestionada en Google Cloud SQL, garantizando alta disponibilidad y escalabilidad.

## **CONOCIMIENTOS PREVIOS**

Para seguir correctamente este manual técnico y operar el código desplegado, se recomienda que las personas tengan conocimientos mínimos en las siguientes áreas:

- Conocimientos básicos de Linux y uso de la terminal (líneas de comandos).
- Manejo básico de SSH para conexiones remotas.
- Conocimientos básicos de Docker y Docker Compose para la gestión de contenedores.
- Conocimientos básicos de Git para la clonación y manejo de repositorios.
- Conceptos fundamentales de bases de datos relacionales y PostgreSQL.
- Conocimientos básicos sobre servicios en la nube, especialmente Google Cloud Platform (GCP).
- Familiaridad con el uso de herramientas para pruebas de APIs como Postman o cURL.
- Conocimientos básicos de variables de entorno y configuración de archivos .env.
- Familiaridad con conceptos de redes como puertos y firewalls.

## **ESPECIFICACIONES TECNICAS**

Se debe cumplir con los siguientes requisitos antes de usar el programa.

- **Sistema operativo:** Linux (Ubuntu 20.04 o superior) u otro compatible con Docker
- **Lenguaje de programación:** Node.js (o el lenguaje utilizado en la API)
- **Herramienta de contenedores:** Docker (versión 20.10 o superior)
- **Orquestador de contenedores:** Docker Compose (versión 1.29 o superior)
- **Proveedor de nube:** Google Cloud Platform (GCP)
- **Base de datos:** PostgreSQL (Google Cloud SQL, versión 13 o superior)
- **Cliente SSH:** Termius, OpenSSH o similar
- **Navegador web:** Google Chrome, Mozilla Firefox o similar
- **Herramientas para pruebas:** Postman, cURL
- **Editor de código:** Visual Studio Code, Sublime Text, u otro editor de texto

## **Instalación de Docker y Docker Compose**

### **Windows**

1. Descargar Docker Desktop desde el sitio oficial:
   https://www.docker.com/products/docker-desktop

2. Ejecutar el instalador y seguir los pasos del asistente.

3. Durante la instalación, asegurarse de habilitar la opción de WSL 2 y la instalación del backend de Linux si se solicita.

4. Reiniciar el sistema si es necesario.

5. Abrir Docker Desktop y verificar que se esté ejecutando correctamente.

6. Verificar la instalación desde PowerShell o CMD:

   ```bash
   docker --version
   docker compose --version
   ```

### **Linux**

1. Buscar la distribucion en el siguiente enlace https://docs.docker.com/desktop/setup/install/linux/
2. Se usara ubuntu para este ejemplo, con instalacion por terminal con repositorio de apt
3. Configurar el repositorio apt de Docker.

   ```bash
   # Add Docker's official GPG key:
   sudo apt-get update
   sudo apt-get install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add the repository to Apt sources:
   echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
   $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt-get update
   ```

4. Instalar la ultima version de los paquetes de docker
   ```bash
   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```
5. Crear un grupo de docker y agregar tu usuario
6. Crear el grupo de docker.
   ```bash
   sudo groupadd docker
   ```
7. agregar tu usuario al grupo de docker
   ```bash
   sudo usermod -aG docker $USER
   ```
8. Verificar la instalación desde PowerShell o CMD:

   ```bash
   docker --version
   docker compose --version
   ```

### **En macOS (Intel o Apple Silicon)**

1. Descargar **Docker Desktop** desde el sitio oficial:  
   [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. Seleccionar la versión correspondiente según tu procesador:

   - Para equipos con procesador **Intel**: `Docker Desktop for Mac with Intel Chip`
   - Para equipos con **Apple Silicon (M1/M2)**: `Docker Desktop for Mac with Apple Chip`

3. Abrir el archivo `.dmg` descargado y arrastrar Docker a la carpeta **Aplicaciones**.

4. Ejecutar Docker Desktop desde la carpeta de Aplicaciones.

5. Esperar a que Docker se inicie completamente (debe mostrar “Docker is running” en la barra superior).

6. Verificar la instalación desde la terminal:
   ```bash
   docker --version
   docker compose --version
   ```

## **Configuración de red y puertos.**

| Servicio    | Puerto | Protocolo | Descripción                           |
| ----------- | ------ | --------- | ------------------------------------- |
| SSH         | 22     | TCP       | Acceso remoto a la VM                 |
| API backend | 8000   | TCP/HTTP  | Puerto típico de APIs Node.js/Express |
| Frontend    | 3000   | TCP/HTTP  | Puerto HTTP estándar                  |
| PostgreSQL  | 5432   | TCP       | Puerto de la base de datos            |

### **Configuracion de Dockerfile backend**

Configuraciones del dockerfile

```dockerfile
## la imagen de node que se usara
FROM node:20-alpine

## el directorio donde se alojara el proyecto
WORKDIR /app

## se copian el archivo de configuraciones del package.json
COPY package.json ./

## se instala los paguetes
RUN npm install

## se copia todos los archivos
COPY . .

## se expone el puerto
EXPOSE 8000

## se ejecuta el comando para correr el proyecto
CMD ["npm", "start"]
```

### **Configuracion de Dockerfile frontend**

Configuraciones del dockerfile

```dockerfile
## la imagen de node que se usara
FROM node:20-alpine

## el directorio donde se alojara el proyecto
WORKDIR /app

## se copian el archivo de configuraciones del package.json
COPY package.json ./

## se instala los paguetes
RUN npm install

## se copia todos los archivos
COPY . .

## se expone el puerto
EXPOSE 3000

## se ejecuta el comando para correr el proyecto
CMD ["npm", "start"]
```

### **Configuracion de archivo .dockerignore para backend y frontend**

Se especifican que archivos no se requiere que se copie a la imagen

```dockerignore
node_modules
Dockerfile
```

## **Uso del archivo docker-compose.yml**
Se tiene las siguientes especificaciones del archivo yml para nuestro despliegue con docker compose
```yml
# version de do
version: "3.8"

# se crean los servicios 
services:

# servicio de backend
  backend:
  # el directorio donde esta el backend
    build: ./Backend
    # nombre del contenedor para nuestro backend
    container_name: server_backend
    # que se restaure siempre
    restart: always
    # puerto a exponer
    ports:
      - "8000:8000"
    # configuracion de los volumnes 
    volumes:
      - ./Backend:/app
       - /app/node_modules

    # que red usara dentro de los contenedores
    networks:
      - BookShelfAPI

# servicio de frontend
  client:
  # el directorio donde esta el frontend
    build: ./Frontend/bookshelf
    # nombre del contenedor para nuestro frontend
    container_name: server_frontend
     # que se restaure siempre
    restart: always
    # puerto a exponer
    ports:
      - "3000:3000"
    # configuracion de los volumnes 
    volumes:
      - ./Frontend/bookshelf:/app
      - /app/node_modules
    # que red usara dentro de los contenedores
    networks:
      - BookShelfAPI

    # antes de iniciarse debe ya estar listo el backend
    depends_on:
      - backend

# se crea la red para usarse solo entre los contenedores
networks:
  BookShelfAPI:
    driver: bridge
```

## **Conexión a la base de datos remota**
Configuraciones para la conexion a la db 
![configuraciones de conexiones a db](Img-tecnico/confConecDB.png)

Verificacion de conexion exitosa
![Prueba de conexion](Img-tecnico/PruebaConexion.png)

## Variables de entorno necesarias.
se manejan las varaibles de entorno desde el archivo de ansible
![variables de entorno](Img-tecnico/VariablesEntorno.png)

## Verificación del funcionamiento desde el navegador/postman.
Verificacion de que la aplicacion esta corriendo desde el navegador
![Aplicacion desde navegador](Img-tecnico/Navegador.png)

verificacion de prueba de conexion de postman a backend
![Creacion de usuario con postman](Img-tecnico/Postman.png)

## comandos para el despliegue con terraform
para levantar correctamente el proyecto en la nube se necesitara de los siguientes pasos, se necesita configurar el `providers.tf` con el proyecto creado en GCP 

![Provider](Img-tecnico/Provader.png)

ya cambiado se necesitara desplegar la instancia de la base de datos

- se necesita estar en el directorio `P2/Infraestuctura/TerraformDatabase`
- ejecutar los comandos de 
  ```bash
  # para inicializar 
  terraform init

  terraform plan

  # para levantar la instancia de la db
  terraform apply 
  ``` 

- luego ir al directorio de `P2/Infraestructura`
- ejecuats los comandos 
   ```bash
  # para inicializar 
  terraform init

  terraform plan

  # para levantar la instancia de la db
  terraform apply 
  ``` 

- para borrar las instancias ejecutar el comando en sus respectivos directorios
  ```bash
  terraform destroy
  ```



## Evidencia gráfica de despliegue (capturas de pantalla, IPs expuestas,contenedores corriendo).
Despliegue de instancias 
![Despliegue](Img-tecnico/Despliegue.png)

Puertos expuestos para la conexiones
![puertos expuestos](Img-tecnico/PuertosExpuestos.png)

Instancia de VM levantado
![Intancia vm](Img-tecnico/InstanciaVM.png)

Instancia de Base de datos levantado
![Instancia db](Img-tecnico/InstanciaDB.png)

Contenedores levantados en la VM
![Contenedores levantados](Img-tecnico/ContenedoresRun.png)

Conexion del contenedor del backend a la base de datos
![Conexion de backen a db](Img-tecnico/ConexionBackend.png)


[REGRESAR](../../README.md)
