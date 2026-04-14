Markdown-inhoud
Chocolate Firm Requirement specificatie

**Missie**

Wij maken chocoladeproducten die mensen verbinden met smaak, kwaliteit en duurzaamheid.

Motto: Van boon tot reep, met passie voor elk product.

**Visie**

De Chocolate Firm wil de meest klantgerichte chocoladeproducent zijn, erkend om innovatie digitale dienstverlening, transparantie en duurzame productie.

**Strategie**

De chocolate Firm richt zich op drie strategische punten. Eerst wordt de interne organisatie op orde gebracht door processen te digitaliseren en automatiseren, zodat orders betrouwbaar worden verwerkt, voorraden real-time worden bijgehouden en de kwaliteitscontrole duidelijke vast wordt gelegd. Vervolgens wordt via een mobiele app een directe digitale relatie opgebouwd met klanten, wat zorgt voor meer loyale en waardevolle data voor productontwikkeling en marketing. Tot slot wordt de duurzame groei behaald door te focussen op Fairtrade, transparantie over de cacao afkomst en het uitbreiden naar nieuwe markten zoals seizoenpakketten en B2C-abonnementen

**Doelstellingen**

De Chocolate Firm stelt vier concrete doelstellingen. Binnen twaalf maanden na de lancering van de mobiele app heeft minimaal 30% van de actieve klanten hun producten geregistreerd in de app. Binnen zes maanden na implementatie van het nieuwe orderverwerkingssysteem zijn handmatige orderfouten met 50% verminderd ten opzichte van de huidige situatie. De klantentevredenheid, gemeten via de Net Promoter Score stijgt van de huidige baseline naar een score van minimaal +30 aan het einde van 2026. Tot slot wordt binnen achttien maanden na het uitbrengen van de app minimaal 15% van alle orders via het digitale app-kanaal geplaatst.

**Organogram**

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
|     |     | Raad van Commissarissen |     |     |
|     |     | Managementteam (CEO) |     |     |
| Verkoop en marketing | Productie en logistiek | Inkoop en Voorraad | Klantenservice | Financiën |

**Stakeholderanalyse**

Bron: https://husite.nl/open-ict/sdgs-bij-open-ict/sdg-toolbox/stakeholderanalyse/

Directe stakeholders

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Stakeholder | Rol | Impact | Voordelen | Nadelen |
| Raad van Commissarissen | Opdrachtgever | Hoog | Geeft en budget, zorgt voor strategisch samenwerking | Kan te hoge verwachtingen stellen of tempo forceren |
| Managementteam | Dagelijkse aansturing en beslissingen | Hoog | Verbindt strategie aan uitvoering | Te veel druk bij tegelijk veranderen en uitvoeren |
| Medewerkers | Uitvoering van processen, gebruikers van nieuwe systemen | Hoog | Kennen de knelpunten het best, kunnen verbeteringen aangeven | Moeite bij verandering en kunnen moeite hebben bij nieuwe tools |
| Supermarkten en groothandels | Grootste klanten, bulkorders | Hoog | Stabiele omzet | Hoge onderhandelingsmacht, prijsdruk op leveranciers |
| Speciaalzaken | Hogere marge | Midden | Hogere winstmarge, reputatie versterken via luxe kanalen | Kleine volumes, hogere servicekosten per klant |
| Leveranciers | Leveringen van grondstoffen, zorgen voor kwaliteit producten | Hoog | Fairtrade-samenwerking verbeterd reputatie en duurzaamheid | Leveringsrisico bij tekort of prijsstijging |

