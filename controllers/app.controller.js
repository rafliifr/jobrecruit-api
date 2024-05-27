const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllApplications = async (req, res, next) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        candidate: true,
        job: true,
      },
    });

    return res.status(200).json({
      data: applications,
    });
  } catch (error) {
    return next(error);
  }
};

const getApplicationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        candidate: true,
        job: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: 'Lamaran tidak ditemukan',
      });
    }

    return res.status(200).json({
      data: application,
    });
  } catch (error) {
    return next(error);
  }
};

const addApplication = async (req, res, next) => {
    try {
      const application = req.body;
  
      const candidate = await prisma.candidate.findUnique({
        where: { id: application.candidateId },
      });
  
      const job = await prisma.job.findUnique({
        where: { id: application.jobId },
      });
  
      if (!candidate || !job) {
        return res.status(400).json({
          message: 'Kandidat atau pekerjaan tidak ditemukan',
        });
      }
  
      const newApplication = await prisma.application.create({
        data: application,
      });
  
      return res.status(201).json({
        message: 'Lamaran baru berhasil ditambahkan',
        data: newApplication,
      });
    } catch (error) {
      return next(error);
    }
  };

const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const isApplicationExist = await prisma.application.findUnique({
      where: { id },
    });

    if (!isApplicationExist) {
      return res.status(404).json({
        message: 'Lamaran tidak ditemukan. Status gagal diubah',
      });
    }

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      message: 'Status lamaran berhasil diubah',
      data: updatedApplication,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteApplication = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isApplicationExist = await prisma.application.findUnique({
      where: { id },
    });

    if (!isApplicationExist) {
      return res.status(404).json({
        message: 'Lamaran tidak ditemukan. Tidak bisa dihapus',
      });
    }

    await prisma.application.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'Lamaran berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllApplications,
  getApplicationById,
  addApplication,
  updateApplicationStatus,
  deleteApplication,
};
