import client from "../database";

export type Order = {
  id?: number;
  quantity: number;
  status: string;
  pro_id: number;
  user_id: number;
};

export class OrderModel {

  // index all orders model:
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      // sql query:
      const sql = "SELECT * FROM orders";
      const result = await connection.query(sql);
      connection.release();
      // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load orders because of the following error: ${error}`
      );
    }
  }

  // show User orders model:
  async showUserOrder(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
            // sql query:
      const sql = "SELECT * FROM orders WHERE user_id=($1)";
      const result = await connection.query(sql, [user_id]);
      connection.release();
            // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't load this user orders because of the following error: ${error}`
      );
    }
  }

  // show user completed orders model:
  async showUserCompletedOrders(user_id: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
                  // sql query:
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status='completed'";
      const result = await connection.query(sql, [user_id]);
      connection.release();
                  // return results:
      return result.rows;
    } catch (error) {
      throw new Error(
        `Can't show this user completed orders because of the following error: ${error}`
      );
    }
  }
  // create orders model:
  async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect();
                        // sql query:

      const sql =
        "INSERT INTO orders (quantity,status, pro_id, user_id) VALUES ($1,$2,$3,$4) RETURNING *";
      const result = await connection.query(sql, [
        order.quantity,
        order.status,
        order.pro_id,
        order.user_id,
      ]);
      connection.release();
                        // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't create this order because of the following error: ${error}`
      );
    }
  }
  // delete product model:
  async deleteOrder(id: number): Promise<Order> {
    try {
      const connection = await client.connect();
                              // sql query:
      const sql = "DELETE FROM orders WHERE id=($1) RETURNING *";
      const result = await connection.query(sql, [id]);
      connection.release();
                              // return results:
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Can't delete order because of the following error: ${error}`
      );
    }
  }
}
