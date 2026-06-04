// ============================================================
//  Vellin Chocolate Firm – app.js
//  Volledig Nederlandstalig | AI chatbot | Geen hardcoded namen
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(
  'https://cdujwexbkryjocrpoklj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkdWp3ZXhia3J5am9jcnBva2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTAzNzEsImV4cCI6MjA5NTg4NjM3MX0.kOQpBavXpsxr7jn7NZFQw58fxpNlN7e32NWcgQezx-g'
)

// ============================================================
//  AUTHENTICATIE
// ============================================================

function inloggen() {
  const email      = document.getElementById('email')?.value.trim()
  const wachtwoord = document.getElementById('password')?.value.trim()

  if (!email || !wachtwoord) {
    toonFoutmelding('Vul je e-mailadres en wachtwoord in.')
    return
  }

  const gebruikers = JSON.parse(localStorage.getItem('gebruikers') || '[]')
  const gebruiker  = gebruikers.find(u => u.email === email && u.wachtwoord === wachtwoord)

  if (gebruiker) {
    localStorage.setItem('huidigGebruiker', JSON.stringify(gebruiker))
    window.location.href = 'dashboard.html'
    return
  }

  if (gebruikers.length === 0 && wachtwoord.length >= 3) {
    const demoGebruiker = { naam: 'Demo Gebruiker', email, wachtwoord }
    gebruikers.push(demoGebruiker)
    localStorage.setItem('gebruikers', JSON.stringify(gebruikers))
    localStorage.setItem('huidigGebruiker', JSON.stringify(demoGebruiker))
    window.location.href = 'dashboard.html'
    return
  }

  toonFoutmelding('Onjuist e-mailadres of wachtwoord.')
}

function registreren() {
  const naam       = document.getElementById('registerName')?.value.trim()
  const email      = document.getElementById('registerEmail')?.value.trim()
  const wachtwoord = document.getElementById('registerPassword')?.value.trim()
  const bevestig   = document.getElementById('registerConfirmPassword')?.value.trim()
  const akkoord    = document.getElementById('acceptTerms')?.checked

  if (!naam || !email || !wachtwoord || !bevestig) {
    toonFoutmelding('Vul alle velden in.')
    return
  }
  if (wachtwoord !== bevestig) {
    toonFoutmelding('Wachtwoorden komen niet overeen.')
    return
  }
  if (!akkoord) {
    toonFoutmelding('Accepteer de gebruiksvoorwaarden om door te gaan.')
    return
  }

  const gebruikers = JSON.parse(localStorage.getItem('gebruikers') || '[]')
  if (gebruikers.find(u => u.email === email)) {
    toonFoutmelding('Er bestaat al een account met dit e-mailadres.')
    return
  }

  const nieuweGebruiker = { naam, email, wachtwoord }
  gebruikers.push(nieuweGebruiker)
  localStorage.setItem('gebruikers', JSON.stringify(nieuweGebruiker))
  localStorage.setItem('huidigGebruiker', JSON.stringify(nieuweGebruiker))
  window.location.href = 'dashboard.html'
}

function uitloggen() {
  localStorage.removeItem('huidigGebruiker')
  window.location.href = 'index.html'
}

function huidigGebruiker() {
  return JSON.parse(localStorage.getItem('huidigGebruiker') || 'null')
}

function toonFoutmelding(tekst) {
  const bestaand = document.getElementById('foutmelding')
  if (bestaand) {
    bestaand.textContent = tekst
    bestaand.style.display = 'block'
    return
  }
  alert(tekst)
}

// ============================================================
//  PRODUCTDATA
// ============================================================

