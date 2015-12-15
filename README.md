# Installation und Starten der SEKO Schadenserfassung Webanwendung

1. Installieren von MongoDB
   
   Es muss die MongoDB installiert werden. Diese kann entweder unter https://www.mongodb.org
   heruntergeladen werden, oder über einen entsprechenden Package Manager

2. Installation von NodeJS
  
  Es muss das NodeJS Framework installiert werden. Dieses kann entweder unter https://nodejs.org/ 
  heruntergeladen werden, oder über einen entsprechenden Package Manager

3. Starten der MongoDB

   Die MongoDB muss gestartet werden. 

   Unter UNIX: >mongod --dbpath <PfadZumProjekt>/SEKOO/data
   Unter Windows (cmd): C:\mongodb\bin\mongod.exe --dbpath "d:\<pfadzumprojekt>\SEKOO\data"

4. Starten des Webservices

   Wenn die Datenbank läuft, kann die NodeJS App gestartet werden. Dazu einfach in das
   Projektverzeichnis wechseln und folgenden Befehl eintippen:

   > npm start

   Alternativ kann auch "node app.js" verwendet werden.

5. Aufrufen der Seite

   Die Seite ist unter "http://localhost:3000" erreichbar.

6. Einloggdaten:

   Kunde
     Kennung:  lb85783
     Passwort: password123 
 
   Mitarbeiter
     Kennung:  lb85781
     Passwort: geheim
