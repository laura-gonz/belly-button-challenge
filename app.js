
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {


    let dropdown = d3.select("#selDataset");
    let names = data.names;
    console.log(names);

    names.forEach((id) => {
        dropdown
            .append("option")
            .text(id)
            .property("value", id);
    });

    buildMetadata(names[0])
    bubbleChart(names[0])

})

function buildMetadata(sample) {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

  let metadata = data.metadata;
  let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  let result = resultArray[0];
  let demo = d3.select("#sample-metadata");
  demo.html("");
  for (key in result){
    demo.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
  };

})

}

function optionChanged(sample) {
  buildMetadata(sample)
  bubbleChart(sample)

}

function bubbleChart(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    let samples = data.samples;
    console.log(data);

    let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);

    let otu_ids = resultArray[0].otu_ids;
    let otu_labels = resultArray[0].otu_labels;
    let sample_values = resultArray[0].sample_values;

    let barData = [
      {
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);

    let bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30 }
      };
  
      let bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    })

}


