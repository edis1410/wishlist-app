import { Injectable } from '@angular/core';
import { doc, collection, addDoc, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

  constructor() {}

  public async createEvent(name: string, date: string): Promise<void> {
    const docRef = await addDoc(collection(this.db, 'events'), {
      name: name,
      date: date,
    });
    console.log('Document written with ID: ', docRef.id);
  }

  public async getData(): Promise<any[]> {
    const eventsList: any[] = [];
    const querySnapshot = await getDocs(collection(this.db, 'events'));
    querySnapshot.forEach((doc) => {
      eventsList.push(doc.id)
      // console.log(`${doc.id} => ${doc.data()}`);
    });
    return eventsList;
  }
}
