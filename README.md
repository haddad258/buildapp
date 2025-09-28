Super idée ✅ Je vais te préparer un **README clair et complet** pour :

* Installer **Traccar** sur Ubuntu 24.04
* Utiliser **Java 17 global** (pas de JRE embarqué cassé)
* Ajouter le **frontend moderne ReactJS**
* Configurer le **service systemd** propre
---

⚡ Ce README installe **Traccar 5.12 + Java 17 + Web moderne React** proprement sur Ubuntu 24.04.

---
---

# 📌 Installation de Traccar avec interface moderne (Ubuntu 24.04)

## 1️⃣ Prérequis système

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install wget unzip curl git nodejs npm -y
```

Vérifier Java :

```bash
java -version
```

> Utiliser **Java 17** (Traccar ne supporte pas encore Java 21).
> Si besoin :

```bash
wget https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.12%2B7/OpenJDK17U-jdk_x64_linux_hotspot_17.0.12_7.tar.gz
tar -xzf OpenJDK17U-jdk_x64_linux_hotspot_17.0.12_7.tar.gz
sudo mv jdk-17* /opt/jdk-17
sudo ln -s /opt/jdk-17/bin/java /usr/bin/java
```

---

## 2️⃣ Télécharger et installer Traccar backend

```bash
cd /opt
sudo wget https://github.com/traccar/traccar/releases/download/v5.12/traccar-other-5.12.zip
sudo unzip traccar-other-5.12.zip -d traccar
cd traccar
```

Vérifie que `tracker-server.jar` est bien présent :

```bash
ls tracker-server.jar
```

---

## 3️⃣ Créer le service systemd

Créer `/etc/systemd/system/traccar.service` :

```ini
[Unit]
Description=Traccar GPS Tracking Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/traccar
ExecStart=/usr/bin/java -jar /opt/traccar/tracker-server.jar conf/traccar.xml
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Activer et démarrer le service :

```bash
sudo systemctl daemon-reload
sudo systemctl enable traccar
sudo systemctl start traccar
sudo systemctl status traccar
```

---

## 4️⃣ Installer l’interface moderne React

### Cloner le frontend

```bash
cd /opt/traccar
sudo git clone https://github.com/traccar/traccar-web.git
cd traccar-web
```

### Installer les dépendances

```bash
npm install
```

### Configurer l’API backend

Éditer `src/config.js` :

```javascript
export const apiUrl = "http://localhost:8082/api";
```

### Compiler le frontend

```bash
npm run build
```

### Déployer

```bash
sudo rm -rf /opt/traccar/web
sudo cp -r build /opt/traccar/web
```

---

## 5️⃣ Vérification

1. Vérifier les logs backend :

```bash
cat /opt/traccar/logs/tracker-server.log
```

2. Accéder au frontend :

```
http://<IP_SERVEUR>:8082
```

👉 Tu devrais voir la **nouvelle interface React** 🎉

---

## 6️⃣ Commandes utiles

* Redémarrer le service :

```bash
sudo systemctl restart traccar
```

* Arrêter le service :

```bash
sudo systemctl stop traccar
```

* Logs live :

```bash
sudo journalctl -fu traccar
```


