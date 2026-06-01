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
  if (email && password.length >= 3) {
    localStorage.setItem('gebruiker', email)
    window.location.href = 'dashboard.html'
  } else {
    alert('Ongeldige inloggegevens.')
  }
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

if (document.getElementById('producten')) toonProducten()

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
  { id: 'CHOC-001', naam: 'Pure Chocoladereep 85%', prijs: '€4,99', voorraad: 245, levertijd: '2 dagen' },
  { id: 'CHOC-002', naam: 'Melkchocolade Classic', prijs: '€3,99', voorraad: 180, levertijd: '2 dagen' },
  { id: 'CHOC-003', naam: 'White Chocolate Delight', prijs: '€4,49', voorraad: 42, levertijd: '1-2 dagen' },
  { id: 'CHOC-004', naam: 'Hazelnoot Reep', prijs: '€5,49', voorraad: 0, levertijd: 'Niet op voorraad' },
]

function laadShop() {
  const div = document.getElementById('shopProducten')
  if (!div) return
  div.innerHTML = shopItems.map(item => `
    <div class="product-kaart">
      <div style="font-size:40px;"> </div>
      <h4>${item.naam}</h4>
      <p style="font-size:16px; font-weight:bold; color:#c9a84c;">${item.prijs}</p>
      <p> Voorraad: ${item.voorraad > 0 ? item.voorraad : '<span style="color:red">Uitverkocht</span>'}</p>
      <p> ${item.levertijd}</p><br>
      ${item.voorraad > 0
        ? `<button onclick="bestelProduct('${item.id}', '${item.naam}')">Bestellen</button>`
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