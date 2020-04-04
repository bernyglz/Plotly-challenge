//1. Use the D3 library to read in `samples.json`.
//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//* Use `sample_values` as the values for the bar chart.
//* Use `otu_ids` as the labels for the bar chart.
//* Use `otu_labels` as the hovertext for the chart.
function buildchart(sample){
    d3.json("samples.json").then((data) => {
        var samples = data.samples;    
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);    
        var result = resultArray[0];
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        console.log(otu_labels)
        var sample_values = result.sample_values;
        data = [{
            type: "bar",
            orientation: "h",
            x: otu_ids.slice(0, 10),
            y: sample_values.slice(0, 10),
            text:otu_labels.slice(0,10)}];
        
            var layout1 = {
                title: 'Test Subject Horizontal Bar Chart Microbe Data',
                showlegend: false,
                height: 400,
                width: 500
            };    

        Plotly.newPlot("bar", data, layout1);
    
        //////////////////3. Create a bubble chart that displays each sample. 
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
              color: otu_ids,
              size: sample_values,
              opacity: [1, 0.8, 0.6, 0.4],
              size: [40, 60, 80, 100]
          }
        };
          
        var bubble_data = [trace1];
        console.log(otu_ids)  
        var layout = {
            title: 'Test Subject Bubble Chart Microbe Data',
            showlegend: false,
            height: 600,
            width: 1400
        };
          
        Plotly.newPlot('bubble', bubble_data, layout);
    })
}
////////////////
function buildmetadatadisplay(sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;    
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);    
        var result = resultArray[0];
        var sample_metadata = d3.select("#sample-metadata");
        sample_metadata.html("");
        Object.entries(result).forEach(([key,value]) => {
            sample_metadata.append("h6").text(key+" : "+ value)
        })
    })
}
//6. Update all of the plots any time that a new sample is selected.
function dropdownupdate(sample){
    d3.json("samples.json").then((data) => {
        var selDataset = d3.select("#selDataset")
        var names = data.names
        names.forEach((name) => {
            selDataset.append("option").text(name).property("value", name)
        })
        var first_sample = names[0]
        buildchart(first_sample) 
        buildmetadatadisplay(first_sample)
    })
}
//option change function 
function optionChanged(sample){
        buildchart(sample) 
        buildmetadatadisplay(sample)
}
// dropdown update
dropdownupdate()

//d3.selectAll("#selDataset").on("change", updatePlotly); 
//buildchart(940) 
//buildmetadatadisplay(940)