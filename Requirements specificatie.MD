# 1. Organisatorische Context

Dit hoofdstuk beschrijft de missie, visie, strategie en doelstellingen van de Chocolate Firm, specifiek gericht op de ontwikkeling van de mobiele applicatie. De organisatorische context vormt de basis voor alle keuzes in dit document.

## 1.1 Missie

Wij maken chocoladeproducten die mensen verbinden met smaak, kwaliteit en duurzaamheid.

**Motto:** Van boon tot reep, met passie voor elk product.

## 1.2 Visie

De Chocolate Firm wil de meest klantgerichte chocoladeproducent zijn, erkend om innovatieve digitale dienstverlening, transparantie en duurzame productie. De mobiele applicatie is het directe instrument waarmee deze visie werkelijkheid wordt: klanten krijgen via één centraal platform toegang tot productinformatie, bestellingen en klantenservice.

## 1.3 Strategie

De Chocolate Firm richt zich op drie strategische punten, elk direct gekoppeld aan de mobiele applicatie:

- **Interne processen digitaliseren:** orders worden centraal verwerkt via de app en het ERP-systeem, voorraden zijn real-time inzichtelijk en de kwaliteitscontrole wordt structureel vastgelegd. Dit elimineert de huidige problemen met handmatige orderverwerking via losse Excel-bestanden, het ontbreken van real-time voorraadinzicht en de gebrekkige kwaliteitscontrole.

- **Directe digitale klantrelatie via de app:** de app is het primaire contactpunt tussen klant en Chocolate Firm. Klanten registreren producten, dienen klachten in, plaatsen bestellingen en ontvangen persoonlijke communicatie binnen één platform. Dit lost de huidige situatie op waarbij klanten geen centraal overzicht hebben en klantenservicemedewerkers geen klantgeschiedenis kunnen inzien.

- **Duurzame groei:** door transparantie over cacaoherkomst, Fairtrade-certificering en B2C-abonnementen via de app wordt een nieuwe groep bewuste consumenten bereikt en de merkpositie versterkt.

## 1.4 Doelstellingen

De Chocolate Firm stelt vier concrete doelstellingen:

- Binnen twaalf maanden na de lancering van de mobiele app heeft minimaal 30% van de actieve klanten hun producten geregistreerd in de app.

- Binnen zes maanden na implementatie van het nieuwe orderverwerkingssysteem zijn handmatige orderfouten met 50% verminderd ten opzichte van de huidige situatie.

- De klantentevredenheid, gemeten via de Net Promoter Score, stijgt van de huidige baseline naar een score van minimaal +30 aan het einde van 2026.

- Binnen achttien maanden na het uitbrengen van de app wordt minimaal 15% van alle orders via het digitale app-kanaal geplaatst.

## 1.5 Organogram

Onderstaand organogram toont de structuur van de Chocolate Firm.

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
|     |     | Raad van Commissarissen |     |     |
|     |     | Managementteam (CEO) |     |     |
| Verkoop en marketing | Productie en logistiek | Inkoop en Voorraad | Klantenservice | Financiën |

## 1.6 Stakeholderanalyse

De stakeholderanalyse is gericht op de impact van de mobiele applicatie. Per stakeholder is aangegeven wat hun belang bij de app is en welk risico zij vormen voor het project.

Bron: https://husite.nl/open-ict/sdgs-bij-open-ict/sdg-toolbox/stakeholderanalyse/

### Directe stakeholders