const productData = {
  'CHOC-001': {
    naam: 'Pure Chocoladereep 85%',
    houdbaar: '25 apr 2026',
    allergenen: ['Melk', 'Soja'],
    herkomst: 'Ecuador',
    certificeringen: ['Fairtrade', 'Biologisch']
  },
  'CHOC-002': {
    naam: 'Melkchocolade Classic',
    houdbaar: '12 mei 2026',
    allergenen: ['Melk', 'Noten'],
    herkomst: 'Ghana',
    certificeringen: ['Fairtrade']
  },
  'CHOC-003': {
    naam: 'Witte Chocolade Delight',
    houdbaar: '8 jun 2026',
    allergenen: ['Melk'],
    herkomst: 'Madagascar',
    certificeringen: ['Biologisch']
  },
  'CHOC-004': {
    naam: 'Hazelnoot Reep',
    houdbaar: '30 jul 2026',
    allergenen: ['Noten', 'Melk'],
    herkomst: 'Ivoorkust',
    certificeringen: ['Fairtrade']
  },
}

// ============================================================
//  PRODUCT REGISTREREN
// ============================================================

function registreerProduct() {
  const codeEl  = document.getElementById('productCode')
  const batchEl = document.getElementById('batchNumber')
  const bonEl   = document.getElementById('receiptNumber')

  const code  = codeEl?.value.trim().toUpperCase()
  const batch = batchEl?.value.trim()
  const bon   = bonEl?.value.trim() || ''

  if (!code && !batch) {
    toonFoutmelding('Voer een productcode of batchnummer in.')
    return
  }

  const gebruikerEmail = huidigGebruiker()?.email || 'demo@vellin.nl'
  const productCode    = code || batch
  const opgeslagen     = JSON.parse(localStorage.getItem('geregistreerdeProducten') || '[]')
  const info           = productData[productCode]

  const nieuwProduct = {
    code: productCode,
    naam: info ? info.naam : `Product ${productCode}`,
    houdbaar: info ? info.houdbaar : 'Onbekend',
    herkomst: info ? info.herkomst : 'Onbekend',
    allergenen: info ? info.allergenen : [],
    certificeringen: info ? info.certificeringen : [],
    batch: batch || productCode,
    bon,
    datum: new Date().toLocaleDateString('nl-NL'),
    gebruiker: gebruikerEmail
  }

  opgeslagen.push(nieuwProduct)
  localStorage.setItem('geregistreerdeProducten', JSON.stringify(opgeslagen))

  supabase.from('producten').insert([{ gebruiker: gebruikerEmail, productcode: productCode }]).then()

  const modal = document.getElementById('successModal')
  if (modal) {
    modal.classList.add('actief')
    modal.classList.add('active')
  }
}

function gaNaarCollectie() {
  window.location.href = 'mychocolate.html'
}

// ============================================================
//  KLACHTEN
// ============================================================

async function verstuurKlacht() {
  const onderwerp    = document.getElementById('onderwerp')?.value.trim()
  const beschrijving = document.getElementById('beschrijving')?.value.trim()
  const productcode  = document.getElementById('klachtProductCode')?.value.trim() || ''
  const statusDiv    = document.getElementById('klachtStatus')

  if (!onderwerp || !beschrijving) {
    if (statusDiv) {
      statusDiv.innerHTML = '<div class="status-melding status-error">Vul het onderwerp en de beschrijving in.</div>'
    }
    return
  }

  const ticketnummer = 'VEL-' + Math.floor(Math.random() * 9000 + 1000)

  const { error } = await supabase
    .from('klachten')
    .insert([{ onderwerp, beschrijving, productcode, ticketnummer }])

  if (statusDiv) {
    if (error) {
      statusDiv.innerHTML = `<div class="status-melding status-error">Fout bij indienen: ${error.message}</div>`
    } else {
      statusDiv.innerHTML = `
        <div class="status-melding status-success">
          Klacht ontvangen! Ons team neemt binnen 1 werkdag contact op.<br>
          <strong>Ticketnummer: #${ticketnummer}</strong>
        </div>`
      const onderwerpEl    = document.getElementById('onderwerp')
      const beschrijvingEl = document.getElementById('beschrijving')
      if (onderwerpEl)    onderwerpEl.value    = ''
      if (beschrijvingEl) beschrijvingEl.value = ''
    }
  }
}

