import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) {}

	// 创建用户
	async create(createUserDto: CreateUserDto) {
		const finduser = await this.usersRepository.findOne({
			where: { username: createUserDto.username },
		});

		if (finduser) {
			throw new BadRequestException("用户名已存在");
		}
		const user = await this.usersRepository.save(createUserDto);
		return user;
	}

	// 查询所有用户
	findAll() {
		return `This action returns all users`;
	}

	//查询单个用户
	async findOne(id: number) {
		const user = await this.usersRepository.findOne({ where: { id: id } });
		const { password, ...result } = user;
		return result;
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
		return this.usersRepository.findOne({ where: { username: username } });
	}
}
