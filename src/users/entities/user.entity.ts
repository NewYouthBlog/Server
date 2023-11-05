import { Role } from "src/role/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	//FIX: 这里不能用
	@Column()
	roles: Role[];
}