| Stakeholder | Rol | Impact | Belang bij de app | Risico voor het project |
| --- | --- | --- | --- | --- |
| Raad van Commissarissen | Opdrachtgever | Hoog | Heeft besloten dat alle bedrijven onder de Chocolate Firm een innovatieve mobiele app moeten ontwikkelen die de klantervaring verbetert en klantloyaliteit versterkt | Kan te hoge verwachtingen stellen of tempo forceren |
| Managementteam | Dagelijkse aansturing en beslissingen | Hoog | Gebruikt app-data en BI-koppeling voor betere beslissingen over verkoop en productie | Te veel druk bij het gelijktijdig veranderen en uitvoeren van dagelijkse operatie |
| Klantenservicemedewerkers | Interne app-gebruiker | Hoog | Krijgen via de app een volledig klantprofiel zodat ze klachten sneller en beter kunnen afhandelen | Moeite bij omschakeling naar nieuw systeem |
| Verkoopmedewerkers | Gebruiker | Hoog | Orders lopen straks via de app in plaats van losse Excel-bestanden | Moeite met loslaten van eigen manier van werken |
| IT-team / Ontwikkelaars | Bouwers en beheerders | Hoog | Verantwoordelijk voor het bouwen van de app en de koppelingen met ERP, CRM en BI | Technische kennis gaat verloren als medewerkers vertrekken |

### Indirecte stakeholders

| Stakeholder | Rol | Impact | Belang bij de app | Risico voor het project |
| --- | --- | --- | --- | --- |
| B2C klanten | Eindgebruiker van de app | Midden | Willen eenvoudig productinformatie, bestellingen en klachten regelen via één platform | Lage adoptie als de app niet intuïtief genoeg is |
| B2B klanten (supermarkten, groothandels, speciaalzaken) | Bestellers via de app | Hoog | Willen real-time inzicht in voorraad en levertijden en direct kunnen bestellen zonder tussenkomst van een medewerker | Onzekerheid over betrouwbaarheid van het nieuwe systeem |
| Leveranciers | Partner | Midden | Profiteren van betere voorraadplanning doordat de app gekoppeld is aan het ERP-systeem | Leveringsrisico als voorraaddata niet klopt |

### Kwaadwillende stakeholders

| Stakeholder | Type dreiging | Impact | Risico voor de app |
| --- | --- | --- | --- |
| Concurrenten | Marktpartijen | Hoog | Kunnen klanten weglokken als de app traag is of minder functionaliteiten biedt dan vergelijkbare platformen |
| Cybercriminelen | Externe bedreiging | Hoog | Kunnen klantdata, betalingsgegevens of het systeem aanvallen. Daarom heeft de app end-to-end encryptie en tweefactorauthenticatie |
| Nep-reviewers | Externe bedreiging | Laag | Kunnen via de app of sociale media valse negatieve reviews plaatsen en het vertrouwen in de app schaden |

## UI-model

![Ui-model](stakeholder-ui-model.png)

---

# 2. Actoren

Dit hoofdstuk beschrijft alle actoren die een rol spelen in de mobiele applicatie van de Chocolate Firm.

## 2.1 Interne actoren

| Actor | Rol in de app | Wat doet de app voor hen |
| --- | --- | --- |
| Klantenservicemedewerker | Behandelt klachten via de app | Heeft toegang tot klantprofiel en klachthistorie via CRM-koppeling. Hoeft niet meer steeds dezelfde vragen te stellen |
| Verkoopmedewerkers | Beheert B2B-bestellingen | Ziet orders die binnenkomen via de app in plaats van losse Excel-bestanden. Minder handmatig werk |
| Marketingteam | Beheert pushberichten en promoties | Kan via de app gepersonaliseerde berichten sturen op basis van aankoopgeschiedenis van klanten |
| Productieplanner | Ontvangt orders via ERP-koppeling | Krijgt automatisch actuele orderdata binnen. Hoeft niet meer te zoeken naar de juiste versie van een bestand |
| Magazijnmedewerker | Voorraadinzicht via ERP | Voorraad wordt real-time bijgehouden via de app-koppeling. Geen handmatige logboeken meer nodig |

## 2.2 Externe actoren

