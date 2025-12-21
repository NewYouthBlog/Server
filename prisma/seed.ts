import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');
    // Ensure connection
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (e) {
        console.error('Failed to connect to database', e);
        throw e;
    }

    const user = await prisma.users.findFirst({
        where: {
            username: 'admin',
        },
    });

    if (!user) {
        console.log('Admin user not found, creating...');
        await prisma.users.create({
            data: {
                username: 'admin',
                password: 'lcg9899',
                role: Role.admin,
            },
        });
        console.log('Created admin user');
    } else {
        console.log('Admin user already exists');
    }
}

main()
    .catch((e) => {
        console.error('Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
