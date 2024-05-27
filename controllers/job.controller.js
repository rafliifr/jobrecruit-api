const { PrismaClient } = require('@prisma/client');
const NotFoundError = require('../errors/NotFoundError');

const prisma = new PrismaClient();

const getAllJobs = async (req, res, next) => {
  try {
    const allJobs = await prisma.job.findMany();

    return res.status(200).json({
      message: 'Success',
      data: allJobs,
    });
  } catch (error) {
    return next(error);
  }
};

const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundError('Job tidak ditemukan');
    }

    return res.status(200).json({
      message: 'Success',
      data: job,
    });
  } catch (error) {
    return next(error);
  }
};

const addJob = async (req, res, next) => {
  try {
    const { id, company, position } = req.body;

    const newJob = await prisma.job.create({
      data: {
        id,
        company,
        position,
      },
    });

    return res.status(201).json({
      message: 'Job berhasil ditambahkan',
      data: newJob,
    });
  } catch (error) {
    return next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, position } = req.body;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundError('Job tidak ditemukan');
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        company,
        position,
      },
    });

    return res.status(200).json({
      message: 'Job berhasil diperbarui',
      data: updatedJob,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundError('Job tidak ditemukan');
    }

    await prisma.job.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'Job berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
};
