import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public firebaseConfig = {
    apiKey: 'AIzaSyC2cp9tWWnOiOLVCv77SCbHz81COmMVbdA',
    authDomain: 'wishlist-app-db.firebaseapp.com',
    projectId: 'wishlist-app-db',
    storageBucket: 'wishlist-app-db.appspot.com',
    messagingSenderId: '280896363915',
    appId: '1:280896363915:web:975b4b00f179629cc4e38e',
    measurementId: 'G-8YXN52BC62',
  };

  public app = initializeApp(this.firebaseConfig);
  public db = getFirestore(this.app);

  constructor(private login: LoginService) {}

  public async createEvent(
    name: string,
    date: string,
    password: string,
    user: string
  ): Promise<void> {
    await setDoc(doc(this.db, 'events', name), {
      name: name,
      date: date,
      password: password,
      users: [user],
    });
  }

  public async addItem(
    name: string,
    price: number,
    link: string
  ): Promise<void> {
    await setDoc(doc(this.db, 'items', name), {
      price: price,
      link: link,
    });
  }

  public async joinEvent(password: string): Promise<void> {
    const q = query(
      collection(this.db, 'events'),
      where('password', '==', password)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const event = doc(this.db, 'events', document.id);
      await updateDoc(event, {
        users: arrayUnion(this.login.username),
      });
    });
  }

  public async getData(): Promise<any[]> {
    const eventsList: any[] = [];
    const q = query(
      collection(this.db, 'events'),
      where('users', 'array-contains', this.login.username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      eventsList.push(doc.id);
    });
    return eventsList;
  }
}
