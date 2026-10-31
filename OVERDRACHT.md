# Overdracht

Stand van zaken van de site voor LUMEA Amsterdam, Johan Huizingalaan 192.

## Wat er staat

| Pad | Wat het is |
| --- | --- |
| `/` | Homepage, concept A. Beige en zwart, gecentreerd merkteken. |
| `/concept-b/` | Homepage, concept B. Licht beige en bruin, gedeelde hero, redactioneel. |
| `/concept-c/` | Homepage, concept C. Nacht, crème en goud, volvlak hero met zijrail. |
| `/menu/` | De kaart. Mobiel eerst, foto naast elk gerecht, tikken geeft een grote foto. Gedeeld door alle concepten. |
| `/tafelkaart/` | Printpagina. A4 liggend, twee kaartjes van ongeveer A6 met de QR. |

Er is nog **geen concept gekozen**. Zodra dat gebeurt gaan de andere twee mappen
eruit en verhuist de gekozen homepage naar de hoofdmap.

## Wat nog ontbreekt

Deze staan als zichtbare plaatshouder in de pagina's. Zoek op `[` om ze te vinden.

- `[TIJD]` en `[TIJD INVULLEN]`: openingstijden, op alle homepages
- `[POSTCODE]`: postcode van de zaak
- `[TELEFOON]` en `[TELEFOONNUMMER]`: telefoonnummer
- `[E-MAIL]` en `[E-MAILADRES]`: e-mailadres
- `[INSTAGRAM]`: het Instagram-adres

De prijzen zijn **niet** meer leeg. Zie hieronder.

## De kaart

De kaart bevat 78 gerechten in 12 categorieen, overgenomen van de gedrukte
kaart die de klant heeft aangeleverd. Prijzen zijn echt.

Vijf dingen zijn van die foto niet met zekerheid te lezen en moeten
nagekeken worden:

1. Er stond zowel "Pancakes EUR 8" als "Pancake naturel EUR 8" onder elkaar.
   Daar is een regel van gemaakt. Mogelijk zijn het twee gerechten.
2. Bij de extra toppings stond "Pinkabass". Gelezen als pindakaas.
3. "Gehakt sampy" voor EUR 12 is letterlijk overgenomen.
4. "Avocaco shake" is gelezen als avocadoshake.
5. De prijs van de Panini Pesto en Mozzarella werd op de foto afgedekt.
   Er staat nu EUR 12, dat is een aanname.

## Foto's en video

In `assets/merk/` staan vijf echte foto's van de klant: de gevel bij avond,
de bekers in de drager, het kaartje, de beker met tulpen en het vloeipapier.
Die zijn echt en mogen overal gebruikt worden.

In `assets/fotos/` staat een mengsel:

- `lumea-tafel.jpg`, `panini.jpg`, `zalm-gepocheerd.jpg` en `beker-hand.jpg`
  zijn **met AI gegenereerd**, met het echte vloeipapier en de echte beker als
  referentie. Het logo erop klopt daardoor, maar de gerechten zijn niet
  gefotografeerd in de zaak.
- De overige foto's zijn **stockfotografie van Unsplash**.

Geen van deze foto's toont een gerecht zoals het werkelijk over de toonbank
gaat. Voor de lancering horen hier eigen foto's te staan.

In `assets/video/` staan de gegenereerde clips voor de hero.

## De QR-code

`assets/qr/qr-menu.svg` verwijst naar:

    https://yjsmarket.github.io/lumeaconcept4-/menu/

Die code is nagelezen met een decoder en komt exact op dat adres uit. Komt er
een eigen domein, of verandert de naam van de repo, **dan moet de QR opnieuw
gemaakt worden**. De oude blijft anders naar een dood adres wijzen, ook op
kaartjes die al gedrukt zijn.

## Techniek

Statische HTML, CSS en JavaScript, geen build-stap. Bedoeld voor GitHub Pages.
Pages staat nog **niet** aan, dat moet nog in de instellingen van de repo.

`assets/js/lumea.js` doet het invloeien bij scrollen en de vergroting op de
kaart. Het onthullen gaat op scrollpositie en niet met een
IntersectionObserver: die geeft bij een sprong naar een anker geen melding voor
de overgeslagen blokken, waardoor die blanco bleven als iemand terugscrolde.
Het verbergen zit achter de klasse `js-aan`, die het script zelf zet. Draait de
JavaScript niet, dan staat de tekst er gewoon.

## Werkafspraken

`CLAUDE.md` in deze map bevat de vaste regels voor schrijfstijl, ontwerp en
techniek. Die wordt automatisch gelezen bij het starten van een sessie.
