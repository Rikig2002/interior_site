import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from '../controllers/project.controller.js';
import { authorizeRoles, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/:idOrSlug', getProject);

router.use(protect, authorizeRoles('admin'));

router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
