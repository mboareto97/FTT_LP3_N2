window.onload = function () {
    
    $.ajax({
        type:'GET',
        url:'https://rickandmortyapi.com/api/character/?page=1',

        success: function(data){
            var comboBox = $('#Items');
            for (let i = 0; i < data.results.length; i++) {
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(data.results[i].name));
                opt.value = data.results[i].id;
            
                comboBox.append(opt);
            }
        }
    });
}

function BuscaDados() {
    
    var page = $('#pages').val();

    $('#Items').find('option').remove().end();

    $.ajax({
        type:'GET',
        url:'https://rickandmortyapi.com/api/character/?page=' + page,

        success: function(data){
            var comboBox = $('#Items');
            for (let i = 0; i < data.results.length; i++) {
                var opt = document.createElement('option');
                opt.appendChild(document.createTextNode(data.results[i].name));
                opt.value = data.results[i].id;
            
                comboBox.append(opt);
            }
        }
    });
}

function BuscaDadosSelecionado(){    
    var id = $('select[name=items]').val();
    var url = "https://rickandmortyapi.com/api/character/" + id

    $.ajax({
        type:'GET',
        url: url,

        success: function(data){            
            CreateNewCard(data);
        }
    });
}

function CreateNewCard(result){    
    var container = $('#conteudo');

    var article = document.createElement("article");
    article.setAttribute("class", "card");

    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card_header");

    var divImage = document.createElement("div");
    divImage.setAttribute("class", "card-image");

    var img = document.createElement("img");
    img.setAttribute("src", result.image);
    img.setAttribute("alt", result.name);

    var divTitle = document.createElement("div");
    divTitle.setAttribute("class", "cardCharacter_Title");

    var h2 = document.createElement("h2");
    h2.innerHTML = result.name;

    //var yearsAgo = MontaIdade(result.created);
    var yearsAgo = 2;

    var p = document.createElement("p");
    p.innerHTML = "id: " + result.id + " created " + yearsAgo + " Years Ago";

    article.append(divCard);
    divCard.append(divImage);
    divImage.append(img);
    divCard.append(divTitle);
    divTitle.append(h2);
    divTitle.append(p);
    container.append(article);

    MontaCardInfo(result, article);
}

function MontaIdade(date){
    var dateToday = Date.now();
    
    
}

function MontaCardInfo(result, article){    
    var divInfo = document.createElement("div");
    divInfo.setAttribute("class", "card-info");

    var characters = Array(["status"],["species"],["gender"],["origin"],["location"]);

    for (let i = 0; i < characters.length; i++) {
        var divCharacterInfo = document.createElement("div");
        divCharacterInfo.setAttribute("class", "card-character");

        var span = document.createElement("span");
        if(characters[i] == "location")
            span.innerHTML = "LAST LOCATION";
        else
            span.innerHTML = characters[i].toString().toUpperCase();
        
        var p = document.createElement("p");
        p.innerHTML = DefineCharacter(characters[i], result);

        divInfo.append(divCharacterInfo);
        divCharacterInfo.append(span);
        divCharacterInfo.append(p);

        article.append(divInfo);
    }
}

function DefineCharacter(character, result){
    var retorno = "";
    
    switch(character[0]){
        case 'status':
            retorno = result.status;
            break;
        case 'species':
            retorno = result.species;
            break;
        case 'gender':
            retorno = result.gender;
            break;
        case 'origin':
            retorno = result.origin.name;
            break;
        case 'location':
            retorno = result.location.name;
            break;        
    }

    return retorno;
}