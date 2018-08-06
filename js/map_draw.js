function mapdraw() {

    var width = 658,
        height = 817;

    var svg = d3.select("#mapdiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g");

    var albersProjection = d3.geoAlbers()
        .scale(4500)
        .rotate([0, 0])
        .center([-3, 55.3])
        .translate([width / 2, height / 2]);

    var geoPath = d3.geoPath()
        .projection(albersProjection);

    g.selectAll("path")
        .data(uk_json.features)
        .enter()
        .append("path")
        .attr("fill", "#ccc")
        .attr("d", geoPath);

}