| Actor | Type | Rol in de app | Wat doet de app voor hen |
| --- | --- | --- | --- |
| B2C klant | Eindgebruiker | Registreert producten, volgt bestellingen, dient klachten in en chat met de AI-chatbot | Heeft alle productinformatie en diensten op één plek. Geen telefoon of e-mail meer nodig |
| B2B klant (supermarkt, groothandel) | Zakelijke gebruiker | Plaatst bulkorders, bekijkt voorraadstatus en productieplanning | Kan zelfstandig bestellen zonder te wachten op een verkoopmedewerker |
| B2B klant (speciaalzaak) | Zakelijke gebruiker | Plaatst kleine orders via de app in plaats van telefonisch | Sneller en eenvoudiger bestellen |
| Transportpartner | Partner | Ontvangt verzendopdrachten via het gekoppelde trackingsysteem | Minder fouten door automatische labels en track & trace |

## 2.3 Systeem actoren

| Actor | Type | Rol |
| --- | --- | --- |
| CRM-systeem | Software | Levert klantprofielen en interactiegeschiedenis aan de app zodat communicatie gepersonaliseerd is |
| ERP-systeem | Software | Ontvangt orders vanuit de app en levert real-time voorraad- en levertijdinformatie terug |
| BI-tool | Software | Analyseert gebruikersgedrag en aankoopdata uit de app voor productontwikkeling en marketing |
| AI-chatbot | Software | Beantwoordt 24/7 klantvragen via de app op basis van CRM-gegevens |
| Trackingsysteem | Software | Koppelt verzendstatus aan de app zodat klanten hun bestelling kunnen volgen |

### Grootste problemen die de app oplost voor de actoren

- B2C- en B2B-klanten hadden geen centraal platform voor productinformatie, bestellingen en klachten.

- Klantenservicemedewerkers hadden geen klantoverzicht waardoor ze inefficiënt werkten.

- Verkoopmedewerkers werkten met losse Excel-bestanden zonder vaste afspraken.

- Productieplanners werkten met verouderde en incomplete orderdata.

- Magazijnmedewerkers hadden geen real-time inzicht in de voorraad.

---

# 3. Bedrijfsprocesanalyse

In dit hoofdstuk wordt de huidige situatie van de Chocolate Firm geanalyseerd. Er wordt gekeken naar hoe processen nu verlopen, welke knelpunten daarin zitten en hoe de nieuwe mobiele applicatie deze problemen oplost. Het verschil tussen de huidige en gewenste situatie wordt tot slot samengevat in een GAP-analyse en uitgewerkt in een SIPOC.

## 3.1 IST-situatie

Binnen de Chocolate Firm verlopen de bedrijfsprocessen op dit moment nog grotendeels handmatig. Bestellingen komen binnen via verschillende kanalen. Grote supermarkten mailen hun orders in bulk, kleinere speciaalzaken bestellen vaak telefonisch en vertegenwoordigers noteren orders onderweg in eigen Excel-bestanden. Elke medewerker werkt daarin op zijn eigen manier zonder vaste afspraken. Dit leidt regelmatig tot discussies over welke versie van een bestand de juiste is.

Aan het einde van de dag worden de bestanden doorgestuurd naar de productieafdeling en het magazijn. Dit gebeurt niet altijd op tijd. Sommige medewerkers sturen bestanden pas de volgende ochtend of vergeten dit helemaal. Soms raken bestanden zoek in de e-mailstroom of komen ze dubbel binnen. De productieplanner moet dan zelf uitzoeken welke versie klopt.

De productieplanning wordt handmatig opgesteld op basis van de ontvangen bestanden. Hierbij wordt geen rekening gehouden met de actuele voorraden. Dit leidt soms tot stilstand van de productielijn omdat een ingrediënt ontbreekt of juist tot overproductie waarbij grote partijen onverkocht in het magazijn blijven liggen.

Het voorraadbeheer gebeurt met de hand via logboeken in het magazijn. Bij drukte wordt dit niet altijd meteen bijgewerkt, waardoor de gegevens soms dagen achterlopen. Er is geen real-time inzicht in de werkelijke voorraad. Bestellingen bij leveranciers worden ongepland geplaatst op basis van wat iemand in de logboeken ziet.

De kwaliteitscontrole is steekproefsgewijs. Bij elke batch wordt een kleine selectie getest. Omdat de productie soms achterloopt, schiet dit er regelmatig bij in. Fouten worden daardoor vaak pas ontdekt nadat producten al naar klanten zijn verstuurd.

