
// for more about line graphs check out this example:
// https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89

/**
 * changes made from linegraph.js:
 * 1. move the code to append div to body to the beginning of the code
 * 2. make a new svg with same dimensions and append it to div variable
 * 3. make new axes and append it to tooltipSvg
 * 4. change svg.append("path").... to tooltipSvg.append("path")
 * 5. make css changes (specified in file)
 */

const margin = {top: 50, right: 50, bottom: 50, left: 50}
, width = 800 - margin.left - margin.right // Use the window's width
, height = 600 - margin.top - margin.bottom // Use the window's height

// load data
d3.csv('data/gapminder.csv').then((data) => {

    // append the div which will be the tooltip
    // append tooltipSvg to this div
    const div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

    // make an svg and append it to body
    const svg = d3.select('body').append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    // const tooltipSvg = div.append("svg")
    //     .attr('width', width + margin.left + margin.right)
    //     .attr('height', height + margin.top + margin.bottom)

    // get data for only 1980
    datayear = data.filter(d => d['year'] == 1980)

    // get only data for USA
    //dataCountry = data //.filter(d => d['country'] == "United States" && d['population'] != 'NA')

    // get year min and max for us
    const fertilityLimits = d3.extent(datayear, d => d['fertility'])
    // get scaling function for years (x axis)
    const xScale = d3.scaleLinear()
        .domain([fertilityLimits[0], fertilityLimits[1]])
        .range([margin.left, width + margin.left])

        // // get year min and max for us
        // const yearLimits = d3.extent(dataCountry, d => d['year'])
        // // get scaling function for years (x axis)
        // const xScale2 = d3.scaleLinear()
        //     .domain([yearLimits[0], yearLimits[1]])
        //     .range([margin.left, width + margin.left])


    // make x axis
    const xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height + margin.top) + ")")
        .call(d3.axisBottom(xScale))

    // const xAxis2 = tooltipSvg.append("g")
    //     .attr("transform", "translate(0," + (height + margin.top) + ")")
    //     .call(d3.axisBottom(xScale2))

    // get min and max life expectancy for US
    const lifeExpectancyLimits = d3.extent(datayear, d => d['life_expectancy'])

    // get scaling function for y axis
    const yScale = d3.scaleLinear()
        .domain([lifeExpectancyLimits[1], lifeExpectancyLimits[0]])
        .range([margin.top, margin.top + height])

        // // get min and max life expectancy for US
        // const populationLimits = d3.extent(dataCountry, d => d['population']/1000000)
        //
        // // get scaling function for y axis
        // const yScale2 = d3.scaleLinear()
        //     .domain([populationLimits[1], populationLimits[0]])
        //     .range([margin.top, margin.top + height])
        //
    const rpopLimits = d3.extent(datayear, d => d['population'])
//console.log(rpopLimits)
    const rScale = d3.scaleLinear()
    .domain([rpopLimits[0], rpopLimits[1]])
    .range([margin.top, margin.top + height])
    // make y axis
    const yAxis = svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(yScale))

    // const yAxis2 = tooltipSvg.append("g")
    //     .attr("transform", "translate(" + margin.left + ",0)")
    //     .call(d3.axisLeft(yScale2))
    //
    // // d3's line generator
    // const line = d3.line()
    //     .x(d => xScale2(d['year'])) // set the x values for the line generator
    //     .y(d => yScale2(d['population']/1000000)) // set the y values for the line generator
    // // append line to svg
    // tooltipSvg.append("path")
    //     // difference between data and datum:
    //     // https://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data
    //     .datum(dataCountry)
    //     .attr("d", function(d) { return line(d) })
    //     .attr("fill", "steelblue")
    //     .attr("stroke", "steelblue")

    // append dots to svg to track data points
    svg.selectAll('.dot').data(datayear)
        .enter()
        .append('circle')
            .attr('cx', d => xScale(d['fertility']))
            .attr('cy', d => yScale(d['life_expectancy']))
            .attr('r', function(d) {return (d['population'])/18000000 + 3})
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '4')
            // get rid of .html
            .on("mouseover", function(d) {  //begin appending year vs population
              let country = d['country']
              dataCountry = data.filter(d => d['country'] == country && d['population'] != 'NA')
              const tooltipSvg = div.append("svg")
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// get year min and max for us
const yearLimits = d3.extent(dataCountry, d => d['year'])
// get scaling function for years (x axis)
const xScale2 = d3.scaleLinear()
    .domain([yearLimits[0], yearLimits[1]])
    .range([margin.left, width + margin.left])

const xAxis2 = tooltipSvg.append("g")
    .attr("transform", "translate(0," + (height + margin.top) + ")")
    .call(d3.axisBottom(xScale2))

// get min and max life expectancy for US
const populationLimits = d3.extent(dataCountry, d => d['population']/1000000)

// get scaling function for y axis
const yScale2 = d3.scaleLinear()
    .domain([populationLimits[1], populationLimits[0]])
    .range([margin.top, margin.top + height])

const yAxis2 = tooltipSvg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(yScale2))

// d3's line generator
const line = d3.line()
    .x(d => xScale2(d['year'])) // set the x values for the line generator
    .y(d => yScale2(d['population']/1000000)) // set the y values for the line generator
// append line to svg
tooltipSvg.append("path")
    // difference between data and datum:
    // https://stackoverflow.com/questions/13728402/what-is-the-difference-d3-datum-vs-data
    .datum(dataCountry)
    .attr("d", function(d) { return line(d) })
    .attr("fill", "steelblue")
    .attr("stroke", "steelblue")

                div.transition()
                    .duration(200)
                    .style('opacity', 0.9)

                div.style('left', d3.event.pageX + "px")
                    .style('top', (d3.event.pageY - 28) + "px")
                tooltipSvg.append('text')
                  .attr('x', 400)
                  .attr('y', 590)
                  .attr('font-size', '20px')
                  .text("Year")
                tooltipSvg.append('text')
                  .attr('x', 15)
                  .attr('y', 38)
                  .attr('font-size', '20px')
                  .text("Population/million")
            }) //end appending year vs population
            .on("mouseout", function(d) {
                div.transition()
                    .style('opacity', 0)
                div.selectAll("svg").remove()
            })
    // APPEND CONDITIONAL TEXT EXAMPLE
    // if the year > 2000 append a text label
    // with infant_mortality data above the point
    let popmil = data.filter(d => d['population'] > 100000000 && d['year'] == 1980)
    console.log(popmil)
    svg.selectAll('.text')
        .data(popmil)
        .enter()
        .append('text')
            .attr('x', function(d) { return xScale(+d['fertility'])+20 })
            .attr('y', function(d) { return yScale(+d['life_expectancy'])})
            .text(function(d) {
              //console.log("added country label " + d['country'])
              return d['country'] })

    //adding title and axis labels
    svg.append('text')
      .attr('x', 240)
      .attr('y', 50)
      .attr('font-size', '30px')
      .text("Fertility vs Life Expectancy (1980)")
    svg.append('text')
      .attr('x', 400)
      .attr('y', 590)
      .attr('font-size', '20px')
      .text("Fertility")
    svg.append('text')
      .attr('x', 15)
      .attr('y', 36)
      .attr('font-size', '20px')
      .text("Life Expectancy")

})