// ============================================================
//  SHOP
// ============================================================

const shopArtikelen = [
  {
    id: 'CHOC-001',
    naam: 'Premium Pure Chocolade',
    prijs: '€4,99',
    prijsGetal: 4.99,
    voorraad: 245,
    levertijd: '2-3 werkdagen',
    categorie: 'all',
    tag: 'Nieuw',
    voorraadLabel: 'Op voorraad',
    b2b: 'Volgende batch: 27 april 2026',
    afbeelding: 'images/ChatGPT Image Jun 3, 2026, 12_03_13 AM.png',
    beschrijving: 'Intense pure chocolade met 85% cacao uit Ecuador.'
  },
  {
    id: 'CHOC-002',
    naam: 'Ambachtelijke Donkere Collectie',
    prijs: '€6,99',
    prijsGetal: 6.99,
    voorraad: 42,
    levertijd: '1-2 werkdagen',
    categorie: 'fairtrade',
    tag: 'Fairtrade',
    voorraadLabel: 'Beperkte voorraad',
    b2b: 'Lage voorraad – Volgende batch: 25 april 2026',
    afbeelding: 'images/ChatGPT Image Jun 3, 2026, 12_04_28 AM.png',
    beschrijving: 'Fairtrade gecertificeerde chocolade uit Ghana.'
  },
  {
    id: 'CHOC-003',
    naam: 'Melkchocolade Reep',
    prijs: '€3,29',
    prijsGetal: 3.29,
    voorraad: 150,
    levertijd: '2-3 werkdagen',
    categorie: 'seizoen',
    tag: 'Seizoen',
    voorraadLabel: 'Op voorraad',
    b2b: null,
    afbeelding: 'images/ChatGPT Image Jun 3, 2026, 12_04_28 AM.png',
    beschrijving: 'Romige melkchocolade, perfect voor elke gelegenheid.'
  },
  {
    id: 'CHOC-004',
    naam: 'Witte Chocolade Truffel',
    prijs: '€5,49',
    prijsGetal: 5.49,
    voorraad: 0,
    levertijd: 'Niet op voorraad',
    categorie: 'limited',
    tag: 'Limited Edition',
    voorraadLabel: 'In productie',
    b2b: 'Verwacht in productie: mei 2026',
    afbeelding: 'images/ChatGPT Image Jun 3, 2026, 12_06_13 AM.png',
    beschrijving: 'Exclusieve witte chocolade truffel uit Madagascar.'
  },
]

function haalWinkelwagen() {
  return JSON.parse(localStorage.getItem('winkelwagen') || '[]')
}

function slaWinkelwagenOp(wagen) {
  localStorage.setItem('winkelwagen', JSON.stringify(wagen))
  updateWinkelwagenTeller()
}

function updateWinkelwagenTeller() {
  const wagen  = haalWinkelwagen()
  const totaal = wagen.reduce((s, i) => s + i.aantal, 0)
  document.querySelectorAll('.winkelwagen-teller').forEach(el => {
    el.textContent    = totaal
    el.style.display  = totaal > 0 ? 'flex' : 'none'
  })
}

function voegToeAanWinkelwagen(id) {
  const artikel  = shopArtikelen.find(a => a.id === id)
  if (!artikel || artikel.voorraad === 0) return

  const wagen    = haalWinkelwagen()
  const bestaand = wagen.find(i => i.id === id)

  if (bestaand) {
    bestaand.aantal++
  } else {
    wagen.push({ id, naam: artikel.naam, prijs: artikel.prijsGetal, aantal: 1 })
  }

  slaWinkelwagenOp(wagen)

  const knop = document.querySelector(`[data-product-id="${id}"]`)
  if (knop) {
    const origineel   = knop.textContent
    knop.textContent  = 'Toegevoegd!'
    knop.style.background = '#2d7a2d'
    setTimeout(() => {
      knop.textContent      = origineel
      knop.style.background = ''
    }, 1500)
  }
}

