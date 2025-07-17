// dashboard.js - Gestione dinamica dashboard utente ChatBot AI
// TODO: Integrare autenticazione (Netlify Identity/Clerk) e fetch reale da API NeonDB

// Dati demo (simulazione risposta API)
const DEMO_DATA = {
  user: {
    name: "Mario Rossi",
    plan: {
      name: "Bot Attivo",
      price: "9€/mese",
      renewal: "2025-08-16"
    },
    documents: [
      { name: "faq.pdf", uploaded_at: "2024-06-10" },
      { name: "offerta-estiva.pdf", uploaded_at: "2024-07-01" },
      { name: "listino-2024.pdf", uploaded_at: "2024-07-15" }
    ],
    bot: {
      url: "https://pyragogy.org/bot/studio-verdi",
      status: "online"
    },
    billing: {
      autorenew: true
    }
  }
};

// Simula una fetch API REST (in futuro: fetch(`/api/user/${userId}`))
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simula latenza di rete
    setTimeout(() => {
      // Fallback demo: restituisce sempre DEMO_DATA
      if (DEMO_DATA && DEMO_DATA.user) {
        resolve(DEMO_DATA.user);
      } else {
        reject(new Error("Dati utente non disponibili"));
      }
    }, 400);
  });
}

// Popola la sezione piano attivo
function renderPlanInfo(user) {
  const planName = document.getElementById("plan-name");
  const planPrice = document.getElementById("plan-price");
  const renewalDate = document.getElementById("renewal-date");
  if (!user.plan) return;
  planName.textContent = user.plan.name;
  planPrice.textContent = user.plan.price;
  // Formatta la data in stile italiano
  const date = new Date(user.plan.renewal);
  const formatted = date.toLocaleDateString("it-IT", { day: "2-digit", month: "2-digit", year: "numeric" });
  renewalDate.textContent = `– prossimo rinnovo ${formatted}`;
}

// Popola la lista documenti caricati
function renderDocuments(user) {
  const list = document.getElementById("documents-list");
  list.innerHTML = "";
  if (!user.documents || user.documents.length === 0) {
    list.innerHTML = '<li style="color:var(--text-secondary);">Nessun documento caricato</li>';
    return;
  }
  user.documents.slice(0, 10).forEach((doc, idx) => {
    const li = document.createElement("li");
    li.setAttribute("data-doc-id", idx + 1);
    li.textContent = doc.name + " ";
    const span = document.createElement("span");
    span.style.color = "var(--text-secondary)";
    span.style.fontSize = "0.97rem";
    span.style.marginLeft = "0.7em";
    // Formatta la data
    const date = new Date(doc.uploaded_at);
    span.textContent = `Caricato il ${date.toLocaleDateString("it-IT")}`;
    li.appendChild(span);
    list.appendChild(li);
  });
}

// Popola la sezione chatbot personale
function renderBotStatus(user) {
  const botUrl = document.getElementById("bot-url");
  const botStatus = document.getElementById("bot-status");
  if (!user.bot) return;
  botUrl.textContent = user.bot.url;
  botUrl.setAttribute("data-bot-url", user.bot.url);
  if (user.bot.status === "online") {
    botStatus.innerHTML = "🟢 Online";
    botStatus.style.color = "#10b981";
  } else {
    botStatus.innerHTML = "🔴 Offline";
    botStatus.style.color = "#ef4444";
  }
}

// Popola la sezione gestione abbonamento
function renderBilling(user) {
  const billingStatus = document.getElementById("billing-status");
  if (!user.billing) return;
  billingStatus.innerHTML = `Rinnovo automatico: <span style='color:${user.billing.autorenew ? '#10b981' : '#ef4444'}; font-weight:600;'>${user.billing.autorenew ? 'Attivo' : 'Non attivo'}</span>`;
}

// Gestione modale QR code
function setupQRModal() {
  const qrBtn = document.getElementById("qr-btn");
  const qrModal = document.getElementById("qr-modal");
  const qrClose = document.getElementById("qr-close");
  if (qrBtn && qrModal && qrClose) {
    qrBtn.addEventListener("click", () => {
      qrModal.style.display = "flex";
    });
    qrClose.addEventListener("click", () => {
      qrModal.style.display = "none";
    });
    // Chiudi modale con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") qrModal.style.display = "none";
    });
  }
}

// Inizializzazione dashboard
function initDashboard() {
  // In futuro: recupera userId da Netlify Identity/Clerk
  const userId = "demo-user";
  fetchUserData(userId)
    .then(user => {
      renderPlanInfo(user);
      renderDocuments(user);
      renderBotStatus(user);
      renderBilling(user);
      // Benvenuto dinamico
      const welcome = document.querySelector(".dashboard-welcome");
      if (welcome && user.name) welcome.textContent = `Benvenuto, ${user.name}`;
    })
    .catch(err => {
      // Fallback: mostra errore in tutte le sezioni
      document.getElementById("plan-name").textContent = "Errore";
      document.getElementById("plan-price").textContent = "-";
      document.getElementById("renewal-date").textContent = "Dati non disponibili";
      document.getElementById("documents-list").innerHTML = '<li style="color:var(--accent-color);">Errore nel caricamento documenti</li>';
      document.getElementById("bot-url").textContent = "-";
      document.getElementById("bot-status").innerHTML = "Errore";
      document.getElementById("billing-status").innerHTML = "Stato abbonamento non disponibile";
    });
  setupQRModal();
}

// Avvia la dashboard al caricamento pagina
window.addEventListener("DOMContentLoaded", initDashboard); 