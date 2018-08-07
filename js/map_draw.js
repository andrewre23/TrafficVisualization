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


    var jsondata = (function () {
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
        .data(jsondata.features)
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
    if(timeinterval === "Hour")
        jqueryfile ="../data/mapfiles/hourly/hour" + lineselection + ".json";
    else if (timeinterval === "Month")
        jqueryfile ="../data/mapfiles/monthly/monthly" + lineselection + ".json";

    if(lineselection !== "total") {
        //Use JQuery to read local JSON file
        var jsondata = (function () {
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
        console.log(jsondata);

        var accidents = svg.append("g");
        accidents.selectAll("path")
            .data(jsondata.features)
            .enter()
            .append("path")
            .attr("fill", "#900")
            .attr("stroke", "#999")
            .attr("d", geoPath)
            .attr('class','accident_base')
            .attr('fill',function(d){
                if (xLabel === "Day_of_Week")
                    return color(d.properties.weekday);
                else if (xLabel === "Road_Type")
                    return color(d.properties.roadtype);
                else if (xLabel === "Speed_limit")
                    return color(d.properties.speed);
                else if (xLabel === "Light_Conditions")
                    return color(d.properties.light);
                else if (xLabel === "Weather_Conditions")
                    return color(d.properties.weather);
                else if (xLabel === "Road_Surface_Conditions")
                    return color(d.properties.surface);
            })
            .on("mouseover", function(d){
                d3.select("#vehiclevalue").text(d.properties.vehicles + ' vehicles');
                d3.select("#speedvalue").text(d.properties.speed + ' KPH');
                d3.select("#casualtiesvalue").text(d.properties.casualties + ' casualties   ');
                d3.select("#weekdayvalue").text(d.properties.weekday);
                d3.select("#weathervalue").text(d.properties.weather);
                d3.select("#lightvalue").text(d.properties.light);
                d3.select("#surfacevalue").text(d.properties.surface);
                d3.select("#roadtypevalue").text(d.properties.roadtype);
                d3.select("#latval").text('Latitude: ' + d.geometry.coordinates[0].toFixed(4) + '°');
                d3.select("#longval").text('Longitude: ' + d.geometry.coordinates[1].toFixed(4) + '°');
                d3.select(this).attr("class","accident_over");
            })
            .on("mouseout", function(d){
                d3.select("#vehiclevalue").text("");
                d3.select("#speedvalue").text("");
                d3.select("#casualtiesvalue").text("");
                d3.select("#weekdayvalue").text("");
                d3.select("#weathervalue").text("");
                d3.select("#lightvalue").text("");
                d3.select("#surfacevalue").text("");
                d3.select("#roadtypevalue").text("");
                d3.select(this).attr("class","accident_base");
            });
    }

}