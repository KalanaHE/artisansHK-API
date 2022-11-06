const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const users = require('./data/users.json');
const teams = require('./data/teams.json');
const productCategories = require('./data/productCategories.json');
const productSubCategories = require('./data/productSubCategories.json');
const colorCategories = require('./data/colorCategories.json');
const colors = require('./data/colors.json');
const products = require('./data/products.json');
const villages = require('./data/villages.json');
const rmreleasePackageSizes = require('./data/rmreleasePackageSizes.json');
const artisans = require('./data/artisans.json');
const qcInspectors = require('./data/qcInspectors.json');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const seed = async () => {
    try {
        await prisma.$transaction(async (prisma) => {
            const _createdTeams = await prisma.teams.createMany({
                data: teams,
                skipDuplicates: true,
            });
            console.info('teams added!');

            const _users = users.map((user) => {
                const password = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS));
                return { ...user, password };
            });

            const _createdUsers = await prisma.users.createMany({
                data: _users,
                skipDuplicates: true,
            });
            console.info('users added!');

            const _createdProductCategories = await prisma.productCategories.createMany({
                data: productCategories,
                skipDuplicates: true,
            });
            console.info('product categories added!');

            const _createdProductSubCategories = await prisma.productSubCategories.createMany({
                data: productSubCategories,
                skipDuplicates: true,
            });
            console.info('product sub-categories added!');

            const _createdColorCategories = await prisma.colorCategories.createMany({
                data: colorCategories,
                skipDuplicates: true,
            });
            console.info('color categories added!');

            const _createdColors = await prisma.colors.createMany({
                data: colors,
                skipDuplicates: true,
            });
            console.info('colors added!');

            const _createdProducts = await prisma.products.createMany({
                data: products,
                skipDuplicates: true,
            });
            console.info('products added!');

            const _createdVillages = await prisma.villages.createMany({
                data: villages,
                skipDuplicates: true,
            });
            console.info('villages added!');

            const _createdRmreleasePackageSizes = await prisma.rmReleasePackageSizes.createMany({
                data: rmreleasePackageSizes,
                skipDuplicates: true,
            });
            console.info('rm release package sizes added!');

            const _createdArtisans = await prisma.artisans.createMany({
                data: artisans,
                skipDuplicates: true,
            });
            console.info('artisans added!');
        });
    } catch (e) {
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

seed();
