'use strict';

function add(){
    const key = window.prompt(
      'Key:',
      ''
    );
    if(key === null
      || key.length === 0){
        return;
    }

    const value = window.prompt(
      'Value:',
      ''
    );
    if(value === null){
        return;
    }

    window.localStorage.setItem(
      key,
      value
    );
    refresh();
}

function checkAll(){
    const checkboxes = document.getElementsByTagName('input');
    for(const checkbox in checkboxes){
        if(checkboxes[checkbox].type === 'checkbox'){
            checkboxes[checkbox].checked = true;
        }
    }
}

function check_checkbox(id){
    const element = document.getElementById('checkbox-' + id);

    if(!element){
        return;
    }

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
    let keys = [];
    let output = '';

    for(const key in window.localStorage){
        if(!window.localStorage.hasOwnProperty(key)){
            continue;
        }

        keys.push(key);
    }

    keys = core_sort_strings({
      'array': keys,
    });

    for(let key in keys){
        key = keys[key];

        const repository = key.slice(
          0,
          key.indexOf('.htm-') + 4
        );

        output += '<tr id="' + key + '" onclick="check_checkbox(\''
          + key
          + '\')"><td>'
          + '<a href="../' + repository + '/index.htm">' + key + '</a>'
          + '<br><input onclick="removeItem(\'' + key + '\')" type=button value=X><input disabled id="checkbox-'
          + key
          + '" type=checkbox><input onclick="updateItem(\'' + key + '\')" type=button value=Save><td><textarea id="textarea-' + key + '">'
          + window.localStorage.getItem(key)
          + '</textarea>';
    }

    document.getElementById('result').innerHTML = output;
}

function removeAll(){
    if(!window.confirm('removeAll()?')){
        return;
    }

    for(const key in window.localStorage){
        if(!window.localStorage.hasOwnProperty(key)){
            continue;
        }

        window.localStorage.removeItem(key);
    }

    refresh();
}

function removeChecked(){
    if(!window.confirm('removeChecked()?')){
        return;
    }

    for(const key in window.localStorage){
        if(!window.localStorage.hasOwnProperty(key)){
            continue;
        }

        if(document.getElementById('checkbox-' + key).checked){
            window.localStorage.removeItem(key);
        }
    }

    refresh();
}

function removeItem(key){
    if(!window.confirm('Remove ' + key + '?')){
        return;
    }

    window.localStorage.removeItem(key);
    document.getElementById(key).remove();
}

function updateItem(key){
    if(!window.confirm('Save ' + key + '?')){
        return;
    }

    window.localStorage.setItem(
      key,
      document.getElementById('textarea-' + key).value
    );
}
