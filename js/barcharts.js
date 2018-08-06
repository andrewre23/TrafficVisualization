function bar_total() {

    if (xLabel === "Day_of_Week")
        countfile = "../data/barfiles/daycount.csv";
    else if (xLabel === "Road_Type")
        countfile = "../data/barfiles/roadtypecount.csv";
    else if (xLabel === "Speed_limit")
        countfile = "../data/barfiles/speedcount.csv";
    else if (xLabel === "Light_Conditions")
        countfile = "../data/barfiles/lightcount.csv";
    else if (xLabel === "Weather_Conditions")
        countfile = "../data/barfiles/weathercount.csv";
    else if (xLabel === "Road_Surface_Conditions")
        countfile = "../data/barfiles/roadsurfacecount.csv";
    console.log('Bar Total file: ' + countfile);

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 45, bottom: 70, left: 50},
        width = 640 - margin.left - margin.right,
        height = 415 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#bar_totalaccidents").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// get the data
    d3.csv(countfile, function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d[bartimeperiod] = +d[bartimeperiod];
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d[xLabel];
        }));
        y.domain([0, d3.max(data, function (d) {
            return d[bartimeperiod];
        })]);


        var bars = svg.selectAll(".bar1")
            .data(data)
            .enter().append("g")

            .attr("class", function (d) {
                return "bar1 " + "bar1_" + d[xLabel];
            })

            .attr("id", function (d) {
                return "bar1_" + d[xLabel];
            })
            .attr("transform", function (d) {
                return "translate(" + x(d[xLabel]) + ", " + y(d[bartimeperiod]) + ")";
            });


        bars.append("rect")
            .attr("width", 0.9 * x.bandwidth())
            .attr("x", 0.05 * x.bandwidth())
            .attr("height", function (d) {
                return height - y(d[bartimeperiod]);
            })
            .on("mouseover", function (d) {

                highlight_bar1(d[xLabel]);
                highlight_bar(d[xLabel]);
            })
            .on("mouseleave", function (d) {
                unhighlight_bar1(d[xLabel]);
                unhighlight_bar(d[xLabel]);
            })
            .on("click", function (d) {
                if (barselection == d[xLabel]) {
                    unselect_bar1(d[xLabel]);
                    unselect_bar(d[xLabel]);
                }
                else {
                    select_bar1(d[xLabel]);
                    select_bar(d[xLabel]);
                    d3.event.stopPropagation();
                }
            });

        bars.append("text")
            .style("text-anchor", "middle")
            .attr("id", function (d) {
                return "bar1_text_" + d[xLabel];
            })

            .attr("class", function (d) {
                return "bar1_text_" + d[xLabel];
            })

            .attr("dx", function (d) {
                return x.bandwidth() / 2
            })
            .attr("dy", "-0.25em")
            .text(function (d) {
                return d[bartimeperiod];
            })
            .style("stroke", "black")
            .style("font-family", "Calibri")
            .style("opacity", 1)
            .style("visibility", "hidden");

        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        if(barselection != "Total")
            svg.select(".bar1_" + barselection).style("fill", "#315b7d").style("opacity", 1);

    });

    highlight_bar1 = function (d) {
        svg.selectAll(".bar1").style("opacity", 0.5);
        svg.select(".bar1_" + d).style("opacity", 1);
        svg.select(".bar1_text_" + d).style("visibility", "visible");
    };
    unhighlight_bar1 = function (d) {
        svg.selectAll(".bar1").style("opacity", 1);
        //svg.select("#bar1_" + d).style("fill", "steelblue");
        svg.select("#bar1_text_" + d).style("visibility", "hidden");
    };
    select_bar1 = function (d) {
        barselection = d;
        console.log('Selecting: ' + barselection);
        svg.selectAll(".bar1").style("fill", "steelblue");
        svg.select(".bar1_" + d).style("fill", "#315b7d").style("opacity", 1);
    };
    unselect_bar1 = function (d) {
        barselection = "Total";
        svg.select("#bar1_" + d).style("fill", "steelblue");
    };
}

function updatebartotal(elem) {
    console.log('Elem: ' + elem);
    xLabel = elem;
    d3.select('#bar_totalaccidents').selectAll("*").remove();
    d3.select('#bar_avgcasualties').selectAll("*").remove();
    bar_total();
    bar_avg();
}

