<!-- https://www.youtube.com/watch?v=2jRYxuuWGFI&t=405s -->

CREACIÓ DEL BACKEND

1- En la termninal, iniciem el projecte ( instalar package.json ):

        npm init --y

2- Fem proba creant un arxiu index.js i dintre una constant i fent console.log. Per executar-ho a la terminal:

        node index.js

3- Instal.lem Typescript en desenvolupament a la termnial:

        npm i typescript --save-dev

4- Inicialitzar typescript:

        tsc --init

5- Creem un arxiu index.ts i creamos una constante para probar y lo ejecutamos con el comando tsc y luego
podemos ejecutarlo como node index.js:

        const nombre: string = 'Tomas';
        const apellido: string = 'Gonzalez';

        console.log(nombre + ' ' + apellido);
        console.log('apellido:', apellido)

6- Creem carpeta amb el nom "dist"

7- En el tsconfig.json hem de modificar el següent:

        Modifiquem el Outdir i li afegim al carpeta ./dist

8-  Afegim una carpeta "src" i fiquem el index.ts a dintre

9-  Creem dintre de src una carpeta que es diu models, i dintre un arxiu que es digui server.ts, i dintre creem:

                class Server {
                }
                export default Server;

10- En index.ts eliminem el que teniem i creem :

            import Server from "./models/server";   
            Server;

11- Instalamos express:

            npm i express

