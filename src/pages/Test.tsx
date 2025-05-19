export default function Test() {
  return (
    <div>
      <script
        type="text/javascript"
        src="https://api.todistusvalinta.fi/apiTodistusvalintaLaskuri.js?v=3.5.0"
        defer
      ></script>
      <link
        rel="stylesheet"
        href="https://api.todistusvalinta.fi/apiLaskuri.css?v=3.5.0"
      />
      <script
        type="text/javascript"
        src="https://api.todistusvalinta.fi/api/asiakkaat/studentum/scripts.js?v=1.0.0"
        defer
      ></script>
      <div id="todistusvalinta-widget" data-asiakas="studentum"></div>
    </div>
  );
}