function bar_avg() {

    if (xLabel === "Day_of_Week")
        avgfile = "../data/barfiles/daypercent.csv";
    else if (xLabel === "Road_Type")
        avgfile = "../data/barfiles/roadtypepercent.csv";
    else if (xLabel === "Speed_limit")
        avgfile = "../data/barfiles/speedpercent.csv";
    else if (xLabel === "Light_Conditions")
        avgfile = "../data/barfiles/lightpercent.csv";
    else if (xLabel === "Weather_Conditions")
        avgfile = "../data/barfiles/weatherpercent.csv";
    else if (xLabel === "Road_Surface_Conditions")
        avgfile = "../data/barfiles/roadsurfacepercent.csv";
    console.log('Average file: ' + avgfile);

// set the dimensions and margins of the graph
    var margin = {top: 20, right: 45, bottom: 70, left: 45},
        width = 640 - margin.left - margin.right,
        height = 415 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);


// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#bar_avgcasualties").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// get the data
    d3.csv(avgfile, function (error, data) {
        if (error) throw error;

        // format the data
        data.forEach(function (d) {
            d[bartimeperiod] = +d[bartimeperiod];
        });

        // Scale the range of the data in the domains
        x.domain(data.map(function (d) {
            return d[xLabel];
        }));
        y.domain([0, d3.max(data, function (d) {
            return d[bartimeperiod];
        })]);


        var bars = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")

            .attr("class", function (d) {
                return "bar " + "bar_" + d[xLabel];
            })

            .attr("id", function (d) {
                return "bar_" + d[xLabel];
            })
            .attr("transform", function (d) {
                return "translate(" + x(d[xLabel]) + ", " + y(d[bartimeperiod]) + ")";
            });


        bars.append("rect")
            .attr("width", 0.9 * x.bandwidth())
            .attr("x", 0.05 * x.bandwidth())
            .attr("height", function (d) {
                return height - y(d[bartimeperiod]);
            })
            .on("mouseover", function (d) {

                highlight_bar(d[xLabel]);
                highlight_bar1(d[xLabel]);
            })
            .on("mouseleave", function (d) {
                unhighlight_bar(d[xLabel]);
                unhighlight_bar1(d[xLabel]);
            })
            .on("click", function (d) {
                if (barselection === d[xLabel]) {
                    unselect_bar1(d[xLabel]);
                    unselect_bar(d[xLabel]);
                }
                else {
                    select_bar1(d[xLabel]);
                    select_bar(d[xLabel]);
                    d3.event.stopPropagation();
                }
            });

        bars.append("text")
            .style("text-anchor", "middle")
            .attr("id", function (d) {
                return "bar_text_" + d[xLabel];
            })

            .attr("class", function (d) {
                return "bar_text_" + d[xLabel];
            })

            .attr("dx", function (d) {
                return x.bandwidth() / 2
            })
            .attr("dy", "-0.25em")
            //.attr("transform", "rotate(-90)")
            .text(function (d) {
                return d[bartimeperiod] + "%";
            })
            .style("stroke", "black")
            .style("font-family", "Calibri")
            .style("opacity", 1)
            .style("visibility", "hidden");


        // add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        if(barselection != "Total")
            svg.select(".bar_" + barselection).style("fill", "#315b7d").style("opacity", 1);

    });

    highlight_bar = function (d) {
        svg.selectAll(".bar").style("opacity", 0.5);
        svg.select(".bar_" + d).style("opacity", 1);
        svg.select(".bar_text_" + d).style("visibility", "visible");
    };
    unhighlight_bar = function (d) {
        svg.selectAll(".bar").style("opacity", 1);
        //svg.select(".bar_" + d).style("fill", "steelblue");
        svg.select(".bar_text_" + d).style("visibility", "hidden");
    };
    select_bar = function (d) {
        barselection = d;
        console.log('Selecting: ' + barselection);
        d3.select('#linegraphdiv').selectAll("*").remove();
        line_plot();
        svg.selectAll(".bar").style("fill", "steelblue");
        svg.select(".bar_" + d).style("fill", "#315b7d").style("opacity", 1);
    };
    unselect_bar = function (d) {
        barselection = "Total";
        d3.select('#linegraphdiv').selectAll("*").remove();
        line_plot();
        svg.select("#bar_" + d).style("fill", "steelblue");
    };
}

function bar_init() {
    xLabel = "Day_of_Week";
    bartimeperiod = "total";
    lineselection = "total";
    barselection = "Total";
    timeinterval = "Hour";
    bar_total();
    bar_avg();
    mapdraw();
}

