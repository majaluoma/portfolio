# Testing Salt Commands Locally on a Virtual Machine

h2 Infra-as-code
The report was written on 2024-11-06 and 10.11.2024 using an Asus ROG Strix GT15 computer, more detailed information at the end of the report.

The command line tool used was Git Bash, so the commands correspond better to Linux environments.

The reporting model is based on Karvinen's (2018) guide to reporting and the report was made as part of the server management course (Karvinen 2024).


## x) Infrastructure as code with salt stack

So far, we have used VirtualBox to manage virtual machines. Managing multiple virtual machines is conveniently done with the `vagrant` package. For it to work, the package also needs the `virtualbox` package. (Karvinen 2021). Once these are installed, create a project folder.

    $ mkdir vagrantProject/
    $ cd vagrantProject/
    $ nano Vagrantfile

And a configuration file for Vagrant according to Karvinen's (2021) instructions.

    # -*- mode: ruby -*-
    # vi: set ft=ruby :
    # Copyright 2019-2021 Tero Karvinen http://TeroKarvinen.com

    $tscript = <<TSCRIPT
    set -o verbose
    apt-get update
    apt-get -y install tree
    echo "Done - set up test environment - https://terokarvinen.com/search/?q=vagrant"
    TSCRIPT

    Vagrant.configure("2") do |config|
        config.vm.synced_folder ".", "/vagrant", disabled: true
        config.vm.synced_folder "shared/", "/home/vagrant/shared", create: true
        config.vm.provision "shell", inline: $tscript
        config.vm.box = "debian/bullseye64"

        config.vm.define "t001" do |t001|
            t001.vm.hostname = "t001"
            t001.vm.network "private_network", ip: "192.168.88.101"
        end

        config.vm.define "t002", primary: true do |t002|
            t002.vm.hostname = "t002"
            t002.vm.network "private_network", ip: "192.168.88.102"
        end
        
    end

The virtual machines can be started and stopped with the following commands.
    
    $ vagrant destroy
    $ vagrant up

After this, the bash of the virtual machine can be opened and closed using the commands `ssh [vmName]` and `exit`. You can also test the connection with the command `ping -c 1 [ip]` (Karvinen 2021). For example

    $ vagrant ssh t001
    vagrant@t001$ ping -c 1 192.168.88.102
    vagrant@t001$ exit

Now that the virtual machines are running, you can enable the master-slave architecture on them and test its functionality by running the following commands (Karvinen 2018, 2021):
    
    $ vagrant ssh t001
    vagrant@t001$ sudo apt-get update
    vagrant@t001$ sudo apt-get -y install salt-master
    vagrant@t001$ exit
    $ vagrant ssh t002
    vagrant@t002$ sudo apt-get update
    vagrant@t002$ sudo apt-get -y install salt-minion
    vagrant@t002$ sudoedit /etc/salt/minion
        master: 192.168.88.101
    vagrant@t002$ sudo systemctl restart salt-minion.service
    vagrant@t002$ exit
    $ vagrant ssh t001
    vagrant@t001$ sudo salt-key -A #Accept the Key
    vagrant@t001$ sudo salt '*' cmd.run 'whoami'

We want Salt to always run predefined states on the minion machines. This is done by creating .sls state files in the yaml programming language on the master machine. Creating and running the state works as follows (Karvinen 2014):
    
    $ mkdir /srv/salt/testState
    $ sudoedit /srv/salt/init.sls
        /tmp/testFile:
            file.managed
    $ sudo salt '*' state.apply testState

Locally, the same would be done on the minion machine and the command would be run (Karvinen 2014):

    $ sudo salt-call --local state.apply testState

SaltStack uses the YAML markup language to define states. In it, data is built as `key: value` pairs. The markup language is case-sensitive. (Saltproject 2024). The biggest peculiarity of YAML, in my opinion, is that spaces and tabs are an essential part of the markup language. They must be used precisely, and tabs are, for example, prohibited (Saltproject 2024). 

YAML data pairs can be divided into three types. We have basic **Scalars** `key: value` pairs, where the values can be numbers, text, or boolean values. **Lists** are the second type and follow the syntax where the list values are always preceded by  '  - ' (Saltproject 2024):
        list: 
          - item
          - item

The third type is **Dictionaries**, which contain other basic **Scalars** values (Saltproject 2024):
        list: 
          list: 
            - item
            - item
          key: value

## a) Installing Vagrant on Windows
10.11.2024 8.00 I downloaded the Vagrant Installer for Windows and installed it. I used the AMD64 installer and the default settings.  
8.07 I checked the Vagrant version with the `vagrant` command.  
![alt text](/siteTexts/blogEntries/2/image.png) 
## b) Creating a Linux virtual machine with Vagrant

