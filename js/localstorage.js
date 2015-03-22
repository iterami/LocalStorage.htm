function removeAll(){
    if(!confirm('window.localStorage.clear()?')){
        return;
    }

    window.localStorage.clear();
}

function removeItem(key, element){
    if(!confirm('Remove ' + key + '?')){
        return;
    }

    window.localStorage.removeItem(key);
    element.parentElement.parentElement.remove();
}

window.onload = function(e){
    var output = '';

    for(var value in window.localStorage){
        output += '<tr><td id="' + value + '">'
          + value
          + '<td>'
          + window.localStorage.getItem(value)
          + '<td><input onclick="removeItem(\'' + value + '\', this)" type=button value=X>';
    }

    document.getElementById('result').innerHTML = 
      '<tr class=top>'
        + '<td>Key'
        + '<td>Value'
        + '<td>Remove <input onclick=removeAll() type=button value=All>'
      + output;
};
