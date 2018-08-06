function mapdraw() {
/*
    var width = 658,
        height = 817;

    var svg = d3.select("#mapdiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("image")
        .attr("xlink:href", "test.jpg");



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


    var hour1json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            // URL to local file. To be parameterized for generalization
            'url': "./April.json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })();

    var accidents = svg.append("g");
    accidents.selectAll("path")
        .data(hour1json.features)
        .enter()
        .append("path")
        .attr("fill", "#900")
        .attr("stroke", "#999")
        .attr("d", geoPath);
*/

//Plot map
    var width = 592,
        height = 735;

    var svg = d3.select("#mapdiv")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("image")
        .attr("xlink:href", "../data/mapfiles/ukbackground.png");

    var uk = svg.append("g");

    var albersProjection = d3.geoAlbers()
        .scale(4050)
        .rotate([0, 0])
        .center([-3, 55.3])
        .translate([width / 2, height / 2]);

    var geoPath = d3.geoPath()
        .projection(albersProjection);
    if(timeinterval == "Hour")
        jqueryfile ="../data/mapfiles/hourly/hour" + lineselection + ".json";
    else if (timeinterval == "Month")
        jqueryfile ="../data/mapfiles/monthly/monthly" + lineselection + ".json";

    if(lineselection != "total") {
        //Use JQuery to read local JSON file
        var hour1json = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                // URL to local file. To be parameterized for generalization
                'url': jqueryfile,
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })();

        console.log('test');
        console.log(hour1json);

        var accidents = svg.append("g");
        accidents.selectAll("path")
            .data(hour1json.features)
            .enter()
            .append("path")
            .attr("fill", "#900")
            .attr("stroke", "#999")
            .attr("d", geoPath);
    }

}