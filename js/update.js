function dptPop(year){

	var yearPicked=year;
	var totalPopFrance=0;

	document.getElementById("yearClicked").innerHTML =year;
	
	d3.json("data/FrancePopDpt.json", function(error,data){

	//var popData=data.filter(function(d) {
	//	return(d.year==yearPicked);

	//var pop=data.filter(function(d) {
	//	return(d.measure=="Population")});

	//var minPop = d3.min(pop.map(function(d) {return (d.value);} ));
	//var maxPop = d3.max(pop.map(function(d) {return (d.value);} ));

	//console.log(minPop);
	//console.log(maxPop);

	//var area = d3.scale.linear().domain([minPop,maxPop]).range([10,200]);


	//popData.forEach(function(d) { totalPopNY = totalPopNY + d.value; });
	//console.log(totalPopNY);

	//totalPopNY =  totalPopNY + " inhabitants";

	//document.getElementById("popNY").innerHTML =totalPopNY;

	var popData=data.filter(function(d) {
		return(d.year==yearPicked)});

	console.log(popData);
	var minpop = d3.min(data.map(function(d) {return (d.value);} ))-1;
	var maxpop = d3.max(data.map(function(d) {return (d.value);} ))+1;

	console.log(minpop);
	console.log(maxpop);

	//var color = d3.scale.linear().domain([minpop,maxpop]).range(["#ece7f2","#3182bd"]);
	var color = d3.scale.threshold()
	    .domain([minpop,minpop+(maxpop-minpop)/9,minpop+2*(maxpop-minpop)/9,minpop+3*(maxpop-minpop)/9,minpop+4*(maxpop-minpop)/9,minpop+5*(maxpop-minpop)/9,minpop+6*(maxpop-minpop)/9,minpop+7*(maxpop-minpop)/9,minpop+8*(maxpop-minpop)/9,maxpop])
	    .range(["#fff","#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548","#d7301f","#b30000","#7f0000"]);


	d3.json("data/dpt2.json", function(error, dptFrance) {	
  		var rateById = {};
		popData.forEach(function(d) { rateById[d.dpt] = d.value; });
		
		console.log(rateById);
		console.log(color(rateById));
		dpts.selectAll("path")
			.data(dptFrance.features)
		    .transition().duration(1500)
	        .style("fill", function(d) { return color(rateById[d.id]); });
			//.style("fill", function(d) {return color(d.value);} );
	});

	g.selectAll("path")
		.on("mouseover", function(d) {
			var format=d3.format(",");
			var formatGrowth=d3.format("%");

			var xPosition =d3.event.pageX + 15;
			var yPosition =d3.event.pageY + 15;
			
			var department;
			popData.forEach(function(n){
		        	if (n.dpt==d.id)
		        		 department=n.name;
		        });

			console.log(department);

			//Update the tooltip position and value
			d3.select("#tooltip")
		        .style("left", xPosition + "px")
		        .style("top", yPosition + "px") 
		        .select("#departmentNameTooltip")
		        .text(department);

		    var dptID=" (" + d.id+")";
			d3.select("#tooltip")
		        .select("#departmentNumberTooltip")
		        .text(dptID);

			var dptValue;
			popData.forEach(function(n){
		        	if (n.dpt==d.id)
		        		 dptValue=n.value;
		        });

			d3.select("#tooltip")
		        .select("#valueTooltip")
		        .text(format(dptValue));
			

			var dptGrowth;
			if (yearPicked!=1962){
				popData.forEach(function(n){
			        	if (n.dpt==d.id)
			        		if(n.growth>=0){
			        		 dptGrowth="+" + formatGrowth(n.growth) + " from previous period.";
			        		}else{
			        			dptGrowth=formatGrowth(n.growth) + " from previous period.";
			        		};
			        });
		    }
		    else{dptGrowth=""};

			d3.select("#tooltip")
		        .select("#growthTooltip")
		        .text(dptGrowth);


			d3.select("#tooltip").classed("hidden", false);
		})
		.on("mouseout", function() {
			d3.select("#tooltip").classed("hidden", true);
		})
	});
};