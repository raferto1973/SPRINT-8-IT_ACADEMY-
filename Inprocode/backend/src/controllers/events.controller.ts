


// events.controller.ts

import { Request, Response } from 'express';
import connection from '../db/connection';
import { OkPacket, RowDataPacket } from 'mysql2';

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
    connection.query('SELECT * FROM events WHERE id = ?', [id], (err, results: RowDataPacket[]) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

// Crear un nuevo evento
export const createEvent = (req: Request, res: Response) => {
    const { title, start, end, color } = req.body;
    
    // Validación de campos requeridos
    if (!title || !start || !end) {
        return res.status(400).json({ message: "Los campos 'title', 'start' y 'end' son obligatorios." });
    }

    connection.query('INSERT INTO events SET ?', { title, start, end, color }, (err, results: OkPacket) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al crear el evento." });
        }
        res.json({ message: 'Evento creado', event: { id: results.insertId, title, start, end, color } });
    });
};

// Actualizar un evento existente
export const updateEvent = (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, start, end, color } = req.body;

    // Validación de campos requeridos
    if (!title || !start || !end) {
        return res.status(400).json({ message: "Los campos 'title', 'start' y 'end' son obligatorios." });
    }

    connection.query('UPDATE events SET ? WHERE id = ?', [{ title, start, end, color }, id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al actualizar el evento." });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }
        res.json({ message: 'Evento actualizado' });
    });
};


// Eliminar un evento
export const deleteEvent = (req: Request, res: Response) => {
    const { id } = req.params;

    connection.query('DELETE FROM events WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error al eliminar el evento." });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Evento no encontrado.' });
        }
        res.json({ message: 'Evento eliminado' });
    });
};

