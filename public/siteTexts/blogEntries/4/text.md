## OpenTTD as Infrastructure as Code
The purpose of this project was to produce code that builds an openTTD game server on the target machine using Saltstack. In this report, I go through all the necessary steps. I also wanted to configure the game so that it would work as a marathon game lasting the whole weekend, which could be played alongside other LAN games.

7:45 I started working on the task.

I created two vagrant virtual machines, **master** and **minion1**, with the following initial scripts:

```sh
# Copyright 2019-2021 Tero Karvinen http://TeroKarvinen.com
$tscript = <<TSCRIPT
set -o verbose
apt-get update
apt-get -y install tree
apt-get -y install curl
sudo mkdir -p /etc/apt/keyrings
sudo curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProject>
sudo curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/s>
sudo apt-get update
echo "Done - set up test environment - https://terokarvinen.com/search/?q=vagrant"
TSCRIPT

# Author: Olli
$minion = <<TSCRIPT
sudo apt-get update
sudo apt-get install -y salt-minion
echo "master: 192.168.56.88" | sudo tee /etc/salt/minion
sudo systemctl restart salt-minion
echo "Done - set up minion environment"
TSCRIPT

# Author: Olli
$master = <<TSCRIPT
sudo apt-get update
sudo apt-get install -y salt-master
sudo systemctl restart salt-master
echo "Done - set up minion environment"
TSCRIPT

```

![alt text](/siteTexts/blogEntries/4/images/image-11.png)

I created the openttd module for salt on the master machine and downloaded the necessary Openttd files.

```sh
$vagrant@master sudo mkdir -p /srv/salt/openttd
$vagrant@master cd /serv/salt/openttd
$vagrant@master sudo curl -O https://cdn.openttd.org/openttd-releases/14.1/openttd-14.1-linux-generic-amd64.tar.xz
$vagrant@master sha256sum openttd-14.1-linux-generic-amd64.tar.xz 
```

I installed the Openttd program on the master machine so I could test it locally and get the configuration files. I installed the program in the /opt directory (Hoffman & Gloor 2024)

```sh
$vagrant@master sudo tar -xJf ./openttd-14.1-linux-generic-amd64.tar.xz -C /opt
$vagrant@master sudo cp -s /opt/openttd-14.1-linux-generic-amd64/openttd /usr/local/bin/openttd
$vagrant@master openttd --help
```
openttd: error while loading shared libraries: libgomp.so.1: cannot open shared object file: No such file or directory

```sh
$vagrant@master sudo apt install libgomp.so.1
$vagrant@master openttd --help
$vagrant@master openttd -Df

```
![alt text](/siteTexts/blogEntries/4/images/image.png)  
![alt text](/siteTexts/blogEntries/4/images/image-2.png)  

Next, let's see where the configuration file `openttd.cfg` might be found. I used the commands `ls -a`, `find -name 'openttd'` and finally read from the openttd site that the config file is in the home directory `~/.config`. However, it was not yet there, even though the folder existed. In the home directory, I ran `sudo find -name 'openttd.cfg'` and found nothing. So, I restarted the server with a command that took the port into account and wanted to keep the console open.
```sh
$vagrant@master openttd -D localhost:3001:
```
And I got the message:

![alt text](/siteTexts/blogEntries/4/images/image-3.png)

Apparently, you shouldn't run openttd as root. Maybe the program should be installed for the user? (Planetmaker https://www.tt-forums.net/viewtopic.php?t=70615)

I extracted the program to the home directory and ran it from there, and now it complained about the graphics set again. Something happened, though, and I tried with `ps` and `top` to see if the program was running; I don't think it was (Ayodeji 2024).

![alt text](/siteTexts/blogEntries/4/images/image-4.png)
![alt text](/siteTexts/blogEntries/4/images/image-5.png)

I read the openttd --help command a bit more carefully and had at least put the commands in the wrong order. Next, I tried `openttd -f -D localhost:3001`

![alt text](/siteTexts/blogEntries/4/images/image-6.png)

