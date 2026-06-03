// --- SUPABASE SETUP ---
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://cdujwexbkryjocrpoklj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdWp3ZXhia3J5am9jcnBva2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTAzNzEsImV4cCI6MjA5NTg4NjM3MX0.kOQpBavXpsxr7jn7NZFQw58fxpNlN7e32NWcgQezx-g'
)

// --- LOGIN ---
function login() {
  const email = document.getElementById('email')?.value.trim()
  const password = document.getElementById('password')?.value.trim()
  if (!email || !password) { alert('Vul je gegevens in.'); return; }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === email && u.password === password)

  if (user) {
    localStorage.setItem('gebruiker', user.email)
    window.location.href = 'dashboard.html'
    return
  }

  if (password.length >= 3 && users.length === 0) {
    localStorage.setItem('gebruiker', email)
    window.location.href = 'dashboard.html'
  } else {
    alert('Ongeldige inloggegevens.')
  }
}

function register() {
  const name = document.getElementById('registerName')?.value.trim()
  const email = document.getElementById('registerEmail')?.value.trim()
  const password = document.getElementById('registerPassword')?.value.trim()
  const confirmPassword = document.getElementById('registerConfirmPassword')?.value.trim()
  const acceptTerms = document.getElementById('acceptTerms')?.checked

  if (!name || !email || !password || !confirmPassword) {
    alert('Fill in all fields.')
    return
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.')
    return
  }

  if (!acceptTerms) {
    alert('Please accept the terms.')
    return
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (users.find(u => u.email === email)) {
    alert('An account with this email already exists.')
    return
  }

  users.push({ name, email, password })
  localStorage.setItem('users', JSON.stringify(users))
  localStorage.setItem('gebruiker', email)
  window.location.href = 'dashboard.html'
}

// --- PRODUCT DATA ---
const productData = {
  'CHOC-001': { naam: 'Pure Chocoladereep 85%', houdbaar: '25 apr 2026', allergenen: ['Melk', 'Soja'] },
  'CHOC-002': { naam: 'Melkchocolade Classic', houdbaar: '12 mei 2026', allergenen: ['Melk', 'Noten'] },
  'CHOC-003': { naam: 'White Chocolate Delight', houdbaar: '8 jun 2026', allergenen: ['Melk'] },
  'CHOC-004': { naam: 'Hazelnoot Reep', houdbaar: '30 jul 2026', allergenen: ['Noten', 'Melk'] },
}

// --- DASHBOARD ---
async function registreerProduct() {
  const code = document.getElementById('productCode').value.trim().toUpperCase()
  const statusDiv = document.getElementById('registerStatus')
  const gebruiker = localStorage.getItem('gebruiker') || 'demo@vellin.nl'

  if (!code) {
    statusDiv.innerHTML = '<div class="status-melding status-error">Voer een productcode in.</div>'
    return
  }

  const { error } = await supabase
    .from('producten')
    .insert([{ gebruiker, productcode: code }])

  if (error) {
    statusDiv.innerHTML = '<div class="status-melding status-error">Fout: ' + error.message + '</div>'
    return
  }

  document.getElementById('productCode').value = ''
  statusDiv.innerHTML = '<div class="status-melding status-success">✓ Product geregistreerd!</div>'
  toonProducten()
}

async function toonProducten() {
  const div = document.getElementById('producten')
  if (!div) return

  const gebruiker = localStorage.getItem('gebruiker') || 'demo@vellin.nl'
  const { data, error } = await supabase
    .from('producten')
    .select('*')
    .eq('gebruiker', gebruiker)

  if (error || !data || data.length === 0) {
    div.innerHTML = '<p style="color:#888;">Nog geen producten geregistreerd. Voer een productcode in hierboven.</p>'
    return
  }

  div.innerHTML = data.map(rij => {
    const info = productData[rij.productcode]
    if (info) {
      return `
        <div class="product-kaart">
          <div style="font-size:40px;"> </div>
          <h4>${info.naam}</h4>
          <p> Houdbaar t/m ${info.houdbaar}</p>
          <p>${info.allergenen.map(a => `<span class="badge">${a}</span>`).join('')}</p>
          <p style="font-size:12px; color:#c9a84c;">Code: ${rij.productcode}</p>
        </div>`
    } else {
      return `
        <div class="product-kaart">
          <div style="font-size:40px;"> </div>
          <h4>Onbekend product</h4>
          <p style="color:#888;">Code: ${rij.productcode}</p>
        </div>`
    }
  }).join('')
}

// Auto-loading producten disabled to preserve manual product cards in the static dashboard layout
// if (document.getElementById('producten')) toonProducten()

// --- KLACHTEN ---
async function verstuurKlacht() {
  const onderwerp = document.getElementById('onderwerp')?.value.trim()
  const beschrijving = document.getElementById('beschrijving')?.value.trim()
  const productcode = document.getElementById('klachtProductCode')?.value.trim()
  const statusDiv = document.getElementById('klachtStatus')

  if (!onderwerp || !beschrijving) {
    statusDiv.innerHTML = '<div class="status-melding status-error">Vul onderwerp en beschrijving in.</div>'
    return
  }

  const { error } = await supabase
    .from('klachten')
    .insert([{ onderwerp, beschrijving, productcode: productcode || '' }])

  if (error) {
    statusDiv.innerHTML = '<div class="status-melding status-error">Fout: ' + error.message + '</div>'
    return
  }

  const nummer = 'VEL-' + Math.floor(Math.random() * 9000 + 1000)
  statusDiv.innerHTML = `<div class="status-melding status-success"> Klacht ontvangen! Ticketnummer: #${nummer}</div>`
  document.getElementById('onderwerp').value = ''
  document.getElementById('beschrijving').value = ''
  if (document.getElementById('klachtProductCode')) document.getElementById('klachtProductCode').value = ''
}

// --- SHOP ---
const shopItems = [
  { id: 'CHOC-001', naam: 'Premium Dark Chocolate', prijs: '€4,99', voorraad: 245, levertijd: '2-3 dagen', categorie: 'all', tag: 'New', voorraadLabel: 'Op voorraad', b2b: 'Next batch: 27 April 2026' },
  { id: 'CHOC-002', naam: 'Artisan Dark Collection', prijs: '€6,99', voorraad: 42, levertijd: '1-2 dagen', categorie: 'fairtrade', tag: 'Fairtrade', voorraadLabel: 'Beperkte voorraad', b2b: 'Low stock - Next batch: 25 April 2026' },
  { id: 'CHOC-003', naam: 'Milk Chocolate Bar', prijs: '€3,29', voorraad: 150, levertijd: '2-3 dagen', categorie: 'seasonal', tag: 'Seasonal', voorraadLabel: 'Op voorraad' },
  { id: 'CHOC-004', naam: 'White Chocolate Truffle', prijs: '€5,49', voorraad: 0, levertijd: 'Niet op voorraad', categorie: 'limited', tag: 'Limited Edition', voorraadLabel: 'In productie' },
]

function filterShopItems() {
  const query = document.getElementById('shopSearch')?.value.toLowerCase().trim() || ''
  const activeButton = document.querySelector('.pill-filters .pill.active')
  const category = activeButton?.dataset.filter || 'all'
  return shopItems.filter(item =>
    (category === 'all' || item.categorie === category) &&
    item.naam.toLowerCase().includes(query)
  )
}

function updateShopFilter(button) {
  if (button) {
    document.querySelectorAll('.pill-filters .pill').forEach(btn => {
      btn.classList.toggle('active', btn === button)
    })
  }
  laadShop()
}

function laadShop() {
  const div = document.getElementById('shopProducten')
  if (!div) return

  const visibleItems = filterShopItems()
  if (visibleItems.length === 0) {
    div.innerHTML = '<p style="color:#888;">Geen producten gevonden. Probeer een andere zoekterm of filter.</p>'
    return
  }

  div.innerHTML = visibleItems.map(item => `
    <div class="product-kaart">
      <div class="product-card-row">
        <span class="badge">${item.tag}</span>
        <h4>${item.naam}</h4>
        <p style="font-size:16px; font-weight:bold; color:#c9a84c; margin:0;">${item.prijs}</p>
        <p style="margin:8px 0 0;"><strong>${item.voorraadLabel}</strong></p>
        <p style="margin:4px 0 0; color:#888;">${item.levertijd}</p>
        ${item.b2b ? `<div class="section-card" style="padding:12px; margin-top:12px;"><small>📈 B2B Info</small><p style="margin:8px 0 0;">${item.b2b}</p></div>` : ''}
      </div>
      ${item.voorraad > 0
        ? `<button onclick="bestelProduct('${item.id}', '${item.naam}')">Toevoegen aan winkelwagen</button>`
        : `<button disabled style="opacity:0.4; cursor:not-allowed;">Niet beschikbaar</button>`}
    </div>`).join('')
}

async function bestelProduct(id, naam) {
  const nummer = 'VEL-' + Math.floor(Math.random() * 9000 + 1000)
  const gebruiker = localStorage.getItem('gebruiker') || 'demo@vellin.nl'

  const { error } = await supabase
    .from('bestellingen')
    .insert([{ productid: id, productnaam: naam, ordernummer: nummer, gebruiker }])

  const div = document.getElementById('orderResultaat')
  if (error) {
    div.innerHTML = '<div class="status-melding status-error">Fout bij bestellen: ' + error.message + '</div>'
    return
  }

  div.innerHTML = `
    <div class="status-melding status-success">
      ✓ Bestelling geplaatst voor <strong>${naam}</strong>!<br>
      Ordernummer: <strong>#${nummer}</strong>
    </div>`
}

if (document.getElementById('shopProducten')) laadShop()

// --- CHATBOT ---
const botAntwoorden = [
  { sleutelwoorden: ['allergeen', 'allergie', 'noten', 'melk', 'soja'],
    antwoord: 'Onze producten kunnen sporen bevatten van melk, noten en soja. Bekijk de allergeneninformatie op de productpagina in je dashboard.' },
  { sleutelwoorden: ['bestelling', 'bestellen', 'order', 'levering'],
    antwoord: 'Je kunt producten bestellen via de Shop. De status volg je in je dashboard onder actieve bestellingen.' },
  { sleutelwoorden: ['klacht', 'probleem', 'beschadigd', 'fout'],
    antwoord: 'Wat vervelend! Dien een klacht in via de Klachten-pagina. We reageren binnen 1 werkdag.' },
  { sleutelwoorden: ['fairtrade', 'duurzaam', 'herkomst', 'cacao'],
    antwoord: 'Onze cacao is Fairtrade-gecertificeerd uit Ecuador en Ghana. Bekijk de Cocoa Journey in je dashboard.' },
  { sleutelwoorden: ['houdbaar', 'datum', 'verlopen'],
    antwoord: 'De houdbaarheidsdatum staat op je geregistreerde product in het dashboard.' },
]

function vraagBot() {
  const input = document.getElementById('vraag')
  const vraag = input?.value.trim()
  if (!vraag) return
  voegBerichtToe(vraag, 'user')
  input.value = ''
  setTimeout(() => {
    const antwoord = zoekAntwoord(vraag.toLowerCase())
    voegBerichtToe(antwoord, 'bot')
  }, 600)
}

function zoekAntwoord(vraag) {
  for (const item of botAntwoorden) {
    if (item.sleutelwoorden.some(w => vraag.includes(w))) return item.antwoord
  }
  return 'Voor meer informatie kun je contact opnemen via de Klachten-pagina of bel 0800-VELLIN (9:00–17:00).'
}

function voegBerichtToe(tekst, type) {
  const chatBox = document.getElementById('chatBox')
  if (!chatBox) return
  const div = document.createElement('div')
  div.className = type === 'user' ? 'chat-bericht-user' : 'chat-bericht-bot'
  div.textContent = tekst
  chatBox.appendChild(div)
  chatBox.scrollTop = chatBox.scrollHeight
}
// Functies globaal beschikbaar maken
window.login = login
window.registreerProduct = registreerProduct
window.verstuurKlacht = verstuurKlacht
window.vraagBot = vraagBot
window.bestelProduct = bestelProduct
function toggleJourney(id){

    const section =
    document.getElementById(id);

    section.classList.toggle('active');

}

window.toggleJourney = toggleJourney;
function showSuccess(){

    document
    .getElementById("successModal")
    .classList.add("active");

}

function goToCollection(){

    window.location.href =
    "mychocolate.html";

}