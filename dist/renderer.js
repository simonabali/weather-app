
class Renderer {
    renderData(allCityData){
        let data = {allCityData} //making this an object
        $("#results-area").empty() //same as adding it to the append line, before .append
        const source = $('#city-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template(data) //received object only (not array)
        $('#results-area').append(newHTML)
    }

}