function filterShopArtikelen() {
  const zoekopdracht = document.getElementById('shopZoeken')?.value.toLowerCase().trim() || ''
  const actieveKnop  = document.querySelector('.pill-filters .pill.active')
  const categorie    = actieveKnop?.dataset.filter || 'all'

  return shopArtikelen.filter(artikel =>
    (categorie === 'all' || artikel.categorie === categorie) &&
    artikel.naam.toLowerCase().includes(zoekopdracht)
  )
}

function updateShopFilter(knop) {
  if (knop) {
    document.querySelectorAll('.pill-filters .pill').forEach(btn => {
      btn.classList.toggle('active', btn === knop)
    })
  }
  laadShop()
}

function laadShop() {
  const container = document.getElementById('shopProducten')
  if (!container) return

  const zichtbaar = filterShopArtikelen()

  if (zichtbaar.length === 0) {
    container.innerHTML = '<p style="color:#888;padding:20px;grid-column:1/-1;">Geen producten gevonden. Probeer een andere zoekterm of filter.</p>'
    return
  }

  container.innerHTML = zichtbaar.map(artikel => `
    <div class="product-shop-kaart">
      <div class="product-shop-afbeelding">
        <img src="${artikel.afbeelding}" alt="${artikel.naam}" onerror="this.style.display='none'">
        <span class="product-shop-tag ${artikel.voorraad === 0 ? 'tag-uitverkocht' : ''}">${artikel.tag}</span>
      </div>
      <div class="product-shop-info">
        <h4>${artikel.naam}</h4>
        <p class="product-shop-beschrijving">${artikel.beschrijving}</p>
        <div class="product-shop-meta">
          <span class="product-shop-prijs">${artikel.prijs}</span>
          <span class="product-shop-voorraad ${artikel.voorraad === 0 ? 'uitverkocht' : artikel.voorraad < 50 ? 'laag' : ''}">${artikel.voorraadLabel}</span>
        </div>
        <p class="product-shop-levertijd">Levering: ${artikel.levertijd}</p>
        ${artikel.b2b ? `<div class="b2b-info"><span>B2B</span> ${artikel.b2b}</div>` : ''}
        ${artikel.voorraad > 0
          ? `<button class="btn-winkelwagen" data-product-id="${artikel.id}" onclick="voegToeAanWinkelwagen('${artikel.id}')">In winkelwagen</button>`
          : `<button class="btn-winkelwagen btn-uitverkocht" disabled>Niet beschikbaar</button>`
        }
      </div>
    </div>
  `).join('')

  updateWinkelwagenTeller()
}

function toonWinkelwagen() {
  const wagen   = haalWinkelwagen()
  const overlay = document.getElementById('winkelwagenOverlay')
  const inhoud  = document.getElementById('winkelwagenInhoud')
  if (!overlay || !inhoud) return

  if (wagen.length === 0) {
    inhoud.innerHTML = '<p style="color:#888;padding:20px;text-align:center;">Je winkelwagen is leeg.</p>'
  } else {
    const totaal = wagen.reduce((s, i) => s + i.prijs * i.aantal, 0)
    inhoud.innerHTML = `
      ${wagen.map(item => `
        <div class="wagen-item">
          <span>${item.naam} (${item.aantal}x)</span>
          <div class="wagen-item-rechts">
            <span>€${(item.prijs * item.aantal).toFixed(2).replace('.', ',')}</span>
            <button onclick="verwijderUitWagen('${item.id}')" class="btn-verwijder">x</button>
          </div>
        </div>
      `).join('')}
      <div class="wagen-totaal">
        <strong>Totaal: €${totaal.toFixed(2).replace('.', ',')}</strong>
      </div>
      <button class="btn-afrekenen" onclick="afrekenen()">Afrekenen</button>
    `
  }

  overlay.classList.add('active')
}

