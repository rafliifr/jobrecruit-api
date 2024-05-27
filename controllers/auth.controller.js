const { PrismaClient } = require('@prisma/client');
const AuthenticationError = require('../errors/AuthenticationError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AuthenticationError('Email atau password salah');
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new AuthenticationError('Email atau password salah');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '6h',
    });

    return res.cookie('token', token).status(200).json({
      message: 'User berhasil login',
      token,
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({
      message: 'Success',
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  logout,
};