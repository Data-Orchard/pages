function generateSparqlQuery(category){
  bounds = map.getBounds();
  switch(category) {
    case "schools":
      var  chunk2 = `SELECT ?placeLabel ?location ?typeLabel ?place WHERE {
        SERVICE wikibase:box {?place wdt:P625 ?location . bd:serviceParam wikibase:cornerWest "Point(${bounds.getWest()} ${bounds.getNorth()})"^^geo:wktLiteral . bd:serviceParam wikibase:cornerEast "Point(${bounds.getEast()} ${bounds.getSouth()})"^^geo:wktLiteral .}
        FILTER EXISTS { ?place wdt:P31/wdt:P279* wd:Q2385804 }
        ?place wdt:P31 ?type .
       minus { ?place wdt:P576 ?end } .            
       minus { ?place wdt:P31 wd:Q1244442 } . 
          SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang_select}". }
      } LIMIT 2000`;
  
      return sparql_2 = chunk2;
      break;

      case "transport":
    chunk2 = `SELECT ?place ?placeLabel ?location ?typeLabel ?operator ?operatorLabel WHERE {
        SERVICE wikibase:box {
            ?place wdt:P625 ?location .
            bd:serviceParam wikibase:cornerWest "Point(${bounds.getWest()} ${bounds.getNorth()})"^^geo:wktLiteral .
            bd:serviceParam wikibase:cornerEast "Point(${bounds.getEast()} ${bounds.getSouth()})"^^geo:wktLiteral .
          }
          FILTER EXISTS { ?place wdt:P31/wdt:P279* wd:Q12819564 }
          ?place wdt:P31 ?type .
        
         minus { ?place wdt:P31 wd:Q4663385 }
         minus { ?place wdt:P31 wd:Q54471221 }   
         
            SERVICE wikibase:label { bd:serviceParam wikibase:language "${lang_select}". }
        } LIMIT 2000
        `;
        return sparql_2 = chunk2
        break;
    default:
      // Code block
 
  }
 


  

}

function generateschoolsMarkers(){
schools.clearLayers(); // Add the schools items to the Schools overlay
      fetch("https://query.wikidata.org/sparql?query=" + encodeURIComponent(sparql_2), {
        "headers": {
          "accept": "application/sparql-results+json"
        },
        "method": "GET",
        "mode": "cors"
      }).then(a => a.json()).then(a => {
        a.results.bindings.forEach(x => {
          if (x.location.value.match(/^Point\((.+) (.+)\)$/)) {
            var lon = parseFloat(RegExp.$1);
            var lat = parseFloat(RegExp.$2);
            var html = "<h3>"+x.placeLabel.value+"</h3><span class='link_format'> <a href=\"https://www.openstreetmap.org/#map=16/" + lat + "/" + lon + "\">Gweld ar OpenStreetMap</a><br /><a href=\"" + x.place.value + "\"> Gweld ar Wikidata </a></span>"  ;
            if (x.placeLabel.value.match(/^Q[0-9]+$/)) {
             //Do not add the point to the layer
} else {
           L.marker([lat, lon],{icon: schoolsmk}).bindPopup(html).openPopup().addTo(schools);
           
          }
          } 
        });
      });
    }

function generatetransportMarkers(){
    transport.clearLayers(); // Add the Trnaport items to the Schools overlay
          fetch("https://query.wikidata.org/sparql?query=" + encodeURIComponent(sparql_2), {
            "headers": {
              "accept": "application/sparql-results+json"
            },
            "method": "GET",
            "mode": "cors"
          }).then(a => a.json()).then(a => {
            a.results.bindings.forEach(x => {
              if (x.location.value.match(/^Point\((.+) (.+)\)$/)) {
                var lon = parseFloat(RegExp.$1);
                var lat = parseFloat(RegExp.$2);
                var html = "<h3>"+x.placeLabel.value+"</h3><span class='link_format'> <a href=\"https://www.openstreetmap.org/#map=16/" + lat + "/" + lon + "\">Gweld ar OpenStreetMap</a><br /><a href=\"" + x.place.value + "\"> Gweld ar Wikidata </a></span>"  ;
                if (x.placeLabel.value.match(/^Q[0-9]+$/)) {
                 //Do not add the point to the layer
    } else {
               L.marker([lat, lon],{icon: transportmk}).bindPopup(html).openPopup().addTo(transport);
               
              }
              } 
            });
          });

}