function sluitWinkelwagen() {
  document.getElementById('winkelwagenOverlay')?.classList.remove('active')
}

function verwijderUitWagen(id) {
  const wagen = haalWinkelwagen().filter(i => i.id !== id)
  slaWinkelwagenOp(wagen)
  toonWinkelwagen()
}

function afrekenen() {
  const wagen = haalWinkelwagen()
  if (wagen.length === 0) return

  const ordernummer    = 'VEL-' + Math.floor(Math.random() * 9000 + 1000)
  const gebruikerEmail = huidigGebruiker()?.email || 'demo@vellin.nl'

  Promise.all(wagen.map(item =>
    supabase.from('bestellingen').insert([{
      productid:   item.id,
      productnaam: item.naam,
      ordernummer,
      gebruiker:   gebruikerEmail,
      aantal:      item.aantal
    }])
  )).then(() => {
    slaWinkelwagenOp([])
    sluitWinkelwagen()

    const resultaat = document.getElementById('orderResultaat')
    if (resultaat) {
      resultaat.innerHTML = `
        <div class="status-melding status-success">
          Bestelling geplaatst!<br>
          <strong>Ordernummer: #${ordernummer}</strong><br>
          Je ontvangt een bevestiging per e-mail.
        </div>`
      resultaat.scrollIntoView({ behavior: 'smooth' })
    } else {
      alert(`Bestelling geplaatst! Ordernummer: #${ordernummer}`)
    }
  })
}

if (document.getElementById('shopProducten')) {
  laadShop()
  updateWinkelwagenTeller()
}

// ============================================================
//  AI CHATBOT – slimme voorgedefinieerde antwoorden
// ============================================================

let chatGeschiedenis = []

const chatAntwoorden = [
  {
    sleutelwoorden: ['allergeen', 'allergie', 'melk', 'noten', 'soja', 'gluten'],
    antwoord: 'Onze chocoladeproducten kunnen melk, noten en soja bevatten. Op elke verpakking vind je een volledig allergeenoverzicht. Heb je een specifiek product? Registreer het dan en ik zoek de informatie voor je op.'
  },
  {
    sleutelwoorden: ['bestell', 'kopen', 'winkel', 'shop', 'bestel'],
    antwoord: 'Je kunt onze chocolades bestellen via de Winkel-pagina in de app. We leveren binnen 1-3 werkdagen. Heb je vragen over een specifieke bestelling?'
  },
  {
    sleutelwoorden: ['beschadigd', 'kapot', 'stuk', 'gebroken', 'fout'],
    antwoord: 'Wat vervelend dat je product beschadigd is aangekomen! Ga naar de Service-pagina en dien een klacht in met je ticketnummer. Ons team neemt binnen 1 werkdag contact op.'
  },
  {
    sleutelwoorden: ['cocoa', 'cacao', 'journey', 'reis', 'herkomst', 'origine'],
    antwoord: 'De Cocoa Journey laat zien waar jouw chocolade vandaan komt — van cacaoboon tot reep. Je vindt de volledige reis bij elk geregistreerd product onder "Mijn Producten".'
  },
  {
    sleutelwoorden: ['houdbaar', 'datum', 'verlopen', 'tht', 'exp'],
    antwoord: 'De houdbaarheidsdatum vind je op de verpakking en in je geregistreerde producten. Producten die bijna verlopen staan bovenaan je overzicht met een waarschuwing.'
  },
  {
    sleutelwoorden: ['klacht', 'probleem', 'feedback', 'melden'],
    antwoord: 'Je kunt een klacht indienen via het tabblad "Klacht Indienen" op deze pagina. Je ontvangt direct een ticketnummer en ons team reageert binnen 1 werkdag.'
  },
  {
    sleutelwoorden: ['fairtrade', 'biologisch', 'duurzaam', 'certif'],
    antwoord: 'Vellin werkt samen met Fairtrade en biologisch gecertificeerde cacaoboeren. Je ziet de certificeringen bij elk product in je collectie.'
  },
  {
    sleutelwoorden: ['levering', 'leveren', 'verzend', 'bezorg', 'thuis'],
    antwoord: 'We bezorgen binnen 1-3 werkdagen aan huis. Bij beperkte voorraad kan de levertijd iets langer zijn — dit staat altijd vermeld in de Winkel.'
  },
  {
    sleutelwoorden: ['prijs', 'kosten', 'betalen', 'euro', 'goedkoop'],
    antwoord: 'Onze prijzen variëren van €3,29 tot €6,99 per reep. Alle actuele prijzen en aanbiedingen vind je in de Winkel-pagina.'
  },
  {
    sleutelwoorden: ['registreer', 'scannen', 'code', 'batch', 'product toevoegen'],
    antwoord: 'Je kunt een product registreren via de Home-pagina. Voer de productcode of het batchnummer in van je verpakking en het product wordt toegevoegd aan jouw collectie.'
  },
  {
    sleutelwoorden: ['hoi', 'hallo', 'hey', 'goedemorgen', 'goedemiddag', 'dag'],
    antwoord: 'Hallo! Fijn dat je er bent. Waarmee kan ik je vandaag helpen? Je kunt vragen stellen over producten, allergenen, bestellingen of klachten.'
  },
  {
    sleutelwoorden: ['dank', 'bedankt', 'thanks', 'merci'],
    antwoord: 'Graag gedaan! Heb je nog andere vragen? Ik sta altijd voor je klaar.'
  },
]

