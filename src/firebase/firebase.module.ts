// src/firebase/firebase.module.ts
import { Module } from '@nestjs/common';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { Provider } from '@nestjs/common';

import { join } from 'path';

const serviceAccount = require(join(process.cwd(), 'config/firebase-adminsdk.json'));

const firebaseAppProvider: Provider<App> = {
  provide: 'FIREBASE_APP',
  useFactory: (): App => {
    return initializeApp({
      credential: cert(serviceAccount),
      projectId: 'action-for-ukraine',
    });
  },
};

const firestoreProvider: Provider<Firestore> = {
  provide: 'FIRESTORE_DB',
  useFactory: (app: App): Firestore => {
    return getFirestore(app);
  },
  inject: ['FIREBASE_APP'],
};

@Module({
  providers: [firebaseAppProvider, firestoreProvider],
  exports: [firestoreProvider],
})
export class FirebaseModule {}