`ps -x` still didn't show anything. I went to the home directory and with `find -name '*log*'` found the log file and checked it. Same graphics problem. I went to read the openttd manuals. I thought the program should be able to start without a graphical interface.

There it said "OpenTTD needs some additional graphics and sound files to run." I had forgotten this, but let's install them. The manual listed a couple of free graphics libraries. I checked the Openttd installation guide.

I downloaded the graphics directly to the module, as I would need them later with the minion:

```sh
$vagrant@master sudo curl -O https://cdn.openttd.org/opengfx-releases/7.1/opengfx-7.1-all.zip'
$vagrant@master sha256sum ./opengfx-7.1-all.zip 
$vagrant@master tar -xf opengfx-7.1-all.zip -C /tmp/openttdGfx
# Error: tar: This does not look like a tar archive
$vagrant@master sudo apt install unzip
$vagrant@master sudo unzip -q opengfx-7.1-all.zip 
$vagrant@master sudo tar -xf opengfx-7.1.tar -C /tmp
```

Then I went to read the manual for the graphics set. The tar wasn't needed. `sudo rm -r -f  opengfx-7.1/`  

![alt text](/siteTexts/blogEntries/4/images/image-7.png)

Well, I put this in a folder (I'll try /opt/ first) and got the following error:

![alt text](/siteTexts/blogEntries/4/images/image-8.png)

And in the language folder, there is stuff...

![alt text](/siteTexts/blogEntries/4/images/image-9.png)

The problem was that I used the command via an environment variable. When I started the command directly from the folder `./openttd`, it worked. Lucky to realize that.

![alt text](/siteTexts/blogEntries/4/images/image-12.png)
![alt text](/siteTexts/blogEntries/4/images/image-13.png)

My hypothesis was that once the game was started, the configuration file would also be found, and this was correct. `sudo find -name 'openttd.cfg'` I copied the entire configuration file to the salt module with `sudo cp openttd.cfg /srv/salt/openttd/`

![alt text](/siteTexts/blogEntries/4/images/image-15.png)

Before changing other settings, I tried to get this working on the minion. I'll do the port configuration only after everything else works.

```sh
$vagrant@master sudoedit init.sls
```
```yaml
unzip:
  pkg.installed
libgomp1:
  pkg.installed
/tmp/openttd-14.1-linux-generic-amd64.tar.xz:
  file.managed:
    - source: salt://openttd/openttd-14.1-linux-generic-amd64.tar.xz
tar -xJf /tmp/openttd-14.1-linux-generic-amd64.tar.xz -C /opt:
  cmd.run:
    - creates: /opt/openttd-14.1-linux-generic-amd64
/tmp/opengfx-7.1-all.zip:
  file.managed:
    - source: salt://openttd/opengfx-7.1-all.zip
unzip -q /tmp/opengfx-7.1-all.zip -d /opt/openttd-14.1-linux-generic-amd64/baseset:
  cmd.run:
    - creates: /opt/openttd-14.1-linux-generic-amd64/opengfx-7.1.tar
/home/vagrant/.config/openttd/openttd.cfg:
  file.managed:
    - source: salt://openttd/openttd.cfg
/home/vagrant/openttd-14.1-linux-generic-amd64/openttd -f -D localhost:3979:
  cmd.run
```

I accepted the minion's keys
```sh
$vagrant@master sudo salt-key -A
$vagrant@master sudo salt '*' state.apply openttd

```
The connection didn't work, and the same with `sudo salt '*' ping`
![alt text](/siteTexts/blogEntries/4/images-2/image.png)


Let's start over. I destroyed the virtual machines and started them up again. Accepted the keys, tested ping. 11:00 lunch break.

![alt text](/siteTexts/blogEntries/4/images-2/image-1.png)

11.15 continues

```sh
$vagrant@master sudo salt-key -A -y
$vagrant@master sudo salt '*' test.ping 
$vagrant@master sudo mkdir -p /srv/salt/openttd
$vagrant@master cd /srv/salt/openttd/
$vagrant@master sudo curl -O https://cdn.openttd.org/opengfx-releases/7.1/opengfx-7.1-all.zip
$vagrant@master sha256sum ./opengfx-7.1-all.zip 
$vagrant@master sudo curl -O https://cdn.openttd.org/openttd-releases/14.1/openttd-14.1-linux-generic-amd64.tar.xz
$vagrant@master sha256sum ./openttd-14.1-linux-generic-amd64.tar.xz
$vagrant@master sudoedit init.sls
$vagrant@master sudoedit openttd.cfg
$vagrant@master sudo salt '*' state.apply openttd
```
graphics checksum:
928fcf34efd0719a3560cbab6821d71ce686b6315e8825360fba87a7a94d7846
game:
c7648c9aac11daeb7f1bdd7a07346865ae590c07af4a6d02a5ed01fb33eba067


I got a really mysterious salt error. I started by removing lines from init.sls and running them one at a time. At the same time, I checked idempotency.

I started running the program one line at a time, and everything went great and idempotently. At some point, I checked on the minion if anything was happening:

![alt text](/siteTexts/blogEntries/4/images-2/image-2.png)

Before running the configuration part, I fixed:

```sh
/home/vagrant/.config/openttd/openttd.cfg:
  file.managed:
    - source: salt://openttd/openttd.cfg
    - makedirs: True
```
![alt text](/siteTexts/blogEntries/4/images-2/image-3.png)  

Finally, the whole init.sls was ready and working: Before the final idempotency test, I should figure out something for the last run command. It would also be neater to use the service.running state function, but I don't know how to find out the name of the openttd daemon. I read some systemctl manuals and Salt manuals about the service.running function. I couldn't figure out how to approach it. I asked ChatGPT for direction.

![alt text](/siteTexts/blogEntries/4/images-2/image-4.png)

ChatGPT directed me to the command pgrep openttd. With that, I can find the process pid number with `pgrep openttd`. I added this check to the cmd.run command. I also learned from ChatGPT that apparently such processes can also be made into daemons, which could be run with the service.running function. I didn't understand this very deeply, so I decided to use the cdm.run command. (Read more at Linuxize 2024, Salt Project 2024).

With the above command, I achieved idempotency: 
![alt text](/siteTexts/blogEntries/4/images-2/image-5.png)

Finally, I should check that the game server is reachable. The Openttd site said that the following ports should be opened:

3979 UDP
3979 TCP

```sh
I added these lines:
ufw:
  pkg.installed
ufw.service:
  service.running
sudo ufw allow in on wlo1 from 192.168.0.0/24 proto udp to any port 3979:
  cmd.run:
    - unless: sudo ufw status verbose | grep 3979/udp
sudo ufw allow in on wlo1 from 192.168.0.0/24 proto tcp to any port 3979:
  cmd.run:
    - unless: sudo ufw status verbose | grep 3979/tcp
sudo ufw allow in on wlo1 from 192.168.0.0/24 proto udp to any port 3978:
  cmd.run:
    - unless: sudo ufw status verbose | grep 3978/udp

```
![alt text](/siteTexts/blogEntries/4/images-2/image-8.png)


I accidentally closed the salt ports and added them to the state (first ran the commands on the minion)


```sh
sudo ufw allow in on wlo1 from 192.168.56.88 proto tcp to any port 4505:
  cmd.run:
    - unless: sudo ufw status verbose | grep 4505/tcp
sudo ufw allow in on wlo1 from 192.168.56.88 proto tcp to any port 4506:
  cmd.run:
    - unless: sudo ufw status verbose | grep 4506/tcp
```
On the host machine, I checked if I could connect to the minion and which ports were open with `netstat 192.168.56.89` and `netstat 192.168.56.89 | grep 3979`. I also tried `ping 192.168.56.89 3979`.

![alt text](/siteTexts/blogEntries/4/images-2/image-6.png)

However, the game is not visible:

![alt text](/siteTexts/blogEntries/4/images-2/image-7.png)  

I remembered that some specific things still needed to be added to the configs, and that was the case. I edited a couple of settings. I edited these and in between killed the openttd server with `sudo kill 4380`

I always tested the connection with these commands:
```sh
$vagrant@minion sudo ufw status verbose
$host sudo nmap -sU -p 3979 192.168.56.89
$host telnet 192.168.56.89 3979
```

![alt text](/siteTexts/blogEntries/4/images-2/image-9.png)

![alt text](/siteTexts/blogEntries/4/images-2/image-10.png)

I then had big problems getting this to work and did a lot of things I didn't report. I basically tried different opentTTD configurations. I finally noticed that the configuration file wasn't even loaded into the game, as the logs complained that server_name was not defined.

![alt text](/siteTexts/blogEntries/4/images-2/image-11.png)

By searching, I found three different cfg files on the machine. Next, I edited these, but my changes were overwritten.

I tried starting the openttd application with different parameters. I added these to the command:

  -x                  = Never save configuration changes to disk
  -c config_file      = Use 'config_file' instead of 'openttd.cfg'

As the config file, I used the one I created in the openttd folder and brought from the master machine.

Finally, I noticed that in addition to the config file not opening, the server was only listening on address 127.0.0.1, i.e., localhost.

Finally, hosting succeeded when I changed the -D argument from localhost --> 192.168.56.89

![alt text](/siteTexts/blogEntries/4/images-2/image-15.png)

![alt text](/siteTexts/blogEntries/4/images-2/image-16.png)

This is where I stopped working. There are still unfinished things in the project, and here are a few problems:
- the configuration file is not used when the program starts.
- when the configuration file changes, the daemon does not restart.
- the server does not have mods enabled

At 14:26 I stopped the task, there is no more time to investigate these issues.


## Sources
Karvinen, Tero 2024a. Server Management - Configuration Management Systems course - 2024 autumn. Source: https://terokarvinen.com/palvelinten-hallinta/ (Read 2024.11.06)  
Karvinen, Tero 2006. Writing a Report – Salt Stack Master and Slave on Ubuntu Linux. Source: https://terokarvinen.com/2006/06/04/raportin-kirjoittaminen-4/ (Read 28.10.2024)  
Chris Hoffman & Jordan Gloor 2024. https://www.howtogeek.com/117435/htg-explains-the-linux-directory-structure-explained/ (Read 4.12.2024)  
Openttd 2024: https://wiki.openttd.org/en/Manual/Dedicated%20server (Read 4.12.2024)  
Openttd 2024: https://wiki.openttd.org/en/Archive/Manual/Settings/Openttd.cfg (Read 4.12.2024)  
Bolaji Ayodeji 2024. https://www.freecodecamp.org/news/linux-list-processes-how-to-check-running-processes/ (Read 4.12.2024)  
Openttd 2024. How to Zip or Unzip Files From the Linux Terminal https://wiki.openttd.org/en/Manual/Installation (4.12.2024)  
McKay, Dave 2024. https://www.howtogeek.com/414082/how-to-zip-or-unzip-files-from-the-linux-terminal/ (Read 4.12.2024)  
Salt Project 2024. salt.states.cmd https://docs.saltproject.io/en/latest/ref/states/all/salt.states.cmd.html (Read 4.12.2024)  
Linuxize 2024. https://linuxize.com/post/pgrep-command-in-linux/ (Read 4.12.2024)  
## Technical specifications of the devices used

Asus ROG Strix GT15 

-   Processor: Intel® Core™ i5-10400F 6-core processor, 2.9-4.3 GHz, 12 MB cache
-   Chipset: Intel® B460
-   Memory: 16 GB DDR4 2933 MHz
-   Storage: 512 GB M.2 NVMe PCIe 3.0 SSD
-   Graphics: NVIDIA® GeForce® GTX 1660 6GB (1x HDMI, 1x DP, 1 x DVI)
-   Audio: SupremeFX S1220A Codec
-   Network: Gigabit Ethernet, Intel WiFi 6 (802.11ax), Bluetooth 5.0
-   Operating system: Windows 10 Home 64-bit

This document may be copied and modified according to the GNU General Public License (version 2 or later). http://www.gnu.org/licenses/gpl.html

Based on the Server Management course assignment: https://terokarvinen.com/palvelinten-hallinta/