import Plotly from "plotly.js/lib/core";
import choroplethmapbox from "plotly.js/lib/choroplethmapbox";
import scatter from "plotly.js/lib/scatter";

Plotly.register([scatter, choroplethmapbox]);

export default Plotly;
