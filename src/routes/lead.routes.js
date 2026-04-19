import { Router } from 'express';
import {
  createLead,
  deleteLead,
  getAllLeads,
  getLead,
  updateLead,
} from '../controllers/lead.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validate.middleware.js';
import { createLeadSchema, updateLeadSchema } from '../utils/validators/lead.validator.js';

const router = Router();

router.post('/', validate(createLeadSchema), createLead);

router.use(protect, authorizeRoles('admin'));

router.get('/', getAllLeads);
router.get('/:id', getLead);
router.patch('/:id', validate(updateLeadSchema), updateLead);
router.delete('/:id', deleteLead);

export default router;
