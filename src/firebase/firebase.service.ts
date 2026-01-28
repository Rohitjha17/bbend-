import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private app: admin.app.App;
  private readonly logger = new Logger(FirebaseService.name);
  private isInitialized = false;

  onModuleInit() {
    // Initialize Firebase Admin if not already initialized
    if (!admin.apps.length) {
      try {
        // Try multiple paths: dist/config, src/config, and root config
        const possiblePaths = [
          path.join(__dirname, '../config/firebase-service-account.json'), // dist/config
          path.join(process.cwd(), 'src/config/firebase-service-account.json'), // src/config
          path.join(process.cwd(), 'dist/config/firebase-service-account.json'), // dist/config from root
          path.join(process.cwd(), 'config/firebase-service-account.json'), // root config
        ];

        let serviceAccountPath: string | null = null;
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            serviceAccountPath = possiblePath;
            break;
          }
        }

        if (!serviceAccountPath) {
          this.logger.warn(
            'Firebase service account file not found. Firebase features will be disabled. ' +
            'To enable Firebase, place firebase-service-account.json in src/config/ or dist/config/',
          );
          this.isInitialized = false;
          return;
        }

        // Read and parse service account JSON file
        const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
        const serviceAccount = JSON.parse(serviceAccountJson);

        this.app = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
          projectId: 'gym-123-17421',
        });

        this.isInitialized = true;
        this.logger.log('Firebase Admin initialized successfully');
      } catch (error) {
        this.logger.warn(`Firebase Admin initialization failed: ${error.message}. Firebase features will be disabled.`);
        this.isInitialized = false;
        // Don't throw - make Firebase optional
      }
    } else {
      this.app = admin.app();
      this.isInitialized = true;
    }
  }

  getAuth(): admin.auth.Auth | null {
    if (!this.isInitialized) {
      return null;
    }
    return admin.auth();
  }

  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    if (!this.isInitialized) {
      throw new Error('Firebase is not initialized. Please configure Firebase service account.');
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw new Error(`Invalid Firebase ID token: ${error.message}`);
    }
  }

  isFirebaseInitialized(): boolean {
    return this.isInitialized;
  }
}