8.08 I created a project folder and a file **Vagrantfile**. For the content of the file, I copied the Vagrant configuration presented earlier in the report.  
![alt text](/siteTexts/blogEntries/2/image-1.png)  
8.17 I tried to start the virtual machines first with the wrong command (by directly entering `vagrant ssh t001`) and received the message:  
![alt text](/siteTexts/blogEntries/2/image-2.png)   
The virtual machines configured in Vagrant must always be started with the command `vagrant up`. Since I wanted to try starting one virtual machine first, I wanted to remove these lines from the Vagrantfile:

        config.vm.define "t002", primary: true do |t002|
            t002.vm.hostname = "t002"
            t002.vm.network "private_network", ip: "192.168.88.102"
        end

After this, I started one virtual machine, opened the command prompt, and exited the virtual machine with the commands:

        $ vagrant up
        $ vagrant ssh t001
        $t001 exit

![alt text](/siteTexts/blogEntries/2/image-3.png)  


## c) Connecting Linux virtual machines to the same network

8.21 Now I added the lines back to the Vagrantfile that configure the second virtual machine. First, I destroyed the virtual machine with the old configuration.

        $ vagrant destroy
        $ nano Vagrantfile

8.24 I started both virtual machines t001 and t002 and tested the network connection between them with the commands  

        $ vagrant up
        $ vagrant ssh t001
        $t001 ping 192.168.88.102
        $t001 exit
        $ vagrant ssh t02
        $t002  ping 192.168.88.101

![alt text](/siteTexts/blogEntries/2/image-4.png) ![alt text](/siteTexts/blogEntries/2/image-5.png)

## d) Establishing the Master-Slave Architecture on the Virtual Machines
I also opened a second command prompt so I wouldn't have to repeat the `vagrant ssh` and `exit` commands  
8.32 I learned that `vagrant` commands must be run in the project folder even after creating the virtual machines. I assumed that the virtual machines would also be accessible from elsewhere, as is the case with Docker, for example. I first tried to run the `vagrant ssh` command in a different folder:
![alt text](/siteTexts/blogEntries/2/image-6.png)  

8.34 I started both virtual machines in different terminals:  

        $ vagrant ssh t001
        $ vagrant ssh t002

The first time I started downloading the Saltstack packages, I tried to do it like this: 

         $t001  sudo apt-get update
         $t001  sudo apt-get -y install salt-master
         
However, I encountered the same problem with missing packages that had also been a challenge in the previous h1 task.   
![alt text](/siteTexts/blogEntries/2/image-7.png)  

8.39 When I tried to run commands to install the package and its keys, I noticed that the `curl` packages were missing from the virtual machines. I installed them and other updates on both machines with the commands:

        $t001  sudo apt-get update; sudo apt-get upgrade
        $t001  sudo apt-get install curl
        $t002  sudo apt-get update; sudo apt-get upgrade
        $t002  sudo apt-get install curl
        
I finally installed salt on the master machine as follows:  

        $t001 sudo mkdir -p /etc/apt/keyrings
        $t001 sudo curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProjectKey/public | sudo tee /etc/apt/keyrings/salt-archive-keyring.pgp
        $t001 sudo curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/salt.sources | sudo tee /etc/apt/sources.list.d/salt.sources
        $t001 sudo apt-get update
        $t001 sudo apt-get update
        $t001 sudo apt-get -y install salt-master

8.47 And for the minion machine as follows:

        t002 sudo mkdir -p /etc/apt/keyrings
        t002 sudo curl -fsSL https://packages.broadcom.com/artifactory/api/security/keypair/SaltProjectKey/public | sudo tee /etc/apt/keyrings/salt-archive-keyring.pgp
        t002 sudo curl -fsSL https://github.com/saltstack/salt-install-guide/releases/latest/download/salt.sources | sudo tee /etc/apt/sources.list.d/salt.sources
        t002 sudo apt-get update
        t002 sudo apt-get update
        t002 sudo apt-get -y install salt-minion

Finally, I tested that the installations were successful with the `salt-call --version` command:   
![alt text](/siteTexts/blogEntries/2/image-8.png)  ![alt text](/siteTexts/blogEntries/2/image-9.png)  

8.53 I configured the minion machine to receive commands from the master:

        $t002 sudoedit /etc/salt/minion 
            master: 192.168.88.101
        $t002 sudo systemctl restart salt-minion.service

8.55 I accepted the key on the host, which failed, so I restarted the master. After restarting, the key acceptance worked.  
![alt text](/siteTexts/blogEntries/2/image-10.png)

        $t001 sudo systemctl restart salt-master.service

