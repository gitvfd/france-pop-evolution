function createScale(){

        d3.json("data/FrancePopDpt.json", function(error,data){

var minScale = d3.min(data.map(function(d) {return (d.value);} ))-1;
var maxScale = d3.max(data.map(function(d) {return (d.value);} ))+1;

console.log(minScale);
console.log(maxScale);

var margin=115;

var color = d3.scale.threshold()
            .domain([minScale,minScale+(maxScale-minScale)/9,minScale+2*(maxScale-minScale)/9,minScale+3*(maxScale-minScale)/9,minScale+4*(maxScale-minScale)/9,minScale+5*(maxScale-minScale)/9,minScale+6*(maxScale-minScale)/9,minScale+7*(maxScale-minScale)/9,minScale+8*(maxScale-minScale)/9,maxScale])
            .range(["#fff","#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548","#d7301f","#b30000","#7f0000"]);

// A position encoding for the key only.
var x = d3.scale.linear()
    .domain([minScale, maxScale])
    .range([margin, width-2*margin]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(13)
    .tickValues(color.domain());


var g2 = svg2.append("g")
    .attr("class", "key")
    .attr("translate", "(20,40)");

var dataScale = color.range().map(function(d, i) {
      return {
        x0: i ? x(color.domain()[i-1]) : x.range()[0],
        x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
        z: d
      };
    });

console.log(dataScale);

g2.selectAll("rect")
    .data(dataScale)
  .enter().append("rect")
    .attr("height", 8)
    .attr("x", function(d) { return d.x0; })
    .attr("width", function(d) { return d.x1 - d.x0; })
    .style("fill", function(d) { return d.z; });


g2.call(xAxis).append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", 9)
    .text("Legend:");

g2.call(xAxis).append("text")
    .attr("class", "legendtext")
    .attr("x", width-2*margin+25)
    .attr("y", 21)
    .text("inhabitants");    
});
};
