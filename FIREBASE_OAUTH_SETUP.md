# Firebase Google & GitHub Auth — Setup Checklist

Status of this repo's OAuth wiring for Register/Login, and what's left to do.

## 1. Firebase Console setup

Project: `react-foundation-45228` (already configured in [src/components/Firebase/config.js](src/components/Firebase/config.js)).

- [ ] Go to [Firebase Console](https://console.firebase.google.com/) → your project → **Authentication** → **Sign-in method**.
- [ ] **Google provider**: enable it, set a support email. No extra keys needed — Firebase handles Google OAuth itself.
- [ ] **GitHub provider**: enable it. You'll need a GitHub OAuth App:
  - [ ] Go to GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**.
  - [ ] Homepage URL: your app's URL (e.g. `http://localhost:5173` for dev).
  - [ ] Authorization callback URL: copy the exact value Firebase shows on the GitHub provider setup screen (format: `https://react-foundation-45228.firebaseapp.com/__/auth/handler`).
  - [ ] Copy the generated **Client ID** and **Client Secret** into the Firebase GitHub provider config, then save.
- [ ] **Authorized domains**: under Authentication → Settings → Authorized domains, make sure `localhost` and your production domain are listed (required for `signInWithPopup` to work).

## 2. Security: move the Firebase config out of source

`config.js` currently has the API key and project IDs hardcoded and committed:

```js
apiKey: "AIzaSyBxHfwJQ_FNgjmck-saO0UNJ-0knYeZEuQ",
```

Firebase web API keys aren't secret by design (they just identify the project), but best practice is still to:
- [ ] Move values into `.env` (e.g. `VITE_FIREBASE_API_KEY=...`) and read via `import.meta.env.VITE_FIREBASE_API_KEY`.
- [ ] Add `.env` to `.gitignore`.
- [ ] Lock down access with Firebase Security Rules + **App Check**, and restrict the API key in Google Cloud Console (HTTP referrer restrictions) — this is what actually matters for an exposed key, not hiding it.

## 3. Code fixes needed

Your `GoogleLoginComponent` and `GithubLoginComponent` ([src/components/oAuth/](src/components/oAuth/)) are wired into both [RegisterComponent.jsx](src/components/auth/RegisterComponent.jsx) and [LoginComponent.jsx](src/components/auth/LoginComponent.jsx). Fixed vs. still outstanding:

- [x] **`GithubAuthProvider` misused as JSX** — fixed. Both pages now render the real `<GoogleLoginComponent/>` / `<GithubLoginComponent/>`.
- [x] **Dead placeholder button** — removed.
- [x] **Login page missing OAuth buttons** — [LoginComponent.jsx:134-135](src/components/auth/LoginComponent.jsx#L134-L135) now imports and renders both.
- [ ] **`onAuthStateChanged` throws on logout** — in both [GoogleLoginComponent.jsx:19-27](src/components/oAuth/GoogleLoginComponent.jsx#L19-L27) and [GithubLoginComponent.jsx:24-33](src/components/oAuth/GithubLoginComponent.jsx#L24-L33), the `else` branch does `throw new Error("unsubscribe user")` whenever there's no user (i.e. on initial load or after logout). That's not an error condition — it should just no-op or `setUser(null)`:
  ```js
  onAuthStateChanged(auth, (user) => {
    setUser(user ?? null);
  });
  ```
- [ ] **No navigation after OAuth success** — `loginWithGoogle`/`loginWithgithub` log the user but never call `navigate(...)`. `useNavigate` is imported in both files but unused. Add redirect on success, e.g.:
  ```js
  const user = res.user;
  navigate('/', { replace: true });
  ```
- [ ] **No connection to your backend** — see §5 below, this is the main piece left.

## 4. Login vs. Register — how they actually differ

Firebase OAuth (`signInWithPopup`) does **not** distinguish "logging in" from "signing up" — a Google/GitHub user who has never used the app before and one who has are handled by the *same* call, and Firebase silently creates the account on first sign-in. The distinction in this codebase only exists for the **email/password** flow, which hits two different backend endpoints via [authApi.js](src/components/API/authApi.js):

| | Register (`RegisterComponent.jsx`) | Login (`LoginComponent.jsx`) |
|---|---|---|
| Hook | `useUserRegisterMutation` | `useUserLoginMutation` |
| Endpoint | `POST users/user-signup?emailVerified=true` | `POST auth/login` |
| Payload | username, email, password, phone, address, profile | email, password |
| Success | toast, then redirect to `/auth/login` | toast, then redirect to `/` using `result.data.accessToken` |
| Google/GitHub buttons | `GoogleLoginComponent` / `GithubLoginComponent` (identical) | `GoogleLoginComponent` / `GithubLoginComponent` (identical) |

Because the OAuth buttons are the exact same components on both pages, **"login" vs "register" for OAuth users is a backend-side decision, not a frontend one** — see §5.

## 5. Connecting OAuth to your current API setup

Your REST API is already configured in [baseApi.js](src/components/API/baseApi.js):

```js
baseUrl: import.meta.env.VITE_BASE_ISHOP_URL
// static bearer token from import.meta.env.VITE_ACCESS_TOKEN on every request
```

and [authApi.js](src/components/API/authApi.js) exposes `auth/login` and `users/user-signup` endpoints, consumed via `useUserLoginMutation` / `useUserRegisterMutation`. Right now these are only called from the email/password forms — the Google/GitHub buttons never touch this API. To connect them:

- [ ] **Add an OAuth endpoint** to `authApi.js`, e.g. `auth/oauth` or `auth/social-login`, that accepts a Firebase ID token and returns the same shape as `auth/login` (an `accessToken`):
  ```js
  UserOAuthLogin: builder.mutation({
    query: ({ idToken, provider }) => ({
      url: "auth/oauth",
      method: "POST",
      body: { idToken, provider }, // provider: "google" | "github"
    }),
  }),
  ```
- [ ] **Call it from the OAuth components** after `signInWithPopup` succeeds, instead of only logging to console:
  ```js
  const res = await signInWithPopup(auth, provider);
  const idToken = await res.user.getIdToken();
  const result = await oauthLoginRequest({ idToken, provider: "google" });
  if (result?.data?.accessToken) {
    navigate('/', { replace: true });
  }
  ```
  This makes the Google/GitHub buttons behave identically on both Register and Login — the backend endpoint decides whether to create a new user or return an existing one (standard "find or create" pattern), so no frontend branching between login/register is needed for OAuth.
- [ ] **Backend requirement**: your API needs a route that verifies the Firebase ID token server-side via the Firebase Admin SDK (`admin.auth().verifyIdToken(idToken)`), looks up/creates the user by the verified email, and issues the same `accessToken` your `auth/login` endpoint returns — so the frontend's existing token-storage logic works unchanged for both auth methods.
- [ ] **Env vars** — `VITE_BASE_ISHOP_URL` and `VITE_ACCESS_TOKEN` must be set in `.env` (see §2) for `baseApi.js` to reach your backend at all; unrelated to Firebase but required for the OAuth-to-backend call above to work.

## 6. Suggested end-to-end flow once fully wired

1. User clicks "Continue with Google/GitHub" — same button, same behavior on both Register and Login pages, since OAuth doesn't distinguish the two.
2. `signInWithPopup` resolves with a Firebase user + credential.
3. Frontend gets the Firebase ID token (`await res.user.getIdToken()`) and sends it to your backend via the new `auth/oauth` endpoint (§5).
4. Backend verifies the token via Firebase Admin SDK, finds or creates the user, returns your app's `accessToken` (same contract as `auth/login`).
5. Frontend stores the token and navigates to `/`, exactly like the email/password login path.

## References

- [Firebase Auth - Google Sign-In (Web)](https://firebase.google.com/docs/auth/web/google-signin)
- [Firebase Auth - GitHub Sign-In (Web)](https://firebase.google.com/docs/auth/web/github-auth)
