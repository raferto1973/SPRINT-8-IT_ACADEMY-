
// events.controller.ts

import { Request, Response } from 'express';
import connection from '../db/connection';

// Obtener todos los eventos
export const getEvents = (req: Request, res: Response) => {
    connection.query('SELECT * FROM events', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

// Obtener un solo evento por su ID
export const getEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('SELECT * FROM events WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

// Crear un nuevo evento
export const createEvent = (req: Request, res: Response) => {
    const { title, start, end, allDay } = req.body;
    connection.query('INSERT INTO events SET ?', { title, start, end, allDay }, (err, results) => {
        if (err) throw err;
        res.json({ message: 'Evento creado', event: { id: results.insertId, title, start, end, allDay } });
    });
};

// Actualizar un evento existente
export const updateEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, start, end, allDay } = req.body;
    connection.query('UPDATE events SET ? WHERE id = ?', [{ title, start, end, allDay }, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Evento actualizado' });
    });
};

// Eliminar un evento
export const deleteEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    connection.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Evento eliminado' });
    });
};
