/*
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '../news_data.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}

function plotpoints{
    var accidents = svg.append( "g" );

    accidents.selectAll( "path" )
    .data( rodents_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#900" )
    .attr( "stroke", "#999" )
    .attr( "d", geoPath );

}*/
