# CLAUDE.md — Anoniem046

Dit bestand is de primaire context voor Claude Code in dit project.

---

## 1. Project Overview

**Naam:** Anoniem046
**Onderdeel van:** SandeDesign ecosysteem
**Doel:** Anonieme chat-app waar jongeren zonder account of registratie in gesprek gaan met professionele begeleiders van Jong046. Laagdrempelig, veilig, geen stempel. Begeleiders beantwoorden vragen, overleggen intern, en verwijzen door waar nodig.
**Status:** In ontwikkeling
**URL:** `https://DITDOMEIN.nl` (pas aan naar definitief domein)
**Repo:** https://github.com/SandeDesign/Anoniem046
**Firebase project:** `jong046` (gedeeld met Jong046 platform, aparte collections met `a046_` prefix)

---

## 2. Tech Stack

**Frontend:**
- Framework: React 18 (SPA met React Router DOM)
- Taal: TypeScript (strict)
- Styling: Tailwind CSS (dark theme, mobile-first)
- State management: Zustand
- Iconen: Lucide React
- Build tool: Vite
- Animaties: Framer Motion (subtiel — geen zware animaties)

**Backend / Serverless:**
- Firebase Authentication (Anonymous Auth voor jongeren, email/wachtwoord voor begeleiders/beheerders)
- Firebase Firestore (database — alle collections met `a046_` prefix, region: europe-west1)
- Geen Firebase Storage (geen uploads in v1)
- Geen PHP proxy nodig (geen externe API's, geen uploads)
- Make.com webhooks (toekomstig: recoveryId per e-mail versturen)

**Hosting:**
- Frontend: Netlify (via bolt.new pro deploy pipeline)

**Authenticatie:**
- Jongere: Firebase Anonymous Authentication — genereert een `uid` zonder credentials
- Begeleider / Beheerder: Firebase Auth email/wachtwoord met rollen in Firestore

---

## 3. Projectstructuur

```
Anoniem046/
├── src/
│   ├── App.tsx                          # Hoofdrouting en app shell
│   ├── main.tsx                         # React entry point
│   ├── index.css                        # Tailwind global styles + custom CSS
│   ├── vite-env.d.ts                    # Vite type declarations
│   ├── components/
│   │   ├── ui/                          # Herbruikbare UI componenten
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Textarea.tsx
│   │   ├── layout/                      # Layout componenten
│   │   │   ├── Header.tsx               # Bovenbalk
│   │   │   ├── BottomNav.tsx            # Mobiele bottom navigatie (begeleider/beheerder)
│   │   │   ├── Sidebar.tsx              # Desktop sidebar (begeleider/beheerder)
│   │   │   └── ProtectedRoute.tsx       # Auth + role guard
│   │   ├── youth/                       # Jongere-specifieke componenten
│   │   │   ├── StartScreen.tsx          # Startscherm: nieuw gesprek / hervat gesprek
│   │   │   ├── PrivacyDisclaimer.tsx    # Privacy melding overlay bij start nieuw gesprek
│   │   │   ├── ChatView.tsx             # Chat interface voor jongere
│   │   │   ├── ChatBubble.tsx           # Enkele chatbubbel component
│   │   │   ├── RecoveryIdDisplay.tsx    # Visueel element met kopieerbare herstelcode
│   │   │   ├── ResumeChat.tsx           # Invoerveld voor recoveryId
│   │   │   └── CounselorProfiles.tsx    # Begeleider profielen overzicht
│   │   ├── counselor/                   # Begeleider-specifieke componenten
│   │   │   ├── ConversationList.tsx     # Alle gesprekken met status filtering
│   │   │   ├── ChatView.tsx             # Chat interface begeleider (berichten + intern panel)
│   │   │   ├── InternalNotes.tsx        # Intern overleg panel naast chat
│   │   │   ├── ResponseForm.tsx         # Berichtinvoer voor begeleider
│   │   │   ├── CrisisFlag.tsx           # Crisis markering component
│   │   │   └── ConversationStatusBadge.tsx # Status badge per gesprek
│   │   └── admin/                       # Beheerder-specifieke componenten
│   │       ├── CounselorManagement.tsx  # Begeleiders toevoegen/deactiveren
│   │       └── CounselorForm.tsx        # Begeleider aanmaak/bewerk formulier
│   ├── pages/
│   │   ├── youth/                       # Jongere pagina's
│   │   │   ├── YouthHomePage.tsx        # Landing + startscherm
│   │   │   ├── YouthChatPage.tsx        # Actief gesprek
│   │   │   └── CounselorsPage.tsx       # Begeleider profielen (publiek)
│   │   ├── auth/
│   │   │   └── LoginPage.tsx            # Begeleider/beheerder login
│   │   ├── counselor/                   # Begeleider pagina's
│   │   │   ├── CounselorDashboardPage.tsx    # Dashboard met gesprekken
│   │   │   └── CounselorChatPage.tsx         # Gesprek detail + intern overleg
│   │   ├── admin/                       # Beheerder pagina's
│   │   │   └── AdminDashboardPage.tsx   # Begeleiders beheren + gesprekken
│   │   └── legal/
│   │       ├── PrivacyPage.tsx          # Privacybeleid
│   │       └── TermsPage.tsx            # Gebruiksvoorwaarden
│   ├── store/                           # Zustand stores
│   │   ├── useAuthStore.ts              # Firebase auth state + role management
│   │   ├── useConversationsStore.ts     # Gesprekken CRUD + real-time listeners
│   │   └── useMessagesStore.ts          # Berichten per gesprek + real-time sync
│   ├── lib/
│   │   ├── firebase.ts                  # Firebase configuratie en initialisatie
│   │   ├── recoveryId.ts               # recoveryId generatie (15 tekens)
│   │   └── welcomeMessages.ts          # Array van roulerende welkomstberichten
│   ├── types/
│   │   └── index.ts                     # Alle TypeScript types en interfaces
│   └── utils/
│       └── validation.ts                # Inputvalidatie helpers
├── public/
│   ├── manifest.json                    # PWA manifest
│   ├── favicon.svg                      # Favicon
│   └── _redirects                       # Netlify SPA redirects
├── index.html                           # HTML entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
└── CLAUDE.md                            # Dit bestand
```

---

## 4. Functionele Beschrijving

### Wat doet deze app?

Anoniem046 is een anonieme chat-app waar jongeren zonder enige registratie of account in gesprek kunnen gaan met professionele begeleiders van Jong046. De jongere start een gesprek, ontvangt een unieke herstelcode (recoveryId) om het gesprek later te kunnen hervatten, en communiceert via een chat-interface. Begeleiders loggen in, zien alle gesprekken, reageren, en kunnen intern overleggen met collega's. Beheerders beheren de begeleiders.

### Hoofdfunctionaliteiten

- **Anoniem chatten** — Jongere start een gesprek zonder account via Firebase Anonymous Auth. Geen naam, geen e-mail, geen IP wordt opgeslagen in de database.
- **Privacy disclaimer** — Bij elk nieuw gesprek verschijnt een visuele melding die uitlegt wat er wel en niet wordt opgeslagen. Pas na bevestiging ("Ik begrijp het, start gesprek") start het gesprek.
- **Welkomstbericht** — Eerste bericht in elk gesprek is een roulerend systeembericht uit een set van minimaal 5 variaties.
- **recoveryId** — Elk gesprek krijgt een unieke code van 15 alfanumerieke tekens (lowercase + cijfers, geen ambigue karakters zoals 0/O, 1/l, I). Wordt visueel getoond in de chat als kopieerbaar element. Hiermee kan de jongere het gesprek hervatten.
- **Gesprek hervatten** — Via het startscherm kan de jongere een recoveryId invoeren om een eerder gesprek te hervatten en verder te chatten.
- **Heen-en-weer chatten** — Zowel jongere als begeleider kunnen meerdere berichten sturen. Dit is een echt gesprek, geen eenmalige vraag-antwoord.
- **Gesprek sluiten** — Zowel jongere als begeleider kan een gesprek sluiten. Na sluiting: berichten blijven leesbaar, geen nieuwe berichten mogelijk. Systeembericht bevestigt wie heeft gesloten.
- **Begeleider dashboard** — Overzicht van alle gesprekken met statusfiltering (wachten/actief/gesloten). Real-time updates via Firestore onSnapshot.
- **Intern overleg** — Begeleiders kunnen per gesprek intern overleggen met collega's via een apart panel. Deze berichten zijn nooit zichtbaar voor de jongere.
- **Crisis markering** — Begeleider kan een gesprek markeren als crisis. Dit is een visuele vlag, geen automatische actie. Verdere actie ligt bij de professionele deskundigheid van de begeleider.
- **Begeleider profielen** — Publiek zichtbare profielen met naam en korte omschrijving. Jongere kan deze bekijken voor vertrouwensopbouw.
- **Beheerder panel** — Begeleiders toevoegen, deactiveren, en zelf ook reageren op gesprekken.
- **Doorverwijzing** — Begeleider kan in een chatbericht de jongere doorverwijzen naar het Jong046 ontwikkelplatform. Dit is altijd een handmatige actie, nooit automatisch.

### Gebruikersflow — Jongere

1. Jongere opent de app → ziet startscherm met twee opties: **"Start nieuw gesprek"** en **"Hervat gesprek"**
2. **Nieuw gesprek:** Privacy disclaimer verschijnt als overlay:
   - Wat er NIET wordt opgeslagen: naam, e-mail, IP-adres, apparaatgegevens
   - Wat er WEL wordt opgeslagen: de berichten in het gesprek + een anoniem gesprek-ID
   - Expliciete actieknop: "Ik begrijp het, start gesprek"
3. Firebase Anonymous Auth wordt geactiveerd → conversation document wordt aangemaakt in Firestore met recoveryId (15 tekens)
4. Chatscherm opent → roulerend systeemwelkomstbericht verschijnt als eerste bericht
5. recoveryId wordt visueel getoond als kopieerbaar element in de chat → jongere wordt geadviseerd de code te bewaren
6. Jongere typt eerste bericht → status wordt `wachten`
7. Begeleider pakt gesprek op → status wordt `actief` → real-time chat heen en weer
8. Jongere of begeleider sluit het gesprek → status wordt `gesloten` → systeembericht bevestigt sluiting:
   - Bij sluiting door jongere: *"Je hebt dit gesprek beëindigd. Je kunt altijd een nieuw gesprek starten."*
   - Bij sluiting door begeleider: *"Dit gesprek is afgesloten door de begeleider. Je kunt altijd een nieuw gesprek starten."*
9. **Hervat gesprek:** Jongere voert recoveryId in → validatie tegen Firestore → gesprek wordt geladen met volledige chatgeschiedenis → als gesprek nog open is kan er verder gechat worden

### Gebruikersflow — Begeleider

1. Begeleider logt in via email/wachtwoord (route: `/login`)
2. Dashboard toont alle gesprekken met status (wachten/actief/gesloten) en filtering
3. Begeleider opent een gesprek → ziet chatberichten links, intern overleg panel rechts (desktop) of als tabs (mobiel)
4. Begeleider reageert op de jongere → bericht wordt real-time zichtbaar voor jongere
5. Begeleider kan intern overleggen met collega's → berichten alleen zichtbaar voor begeleiders
6. Begeleider kan gesprek markeren als crisis (visuele vlag)
7. Begeleider kan gesprek sluiten
8. Begeleider kan jongere doorverwijzen naar Jong046 platform (handmatig in chatbericht)

### Gebruikersflow — Beheerder

1. Beheerder logt in → ziet beheerdashboard
2. Kan begeleiders toevoegen (account aanmaken + profiel instellen)
3. Kan begeleiders deactiveren (`active: false` → login geblokkeerd, maar data blijft)
4. Kan zelf ook reageren op gesprekken, net als een begeleider

### Wat doet de app NIET?

- Geen persoonsgegevens van jongeren opslaan (geen naam, geen e-mail, geen IP, geen apparaatgegevens)
- Geen automatische doorverwijzing — altijd handmatig door begeleider
- Geen push notificaties (v1)
- Geen bestandsuploads
- Geen video/audio calls
- Geen AI/chatbot antwoorden — alle reacties komen van menselijke begeleiders
- Geen automatische crisisdetectie
- Geen directe koppeling met Jong046 platform (doorverwijzing is een chatbericht, geen technische integratie)

---

## 5. Visuele Beschrijving

**Kleurenschema:**
- Primair: Donkerblauw/paars tinten — rustgevend, veilig gevoel
- Achtergrond primair: `#0f172a` (slate-900)
- Achtergrond secondary: `#1e293b` (slate-800)
- Achtergrond elevated: `#334155` (slate-700)
- Accent: `#818cf8` (indigo-400) — knoppen, links, actieve elementen
- Accent hover: `#6366f1` (indigo-500)
- Tekst primair: `#f8fafc` (slate-50)
- Tekst secondary: `#cbd5e1` (slate-300)
- Tekst muted: `#94a3b8` (slate-400)
- Succes: `#34d399` (emerald-400)
- Waarschuwing/Crisis: `#f87171` (red-400)
- Systeembericht achtergrond: transparant, tekst `#94a3b8` (slate-400), gecentreerd, kleiner lettertype
- Chat bubbel jongere: `#3730a3` (indigo-800) met `#c7d2fe` (indigo-200) tekst — rechts uitgelijnd
- Chat bubbel begeleider: `#1e293b` (slate-800) met `#f1f5f9` (slate-100) tekst — links uitgelijnd
- Borders: `rgba(255, 255, 255, 0.1)`

**Typografie:**
- Font: Inter (Google Fonts) — gewichten: 400, 500, 600, 700
- Fallback: systeemfont stack

**Design stijl:** Dark theme, mobile-first. De app moet voelen als een veilige, moderne chat-ervaring. Niet klinisch, niet als een formulier. Grote invoervelden, minimale navigatie, rustige kleuren, subtiele animaties via Framer Motion. Chat-bubbels met afgeronde hoeken (`rounded-2xl`), tijdstempels subtiel onder de bubbel. Startscherm uitnodigend, niet intimiderend.

**Begeleider dashboard:** Functioneel en overzichtelijk. Statusbadges per gesprek (kleurgecodeerd: groen = actief, geel = wachten, grijs = gesloten, rood = crisis). Snelle filtering. Split-view op desktop: chat links, intern overleg rechts. Op mobiel: tabs.

**Componenten:**
- [x] Startscherm met twee grote knoppen (nieuw gesprek / hervatten)
- [x] Privacy disclaimer overlay/modal
- [x] Chat interface met bubbels (jongere rechts, begeleider links, systeem gecentreerd)
- [x] recoveryId display (visueel blok met kopieerknop, clipboard API)
- [x] recoveryId invoerveld (hervatten)
- [x] Begeleider profielen kaarten
- [x] Gesprekkenlijst met statusbadges en filtering
- [x] Split-view: chat + intern overleg panel
- [x] Crisis markering toggle
- [x] Gesprek sluiten knop (beide partijen)
- [x] Login formulier (begeleider/beheerder)
- [x] Begeleider management tabel (beheerder)
- [x] Bottom nav (mobiel, begeleider/beheerder)
- [x] Sidebar (desktop, begeleider/beheerder)

**Responsive:** Ja — mobile-first. Jongere-interface is primair mobiel. Begeleider-interface: split-view op desktop (>=1024px), tabs op mobiel.

---

## 6. Datamodel (Firestore)

Alle collections gebruiken de prefix `a046_` om te scheiden van bestaande Jong046 collections in hetzelfde Firebase project (`jong046`).

### Collections

```
a046_users/{userId}
├── email: string                      // login e-mail begeleider/beheerder
├── displayName: string                // publiek zichtbare naam
├── role: 'begeleider' | 'beheerder'
├── bio: string                        // korte omschrijving voor publiek profiel
├── avatarUrl?: string                 // optioneel profielfoto (URL)
├── active: boolean                    // beheerder kan toegang intrekken
├── createdAt: Timestamp
└── updatedAt: Timestamp

a046_conversations/{conversationId}
├── anonymousUid: string               // Firebase Anonymous Auth uid
├── status: 'wachten' | 'actief' | 'gesloten'
├── assignedTo?: string                // userId begeleider die oppakt
├── assignedToName?: string            // displayName begeleider (voor snelle weergave)
├── isCrisis: boolean                  // crisis markering door begeleider
├── closedBy?: 'jongere' | 'begeleider'  // wie heeft gesloten (alleen bij status gesloten)
├── recoveryId: string                 // 15 alfanumerieke tekens, uniek
├── createdAt: Timestamp
└── updatedAt: Timestamp

a046_conversations/{conversationId}/messages/{messageId}
├── authorType: 'jongere' | 'begeleider' | 'systeem'
├── authorId?: string                  // null voor jongere en systeem, userId voor begeleider
├── authorName?: string                // displayName begeleider (null voor jongere/systeem)
├── content: string                    // berichttekst
├── createdAt: Timestamp

a046_conversations/{conversationId}/internal_notes/{noteId}
├── authorId: string                   // userId begeleider
├── authorName: string                 // displayName begeleider
├── content: string                    // intern overleg tekst
├── createdAt: Timestamp

a046_recovery/{recoveryId}             // Lookup tabel voor gesprek hervatten
├── conversationId: string
└── createdAt: Timestamp
```

### Waarom aparte `internal_notes` subcollection?

De `messages` subcollection wordt real-time gesynct naar de jongere via `onSnapshot`. Als interne berichten in dezelfde collection zouden zitten, zou de jongere deze data ontvangen in de client (ook al filter je client-side). Firestore security rules kunnen niet filteren op veldwaarden binnen subcollection queries. Een aparte subcollection maakt een schone security rule mogelijk: jongere heeft nul toegang tot `internal_notes`.

### Waarom aparte `a046_recovery` collection?

Bij het hervatten van een gesprek heeft de jongere mogelijk een nieuwe `anonymousUid` (als de app opnieuw geinstalleerd is of de browser cache gewist is). De `a046_recovery` collection mapt het recoveryId naar een conversationId. Na succesvolle lookup wordt het `anonymousUid` op de conversation geüpdatet naar de nieuwe anonymous uid, zodat de jongere weer toegang krijgt.

### Indexen

| Collection | Veld(en) | Type |
|---|---|---|
| `a046_conversations` | `recoveryId` | Ascending (uniek, voor lookup) |
| `a046_conversations` | `status`, `createdAt` | Composite (dashboard filtering + sortering) |
| `a046_conversations` | `anonymousUid`, `createdAt` | Composite (jongere eigen gesprekken) |
| `a046_conversations/{id}/messages` | `createdAt` | Ascending (chronologische chat) |
| `a046_conversations/{id}/internal_notes` | `createdAt` | Ascending (chronologisch intern overleg) |

---

## 7. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ============================================
    // Helper functies
    // ============================================

    function isAuthenticated() {
      return request.auth != null;
    }

    function isAnonymous() {
      return isAuthenticated()
        && request.auth.token.firebase.sign_in_provider == 'anonymous';
    }

    function getUserDoc() {
      return get(/databases/$(database)/documents/a046_users/$(request.auth.uid));
    }

    function isCounselor() {
      return isAuthenticated()
        && !isAnonymous()
        && exists(/databases/$(database)/documents/a046_users/$(request.auth.uid))
        && getUserDoc().data.active == true
        && getUserDoc().data.role in ['begeleider', 'beheerder'];
    }

    function isAdmin() {
      return isAuthenticated()
        && !isAnonymous()
        && exists(/databases/$(database)/documents/a046_users/$(request.auth.uid))
        && getUserDoc().data.active == true
        && getUserDoc().data.role == 'beheerder';
    }

    // ============================================
    // a046_users — Begeleider/beheerder profielen
    // ============================================
    match /a046_users/{userId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // ============================================
    // a046_recovery — recoveryId lookup tabel
    // ============================================
    match /a046_recovery/{recoveryId} {
      allow read: if isAnonymous();
      allow create: if isAnonymous();
      allow update, delete: if false;
    }

    // ============================================
    // a046_conversations — Gesprekken
    // ============================================
    match /a046_conversations/{conversationId} {
      // Lezen: eigen gesprekken (jongere) of alle gesprekken (begeleider)
      allow read: if (isAnonymous() && resource.data.anonymousUid == request.auth.uid)
                  || isCounselor();

      // Aanmaken: alleen jongere, met eigen uid en status wachten
      allow create: if isAnonymous()
                    && request.resource.data.anonymousUid == request.auth.uid
                    && request.resource.data.status == 'wachten';

      // Updaten: jongere mag sluiten + uid updaten (recovery), begeleider mag alles
      allow update: if (isAnonymous()
                        && (
                          // Gesprek sluiten
                          (resource.data.anonymousUid == request.auth.uid
                            && request.resource.data.status == 'gesloten'
                            && request.resource.data.closedBy == 'jongere')
                          ||
                          // Recovery: uid updaten via recoveryId lookup
                          (request.resource.data.anonymousUid == request.auth.uid
                            && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['anonymousUid', 'updatedAt']))
                        ))
                    || isCounselor();

      // Verwijderen: nooit
      allow delete: if false;

      // ---- Messages subcollection ----
      match /messages/{messageId} {
        allow read: if (isAnonymous()
                        && get(/databases/$(database)/documents/a046_conversations/$(conversationId)).data.anonymousUid == request.auth.uid)
                    || isCounselor();

        allow create: if (isAnonymous()
                          && get(/databases/$(database)/documents/a046_conversations/$(conversationId)).data.anonymousUid == request.auth.uid
                          && request.resource.data.authorType == 'jongere')
                      || (isCounselor()
                          && request.resource.data.authorType in ['begeleider', 'systeem']);

        allow update, delete: if false;
      }

      // ---- Internal Notes subcollection ----
      match /internal_notes/{noteId} {
        allow read, write: if isCounselor();
      }
    }
  }
}
```

---

## 8. recoveryId Specificatie

**Lengte:** 15 tekens
**Karakterset:** Lowercase alfanumeriek, exclusief ambigue karakters
**Uitgesloten karakters:** `0` (nul), `o`, `1`, `l`, `i`
**Toegestane karakterset:** `23456789abcdefghjkmnpqrstuvwxyz` (30 tekens)
**Entropie:** 30^15 = circa 1.4 x 10^22 mogelijkheden
**Generatie:** Client-side via `crypto.getRandomValues()` in `src/lib/recoveryId.ts`
**Opslag:** Als veld op `a046_conversations` document + als document-ID in `a046_recovery` collection
**Weergave:** Gegroepeerd als `xxxxx-xxxxx-xxxxx` voor leesbaarheid (opslag zonder streepjes)

```typescript
// src/lib/recoveryId.ts
const CHARSET = '23456789abcdefghjkmnpqrstuvwxyz';
const LENGTH = 15;

