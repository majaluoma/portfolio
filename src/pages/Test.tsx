import { useEffect } from 'react';

export default function Test() {
  useEffect(() => {
    // Load styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.todistusvalinta.fi/public/apiLaskuri.css?v=3.5.0';
    document.head.appendChild(link);

    // First script
    const script1 = document.createElement('script');
    script1.src =
      'https://api.todistusvalinta.fi/public/apiTodistusvalintaLaskuri.js?v=3.5.0';
    script1.defer = true;
    document.body.appendChild(script1);

    // Second script
    const script2 = document.createElement('script');
    script2.src =
      'https://api.todistusvalinta.fi/public/api/asiakkaat/studentum/scripts.js?v=1.0.0';
    script2.defer = true;
    document.body.appendChild(script2);

    // Add script2 only after script1 has loaded
    script1.onload = () => {
      document.body.appendChild(script2);
    };

    document.body.appendChild(script1);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script1);
      if (document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
    };
  }, []);

  return <div id="todistusvalinta-widget" data-asiakas="studentum" />;
}
