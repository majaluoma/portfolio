# Testing daemons on salt stack infrastructure

The report was written on 18-20.11.2024.

## x) Managing Daemons

A daemon (service process) is a background process in a computer's operating system that the user does not have direct interactive access to. It is a key part of modern computers, which can run many programs in parallel. (Wikipedia 2024).

When a new daemon is installed on minion machines, management always proceeds in the following order:

1. Download the package to the target machine
2. Transfer the service process configuration file to the target machine
3. Restart the process with the new settings on the target machine

For example, we can install a working SSH server on the target machine as follows. This guide follows Karvinen's (2018) instructions on the same topic.

We create a master configuration file, which will be copied to the target machine:

        $master sudoedit /srv/salt/ssh/sshd_config

We create a state on the master machine that installs the sshd package, uses the configuration file, and restarts the daemon. We use the `watch` parameter so that the daemon only restarts when the file is changed. This achieves idempotency in the state function:

        $master mkdir -p /srv/salt/ssh
        $master sudoedit /srv/salt/ssh/init.sls

        #init.sls
        #CONTENTS MAY BE REPLACED AUTOMATICALLY
        openssh-server:
          pkg.installed
        /etc/ssh/sshd_config:
          file.managed:
            - source: salt://sshd_config
        sshd:
          service.running:
            watch:
              - file: /etc/ssh/sshd_config

And we add it to the top.sls file

        $master sudoedit /srv/salt/top.sls
            base:
            '*':
                - ssh

Now we can run the state on the minion machine, if it is connected to the master machine, with the command:

        $master sudo salt '*' state.apply

## Some common state functions and their uses

The pkg.installed state function can take parameters. The string `version` specifies the version, the string `fromrepo` specifies the repository for the program to be downloaded. You can install multiple packages at once with the list `pkgs` parameter.

If you want to remove a package from the machine, you can do so with the command ``pkg.purged`` and it can also take the list `pkgs` as a parameter. Unlike pkg.removed, it also removes configuration files.

