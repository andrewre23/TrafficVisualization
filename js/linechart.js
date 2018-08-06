function line_plot() {

    if (timeinterval == "Hour") {
        if (xLabel === "Day_of_Week")
            linefile = "../data/linefiles/dayline.csv";
        else if (xLabel === "Road_Type")
            linefile = "../data/linefiles/roadtypeline.csv";
        else if (xLabel === "Speed_limit")
            linefile = "../data/linefiles/speedline.csv";
        else if (xLabel === "Light_Conditions")
            linefile = "../data/linefiles/lightline.csv";
        else if (xLabel === "Weather_Conditions")
            linefile = "../data/linefiles/weatherline.csv";
        else if (xLabel === "Road_Surface_Conditions")
            linefile = "../data/linefiles/roadsurfaceline.csv";
        console.log('Linefile: ' + linefile);
    }
    else if (timeinterval == "Month"){
        if (xLabel === "Day_of_Week")
            linefile = "../data/linefiles/monthly/daylinehour.csv";
        else if (xLabel === "Road_Type")
            linefile = "../data/linefiles/monthly/roadtypelinehour.csv";
        else if (xLabel === "Speed_limit")
            linefile = "../data/linefiles/monthly/speedlinehour.csv";
        else if (xLabel === "Light_Conditions")
            linefile = "../data/linefiles/monthly/lightlinehour.csv";
        else if (xLabel === "Weather_Conditions")
            linefile = "../data/linefiles/monthly/weatherlinehour.csv";
        else if (xLabel === "Road_Surface_Conditions")
            linefile = "../data/linefiles/monthly/roadsurfacelinehour.csv";
        console.log('Linefile: ' + linefile);
    }

    var margin = {top: 20, right: 25, bottom: 50, left: 60},
        width = 760 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;

    // Parse the date / time
    var parseTime = d3.timeParse("%H");

    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d[timeinterval]);
        })
        .y(function (d) {
            return y(d[barselection]);
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#linegraphdiv").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    d3.csv(linefile, function (error, data) {
        data.forEach(function (d) {
            //d.Hour = parseTime(d.Hour);
            d[timeinterval] = +d[timeinterval];
            d[barselection] = +d[barselection];
        });
        console.log('Next is the test');
        console.log(data[barselection]);

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d[timeinterval];
        }));
        y.domain([0, d3.max(data, function (d) {
            return d[barselection];
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr('fill', 'none')
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr('fill-opacity', '0.3')
            .attr("d", valueline);

        // Add the X Axis
        if (timeinterval == "Hour") {
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickValues(d3.range(0, 24, 1)));
        }
        else if (timeinterval == "Month"){
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickValues(d3.range(1, 13, 1)));
        }

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-weight","bold")
            .style("font-size","14pt")
            .text("Accident Count");

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width/2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .style("font-weight","bold")
            .style("font-size","14pt")
            .text("Hour of Day");

        var bubble = svg.selectAll('.linebubble')
            .data(data)
            .enter().append('circle')
            .attr("class", "linebubble")
            .attr('id', function(d){
                return 'linebubble_' + d[timeinterval];
            })
            .attr("cx", function(d) { return x(d[timeinterval]); })
            .attr("cy", function(d) { return y(d[barselection]); })
            // .attr('r', function(d){ return radius(d.PetalLength); })
            .attr('r', 5)
            .style('fill', "steelblue")
            .on("mouseover", function(d){
                svg.selectAll(".linebubble").style("opacity", 0);
                d3.select(this)
                    //.style("stroke","black").style("stroke-width","2px")
                    .style("opacity", 1);
            })
            .on("mouseleave", function(d){
                svg.selectAll(".linebubble").style("opacity", 1);
                //d3.select(this).style("stroke","black").style("stroke-width","0px");
            })
            .on("click", function (d) {
                if (lineselection == d[timeinterval]) {
                    unselect_line(d[timeinterval]);
                }
                else {
                    select_line(d[timeinterval]);
                    d3.event.stopPropagation();
                }
            });

        if(lineselection != "total")
            svg.select("#linebubble_" + lineselection).style("fill", "#315b7d").style("opacity", 1)
                .style("stroke","black").style("stroke-width","2px");

    });

    select_line = function (d) {
        lineselection = d;
        console.log(lineselection);
        svg.selectAll(".linebubble").style("fill", "steelblue").style("stroke","black").style("stroke-width","0px");
        svg.select("#linebubble_" + d).style("fill", "#315b7d").style("stroke","black").style("stroke-width","2px");
        if(timeinterval == "Hour") {
            if (lineselection < 10)
                bartimeperiod = "H0" + d;
            else if (lineselection >= 10)
                bartimeperiod = "H" + d;
            console.log(bartimeperiod);
        }
        else if(timeinterval == "Month"){
            if (lineselection < 10)
                bartimeperiod = "M0" + d;
            else if (lineselection >= 10)
                bartimeperiod = "M" + d;
            console.log(bartimeperiod);
        }
        d3.select('#bar_totalaccidents').selectAll("*").remove();
        d3.select('#bar_avgcasualties').selectAll("*").remove();
        bar_total();
        bar_avg();
    };
    unselect_line = function (d) {
        lineselection = "total";
        //d3.select('#linegraphdiv').selectAll("*").remove();
        //line_plot();
        bartimeperiod = "total";
        d3.select('#bar_totalaccidents').selectAll("*").remove();
        d3.select('#bar_avgcasualties').selectAll("*").remove();
        bar_total();
        bar_avg();
        svg.select("#linebubble_" + d).style("fill", "steelblue").style("stroke","black").style("stroke-width","0px");
    };
}

function updateline(elem) {
    console.log('Elem: ' + elem);
    timeinterval = elem;
    lineselection = "total";
    bartimeperiod = "total";
    d3.select('#linegraphdiv').selectAll("*").remove();
    line_plot();
    d3.select('#bar_totalaccidents').selectAll("*").remove();
    d3.select('#bar_avgcasualties').selectAll("*").remove();
    bar_total();
    bar_avg();
}

function line_init() {
    line_plot();
};