![alt text](/siteTexts/blogEntries/2/image-11.png)

8.57 I returned to task x) and studied yaml syntax before starting the next task. 


## e) Utilizing Sls Files Locally

9.12 At first, I tried to create the .sls file for the minion with the `mkdir /srv/salt/testState` command, but I realized that the folder needs to be created separately, unlike the /etc/salt/ folder:

![alt text](/siteTexts/blogEntries/2/image-12.png)  

       $t002 sudo mkdir /srv/salt
       $t002 sudo mkdir /srv/salt/testState

9.16 Now it's time to celebrate Father's Day!  

11.11.2024 8.09 The virtual machines were still running on my computer, so I continued directly from where I left off on Sunday. I created a state for the minion machine so that it can be run locally.

        $t002 sudoedit /srv/salt/testState/init.sls  
            /tmp/testFile:
              file.managed
        $t002 sudo salt --local state.apply testState

![alt text](/siteTexts/blogEntries/2/image-13.png)  

8.10 I had chosen the wrong command, which is why the previous attempt failed. I often confuse `Salt-stack`, `salt`, and `salt-call`, and I don't fully understand the content of these three concepts. Apparently, `salt` is the command for salt-master, and `salt-call` is something else? maybe the command for minion? At first, I tried to load the salt command on the minion machine, which didn't really help. The following is the correct solution:

        $t002 sudo apt-get install salt-master
        $t002 sudo salt --local state.apply testState
        $t002 sudo salt-call --local state.apply testState

![alt text](/siteTexts/blogEntries/2/image-14.png)  
![alt text](/siteTexts/blogEntries/2/image-16.png)  

## f) Utilizing Sls Files Over the Network

