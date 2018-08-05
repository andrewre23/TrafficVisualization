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

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 760 - margin.left - margin.right,
        height = 370 - margin.top - margin.bottom;

    // Parse the date / time
    var parseDate = d3.timeParse("%H");

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function (d) {
            return x(d.Hour);
        })
        .y(function (d) {
            return y(d.Total);
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
        console.log(data);
        console.log(data.columns[0]);
        data.forEach(function (d) {
            d.Hour = +d.Hour;
            d.Total = +d.Total;
        });

        console.log(data.barselection);

        // Scale the range of the data
        x.domain(d3.extent(data, function (d) {
            return d.Hour;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.Total;
        })]);

        // Add the valueline path.
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr('fill','#044B94')
            .attr('fill-opacity','0.3')
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