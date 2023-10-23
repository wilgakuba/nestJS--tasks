import { Injectable } from '@nestjs/common';
import { Order, db } from '../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }
  public getById(id: Order['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((p) => p.id !== id);
  }

  public create(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public updateById(id: Order['id'], ordersData: Omit<Order, 'id'>): void {
    db.orders = db.orders.map((p) => {
      if (p.id === id) {
        return { ...p, ...ordersData };
      }
      return p;
    });
  }
}