import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	// 创建用户
	async create(createUserDto: CreateUserDto) {
		const finduser = await this.prisma.users.findFirst({
			where: {
				username: createUserDto.username,
			},
		});
		if (finduser) {
			throw new BadRequestException("用户名已存在");
		}
		const user = await this.prisma.users.create({
			data: {
				username: createUserDto.username,
				password: createUserDto.password,
				role: createUserDto.roles,
			},
		});
		return user;
	}

	// 查询所有用户
	async findAll() {
		const user = await this.prisma.users.findMany({ select: { username: true, role: true } });
		return user;
	}

	//查询单个用户
	async findOne(id: number) {
		const user = await this.prisma.users.findUnique({
			where: {
				id: id,
			},
		});
		return user;
	}

	//更新用户
	async update(id: number, updateUserDto: UpdateUserDto) {
		const { username, ...updateOne } = updateUserDto;
		await this.prisma.users.update({ where: { id: Number(id) }, data: updateOne });
		console.log(updateUserDto.username);
	}

	//删除用户
	async remove(id: number) {
		// 先查询
		const finduser = await this.prisma.users.findUnique({ where: { id: id } });

		if (!finduser) {
			throw new BadRequestException("该用户不存在");
		}
		await this.prisma.users.delete({ where: { id: id } });
	}

	// 核对用户名，供登录使用
	findOneByUsername(username: string) {
		return this.prisma.users.findFirst({
			where: {
				username: username,
			},
		});
	}
}
