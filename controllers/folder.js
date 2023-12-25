const { PrismaClient } = require('@prisma/client');
const APIError = require('../utils/APIError');
const Folder = new PrismaClient().folder;

const createFolder = async (userId, name) => {
    const check = await Folder.findFirst({
        where: {foldername: name}
    })

    if(check) throw new APIError('Folder with same name already exists', 409);

    return {
        status: 500,
        message: "API not yet finished"
    }
}

module.exports = { createFolder }