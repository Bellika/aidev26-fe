# Cypress Testing - Lektion 7-8

Denna guide hjälper dig att komma igång med Cypress för att testa din React-applikation.

## Vad är Cypress?

Cypress är ett modernt testverktyg för webapplikationer som gör det enkelt att:
- Skriva E2E (end-to-end) tester som simulerar användarinteraktioner
- Debugga tester i realtid med en visuell testrunner
- Testa hela användarflöden från start till slut

## Förkunskaper

Innan du kör Cypress-testerna, se till att:
1. Backend-API:et körs på `http://localhost:8000`
2. Du har kört `npm install` för att installera alla dependencies

## Köra Cypress

### Öppna Cypress Test Runner (Interaktivt läge)

För att öppna Cypress i interaktivt läge där du kan välja och köra tester visuellt:

```bash
npm run cypress
```

Eller för att öppna direkt i E2E-läge:
```bash
npm run cypress:e2e
```

### Köra tester i terminalen (Headless mode)

För att köra alla tester i terminalen utan GUI:

```bash
# Alla E2E-tester
npm run test:e2e

# Eller alla tester (headless)
npm run cypress:headless
```

## Teststruktur

### E2E-tester (`cypress/e2e/`)

E2E-tester testar hela applikationen från användarens perspektiv:

- **navigation.cy.ts** - Testar grundläggande navigation mellan sidor
- **auth.cy.ts** - Testar autentiseringsflödet (skapa konto, logga in, logga ut)
- **protected-routes.cy.ts** - Testar att skyddade routes fungerar korrekt

## Custom Commands

Vi har skapat några custom commands för att göra testerna enklare att skriva:

### `cy.login(username, password)`
Loggar in en användare.

```typescript
cy.login('testuser', 'password123');
```

### `cy.createAccount(username, password)`
Skapar ett nytt konto och loggar in automatiskt.

```typescript
cy.createAccount('newuser', 'password123');
```

## Viktiga Cypress-kommandon

Här är några av de vanligaste Cypress-kommandona du kommer använda:

### Navigation
```typescript
cy.visit('/');           // Besök en sida
cy.go('back');          // Gå tillbaka
cy.reload();            // Ladda om sidan
```

### Element-selektion
```typescript
cy.get('#username');                    // Välj element med ID
cy.get('.class-name');                  // Välj element med klass
cy.get('button[type="submit"]');        // Välj element med attribut
cy.contains('Login');                   // Hitta element med text
cy.contains('button', 'Login');         // Hitta button med text "Login"
```

### Interaktioner
```typescript
cy.get('#username').type('testuser');   // Skriv i input-fält
cy.get('button').click();               // Klicka på element
cy.get('input').clear();                // Rensa input-fält
cy.get('select').select('option');      // Välj från dropdown
```

### Assertions
```typescript
cy.get('#element').should('be.visible');           // Kolla att element syns
cy.get('#element').should('not.exist');            // Kolla att element inte finns
cy.get('#element').should('have.text', 'Hello');   // Kolla text
cy.get('#element').should('have.value', 'test');   // Kolla värde
cy.url().should('include', '/login');              // Kolla URL
```

## Övningar för eleverna

Varje testfil innehåller kommentarer med förslag på övningar. Några exempel:

1. **Navigation**: Lägg till tester för navigation mellan fler sidor
2. **Auth**: Testa edge cases som tomma fält, för långa användarnamn, etc.
3. **Protected Routes**: Testa direktlänkar till skyddade sidor
4. **Component Tests**: Lägg till fler assertions för att verifiera attribut och beteenden

## Tips för att skriva bra tester

1. **Använd data-attribut**: I produktionskod kan du lägga till `data-cy` attribut på element för att göra dem lättare att testa
   ```html
   <button data-cy="submit-btn">Submit</button>
   ```
   ```typescript
   cy.get('[data-cy="submit-btn"]').click();
   ```

2. **Undvik hardkodade delays**: Använd Cypress' automatiska väntan istället för `cy.wait(1000)`

3. **Skriv isolerade tester**: Varje test ska kunna köras oberoende av andra tester

4. **Använd beforeEach**: Sätt upp gemensam setup i `beforeEach()` hooks

5. **Testa användarbeteenden**: Fokusera på vad användaren ser och gör, inte implementationsdetaljer

## Debugging

### I Cypress Test Runner
- Klicka på ett kommando i testet för att se DOM-state vid det tillfället
- Använd `.debug()` i ditt test: `cy.get('#element').debug()`
- Använd `.pause()` för att pausa testet: `cy.get('#element').pause()`

### I terminalen
- Kör tester med `--headed` för att se browsern:
  ```bash
  npx cypress run --headed
  ```
- Spara videos och screenshots automatiskt vid fel (redan konfigurerat)

## Resurser

- [Cypress Dokumentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)

## Vanliga problem

### Tester failar med "cy.visit() failed"
- Kontrollera att applikationen körs på `http://localhost:5173`
- Kontrollera att backend-API:et körs på `http://localhost:8000`

### Timeout-fel
- Öka timeout i `cypress.config.ts` om API:et är långsamt
- Eller lägg till `{ timeout: 10000 }` i specifika kommandon

---

Lycka till med testningen!
