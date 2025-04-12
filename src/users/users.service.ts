import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Firestore } from '@google-cloud/firestore';
import { Firestore } from 'firebase-admin/firestore';


@Injectable()
export class UsersService {
  constructor(@Inject('FIRESTORE_DB') private readonly db: Firestore) {}

  async getUsers(): Promise<any[]> {
    console.log('Fetching users...UsersService:::');

    const snapshot = await this.db.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async createUser(data: any): Promise<string> {
    const docRef = await this.db.collection('users').add(data);
    return docRef.id;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
