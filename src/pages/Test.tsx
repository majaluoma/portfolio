import { useEffect } from "react";

export default function Test() {
    useEffect(() => {
        // Load styles
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://api.todistusvalinta.fi/apiLaskuri.css?v=3.5.0";
        document.head.appendChild(link);
    
        // First script
        const script1 = document.createElement("script");
        script1.src = "https://api.todistusvalinta.fi/apiTodistusvalintaLaskuri.js?v=3.5.0";
        script1.defer = true;
        document.body.appendChild(script1);
    
        // Second script
        const script2 = document.createElement("script");
        script2.src = "https://api.todistusvalinta.fi/api/asiakkaat/studentum/scripts.js?v=1.0.0";
        script2.defer = true;
        document.body.appendChild(script2);
    
        return () => {
          document.head.removeChild(link);
          document.body.removeChild(script1);
          document.body.removeChild(script2);
        };
      }, []);
    
      return <div id="todistusvalinta-widget" data-asiakas="studentum" />;
}