const standaardAntwoord = 'Bedankt voor je vraag! Voor gedetailleerde informatie kun je terecht op onze Service-pagina of contact opnemen via 0800-VELLIN (ma-vr 9:00-17:00). Kan ik je ergens anders mee helpen?'

function zoekAntwoord(vraag) {
  const lowerVraag = vraag.toLowerCase()

  const gebruiker = huidigGebruiker()
  const producten = JSON.parse(localStorage.getItem('geregistreerdeProducten') || '[]')
    .filter(p => p.gebruiker === (gebruiker?.email || 'demo@vellin.nl'))

  for (const item of chatAntwoorden) {
    if (item.sleutelwoorden.some(woord => lowerVraag.includes(woord))) {
      if (producten.length > 0 && (lowerVraag.includes('mijn') || lowerVraag.includes('product'))) {
        const productnamen = producten.map(p => p.naam).join(', ')
        return `${item.antwoord}\n\nJouw geregistreerde producten: ${productnamen}.`
      }
      return item.antwoord
    }
  }

  return standaardAntwoord
}

async function stuurChatbericht() {
  const invoer = document.getElementById('chatInvoer') || document.getElementById('userInput')
  const vraag  = invoer?.value.trim()
  if (!vraag) return

  voegChatBerichtToe(vraag, 'gebruiker')
  invoer.value = ''

  const laadId = 'laad-' + Date.now()
  voegChatBerichtToe('...', 'bot', laadId)

  await new Promise(resolve => setTimeout(resolve, 800))

  const antwoord = zoekAntwoord(vraag)

  document.getElementById(laadId)?.remove()
  voegChatBerichtToe(antwoord, 'bot')
}

function voegChatBerichtToe(tekst, type, id) {
  const chatBox = document.getElementById('chatBox')
  if (!chatBox) return

  const div     = document.createElement('div')
  div.className = type === 'gebruiker' ? 'chat-bericht-gebruiker' : 'chat-bericht-bot'
  if (id) div.id = id

  if (tekst === '...') {
    div.innerHTML = '<span class="chat-laadanimatie"><span>.</span><span>.</span><span>.</span></span>'
  } else {
    div.textContent = tekst
  }

  chatBox.appendChild(div)
  chatBox.scrollTop = chatBox.scrollHeight
}

