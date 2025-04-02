## Production deployment

 sudo apt install apache2

 curl localhost

 sudo cp /etc/apache2/sites-available/000-default.conf /etc/apache2/sites-available/001-portfolio.conf

 sudoedit 001-portfolio.conf

 ```sh
 <VirtualHost *:443 >

ServerName majaluoma.fi

DocumentRoot /var/www/portfolio/build

ErrorLog ${APACHE_LOG_DIR}/error.log

CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>
```


```sh
sudo a2ensite 001-apachetest.conf
```