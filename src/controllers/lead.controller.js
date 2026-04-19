import {
  createLead as createLeadService,
  deleteLead as deleteLeadService,
  getLeadById,
  getLeads,
  updateLead as updateLeadService,
} from '../services/lead.service.js';

export const createLead = async (req, res, next) => {
  try {
    const lead = await createLeadService(req.body);

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: {
        lead,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllLeads = async (req, res, next) => {
  try {
    const result = await getLeads(req.query);

    return res.status(200).json({
      success: true,
      message: 'Leads fetched successfully',
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.data,
    });
  } catch (error) {
    return next(error);
  }
};

export const getLead = async (req, res, next) => {
  try {
    const lead = await getLeadById(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Lead fetched successfully',
      data: {
        lead,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const lead = await updateLeadService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: {
        lead,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const lead = await deleteLeadService(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: {
        lead,
      },
    });
  } catch (error) {
    return next(error);
  }
};