8.15 Next, I created a state on the master machine so that I could run it over the network to the minion machine. However, I incorrectly used the salt `state.single` command, which resulted in an error:

    $t001 sudo mkdir /srv/salt
    $t001 sudo mkdir /srv/salt/testState
    $t002 sudoedit /srv/salt/testState/init.sls  
        /tmp/testFile:
          file.managed
    $  salt '*' state.single testState  


    [WARNING ] TCP Publish Client encountered an exception while connecting to /var/run/salt/master/master_event_pub.ipc: StreamClosedError('Stream is closed'), will reconnect in 1 seconds -   File "/usr/bin/salt", line 11, in <module>
    sys.exit(salt_main())

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/scripts.py", line 528, in salt_main
        client.run()

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/cli/salt.py", line 192, in run
        for full_ret in cmd_func(**kwargs):

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/client/__init__.py", line 815, in cmd_cli
        self.pub_data = self.run_job(

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/client/__init__.py", line 387, in run_job
        pub_data = self.pub(

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/client/__init__.py", line 1904, in pub
        if listen and not self.event.connect_pub(timeout=timeout):

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/utils/event.py", line 323, in connect_pub
        self.subscriber = salt.utils.asynchronous.SyncWrapper(

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/utils/asynchronous.py", line 76, in __init__
        self.obj = cls(*args, **kwargs)

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/transport/base.py", line 210, in ipc_publish_client
        return publish_client(opts, io_loop, **kwargs)

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/transport/base.py", line 152, in publish_client
        return salt.transport.tcp.PublishClient(

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/transport/tcp.py", line 220, in __init__
        super().__init__(opts, io_loop, **kwargs)

    File "/opt/saltstack/salt/lib/python3.10/site-packages/salt/transport/base.py", line 398, in __init__
        super().__init__()

8.20 Here, `state.apply` was the right choice, and thus I was able to run the state. Since this was the same state that I ran locally on the minion machine, the state did not change anything because state functions are always run idempotently.

        $t001 sudo salt '*' state.apply testState

![alt text](/siteTexts/blogEntries/2/image-17.png)


## g) Expanding the Sls File and Testing Idempotence
8.21 I created a state that creates a user and an index.html page for them. 

    $t001 sudo mkdir /srv/salt/testMany
    $t001 sudoedit /srv/salt/testMany/init.sls

    testUser:
      user.present
    home/user/index.html:
      file.managed

    $t001 sudo salt '*' state.apply testMany

8.29 I had written a relative path, which now had to be changed to an absolute path.
![alt text](/siteTexts/blogEntries/2/image-18.png)  

        $t001 sudoedit /srv/salt/testMany/init.sls
            /home/user/index.html:
        $t001 sudo salt '*' state.apply testMany
![alt text](/siteTexts/blogEntries/2/image-19.png) 

8.32 There was still something wrong with the state, and I checked next whether `user.present` had created the folder for the user.

        $t002 cd /home
        $t002 ls

![alt text](/siteTexts/blogEntries/2/image-21.png)  

Evidently, I had created the user **testUser** and tried to modify the folder **/user**, so I corrected these and ran the state again. While running the state again, I could also demonstrate the idempotence of the state. That is, the user was not created again, as it already existed on the minion. 

        $t001 sudoedit /srv/salt/testMany/init.sls
            /home/testUser/index.html:
        $t001 sudo salt '*' state.apply testMany
        $t002 ls -a -l

![alt text](/siteTexts/blogEntries/2/image-20.png)  

When checking the previous point, I noticed that the file ownership was now with the **root** user, which was not my intention. I first asked ChatGPT for help on what state function would be suitable to fix this situation. Following its guidance, I started to explore the file.managed state function in more detail based on the documentation (Saltproject 2024b). I modified the state configuration based on the instructions:

        $t001:~$ sudoedit /srv/salt/testMany/init.sls
        $t001:~$ sudo salt '*' state.apply testMany
            file.managed:
              - user: testUser

8.40 I checked that the ownership was transferred to the user:

        $t002 ls -a -l

![alt text](/siteTexts/blogEntries/2/image-22.png)  


## h) Utilizing Multiple States

8.45 I created another state testPing and ran it on the minion machine.

    $t001 sudo mkdir /srv/salt/testPing
    $t001 sudoedit /srv/salt/testPing/init.sls
        'whoami':
          cmd.run
        'hostname -I':
          cmd.run
    $t001 sudo salt '*' state.apply

![alt text](/siteTexts/blogEntries/2/image-23.png)  
9.46 I then changed the file name to top.sls and its content as follows:

        base:
          '*':
            - testState/init
            - testPing/init

And ran the states: $t001 sudo salt '*' state.apply

![alt text](/siteTexts/blogEntries/2/image-24.png)  
Finally, I suspended the virtual machines.

    $t001 exit
    $t002 exit
    $ vagrant suspend

## h) Installing and Configuring Apache
This in week 47 when the lesson has been

## Miscellaneous

After installing the master, this needs to be done:
$t001 sudo systemctl restart salt-master.service

## References
Karvinen, Tero 2006. Writing a Report – Salt Stack Master and Slave on Ubuntu Linux. Source: [https://terokarvinen.com/2006/06/04/raportin-kirjoittaminen-4/](https://terokarvinen.com/2006/06/04/raportin-kirjoittaminen-4/) (Read 28.10.2024)  
Karvinen, Tero 2024. Server Management - Configuration Management Systems course - 2024 autumn. Source: [https://terokarvinen.com/palvelinten-hallinta/](https://terokarvinen.com/palvelinten-hallinta/) (Read 2024.11.06)   
Karvinen, Tero 2021. Two Machine Virtual Network With Debian 11 Bullseye and Vagrant [https://terokarvinen.com/2021/two-machine-virtual-network-with-debian-11-bullseye-and-vagrant/](https://terokarvinen.com/2021/two-machine-virtual-network-with-debian-11-bullseye-and-vagrant/)(Read 07.11.2024)  
Karvinen, Tero 2018. TSalt Quickstart – Salt Stack Master and Slave on Ubuntu Linux [https://terokarvinen.com/2021/two-machine-virtual-network-with-debian-11-bullseye-and-vagrant/](https://terokarvinen.com/2021/two-machine-virtual-network-with-debian-11-bullseye-and-vagrant/) (Read 07.11.2024)  
Karvinen, Tero 2014. Hello Salt Infra-as-Code [https://terokarvinen.com/2024/hello-salt-infra-as-code/](https://terokarvinen.com/2024/hello-salt-infra-as-code/) (Read 07.11.2024)  
Karvinen, Tero 2023. Salt Vagrant - automatically provision one master and two slaves [https://terokarvinen.com/2023/salt-vagrant/#infra-as-code---your-wishes-as-a-text-file](https://terokarvinen.com/2023/salt-vagrant/#infra-as-code---your-wishes-as-a-text-file) (Read 07.11.2024)  
Saltproject 2024. Salt overview [https://docs.saltproject.io/salt/user-guide/en/latest/topics/overview.html#rules-of-yaml](https://docs.saltproject.io/salt/user-guide/en/latest/topics/overview.html#rules-of-yaml) (Read 07.11.2024)  
Saltproject 2024b. Salt.states.file
[https://docs.saltproject.io/en/latest/ref/states/all/salt.states.file.html](https://docs.saltproject.io/en/latest/ref/states/all/salt.states.file.html) (Read 11.11.2024)  



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

Based on the task of the Server Management course: https://terokarvinen.com/palvelinten-hallinta/