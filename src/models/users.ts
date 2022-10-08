import client from "../database";

export type User = {
	id?: number;
	firstName: string;
	lastName: string;
	password: string;
};

export class UsersModel {
	// index all users model:
	async index(): Promise<User[]> {
		try {
			const connection = await client.connect();
			const sql = "SELECT * FROM users";
			const result = await connection.query(sql);
			connection.release();
			return result.rows;
		} catch (error) {
			throw new Error(
				`Can't load users because of the following error: ${error}`
			);
		}
	}

	// show one user model:
	async show(id: number): Promise<User> {
		try {
			const connection = await client.connect();
			const sql = "SELECT * FROM users WHERE id=($1)";
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Can't load this user because of the following error: ${error}`
			);
		}
	}
	// create user model:
	async create(user: User): Promise<User> {
		try {
			const connection = await client.connect();
			const sql =
				"INSERT INTO users (firstname,lastname, password) VALUES ($1,$2,$3) RETURNING *";
			const result = await connection.query(sql, [
				user.firstName,
				user.lastName,
				user.password,
			]);
			connection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Can't create user because of the following error: ${error}`
			);
		}
	}

	// update user model:
	async update(user: User): Promise<User> {
		try {
			const connection = await client.connect();
			const sql =
				"UPDATE user SET firstName=($1) lastName=($2) WHERE id=($3) RETURNING *";
			const result = await connection.query(sql, [
				user.firstName,
				user.lastName,
				user.id,
			]);
			connection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Can't update user because of the following error: ${error}`
			);
		}
	}
	// delete user model:
	async deleteUser(id: number): Promise<User> {
		try {
			const connection = await client.connect();
			const sql = "DELETE FROM users WHERE id=($1) RETURNING *";
			const result = await connection.query(sql, [id]);
			connection.release();
			return result.rows[0];
		} catch (error) {
			throw new Error(
				`Can't update user because of the following error: ${error}`
			);
		}
	}
}
