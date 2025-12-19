# Knownledge Check 

## 1. Prestanda och laddningstid

- De två saker som vi kunde göra är då att minimera bildstorleken och Javascript-filer, då vi inser att det tog mycket datan på grund av att bilderna inte var minimerade. Alltså vi skulle kunna lägga en “max-width” och “min-width” på alla bilder eller ändra bilder till ett annat format som tar mindre datan. För Javascript delen behöver vi nog använda stack för att minska ner unused Javascript. 


## 2. Tillgänglighet (WCAG)

- För tillgängligheten utifrån Lighthouse, visade sig att vi hade Performance: 60, Accessibility: 82, Best Practice: 100 och SEO: 75. Problemet var då att bildstorleken tog mycket data och laddas upp, kontrasten är inte tillräckligt tydlig för läsaren, Javascript- filen var för stor och det gjorde att det tog en längre tid för sidan och laddas. Ikonen saknas [alt attribut], robots.txt är inte valid. Header img behöver optimeras LCP. 

- Åtgärd för dessa problem kan vi fixa genom att kompress bildstorlek, för att minska datan som laddas upp varje gång användaren är inne i websiten. Vissa delar av webbsidan behöver vara tydliga för att det ska vara enklare för läsaren och veta vad det är det man ser. Samtidigt behöver vi minimera Javascript-filer för att det ska ta mindre tid och ladda sidan. Tillägga ikon [alt attribut] för att tydliggöra för läsaren och “fetchpriority = high” bör lägga till i header. 

## 3. AI-reflektion (övergripande)

- För att granska koden manuellt använder jag ofta "devtools" på chrome för att   identifiera errors message på console, och där kan jag lätt upptäckas specifikt vilken del är det som behöver kollar extra på, eftersom de ger ut vilken rad buggen är, och en error message vad buggen handlar om. Samtidigt behöver jag vara extra noggrant med att vad är det för kod som jag skriver och hur jag kan göra det så läsbart som möjligt. 

- För min del använder jag ofta AI när jag inte förstår error message efter flera gånger försökt. Däremot är det bra som ett verktyg där de hjälper mig att navigera hur jag kan börja och hur det ska kunna ser ut när det är klart bygg. Då jag har svårighet med att starta att gå direkt in i koden. Men i övrigt AI är bra för att tydliggöra hur koden ska ser ut för att det ska fungerar, men också kunna ger ut förbättringsförslag på kod. 

## 4. Skillnaden mellan REST och GraphQL

- Utifrån mina kunskaper om de senaste arbetet. Skillnaden mellan REST och GraphQL kan vara att REST använder olika fasta endpoint för olika resurser såsom “/user/1”, ”user/order/1”. Medan GraphQL använder en endpoint för all kommunikation. Inom REST där servern bestämmer vad som ska skickas, användare får ha det man får från servern och det ofta inte matchas med det exakt UI behov. 

- Till skillnad från GraphQL där användaren behöver bara skicka en query som servern kommer senare att skicka tillbaka med samma förfrågan utan andra extra saker. Samtidigt REST ofta leder till överfetching eller underfetching jämfört med GraphQL där man bara hämtar den exakta datan som man har frågat efter. För ändringen och nya versionen av API:et där behöver man bygga om backend inom REST. Men med GraphQL behöver man inte rör backends delen utan det är en enklare lösning ifall det sker någon ändring inom API:et. 



## 5. API-struktur (REST/GraphQL)

### a och b svar: 

- För användarvänlighet så fungerar REST inte lika smidigt som GraphQL, eftersom det kan sker att det blir en överfetching eller underfetching, där antingen användaren hämtar för mycket datan eller för litet. Däremot kan REST visa upp hela objektet när man kör anrop för exempelvis 1 ingrediens och då kan det visa upp hela listan av ingredienser. Istället för det man frågar efter, då leder det till att användaren tvingas och hämtat ner all datan som egentligen inte behövs för att 1 ingrediens ska visas. 

- Det kan också bli fler anrop än det som behövs för att exempelvis en komponent ska visas. Vilket GraphQL inte gör i detta fallet där det inte behövs att hämta ner allt data såsom REST utan bara data som man har frågat efter. Samtidigt kan man hämta direkt ner andra komponenter i query. Men i detta fallet utifrån vårt projekt så är det mer vänligt och börjar med REST i ett litet projekt än GraphQL, men såklart kan man alltid bygga på projektet med GraphQL i efterhand, för att vi har definierat props i de mesta komponenterna. Det gör att det blir lättare att koppla till GraphQL ifall projektet fortsätter växa. 

### c. 

-  I vårt projekt har vi delat upp att alla komponenter ska ligga i en enskild /components mapp, och skalet för dessa komponenter i en /views mapp, och Javascript-fil för API:et i /services map. Detta gör att det tydliggör vilken eller vilka filer som finns och det är lättare att spåra vilka filer man vill se. Vårt projekt visar en renare kodstruktur som finns en chans att utvecklas till en större grad.  



## 6. Arkitektur och ramverk

- Vårt projekt är strukturerat som en Vue SPA-arkitektur där det uppnå vårt mål och kundens mål att kunna bollar mellan olika sidor utan att sidan laddas om. Samtidigt fokuserar vi väldigt mycket på komponenter baserat på arkitekt, för att säkerställa att det skall gå och kunna återanvända dessa komponenter i fler tillfällen. Vi ser till att alla komponenter är uppkopplade med API:et respektive vårt .env fil som innehåll vårt Team-ID  är gömd. Däremot gör det lättare för andra att kunna läsa och veta vad det är man kollar på samt det är lättare att navigera i kod mappen. 

- REST är det som vi använder i vårt projekt och vi märkte att det kan ta en viss tid innan sidan laddas upp alla recept. Detta ger oss en möjlighet att kunna bygga vidare och utveckla förmågan. Med tanke på att vårt projekt är så clean byggt och tydligt på var alla filer ligger, finns det större möjlighet att vi exempelvis inte behöver göra “fetch”-anropet i varje komponent för att det redan ligger i vår API.js fil på /services. Utan vi kan också direkt tillägga en annan fil som innehåller query för att ändra från REST till GraphQL i /services. Istället och byta ut allting och skriver om allt från början. Ett annat exempel är på vår komponent RecipeHeader.vue där vi har definierat props och angett vilken typ de är. Detta gör att det blir lättare att ändra från REST till GraphQL så att det underlättar en utveckling ifall vi vill bygga vidare på projektet. 
