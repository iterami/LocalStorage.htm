'use strict';

function checkAll(){
    var checkboxes = document.getElementsByTagName('input');
    for(var checkbox in checkboxes){
        if(checkboxes[checkbox].type === 'checkbox'){
            checkboxes[checkbox].checked = true;
        }
    }
}

function check_checkbox(id){
    if(!document.body.contains(document.getElementById(id))){
        return;
    }

    document.getElementById('checkbox-' + id).checked =
      !document.getElementById('checkbox-' + id).checked;
}

function clearAll(){
    if(!window.confirm('window.localStorage.clear()?')){
        return;
    }

    window.localStorage.clear();
    refresh();
}

function headers(){
    document.getElementById('result').innerHTML =
      '<tr class=top>'
        + '<td>Key <input onclick=refresh() type=button value="Refresh [R]">'
          + '<input onclick=checkAll() type=button value=checkAll()>'
          + '<input onclick=removeChecked() type=button value=removeChecked()>'
          + '<input onclick=removeAll() type=button value=removeAll()>'
          + '<input onclick=clearAll() type=button value=window.localStorage.clear()>'
        + '<td>Value'
      + document.getElementById('result').innerHTML;
}

function refresh(){
    var output = '';

    for(var key in window.localStorage){
        output += '<tr onclick="check_checkbox(\''
          + key
          + '\')"><td id="' + key + '"><input disabled id="checkbox-'
          + key
          + '" type=checkbox><input onclick="removeItem(\'' + key + '\', this)" type=button value=X> '
          + key
          + '<td>'
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

function removeChecked(){
    if(!window.confirm('removeChecked()?')){
        return;
    }

    for(var key in window.localStorage){
        if(document.getElementById('checkbox-' + key).checked){
            window.localStorage.removeItem(key);
        }
    }

    refresh();
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
    if(key === 82){
        refresh();
    }
};

window.onload = refresh;
