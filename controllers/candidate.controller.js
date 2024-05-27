const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCandidates = async (req, res, next) => {
  try {
    const candidates = await prisma.candidate.findMany();

    return res.status(200).json({
      data: candidates,
    });
  } catch (error) {
    return next(error);
  }
};

const getCandidateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const candidate = await prisma.candidate.findUnique({
      where: {
        id,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        message: 'Kandidat tidak ditemukan',
      });
    }

    return res.status(200).json({
      data: candidate,
    });
  } catch (error) {
    return next(error);
  }
};

const addCandidate = async (req, res, next) => {
    try {
      const candidate = req.body;
  
      const newCandidate = await prisma.candidate.create({
        data: candidate,
      });
  
      return res.status(201).json({
        message: 'Kandidat baru berhasil ditambahkan',
        data: newCandidate,
      });
    } catch (error) {
      return next(error);
    }
  };

const updateCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isCandidateExist = await prisma.candidate.findUnique({
      where: {
        id,
      },
    });

    if (!isCandidateExist) {
      return res.status(404).json({
        message: 'Kandidat tidak ditemukan',
      });
    }

    const { name, email, phoneNumber } = req.body;

    const updatedCandidate = await prisma.candidate.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    return res.status(200).json({
      message: 'Kandidat berhasil diperbarui',
      data: updatedCandidate,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCandidate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const isCandidateExist = await prisma.candidate.findUnique({
      where: {
        id,
      },
    });

    if (!isCandidateExist) {
      return res.status(404).json({
        message: 'Kandidat tidak ditemukan',
      });
    }

    await prisma.candidate.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: 'Kandidat berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllCandidates,
  getCandidateById,
  addCandidate,
  updateCandidate,
  deleteCandidate,
};
