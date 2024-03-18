
// Server.ts

import express, { Application } from 'express';
import connection from '../db/connection';
import cors from 'cors';

import routesPersonas from '../routes/activity.routes';
import markersRoutes from '../routes/markers.routes';
import eventsRoutes from '../routes/events.routes';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares(); 
        this.routes();
        this.conectarDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicació corrent per el port ', this.port);
        })
    }

    middlewares() {

        // Parseo del body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/activities', routesPersonas);
        this.app.use('/api/markers', markersRoutes);
        this.app.use('/api/events', eventsRoutes);
    }

    conectarDB() {
        connection.connect((err) => {
            if(err) throw err;
            console.log('Conectat a la base de dades')
        })
    }

}

export default Server;