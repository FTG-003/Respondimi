# ChatBot AI - Landing & SaaS

Landing page professionale e piattaforma SaaS per chatbot AI, con pagine legali, area clienti, pagamenti Stripe e database cloud.

---

## 🚀 Stack Tecnologico
- **Frontend:** HTML5, CSS3 (Inter), JS (vanilla o framework a scelta)
- **Hosting:** [Netlify](https://www.netlify.com/) (deploy automatico da GitHub)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL serverless) / [Neon](https://neon.tech/) / [Firebase](https://firebase.google.com/)
- **Pagamenti:** [Stripe](https://stripe.com/it)
- **API/Backend:** Netlify Functions (serverless)
- **Repo:** GitHub

---

## 📁 Struttura del Progetto

```
/
├── index.html                # Landing page principale
├── privacy.html              # Privacy Policy (GDPR)
├── cookie-policy.html        # Cookie Policy (ePrivacy)
├── css/
│   └── style.css             # Stili globali
├── src/
│   ├── img/                  # Logo, favicon, immagini
│   └── js/
│       └── main.js           # Script JS principale
├── netlify/functions/        # Funzioni serverless (es. stripe, auth)
├── README.md                 # Questa guida
└── ...
```

---

## ⚡️ Deploy rapido su Netlify
1. **Crea una repo su GitHub** e carica il progetto.
2. **Collega la repo a Netlify** (login Netlify > New site from Git > scegli la repo).
3. **Configura build:**
   - Per HTML statico: nessun comando build, directory di pubblicazione = root (`/`).
   - Per React/Vue: imposta comando build (`npm run build`) e directory (`build/` o `dist/`).
4. **Ogni push su GitHub aggiorna il sito**.

---

## 🗄️ Database (Supabase/Neon/Firebase)
- **Crea un account** su Supabase/Neon/Firebase.
- **Crea un progetto/database**.
- **Definisci le tabelle** (esempio base):
  - `users` (id, email, password_hash, created_at)
  - `chatbots` (id, user_id, nome, stato, created_at)
  - `orders` (id, user_id, chatbot_id, stripe_id, status, created_at)
- **Ottieni le chiavi/API** e salvale su Netlify (Settings > Environment variables).
- **Integra il database** nel frontend o nelle Netlify Functions.

---

## 👤 Autenticazione & Area Clienti
- **Consigliato:** Supabase Auth, Firebase Auth, o Auth0.
- **Flusso tipico:**
  1. Registrazione/login utente.
  2. Accesso all'area clienti protetta (dashboard, chatbot acquistati, ordini, pagamenti).
  3. Logout e gestione profilo.
- **Proteggi le pagine riservate** via JS e/o Netlify Functions.

---

## 💳 Pagamenti Stripe
- **Crea un account Stripe** e ottieni le chiavi API.
- **Crea una Netlify Function** per generare sessioni di pagamento Stripe Checkout.
- **Collega Stripe al database** per tracciare ordini e abbonamenti.
- **Gestisci i webhook Stripe** (Netlify Function) per aggiornare lo stato dei pagamenti.
- **Esempio flusso:**
  1. L’utente clicca “Acquista” → chiamata a funzione serverless che crea la sessione Stripe.
  2. Redirect a Stripe Checkout.
  3. Stripe chiama il webhook → aggiorna ordine nel database.
  4. L’utente viene reindirizzato alla dashboard.

---

## 🛡️ Sicurezza & GDPR
- **HTTPS** sempre attivo (Netlify lo gestisce automaticamente).
- **Dati personali** gestiti secondo GDPR (vedi privacy.html e cookie-policy.html).
- **Proteggi le API** e le funzioni serverless (autenticazione, validazione input).
- **Backup e monitoraggio** consigliati per database e funzioni critiche.

---

## 📚 Link utili
- [Netlify Docs](https://docs.netlify.com/)
- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Guida Netlify Functions](https://docs.netlify.com/functions/overview/)
- [GDPR - Garante Privacy](https://www.garanteprivacy.it/)

---

## 📝 Note finali
- Personalizza le tabelle e le funzioni in base alle tue esigenze.
- Per domande o supporto, consulta la documentazione ufficiale dei servizi usati.
- Ricorda di aggiornare le policy legali in base alle funzionalità offerte. 