`File.managed` has a `source` that specifies the file to be copied. [EDIT: the root folder for salt:// is /srv/salt] Examples:

        # copy from minion machine
        source: /home/user/index-html
        # copy from master machine
        source: salt://ssh/sshd_config
        # copy from the internet, requires also a hash parameter
        source: https://domain.org
        # alternatively, you can specify the content with the contents parameter.
        contents: |
          - Line 1
          - Line 2

``user`` and `group` parameters specify the owner of the file and the `mode` parameter specifies the file permissions in Linux. These parameters can also be used with symlinks.

``file.absent`` always removes all files and directories, but if you only want to remove the contents of a specific directory, you can give the parameter `clean=True`.

``file.symlink`` creates a symbolic link at the location and requires the `target` parameter.

Processes can be stopped with the command `service.dead` and started with `service.running`, both can take the boolean parameter `enable`, which determines whether the program starts at system boot. Daemons can also be set to start at boot with the separate state function `service.enabled`.

Before doing the tasks, I also read the tips from the assignment (Karvinen 2024a). There was a good tip for the testing process, which I wanted to use in the report:
1. Test
2. Initial state (magician's sleeves empty)
3. Done manually and works
4. Manually done removed before automation
5. One state function (e.g. file) in the sls file
6. Final state, parts
7. Final test - what the user would do

For testing, you can use netcat to check for the existence of daemons ``nc -vz 192.168.1.1 8080``, the ssh client specifically to check sshd configuration `ssh -p 22 minion@192.168.1.1` and curl for example to check the apache webserver `curl 192.168.1.1`.



## a) Install Apache on the Machine
Now let's install Apache on the machine, first locally, then as infrastructure code.

Installing the apache package on the minion  

    $minion sudo apt update
    $minion sudo apt install apache2
    $minion sudo systemctl enable apache

I had used the wrong name for the daemon when starting it: Failed to enable unit: Unit file apache.service does not exist. I used the correct name and then the connection worked from the master:

    $minion sudo systemctl enable apache2
    $master nc 192.168.56.89 80
![alt text](/siteTexts/blogEntries/3/image-7.png)  

Next, let's find the apache configuration file. I went and looked in the `var` directory. There I found `www/html` and the correct `index.html` file. I modified the file and tested whether the change was visible on the master:  

        $minion echo "hello world" | sudo tee index.html  

![alt text](/siteTexts/blogEntries/3/image-10.png)

Next, I removed the local minion configuration (Help for the command can be found from `apt --help`)  

        sudo apt remove --purge apache2 
        sudo rm -r www

![alt text](/siteTexts/blogEntries/3/image-11.png)

Let's create the state function on the master machine:

                $master sudo mkdir -p /srv/salt/apache
                $mastersudoedit /srv/salt/apache/init.sls

   
init.sls:

                apache2:
                  pkg.installed
                /var/www/html/index.html:
                  file.managed:
                    - source: salt://srv/salt/apache/index.html
                apache2.service:
                  service.running  

Test:

                $master sudoedit /srv/salt/apache/index.html
                        hello world
                $master sudo salt '*' state.apply apache
                
I got an error message that the file was not found. The file was however in the path `/srv/salt/apache/index.html`

Finally, ChatGPT was able to guide me in the right direction, telling me that in salt's configs, the path from which files are fetched is defined. So the paths are not absolute. With this guidance, I got the state working:

                $master sudoedit /srv/salt/apache/index.html
                        - source: salt://apache/index.html
                $master sudo salt '*' state.apply apache
![alt text](/siteTexts/blogEntries/3/image-21.png)

## b) Install SSH on the Machine
    $master sudo mkdir -p /srv/salt/sshd
    $master sudoedit  /srv/salt/sshd/init.sls
            /etc/ssh/sshd_config:
              file.managed:
                - source: salt://sshd/sshd_config
            sshd:
              service.running:
                - watch:
                  - file: /etc/ssh/sshd_config

![alt text](/siteTexts/blogEntries/3/image-24.png)

21.15 From the log above, it was seen that the port was not open. I had forgotten to add the port 8022 to the configuration file. I added the port to the master file `/serv/salt/sshd/sshd_config`, which helped

![alt text](/siteTexts/blogEntries/3/image-25.png)  

## Sources
Karvinen, Tero 2024a. Palvelinten Hallinta - Configuration Management Systems course - 2024 autumn. Source: https://terokarvinen.com/palvelinten-hallinta/ (Read 2024.11.06)  
Karvinen, Tero 2006. Raportin kirjoittaminen – Salt Stack Master and Slave on Ubuntu Linux. Source: https://terokarvinen.com/2006/06/04/raportin-kirjoittaminen-4/ (Read 28.10.2024)  
Karvinen, Tero 2018. Pkg-File-Service – Control Daemons with Salt – Change SSH Server Port. Source: https://terokarvinen.com/2018/04/03/pkg-file-service-control-daemons-with-salt-change-ssh-server-port/?fromSearch=karvinen%20salt%20ssh (Read: 15.11.2024)
Wikipedia 2024. Daemon (Computing). Source: https://en.wikipedia.org/wiki/Daemon_(computing) (Read 15.11.2024)
Salt Project 2024. salt.states.file - Operations on regular files, special files, directories, and symlinks. Source: https://docs.saltproject.io/en/latest/ref/states/all/salt.states.file.html (Read 15.11.2024)  
Salt Project 2024b. salt.states.pkg. Source: https://docs.saltproject.io/en/latest/ref/states/all/salt.states.pkg.html (Read 21.11.2024)  
Salt Project 2024c. salt.states.pkgrepo. Source: https://docs.saltproject.io/en/latest/ref/states/all/salt.states.pkgrepo.html (Read 21.11.2024)  
Ray 2024. Grep for beginning and end of line?. Source: https://stackoverflow.com/questions/4800214/grep-for-beginning-and-end-of-line (Read: 19.11.2024)
Hashicorp 2024. Basic Usage of Provisioners. Source: https://developer.hashicorp.com/vagrant/docs/provisioning/basic_usage (Read: 20.11.2024)  
Acdcjunior 2024. Generating a SHA-256 hash from the Linux command line. (https://stackoverflow.com/questions/3358420/generating-a-sha-256-hash-from-the-linux-command-line) (Read 20.11.2024)  
Chucknemeth 2024. mkpasswd. Source: (https://wiki.chucknemeth.com/linux/security/password/mkpasswd) (Read: 20.11.2024)  
Openttd 2024: https://wiki.openttd.org/en/Manual/Dedicated%20server (Read 21.11.2024)  

## Technical specifications of the devices used

Asus ROG Strix GT15

-   Processor: Intel® Core™ i5-10400F 6-core processor, 2.9-4.3 GHz, 12 MB cache
-   Chipset: Intel® B460
-   Memory: 16 GB DDR4 2933 MHz
-   Storage: 512 GB M.2 NVMe PCIe 3.0 SSD
-   Graphics: NVIDIA® GeForce® GTX 1660 6GB (1x HDMI, 1x DP, 1 x DVI)
-   Audio: SupremeFX S1220A Codec
-   Network: Gigabit Ethernet, Intel WiFi 6 (802.11ax), Bluetooth 5.0
-   Operating system: Linux Noble

This document may be copied and modified according to the GNU General Public License (version 2 or later). http://www.gnu.org/licenses/gpl.html

Based on the Server Management course assignment: https://terokarvinen.com/palvelinten-hallinta/