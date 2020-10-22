'use strict';

function add(){
    const key = globalThis.prompt(
      'Key:',
      ''
    );
    if(key === null
      || key.length === 0){
        return;
    }

    const value = globalThis.prompt(
      'Value:',
      ''
    );
    if(value === null){
        return;
    }

    globalThis.localStorage.setItem(
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
    if(!globalThis.confirm('Clear all localStorage items?')){
        return;
    }

    globalThis.localStorage.clear();
    refresh();
}

function exportAll(){
    const exported = {};
    for(const key in globalThis.localStorage){
        if(!globalThis.localStorage.hasOwnProperty(key)){
            continue;
        }

        exported[key] = globalThis.localStorage.getItem(key);
    }

    globalThis.prompt(
      'Exported iterami localStorage:',
      JSON.stringify(exported)
    );
}

function importItems(){
    let json = globalThis.prompt(
      'Import JSON:',
      '{}'
    );
    if(json === null
      || json.length === 0){
        return;
    }

    json = JSON.parse(json);
    for(const key in json){
        globalThis.localStorage.setItem(
          key,
          json[key]
        );
    }
    refresh();
}

function refresh(){
    let keys = [];
    let output = '';

    for(const key in globalThis.localStorage){
        if(!globalThis.localStorage.hasOwnProperty(key)){
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
          + globalThis.localStorage.getItem(key)
          + '</textarea>';
    }

    document.getElementById('result').innerHTML = output;
}

function removeAll(){
    if(!globalThis.confirm('Remove all iterami localStorage items?')){
        return;
    }

    for(const key in globalThis.localStorage){
        if(!globalThis.localStorage.hasOwnProperty(key)){
            continue;
        }

        globalThis.localStorage.removeItem(key);
    }

    refresh();
}

function removeChecked(){
    if(!globalThis.confirm('Remove checked iterami localStorage items?')){
        return;
    }

    for(const key in globalThis.localStorage){
        if(!globalThis.localStorage.hasOwnProperty(key)){
            continue;
        }

        if(document.getElementById('checkbox-' + key).checked){
            globalThis.localStorage.removeItem(key);
        }
    }

    refresh();
}

function removeItem(key){
    if(!globalThis.confirm('Remove ' + key + '?')){
        return;
    }

    globalThis.localStorage.removeItem(key);
    document.getElementById(key).remove();
}

function updateItem(key){
    if(!globalThis.confirm('Save ' + key + '?')){
        return;
    }

    globalThis.localStorage.setItem(
      key,
      document.getElementById('textarea-' + key).value
    );
}