export function generateRecoveryId(): string {
  const array = new Uint8Array(LENGTH);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => CHARSET[byte % CHARSET.length]).join('');
}

export function formatRecoveryId(id: string): string {
  return `${id.slice(0, 5)}-${id.slice(5, 10)}-${id.slice(10, 15)}`;
}

export function normalizeRecoveryId(input: string): string {
  return input.replace(/[-\s]/g, '').toLowerCase().trim();
}
```

---

## 9. Welkomstberichten

```typescript
// src/lib/welcomeMessages.ts
export const WELCOME_MESSAGES: string[] = [
  'Hoi! Fijn dat je hier bent. Stel gerust je vraag — een begeleider reageert zo snel mogelijk.',
  'Welkom. Dit gesprek is anoniem en veilig. Vertel wat je bezighoudt.',
  'Hey, goed dat je de stap zet. Een begeleider leest zo mee.',
  'Hoi! Je bent hier anoniem en veilig. Neem de tijd en deel wat je wilt.',
  'Welkom bij dit gesprek. Er is geen goed of fout — vertel gewoon wat er speelt.',
  'Hey! Fijn dat je er bent. Wat je hier deelt blijft tussen jou en de begeleider.',
  'Hoi, welkom. Je hoeft je niet voor te stellen — begin gewoon met je vraag.',
];

