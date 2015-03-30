function clearAll(){
    if(!window.confirm('window.localStorage.clear()?')){
        return;
    }

    window.localStorage.clear();
}

function headers(){
    document.getElementById('result').innerHTML =
      '<tr class=top>'
        + '<td>Key <input onclick=refresh() type=button value="Refresh [R]"><input onclick=removeAll() type=button value=removeAll()><input onclick=clearAll() type=button value=window.localStorage.clear()>'
        + '<td>Value'
      + document.getElementById('result').innerHTML;
}

function refresh(){
    var output = '';

    for(var key in window.localStorage){
        output += '<tr><td id="' + key + '">'
          + key
          + ' <input onclick="removeItem(\'' + key + '\', this)" type=button value=X><td>'
          + window.localStorage.getItem(key);
    }

    document.getElementById('result').innerHTML = output;

    headers();
}

function removeAll(){
    if(!window.confirm('removeAll()?')){
        return;
    }

    for(var key in window.localStorage){
        window.localStorage.removeItem(key);
    }

    document.getElementById('result').innerHTML = '';
    headers();
}

function removeItem(key, element){
    if(!window.confirm('Remove ' + key + '?')){
        return;
    }

    window.localStorage.removeItem(key);
    element.parentElement.parentElement.remove();
}

window.onkeydown = function(e){
    var key = e.keyCode || e.which;

    // R: refresh.
    if(key == 82){
        refresh();
    }
};

window.onload = refresh;
