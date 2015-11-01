var dataFile = "data/hg19.csv"

var getCytoBand = function (chrSymbol, basePosition) {
    d3.csv(dataFile, function (error, data) {
            filterByOneBasePosition = function (chrSymbol, basePosition) {
                var res = data.filter(function (row) {
                    return row.chr === chrSymbol && +(row.start) <= basePosition && +(row.end) >= basePosition;
                })
                console.log(res);
                return res;
            };
            var results = [];
            if (!(chrSymbol instanceof Array)) {
                var chrArray = [chrSymbol];
            } else {
                var chrArray = chrSymbol;
            }
            for (var i = 0; i < chrArray.length; i++) {
                chrArray[i] = "chr" + chrArray[i];
            }
            console.log(chrArray);
            if (!(basePosition instanceof Array)) {
                var bpArray = [];
                bpArray.push(parseInt(basePosition))
            } else {
                var bpArray = [];
                for (var i = 0; i < basePosition.length; i++) {
                    bpArray.push(parseInt(basePosition[i]))
                }
            }
            console.log(bpArray);
            var l1 = chrSymbol.length;
            var l2 = basePosition.length;
            var minLength = Math.min(l1, l2);
            console.log(minLength);
            for (var i = 0; i < minLength; i++) {
                var resOneBp = filterByOneBasePosition(chrSymbol[i], basePosition[i]);
                resOneBp = resOneBp[0];
                resOneBp.pos = basePosition[i];
                results.push([resOneBp["chr"], resOneBp["pos"], resOneBp["cyto"]]);
            }
            var cytoTable = d3.select("#cytoTable");
            var cytoThead = cytoTable.append("thead");
            var header = ["Chromosome", "Position", "Cytoband"];
            var cytoHeads = cytoThead.selectAll("th")
                .data(header)
                .enter()
                .append("th")
                .text(function (d) {
                    return d;
                })
                .style("font-size", "1.3em")
                .style("padding-bottom", "0.3em");

            var cytoTbody = cytoTable.append("tbody");
            var cytoCells = cytoTbody.selectAll("tr")
                .data(results)
                .enter()
                .append("tr")
                .selectAll("td")
                .data(function (d, i) {
                    return d;
                })
                .enter()
                .append("td")
                .text(function (d) {
                    return d;
                })
                .style("text-shadow", "0px 1px 0px rgba(155,155,155,.5)")
        }
    );
}

//getCytoBand(22, 3840000);
getCytoBand([22, 22, 13], [43214, 3840000, 43143214]);

