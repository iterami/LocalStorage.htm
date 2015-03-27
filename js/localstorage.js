function clearAll(){
    if(!confirm('window.localStorage.clear()?')){
        return;
    }

    window.localStorage.clear();
}

function headers(){
    document.getElementById('result').innerHTML =
      '<tr class=top>'
        + '<td>Key'
        + '<td>Actions <input onclick=removeAll() type=button value=removeAll()><input onclick=clearAll() type=button value=window.localStorage.clear()>'
        + '<td>Value'
      + document.getElementById('result').innerHTML;
}

function removeAll(){
    if(!confirm('removeAll()?')){
        return;
    }

    for(var key in window.localStorage){
        window.localStorage.removeItem(key);
    }

    document.getElementById('result').innerHTML = '';
    headers();
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

    for(var key in window.localStorage){
        output += '<tr><td id="' + key + '">'
          + key
          + '<td><input onclick="removeItem(\'' + key + '\', this)" type=button value=X>'
          + '<td>'
          + window.localStorage.getItem(key);
    }

    document.getElementById('result').innerHTML = output;

    headers();
};
