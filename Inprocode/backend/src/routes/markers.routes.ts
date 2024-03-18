
// markers.routes.ts

import { Router } from 'express';
import { getMarkers, postMarker, putMarker, deleteMarker, getMarker } from '../controllers/markers.controller';

const router = Router();

router.get('/', getMarkers);
router.get('/:id', getMarker);
router.post('/', postMarker);
router.delete('/:id', deleteMarker);
router.put('/:id', putMarker);



export default router;
