

import { Router } from 'express';
import { deleteActivity, getActivities, getActivity, postActivity, putActivity } from '../controllers/activity.controller';


const router = Router();

router.get('/', getActivities);
router.get('/:id', getActivity);
router.delete('/:id', deleteActivity);
router.post('/', postActivity);
router.put('/:id', putActivity);


export default router; 