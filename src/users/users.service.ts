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
	async findAll() {
		const user = await this.usersRepository.find().select("-password");
		return user;
	}

	//查询单个用户
	async findOne(id: string) {
		// typegoose的查询不能使用结构的方式隐藏password，否则会返回一些奇怪的东西,但是可以使用select("-password")的方式隐藏
		const user: users = await this.usersRepository.findById(id).select("-password");
		if (!user) {
			throw new NotFoundException("用户不存在");
		}
		return user;
	}

	//更新用户
	async update(id: string, updateUserDto: UpdateUserDto) {
		const { username, ...updateOne } = updateUserDto;
		await this.usersRepository.findByIdAndUpdate(id, updateOne);
		return { who: updateUserDto.username };
	}

	//删除用户
	async remove(id: string) {
		// 先查询
		const finduser = await this.usersRepository.findOne({ _id: id }).select("-password");

		if (!finduser) {
			throw new BadRequestException("该用户不存在");
		}
		await this.usersRepository.deleteOne({ _id: id });
	}

	// 核对用户名，供登录使用
	findOneByUsername(username: string) {
		return this.usersRepository.findOne({ username: username });
	}
}