Verzendlabels worden grotendeels met de hand geschreven of oude sjablonen worden hergebruikt. Dit leidt regelmatig tot fouten met adressen of ordernummers en dus verkeerde leveringen. Klanten hebben geen toegang tot track & trace informatie.

Facturatie gebeurt handmatig op basis van kopieën van orders en leverbonnen. Er is geen systeem dat automatisch bijhoudt of facturen zijn betaald. Hierdoor blijven facturen regelmatig te lang openstaan.

De klantenservice ontvangt dagelijks vragen en klachten over te late leveringen, verkeerde producten of kwaliteitsproblemen. Er is geen centraal systeem met klantgegevens of eerdere interacties. Medewerkers moeten daardoor steeds opnieuw dezelfde vragen stellen en klachten worden vaak afzonderlijk opgelost zonder structurele verbetering.

## 3.2 Knelpunten

- **Geen centrale orderverwerking:** Bestellingen komen binnen via e-mail, telefoon en Excel-bestanden zonder vaste afspraken. Dit zorgt voor verwarring, dubbele versies en fouten in de verwerking.

- **Onbetrouwbare informatiedoorstroming:** Bestanden worden niet altijd op tijd doorgestuurd naar de productieafdeling. Hierdoor werkt de planner met incomplete of verouderde informatie.

- **Geen real-time voorraadinzicht:** Het voorraadbeheer loopt via handmatige logboeken die niet altijd actueel zijn. Dit leidt tot tekorten op de productielijn of juist overproductie.

- **Gebrekkige kwaliteitscontrole:** Door tijdsdruk wordt de kwaliteitscontrole soms overgeslagen. Fouten worden pas ontdekt nadat producten al zijn verstuurd.

- **Foutgevoelig logistiek proces:** Handmatig geschreven verzendlabels leiden tot verkeerde leveringen. Klanten hebben geen inzicht in de status van hun bestelling.

- **Handmatige facturatie zonder opvolging:** Facturen worden handmatig opgesteld en er is geen systeem dat bijhoudt of ze zijn betaald. Hierdoor blijven openstaande facturen te lang liggen.

- **Geen centraal klantoverzicht:** De klantenservice heeft geen toegang tot klantgeschiedenis of eerdere interacties. Klanten worden daardoor niet consistent geholpen en klachten worden niet structureel opgelost.

## 3.3 SOLL-situatie

De mobiele app lost de bovenstaande knelpunten direct op. Hieronder staat per knelpunt hoe de app dit aanpakt.

In de nieuwe situatie is er één centrale mobiele app voor alle klantprocessen. Klanten registreren hun producten via een QR-code of handmatige invoer. Via een persoonlijk dashboard zien ze direct alle productinformatie, zoals allergenen, herkomst, certificeringen en houdbaarheid.

Klachten worden ingediend via een eenvoudig formulier in de app. Klanten kunnen er foto's of video's bij sturen. De app herkent veelvoorkomende problemen automatisch en biedt direct een oplossing of compensatie aan. Klanten kunnen de status van hun klacht live volgen en krijgen een bericht bij elke update.

Klanten bestellen nieuwe producten direct via de app. De app is gekoppeld aan het ERP-systeem, zodat voorraad en levertijden altijd actueel zijn. Een medewerker is hier niet meer voor nodig.

Communicatie is persoonlijk. Klanten krijgen pushberichten over producten die passen bij hun eerdere aankopen en voorkeuren. Ze stellen zelf in welk soort berichten ze willen ontvangen.

ERP, BI en CRM zijn gekoppeld aan de app. Data wordt automatisch gesynchroniseerd. Medewerkers hebben altijd een volledig en actueel klantprofiel beschikbaar.

Een AI-chatbot is 24/7 beschikbaar voor vragen over producten, allergenen, bestellingen en klachten. Bij ingewikkeldere vragen kunnen klanten live chatten met een medewerker of een terugbelverzoek indienen.
