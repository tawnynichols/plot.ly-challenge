function getValues(id) {

    // Fetch the JSON data and console log it
    d3.json("samples.json").then(function(importedData) {
        // console.log(importedData.names);
        //console.log(importedData)
        // console.log(importedData.samples.otu_ids)
        // console.log(importedData.samples[0].sample_values)

        // Use the map method with the arrow function to return all the filtered movie titles.
        var ids = importedData.samples[0].otu_ids;

        // Get top 10 ids
        var top10_ids = (importedData.samples[0].otu_ids.slice(0, 10)).reverse();

        // add text to lable for plot
        var get_ids = top10_ids.map(d => "OUT " + d)
        console.log(get_ids)


        // Use the map method with the arrow function to return all the filtered movie metascores.
        var values = importedData.samples[0].sample_values.slice(0, 10).reverse();

        // Get to 10 values
        var top10_values = values.slice(0, 10).reverse()
        console.log(top10_values[0])


        // create labels
        var labels = importedData.samples[0].otu_labels.slice(0, 10);
        console.log(labels)

        // Create title
        var id_title = importedData.names[0]

        // Create your trace.
        var trace = {
            x: values,
            y: get_ids,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the data array for our plot
        var data = [trace];

        // Define the plot layout
        var layout = {
            title: "title",
            yaxis: {
                tickmode: "linear",
            }
        };

        // Plot the chart to a div tag with id "bar"
        Plotly.newPlot("bar", data, layout);

    })
}

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData(id) {
    d3.json("sampe.json").then((data) => {
        var demoData = data.metadata;
        console.log(demoData)

        // define variable to filter data
        var info = demoData.filter(d => d.id.toString() === id)[0];

        // select demographic data
        var demoInfo = d3.select("#sample-metdata");

        // get demographic data for the id and append to panel
        Object.defineProperties(info).foreach((key) => {
            demoInfo.append("h5").text(key[0].toUperCase() + ": " + key[1] + "\n")
        })
    })

}

// Update the restyled plot's values
function updatePlotly(newdata) {
    Plotly.restyle("bar", "values", [newdata]);
}


function init() {
    // Assign the value of the dropdown menu option to a variable
    var dropdownMenu = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data) => {
        console.log(data)

        //get ids for dropdow
        data.names.forEach(function(name) {
                dropdownMenu.append("option").text(name).property("value");
            }

        )

    })
}

init();