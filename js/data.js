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
    if(!document.getElementById(id)){
        return;
    }

    var element = document.getElementById('checkbox-' + id);
    element.checked = !element.checked;
}

function clearAll(){
    if(!window.confirm('window.localStorage.clear()?')){
        return;
    }

    window.localStorage.clear();
    refresh();
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
          + '<td><textarea>'
          + window.localStorage.getItem(key)
          + '</textarea>';
    }

    document.getElementById('result').innerHTML = output;
}

function removeAll(){
    if(!window.confirm('removeAll()?')){
        return;
    }

    for(var key in window.localStorage){
        window.localStorage.removeItem(key);
    }

    refresh();
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
