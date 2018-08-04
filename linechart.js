/*function parseData(data) {
    var arr = [];
    for (var i in data.bpi) {
        arr.push(
            {
                date: new Date(i), //date
                value: +data.bpi[i] //convert string to number
            });
    }
    return arr;
}*/


function line_plot() {
    if (xLabel === "Day_of_Week")
        linefile = "dayline.csv";
    else if (xLabel === "Road_Type")
        linefile = "roadtypeline.csv";
    else if (xLabel === "Speed_limit")
        linefile = "speedline.csv";
    else if (xLabel === "Light_Conditions")
        linefile = "lightline.csv";
    else if (xLabel === "Weather_Conditions")
        linefile = "weatherline.csv";
    else if (xLabel === "Road_Surface_Conditions")
        linefile = "roadsurfaceline.csv";
    console.log(linefile);

    var svgWidth = 600, svgHeight = 300;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    var svg = d3.select('#linegraphdiv').append(svg)
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Parse the date / time
    var parseDate = d3.timeParse("%H");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.Hour); })
        .y(function(d) { return y(d.close); });

    // Get the data
    d3.csv(linefile, function(error, data) {
        console.log(data);
        console.log(data.columns);
        data.forEach(function(d) {
            d.hour = parseDate(d.Hour);
        });


        // Scale the range of the data
        x.domain(d3.extent(data, function(d) { return d.hour; }));
        y.domain([0, d3.max(data, function(d) { return d.close; })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", valueline);

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

    });






};


function line_init() {
        line_plot();
    };