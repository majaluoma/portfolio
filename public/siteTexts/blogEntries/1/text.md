# Testing Salt Commands Locally on a Virtual Machine

The report was written on Friday, 2024-11-06

## x) Salt in Brief

With Salt, you can control other devices connected to the network. The main principle is that one computer, the master, gives commands to several computers, the minions, which execute the commands. (Karvinen 2018).

On the master machine, the `salt-master` package is installed. To execute commands over the network, the application needs ports 4505/tcp and 4506/tcp (Karvinen 2018).


    $ sudo apt-get update  
    $ sudo apt-get -y install salt-master  


On the minion machine, the `salt-minion` package is installed, after which the master's information is set in the `/etc/salt/minion` file in the `master` parameter. Whenever salt-minion settings are changed, the program must be restarted. When a new minion is created, its key must be accepted on the master machine. (Karvinen 2018).

    $ sudo apt-get update  
    $ sudo apt-get -y install salt-minion  
    $ sudoedit /etc/salt/minion  
        master: [master's IP]  
    $ sudo systemctl restart salt-minion.service  

And then on the master machine:

    $ sudo salt-key -A


After this, the `salt` commands run on the master machine are also executed on the minion machines. The first parameter of the salt command, `'*'`, refers to the minion machines on which the command is executed. Here is a list of some of the commands that can be used:

    $ sudo salt '*' cmd.run 'whoami'  
    $ sudo salt '*' cmd.run 'hostname -I'  
    $ sudo salt '*' grains.items|less  
    $ sudo salt '*' grains.items  
    $ sudo salt '*' grains.item virtual  
    $ sudo salt '*' pkg.install httpie  
    $ sudo salt '*' sys.doc|less  
Source: Karvinen 2018

Salt commands are desired to be run as state functions, which always execute a certain state. Idempotent means that the command is not executed if its outcome is already valid. You can also run state functions locally on your own machine with just the salt-minion package. In this case, the `salt-call` command is used with the `--local` parameters. (Karvinen 2021). Running a single state is possible by using the `state.single` parameter and using some state like `pkg.installed`. (Karvinen 2021). For example:

     sudo salt-call --local -l info state.single pkg.installed tree

This command ensures locally that the tree package is installed on the machine. 

## a) Install Debian 12-Bookworm on the Virtual Machine

Tero Karvinen (2024) has written instructions for installing the virtual machine, and I followed these instructions. In my case, I encountered an error:

>This kernel requires x86-64 but only detected an i686 CPU

This was fixed by modifying the settings to enable I/O APIC and allowing 2 processors for the virtual machine.

![alt text](/siteTexts/blogEntries/1/image-1.png)

I also installed the distro updates and the firewall as the installation of salt-minion did not succeed on the first try.

    $ sudo apt-get -y dist-upgrade
    $ sudo apt-get -y install ufw
    $ sudo ufw enable

## b) Installing the Salt-minion Package on the Machine
First I installed salt-package:

    $ sudo apt-get update 
    $ sudo apt-get -y install salt-minion

There was an error in installing the salt-minion package, and the package was not found. I also installed the distro updates on Debian before trying again.

![alt text](/siteTexts/blogEntries/1/image.png)

The installation of the package was successful with the new addresses according to the Salt project's instructions. (Saltproject 2024)

    $ sudo mkdir -p /etc/apt/keyrings
    $ sudo curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProjectKey/public | sudo tee /etc/apt/keyrings/salt-archive-keyring.pgp
    $ sudo curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/salt.sources | sudo tee /etc/apt/sources.list.d/salt.sources
    $ sudo apt-get update
    $ sudo apt-get install -y salt-minion
    $ salt-call --version

I modified the salt-minion settings so that the master was set to the local computer `master: local`.

## c) Using Salt Commands Locally

Let's first try the file.managed state function locally, which checks that the file is present at the destination and creates it if it does not exist.

    $ sudo salt-call --local -l info state.single file.managed /tmp/moro

![alt text](/siteTexts/blogEntries/1/image-4.png)¨

Next, I tried the pkg state function, which can manage the programs installed on the machine
    
    $ sudo salt-call --local -l info state.single pkg.installed tree

![alt text](/siteTexts/blogEntries/1/image-5.png)

10.43 Next, it was time for the service state function, which starts and stops programs. In the example, I managed the firewall program
    
    $ sudo salt-call --local -l info service.running ufw enable=False
    $ sudo salt-call --local -l info service.running ufw enable=True


![alt text](/siteTexts/blogEntries/1/image-6.png)

In the example below, a user named vierailija is created if it does not already exist.

    $ sudo salt-call --local -l info state.single user.present vierailija

The cmd.run state function allows you to run commands on the target device. However, this function is not idempotent by default, and without conditions, it is always executed on the target machine.

    $ sudo salt-call --local -l info state.single cmd.run 'touch /tmp/foo' creates="/tmp/foo"

![alt text](/siteTexts/blogEntries/1/image-7.png)

## e) Master-Slave Architecture on the Local Machine
10.50  Let's try to install salt-master on the machine and accept the keys from the minion
    $ sudo apt-get install salt-master
    $ sudo sudo salt-key -A

This resulted in the error The key glob '*' does not match any unaccepted keys. Which I believe means that the salt-minion has not yet contacted. Let's try restarting the salt-minion.

This did not work, so I tried to disable the ufw firewall  

    sudo systemctl ufw disable

Neither did this work, so I changed the master: localhost parameter to match the local ip address 

    hostname -I 

![alt text](/siteTexts/blogEntries/1/image-8.png)

11.12 Neither did this work. I was investigating the problem with the commands 

    $ sudo salt-key -L
    $ sudo salt 'nice_minion' test.ping

Salt-key did not show the key in the list. Ping showed that there is no connection to the master. Nice_minion was the name given to the minion.

After some investigation, I read from ChatGPT that the master settings can also manually define the port and addresses. I applied these settings and restarted the master:
    
    $ sudoedit /etc/salt/master
        interface: 0.0.0.0
        publish_port: 4505
    $ sudo systemctl restart salt-master.service

After this, setting the keys was successful.

However, I removed these port settings from the master's configuration and tried again to ping the master successfully. Probably, just restarting the salt-master would have solved the problem.

## Sources
Saltproject 2024. Linux (DEB). Source:  https://docs.saltproject.io/salt/install-guide/en/latest/topics/install-by-operating-system/linux-deb.html#install-deb (Read: 06.11.2024)  
Karvinen, Tero 2023. Run Salt Command Locally. Source: https://terokarvinen.com/2021/salt-run-command-locally/ (Read 28.10.2024)  
Karvinen, Tero 2018. Salt Quickstart – Salt Stack Master and Slave on Ubuntu Linux. Source: https://terokarvinen.com/2018/03/28/salt-quickstart-salt-stack-master-and-slave-on-ubuntu-linux/ (Read 28.10.2024)  
Karvinen, Tero 2006. Writing a Report – Salt Stack Master and Slave on Ubuntu Linux. Source: https://terokarvinen.com/2006/06/04/raportin-kirjoittaminen-4/ (Read 28.10.2024)
Karvinen, Tero 2024. Install Debian on Virtualbox - Updated 2024. Source: https://terokarvinen.com/2021/install-debian-on-virtualbox/ (Read 2024.11.06)  
Karvinen, Tero 2024b. Server Management - Configuration Management Systems course - 2024 autumn. Source: https://terokarvinen.com/palvelinten-hallinta/ (Read 2024.11.06)  

## Technical Specifications of the Used Devices

Asus ROG Strix GT15

-   Processor: Intel® Core™ i5-10400F -6-core processor, 2.9-4.3 GHz, 12 MB cache
-   Chipset: Intel® B460
-   Memory: 16 GB DDR4 2933 MHz
-   Storage: 512 GB M.2 NVMe PCIe 3.0 SSD
-   Graphics card: NVIDIA® GeForce® GTX 1660 6GB (1x HDMI, 1x DP, 1 x DVI)
-   Audio: SupremeFX S1220A Codec
-   Network: Gigabit Ethernet, Intel WiFi 6 (802.11ax), Bluetooth 5.0
-   Operating system: Windows 10 Home 64-bit

This document can be copied and modified according to the GNU General Public License (version 2 or later). http://www.gnu.org/licenses/gpl.html

Based on the assignment of the Server Management course: https://terokarvinen.com/palvelinten-hallinta/