function handleChatEnter(event) {
  if (event.key === 'Enter') stuurChatbericht()
}

// ============================================================
//  NOTIFICATIES – verlopen producten
// ============================================================

function controleerVerlopenProducten() {
  const banner = document.getElementById('verloopBanner')
  if (!banner) return

  const producten      = JSON.parse(localStorage.getItem('geregistreerdeProducten') || '[]')
  const gebruikerEmail = huidigGebruiker()?.email || 'demo@vellin.nl'
  const mijnProducten  = producten.filter(p => p.gebruiker === gebruikerEmail)

  const zevenDagenLater = new Date()
  zevenDagenLater.setDate(zevenDagenLater.getDate() + 7)

  const bijnaVerlopen = mijnProducten.filter(p => {
    if (!p.houdbaar || p.houdbaar === 'Onbekend') return false
    const datum = parseerDatum(p.houdbaar)
    return datum && datum <= zevenDagenLater
  })

  if (bijnaVerlopen.length > 0) {
    banner.style.display = 'flex'
    const tekstEl = banner.querySelector('.banner-tekst')
    if (tekstEl) {
      tekstEl.textContent = `${bijnaVerlopen.length} product${bijnaVerlopen.length > 1 ? 'en verlopen' : ' verloopt'} binnen 7 dagen`
    }
  }
}

function parseerDatum(tekst) {
  const maanden = { jan: 0, feb: 1, mrt: 2, apr: 3, mei: 4, jun: 5, jul: 6, aug: 7, sep: 8, okt: 9, nov: 10, dec: 11 }
  const delen   = tekst.toLowerCase().split(' ')
  if (delen.length >= 3) {
    const dag   = parseInt(delen[0])
    const maand = maanden[delen[1].substring(0, 3)]
    const jaar  = parseInt(delen[2])
    if (!isNaN(dag) && maand !== undefined && !isNaN(jaar)) {
      return new Date(jaar, maand, dag)
    }
  }
  return null
}

if (document.getElementById('verloopBanner')) {
  controleerVerlopenProducten()
}

// ============================================================
//  TOGGLE JOURNEY (mychocolate.html)
// ============================================================

function toggleJourney(id, knop) {
  document.querySelectorAll('.journey-inhoud').forEach(sectie => {
    if (sectie.id !== id) sectie.classList.remove('active')
  })
  document.querySelectorAll('.journey-knop').forEach(btn => {
    if (btn !== knop) btn.textContent = 'Bekijk Cacaoreis'
  })

  const sectie = document.getElementById(id)
  if (!sectie) return
  sectie.classList.toggle('active')
  if (knop) knop.textContent = sectie.classList.contains('active') ? 'Verberg Cacaoreis' : 'Bekijk Cacaoreis'
}

// ============================================================
//  GLOBALE EXPORTS (voor onclick= attributen in HTML)
// ============================================================

window.inloggen              = inloggen
window.registreren           = registreren
window.uitloggen             = uitloggen
window.registreerProduct     = registreerProduct
window.gaNaarCollectie       = gaNaarCollectie
window.verstuurKlacht        = verstuurKlacht
window.laadShop              = laadShop
window.updateShopFilter      = updateShopFilter
window.voegToeAanWinkelwagen = voegToeAanWinkelwagen
window.toonWinkelwagen       = toonWinkelwagen
window.sluitWinkelwagen      = sluitWinkelwagen
window.verwijderUitWagen     = verwijderUitWagen
window.afrekenen             = afrekenen
window.stuurChatbericht      = stuurChatbericht
window.handleChatEnter       = handleChatEnter
window.toggleJourney         = toggleJourney

// Legacy aliassen
window.login          = inloggen
window.register       = registreren
window.vraagBot       = stuurChatbericht
window.bestelProduct  = (id) => voegToeAanWinkelwagen(id)
window.showSuccess    = () => document.getElementById('successModal')?.classList.add('active')
window.goToCollection = gaNaarCollectie