# Firebase Google Sign-In Backend Integration

## ✅ Complete!

The backend now uses Firebase Admin SDK to verify Google Sign-In tokens.

## Quick Summary

- ✅ Firebase Admin SDK installed
- ✅ Firebase service created and configured
- ✅ Auth service updated to verify Firebase tokens
- ✅ Login endpoint accepts Firebase ID tokens
- ✅ Frontend updated to send Firebase tokens

## How It Works

1. **Frontend**: User signs in with Google → Gets Firebase ID token
2. **Frontend**: Sends ID token to backend `POST /auth/login`
3. **Backend**: Verifies token with Firebase Admin SDK
4. **Backend**: Creates/updates user in database
5. **Backend**: Returns JWT token for API authentication

## Files Created/Modified

### New Files
- `src/firebase/firebase.service.ts` - Firebase Admin service
- `src/firebase/firebase.module.ts` - Firebase module
- `src/config/firebase-service-account.json` - Service account credentials

### Modified Files
- `src/app.module.ts` - Added FirebaseModule
- `src/auth/auth.service.ts` - Now verifies Firebase tokens
- `src/auth/dto/login.dto.ts` - Accepts idToken instead of email/name

## Testing

The backend should automatically initialize Firebase Admin when it starts. Look for:
```
Firebase Admin initialized successfully
```

If you see this message, Firebase is working correctly!

## API Usage

**Before (old way):**
```json
POST /auth/login
{
  "email": "user@example.com",
  "name": "User Name"
}
```

**Now (Firebase way):**
```json
POST /auth/login
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6..."
}
```

The frontend automatically sends the Firebase ID token after Google Sign-In.
