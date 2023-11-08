import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { users } from "./entities/user.entity";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(users) private readonly usersRepository: ReturnModelType<typeof users>,
	) {}

	// 创建用户
	async create(createUserDto: CreateUserDto) {
		const finduser = await this.usersRepository
			.findOne({ username: createUserDto.username })
			.select("+password");
		if (finduser) {
			throw new BadRequestException("用户名已存在");
		}
		const user = await this.usersRepository.create(createUserDto);
		return user;
	}

	// 查询所有用户
	findAll() {
		return `This action returns all users`;
	}

	//查询单个用户
	async findOne(id: string) {
		const user: users = await this.usersRepository.findById(id).select("-password");
		if (!user) {
			throw new NotFoundException("用户不存在");
		}
		return user;
	}

	//更新用户
	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	//删除用户
	remove(id: number) {
		return `This action removes a #${id} user`;
	}

	// 核对用户名，供登录使用
	findOneByUsername(username: string) {
		return this.usersRepository.findOne({ username: username });
	}
}