Indirecte stakeholders

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Stakeholder | Rol | Impact | Voordelen | Nadelen |
| Eindconsument | App-gebruikers, kopers via supermarkt | Midden | Loyaliteit, directe feedback | Hoge verwachtingen van digitale ervaring |
| Ontwikkelaars/IT-team | Bouw en onderhoud app en ERP-koppeling | Hoog | Zorgen voor werkende app, brengen technische expertise | Kennis meenemen bij wisselen van baan/bedrijf |
| Media | Berichten over merk, duurzaamheid, incidenten | Midden | Positieve media versterkt merkbekendheid | Negatieve berichten bij recall of een data lek verslechterd merk reputatie |
| Banken en financiers | Financieren de investeringen | Midden | Geld beschikbaar voor digitale transformatie | Rente en terugbetaling verplichtingen |

Kwaadwillende stakeholders

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| Stakeholder | Rol | Impact | Voordelen | Nadelen |
| Concurrenten | Tegenstander bij prijs, assortimenten en digitale innovatie | Hoog | Stimuleren tot innovatie en scherp blijven | Kunnen klanten afpakken bij trage app of prijsvoordeel |
| Cybercriminelen | Aanvallen op app, klantdata of betalingssystemen | Hoog | Geen | Data lek, reputatieschade, AVG-boetes en downtime |
| Nep-reviewers | Verspreiden van vals negatieve reviews via app of social media | Laag | Geen | Verlies van klantenvertrouwen, reputatieschade |

UI-model
Staat in sprint verslag
**Actoren**

Interne actoren

|     |     |     |     |
| --- | --- | --- | --- |
| Actor | Afdeling | Rol | Knelpunten |
| Managementteam | Directie | Dagelijkse aansturing en beslissingen | Geen duidelijk overzicht |
| Verkoopmedewerkers | Verkoop en marketing | Orders aannemen, klantcontact | Werken met losse Excel-bestanden |
| Marketingteam | Verkoop en marketing | Campagnes, promoties en klantenwerven | Slechte communicatie met verkoop |
| Productieplanner | Productie | Productieplanning maken | Werkt met oude incomplete data |
| Productiemedewerker | Productie | Chocolade produceren | Verspilling, verkeerde instellingen |
| Logistiek medewerker | Logistiek | Verzending en distributie | Handmatige labels, fouten in verzending |
| Magazijnmedewerker | Voorraad | Voorraad bijhouden | Geen real-time inzicht |
| Inkoopmedewerker | Inkoop | Bestellingen bij leveranciers | Foute bestellingen plaatsen |
| Kwaliteitscontroleurs | Productie | Controle op kwaliteit | Wordt vaak overgeslagen of genegeerd |
| Klantenservicemedewerker | Klantenservice | Klachten afhandelen | Geen klantoverzicht |
| Financiële medewerker | Financiën | Facturatie, betalingen | Handmatig, foutgevoelig |

Externe actoren

|     |     |     |     |
| --- | --- | --- | --- |
| Actor | Type | Rol | Knelpunt |
| Supermarkten | B2B klant | Grote bulkorders | Onzeker over levering |
| Groothandels | B2B klant | Distributie naar winkels | Geen inzicht in voorraad |
| Speciaalzaken | B2B klant | Kleine orders | Bestellen via telefoon |
| Consument | B2C klant | Gebruikers van producten en app | Slechte service-ervaring |
| Leveranciers | Partner | Leveren grondstoffen | Bestellingen niet goed gepland |
| Transportpartners | Partner | Leveringen uitvoeren | Geen tracking |
| Raad van commissarissen | Toezicht | Strategische samenwerking | Te hoge verwachtingen |

Systeem actoren

|     |     |     |     |
| --- | --- | --- | --- |
| Actor | Type | Rol | Doel |
| CRM-systeem | Software | Klantdate beheren | Betere klantrelaties |
| ERP-systeem | Software | Alle processen centraal | Efficiëntie en automatisering |
| BI-tool | Software | Data-analyse en inzicht | Processen en beslissingen verbeteren |
| Mobiele app | Software | Klantinteractie en service | Loyaliteit en ervaring |
| Tracking systeem | Logistiek | Leveringen volgen | Transparantie |

Grootste problemen van de actoren

- Geen centrale data
- Slechte communicatie tussen actoren
- Handmatige processen