export function getRandomWelcomeMessage(): string {
  return WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
}
```

---

## 10. TypeScript Types

```typescript
// src/types/index.ts
import { Timestamp } from 'firebase/firestore';

export interface A046User {
  id: string;
  email: string;
  displayName: string;
  role: 'begeleider' | 'beheerder';
  bio: string;
  avatarUrl?: string;
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface A046Conversation {
  id: string;
  anonymousUid: string;
  status: 'wachten' | 'actief' | 'gesloten';
  assignedTo?: string;
  assignedToName?: string;
  isCrisis: boolean;
  closedBy?: 'jongere' | 'begeleider';
  recoveryId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface A046Message {
  id: string;
  authorType: 'jongere' | 'begeleider' | 'systeem';
  authorId?: string;
  authorName?: string;
  content: string;
  createdAt: Timestamp;
}

export interface A046InternalNote {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}

export interface A046Recovery {
  conversationId: string;
  createdAt: Timestamp;
}
```

---

## 11. Routing

```
// Publieke routes (geen auth vereist)
/                           → YouthHomePage (startscherm)
/gesprek/:conversationId    → YouthChatPage (actief gesprek)
/begeleiders                → CounselorsPage (publieke profielen)
/privacy                    → PrivacyPage
/voorwaarden                → TermsPage

// Auth routes
/login                      → LoginPage (begeleider/beheerder)

// Begeleider routes (role guard: begeleider | beheerder)
/dashboard                  → CounselorDashboardPage
/dashboard/gesprek/:id      → CounselorChatPage

// Beheerder routes (role guard: beheerder)
/admin                      → AdminDashboardPage
/admin/begeleiders          → CounselorManagement
```

Route guards via `ProtectedRoute` component:
1. Is de gebruiker ingelogd (niet anonymous)?
2. Heeft de gebruiker een actief profiel in `a046_users`?
3. Heeft de gebruiker de juiste rol?

Jongere-routes: geen auth guard. Firebase Anonymous Auth wordt automatisch geactiveerd bij het starten van een gesprek.

---

## 12. Make.com Integraties (toekomstig)

| Scenario | Trigger | Doel | Status |
|---|---|---|---|
| recoveryId mailen | HTTP webhook (POST) | Stuurt recoveryId per e-mail naar jongere (vrijwillig) | Nog niet geimplementeerd |

Toekomstige flow: Begeleider vraagt optioneel aan de jongere of die een e-mailadres wil delen om de herstelcode te ontvangen. Als de jongere dit doet, triggert de begeleider een Make.com webhook. Het e-mailadres wordt NIET opgeslagen in Firestore — alleen doorgestuurd via de webhook als eenmalige actie. Anonimiteit blijft intact in de database.

Webhook URL: Op te slaan in Firestore `a046_settings` collection (nooit hardcoded).

---

## 13. Privacy & AVG

### Jongere
- Firebase Anonymous Auth genereert een `uid` — willekeurige string zonder koppeling aan persoonsgegevens
- Geen naam, e-mail, IP-adres, of apparaatgegevens worden opgeslagen in Firestore
- De berichten zelf kunnen indirect persoonlijke informatie bevatten (vrijwillig gedeeld door de jongere)
- Bij verwijdering van de app: toegang tot gesprekken verloren tenzij recoveryId bewaard is
- Transparante privacy disclaimer bij elk nieuw gesprek

### Begeleider / Beheerder
- Standaard AVG-verwerkingsgrondslag: uitvoering overeenkomst / gerechtvaardigd belang
- Account bevat: e-mail, naam, bio — minimale dataset
- Begeleiders zijn professionele hulpverleners van Jong046

### Crisisprotocol
- Begeleider reageert vanuit professionele deskundigheid bij crisis
- Platform faciliteert communicatie maar draagt geen verantwoordelijkheid voor de inhoud van de hulpverlening
- Keuze voor anonimiteit is bewust: begeleider werkt binnen de grenzen van wat het concept toelaat
- Crisis markering is een interne visuele vlag — geen automatische actie of escalatie
- Begeleider kan in chatbericht verwijzen naar 113 Zelfmoordpreventie, Kindertelefoon, of andere hulplijnen

### Data retention
- Gesprekken worden niet automatisch verwijderd in v1
- Configureerbare retention period is een toekomstige uitbreiding — beleidskeuze voor Jong046

---

## 14. Firebase Configuratie

```typescript
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'jong046.firebaseapp.com',
  projectId: 'jong046',
  storageBucket: 'jong046.firebasestorage.app',
  messagingSenderId: '342257774025',
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 15. Coding Regels voor dit Project

Claude Code houdt zich ALTIJD aan deze regels, ook als een andere aanpak "logischer" lijkt.

### Verplicht:
- Gebruik altijd `fetch`, nooit `axios`
- Componenten zijn altijd functional components met hooks
- TypeScript strict mode — vermijd `any` waar mogelijk
- CSS via Tailwind utility classes, geen aparte CSS bestanden per component
- Dark mode is de enige modus — geen light mode toggle
- State management via Zustand stores — geen Redux, geen Context API voor data
- Firebase Firestore voor alle data — real-time sync via `onSnapshot` voor chat
- Alle tekst in de UI is Nederlands
- Iconen uit `lucide-react`
- Animaties via Framer Motion (subtiel)
- `cn()` helper gebruiken voor conditionele classnames (clsx + tailwind-merge)
- Collections altijd met `a046_` prefix
- recoveryId generatie via `crypto.getRandomValues()` — nooit `Math.random()`

### Verboden:
- Geen Next.js — dit is een Vite SPA met React Router DOM
- Geen nieuwe npm packages zonder overleg
- Geen `console.log` in productie code
- Geen inline styles — gebruik Tailwind classes
- Geen directe Firebase SDK calls in componenten — altijd via stores of lib bestanden
- Geen API keys hardcoded in frontend code (gebruik `VITE_` env variabelen)
- Geen axios — alleen fetch
- Geen Firebase Storage — geen uploads in v1
- Geen server-side rendering

### Naamgeving:
- Componenten: PascalCase (`ChatView.tsx`, `StartScreen.tsx`)
- Functies/variabelen: camelCase (`generateRecoveryId`, `getRandomWelcomeMessage`)
- Bestanden: PascalCase voor componenten/pagina's, camelCase voor lib/utils/stores
- CSS classes: Tailwind utility classes
- Types/Interfaces: PascalCase met `A046` prefix (`A046Conversation`, `A046Message`)
- Stores: `use[Naam]Store.ts` patroon (`useConversationsStore.ts`)
- Firestore collections: `a046_` prefix, snake_case (`a046_conversations`, `a046_users`, `a046_recovery`)

---

## 16. Environment Variables

```env
# Frontend (.env / .env.local) — Vite gebruikt VITE_ prefix
VITE_FIREBASE_API_KEY=AIzaSyCPzd7uSqCLZZSxUq2eMWGtG602DnEnqW4
VITE_FIREBASE_APP_ID=1:342257774025:web:767cc9ac4ee0a575df4c18

# Overige Firebase config staat in firebase.ts (niet geheim):
# authDomain, projectId, storageBucket, messagingSenderId

# Nooit committen:
# - .env.local bestanden
# - Webhook URLs met secrets
```

---

## 17. Bekende Issues / TODO

- [ ] Domein nog niet definitief — `DITDOMEIN.nl` is placeholder
- [ ] Make.com webhook voor recoveryId mailen nog niet geimplementeerd
- [ ] Data retention policy nog niet bepaald door Jong046
- [ ] Push notificaties voor begeleiders (v2)
- [ ] PWA service worker voor offline indicatie (v2)
- [ ] Geen geautomatiseerde tests
- [ ] Geen CI/CD pipeline geconfigureerd

---

## 18. SandeDesign Ecosysteem Context

Dit project is onderdeel van een breder ecosysteem. Gerelateerde projecten:

| Project | Doel | Relatie |
|---|---|---|
| **Anoniem046** | Anonieme chat voor jongeren | **Dit project** |
| Jong046 | Jeugdbegeleidingsplatform | Zelfde Firebase project, doorverwijzing vanuit Anoniem046 |
| Facto | Facturatie voor freelancers | Geen directe relatie |
| Vlottr | Auto verhuur Zuid-Limburg | Geen directe relatie |
| FLG-Administratie | Loonadministratie | Geen directe relatie |
| Agendi | Taakbeheer + agenda | Geen directe relatie |
| Uitgaaf | Persoonlijke boekhouding | Geen directe relatie |
| Athletic Academy | Fitness en coaching | Geen directe relatie |

**Gedeelde patronen in het ecosysteem:**
- React/TypeScript als frontend standaard
- Tailwind CSS voor styling
- Vite als build tool
- Firebase als backend (Auth + Firestore)
- Zustand voor state management
- Lucide React voor iconen
- Zelfde GitHub organisatie (SandeDesign)
- bolt.new pro voor project initialisatie en deploy

---

## 19. Crisisprotocol — Technische Implementatie

Het crisisprotocol is primair een menselijk protocol, geen technisch systeem:

1. **Crisis markering** — Begeleider kan `isCrisis: true` zetten op een conversation. Dit toont een rode badge in het dashboard.
2. **Geen automatische escalatie** — Geen automatische acties bij crisis markering.
3. **Geen automatische detectie** — Geen AI of keyword scanning op berichten. Professionele inschatting van de begeleider is leidend.
4. **Hulplijnen** — Begeleider kan in chatbericht verwijzen naar hulplijnen (113, Kindertelefoon, etc.). Dit is handmatig, geen automatische functie.

---

## 20. Project Identity

**Anoniem046** is een werktitel. Jong046 als team krijgt de ruimte om hier zelf een naam aan te geven.

- **Creator:** SandeDesign — `https://sandedesign.nl`
- **Opdrachtgever:** Jong046 / Vidar
- **Doelgroep:** Jongeren in de regio Sittard-Geleen (046 netnummergebied)
- **Toon:** Laagdrempelig, veilig, anoniem. Geen jargon, geen klinische taal.
- **Vertrouwelijkheid:** Het conceptdocument is vertrouwelijk en niet voor verdere verspreiding zonder toestemming.

---

*Gegenereerd via CLAUDE.md basis template — SandeDesign*
*Laatst bijgewerkt: 2026-03-24*
