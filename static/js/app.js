let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function dropdown(){
let dropdowntag = d3.select("#selDataset")


d3.json(url).then((data) => {
    let sampleNames = data.names;
    console.log(sampleNames)
    for (let i = 0; i < sampleNames.length; i++){
      dropdowntag
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    };

    buildtable(sampleNames[0])
    buildcharts(sampleNames[0])
})




}


 function buildtable(id){
let tabledata = d3.select("#sample-metadata")

d3.json(url).then((data) => {
    let samplemeta = data.metadata;
    let metaresults = samplemeta.filter(elem => elem.id == id)[0];

    tabledata.html("")
     
    Object.entries(metaresults).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        tabledata
        .append("h5")
        .text(`${key.toUpperCase()}: ${metaresults[key]}`)
      });


})

}

 function buildcharts(id){

    d3.json(url).then((data) => {
        let samples = data.samples;
        let samplesresults = samples.filter(elem => elem.id == id)[0];
    
        
    let otu_ids=samplesresults.otu_ids
    let otu_labels=samplesresults.otu_labels
    let sample_values=samplesresults.sample_values



    var bardata = [{
        type: 'bar',
        x: sample_values.slice(0, 10).reverse(),
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        orientation: 'h'
      }];
      
      var barlayout = {
  title: 'barchart',

};

Plotly.newPlot('bar', bardata, barlayout);


var bubbledata =[ {
    x: otu_ids,
    y:sample_values,
    text:otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      colorscale: 'Earth',
      size:sample_values 
    }
  }];
  
  
  
  var bubblelayout = {
    title: 'bubblechart',
    showlegend: false,
    
  };
  
  Plotly.newPlot('bubble', bubbledata, bubblelayout);
      
    
    })

 }
function optionChanged(x){

 buildtable(x)
 buildcharts(x)

} 
dropdown()
