export default function Test() {
  return (
    <div>
      <script
        type="text/javascript"
        src="<%= public_kansio %>/apiTodistusvalintaLaskuri.js?v=3.5.0"
        defer
      ></script>
      <link
        rel="stylesheet"
        href="<%= public_kansio %>/apiLaskuri.css?v=3.5.0"
      />
      <script
        type="text/javascript"
        src="<%= public_kansio %>/api/asiakkaat/studentum/scripts.js?v=1.0.0"
        defer
      ></script>
      <div id="todistusvalinta-widget" data-asiakas="studentum"></div>
    </div>
  );
}
