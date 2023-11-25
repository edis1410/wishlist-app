import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
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
    solo: boolean,
  ): Promise<void> {
    await setDoc(doc(this.db, 'events', name), {
      name: name,
      date: date,
      password: password,
      solo: solo,
      users: [this.login.username],
    });
  }

  public async addItem(
    name: string,
    price: number,
    link: string,
    event: string,
  ): Promise<void> {
    await setDoc(doc(this.db, 'items', name), {
      name: name,
      price: price,
      link: link,
      event: event,
      user: this.login.username,
    });
  }
  public async deleteItem(id:string): Promise<void> {
    console.log(id)
    const q = query(
      collection(this.db, 'items'),
      where('name', '==', id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const item = doc(this.db, 'items', document.id);
      await deleteDoc(item)
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

  public async leaveEvent(id:string): Promise<void> {
    const q = query(
      collection(this.db, 'events'),
      where('name', '==', id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (document) => {
      const event = doc(this.db, 'events', document.id);
      await updateDoc(event, {
        users: arrayRemove(this.login.username),
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

  public async getEvent(eventName: string): Promise<any[]> {
    const eventDetails: any[] = [];
    const q = query(
      collection(this.db, 'events'),
      where(doc.name, 'array-contains', eventName)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      eventDetails.push(doc.id);
    });
    return eventDetails;
  }

  public async getItems(id: string): Promise<any[]> {
    const eventsList: any[] = [];
    const q = query(
      collection(this.db, 'items'),
      where('event', '==', id)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      eventsList.push(doc.data());
    });
    
    return eventsList;
  }

  public async updateBought(id: string, b: boolean) {
    await updateDoc(doc(this.db, 'items', id), {
      bought: !b
    }).then(() => location.reload());
    console.log(b);
    
  }
}
