
// markers.controller.ts

import { Request, Response } from 'express';
import connection from '../db/connection';

export const getMarkers = (req: Request, res: Response) => {
    
    connection.query('SELECT * FROM markers', (err, data) => {
        if(err) throw err;
        res.json(data)

    })
}

export const getMarker = (req: Request, res: Response) => {
    
    const { id } = req.params;

    connection.query('SELECT * FROM markers WHERE id = ?', id, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })
    
}

export const deleteMarker = (req: Request, res: Response) => {
    
    const { id } = req.params;

    connection.query('DELETE FROM markers WHERE id = ?', id, (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'Marcador eliminat amb èxit'
        })
    })
}

export const postMarker = (req: Request, res: Response) => {
    
    const body = { ...req.body };

    connection.query('INSERT INTO markers set ?', body, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Error al afegir l'actividat",
                error: err.message
            });
        }
        res.json({
            msg: 'Marker agregat amb èxit'
        });
    });
}

export const putMarker = (req: Request, res: Response) => {
    const { body } = req; 
    const { id } = req.params; 
    
      
    connection.query('UPDATE markers set ? WHERE id = ?', [body, id], (err, data) => {
        if(err) throw err;

        res.json({
            msg: 'Activitat actualitzada amb èxit'
        })
    }) 
}
