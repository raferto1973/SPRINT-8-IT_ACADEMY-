
// Activity.controller.ts

import { Request, Response } from 'express';
import connection from '../db/connection';
import moment from 'moment';
import { format } from 'date-fns';

export const getActivities = (req: Request, res: Response) => {
    
    connection.query('SELECT * FROM activity', (err, data) => {
        if(err) throw err;
        res.json(data)

    })
}

export const getActivity = (req: Request, res: Response) => {
    
    const { id } = req.params;

    connection.query('SELECT * FROM activity WHERE id = ?', id, (err, data) => {
        if(err) throw err;
        res.json(data[0])
    })
    
}

export const deleteActivity = (req: Request, res: Response) => {
    
    const { id } = req.params;

    connection.query('DELETE FROM activity WHERE id = ?', id, (err, data) => {
        if(err) throw err;
        res.json({
            msg: 'activitat eliminada amb èxit'
        })
    })
}

export const postActivity = (req: Request, res: Response) => {
    
    const body = { ...req.body };
  
    connection.query('INSERT INTO activity set ?', body, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Error al agregar la actividad",
                error: err.message
            });
        }
        res.json({
            msg: 'Activitat agregada amb èxit'
        });
    });
}

export const putActivity = (req: Request, res: Response) => {
    const { body } = req; 
    const { id } = req.params;     
  
    
    connection.query('UPDATE activity set ? WHERE id = ?', [body, id], (err, data) => {
        if(err) throw err;

        res.json({
            msg: 'Activitat actualitzada amb èxit'
        })
    }) 
}