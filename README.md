# Lektion 7-8: React Router & Auth med useContext

## Lektionsmål

I denna lektion bygger vi vidare från lektion 7 och introducerar:

1. **React Router** - För att navigera mellan olika sidor
2. **useContext** - För att hantera global state (inloggad användare)
3. **Protected Routes** - Sidor som bara inloggade kan se
4. **JWT Token** - Skicka token till backend för att få tillgång till skyddade resurser

## Viktiga Koncept

### 1. React Router
React Router låter oss skapa olika "sidor" i vår app utan att behöva ladda om hela sidan.

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
</BrowserRouter>
```

### 2. Context API (useContext)
Context låter oss dela data mellan komponenter utan att behöva skicka props nedåt genom varje nivå.

**AuthContext.tsx** håller:
- `user` - Den inloggade användaren (eller null)
- `login()` - Funktion för att logga in
- `logout()` - Funktion för att logga ut

### 3. Protected Route
En wrapper-komponent som kollar om användaren är inloggad. Om inte, redirectar den till login.

```tsx
<Route
  path="/secret"
  element={
    <ProtectedRoute>
      <SecretPage />
    </ProtectedRoute>
  }
/>
```

### 4. Axios med withCredentials
Vi använder axios istället för fetch. Axios konfigureras i en config-fil (precis som get_db i backend!).

**src/config/axios.ts:**
```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Skickar cookies automatiskt
});

export default api;
```

Sedan använder vi bara `api.get()`, `api.post()` etc:
```tsx
import api from '../config/axios';

// GET request
const response = await api.get('/auth/secret');

// POST request
const response = await api.post('/auth/login', { username, password });
```

## Projektstruktur

```
src/
├── config/
│   └── axios.ts              # Axios instance (som get_db i backend!)
├── context/
│   └── AuthContext.tsx       # Global auth state med Context API
├── pages/
│   ├── HomePage.tsx          # Startsida
│   ├── LoginPage.tsx         # Login-formulär
│   └── SecretPage.tsx        # Skyddad sida (kräver JWT)
├── components/
│   └── ProtectedRoute.tsx    # Wrapper för skyddade routes
└── App.tsx                   # Router setup
```

## Komma igång

### 1. Starta backend (från lektion-5-6)
```bash
cd ../lektion-5-6
source .venv/bin/activate
python app.py
```

Backend kör nu på http://localhost:8000

### 2. Skapa en användare (om du inte redan har en)
Använd Swagger UI: http://localhost:8000/docs
- Gå till POST /users
- Skapa en user med username och password

### 3. Starta frontend
```bash
npm run dev
```

Frontend kör nu på http://localhost:5173

## Testa lektionen

1. **Besök http://localhost:5173**
   - Du ser HomePage som visar att du inte är inloggad

2. **Klicka på "Gå till Login"**
   - Skriv in username och password från backend
   - Klicka Login

3. **Efter lyckad login:**
   - Du redirectas till HomePage
   - Nu ser du ditt användarnamn (från Context!)
   - Du kan klicka på "Besök Secret Page"

4. **Secret Page:**
   - Denna sida gör ett axios GET-anrop till backend med JWT token
   - Backend verifierar token och returnerar hemlig data
   - Du ser både data från Context OCH från backend

5. **Testa Protected Route:**
   - Logga ut
   - Försök navigera direkt till http://localhost:5173/secret
   - Du blir automatiskt redirectad till /login

## Kodflöde att förstå

### Login-flöde:
1. User skriver username/password i LoginPage
2. LoginPage anropar `login()` från AuthContext
3. AuthContext gör `api.post('/auth/login', { username, password })`
4. Backend returnerar JWT token i HTTP-only cookie + user info
5. AuthContext sparar user i state
6. LoginPage navigerar till HomePage

### Protected Route flöde:
1. User försöker gå till /secret
2. ProtectedRoute kollar om `user` finns i Context
3. Om NEJ → Redirect till /login
4. Om JA → Visa SecretPage

### Secret Page flöde:
1. SecretPage gör `api.get('/auth/secret')`
2. Axios skickar automatiskt JWT cookie (withCredentials: true)
3. Backend verifierar JWT token
4. Backend returnerar hemlig data
5. SecretPage visar data

## Lärmoment

### Skillnad mellan Context och Backend-data:
- **Context** = Frontend state (kan manipuleras av användaren)
- **Backend med JWT** = Verklig verifiering (säkert)

När vi visar användarnamn på HomePage använder vi Context (snabbt, enkelt).
När vi behöver hämta skyddade resurser måste vi alltid använda JWT token mot backend.

### Varför withCredentials: true?
Utan `withCredentials: true` skickar inte browsern cookies automatiskt.
JWT token ligger i en HTTP-only cookie, så vi måste konfigurera axios att inkludera den.

Detta är analogt med `get_db()` i backend - vi konfigurerar axios en gång i config/axios.ts och importerar sedan bara `api` överallt!

## Utmaning

Försök lägga till:
1. En "Users" sida som visar alla användare (från lektion 7)
2. Gör den skyddad med ProtectedRoute
3. Lägg till länkar i en Navigation-komponent

## Sammanfattning

Du har nu lärt dig:
- ✅ React Router för navigation
- ✅ useContext för global state
- ✅ Protected Routes med redirect
- ✅ Konfigurera axios med withCredentials (som get_db i backend!)
- ✅ Skicka JWT token till backend automatiskt med axios
- ✅ Skillnaden mellan frontend state och backend-verifiering
