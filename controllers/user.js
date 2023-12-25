const Joi = require("joi");
const APIError = require("../utils/APIError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BCRPYT_SALTS = Number(process.env.BCRPYT_SALTS);
const { PrismaClient } = require("@prisma/client");
const User = new PrismaClient().user;

const allUsers = async () => {
    const data = await User.findMany({
        select: {
            uid: true,
            username: true,
            email: true,
            type: true,
        },
    });
    return {
        status: 200,
        message: "Fetched all users",
        data: data,
    };
};

const register = async (data) => {
    const { username, email, password, type } = data;
    const { error } = Joi.object({
        username: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        type: Joi.string().valid("user", "admin").required(),
    }).validate(data);

    if (error) throw new APIError(error.message, 400);

    const check = await User.findFirst({
        where: { type, OR: [{ username }, { email }] },
    });
    console.log(check);
    if (check) {
        throw new APIError("Email / Username already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, BCRPYT_SALTS);

    await User.create({
        data: {
            email,
            username,
            password: hashedPassword,
            type,
        },
    });
    return {
        status: 201,
        message: "User registered",
    };
};

const login = async (data) => {
    const { email, password, type } = data;
    
    const { error } = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        type: Joi.string().valid("user", "admin").required(),
    }).validate(data);

    if (error) throw new APIError(error.message, 400);

    const userData = await User.findFirst({
        where: { email, type },
    });

    if (!userData) {
        throw new APIError(`${type} not found`, 404);
    }

    const verifyPassword = await bcrypt.compare(
        password,
        userData.password
    );

    if (!verifyPassword) throw new APIError("Incorrect password", 400);

    const payloadObj = {
        userId: userData.uid,
        username: userData.username,
        email: userData.email,
        type: userData.type,
    };

    const token = jwt.sign(payloadObj, process.env.JWT_KEY);

    return {
        status: 200,
        message: "Logged in",
        data: {
            token,
        },
    };
};

module.exports = { register, login, allUsers };
