import {
  createProject as createProjectService,
  deleteProject as deleteProjectService,
  getProjectById,
  getProjects as getProjectsService,
  updateProject as updateProjectService,
} from '../services/project.service.js';

export const createProject = async (req, res, next) => {
  try {
    const project = await createProjectService(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        project,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const result = await getProjectsService(req.query);

    return res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await getProjectById(req.params.idOrSlug);

    return res.status(200).json({
      success: true,
      message: 'Project fetched successfully',
      data: {
        project,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await updateProjectService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: {
        project,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await deleteProjectService(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {
        project,
      },
    });
  } catch (error) {
    return next(error);
  }
};
