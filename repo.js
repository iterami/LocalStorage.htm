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

        const repo = key.slice(
          0,
          key.indexOf('.htm-') + 4
        );
        const value = globalThis.localStorage.getItem(key);

        output += '<tr id="' + key + '"><td>'
          + '<a href="../' + repo + '/index.htm">' + key + '</a><br><input id="checkbox-'
          + key
          + '" type=checkbox><input onclick="removeItem(\'' + key + '\')" type=button value=X><input onclick="updateItem(\'' + key + '\')" type=button value=Save>'
          + '<br>Length: ' + value.length
          + '<td><textarea id="textarea-' + key + '">' + value + '</textarea>';
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

function removeSelected(){
    if(!globalThis.confirm('Remove selected iterami localStorage items?')){
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

function repo_init(){
    core_repo_init({
      'events': {
        'add': {
          'onclick': add,
        },
        'clearAll': {
          'onclick': clearAll,
        },
        'exportAll': {
          'onclick': exportAll,
        },
        'importItems': {
          'onclick': importItems,
        },
        'refresh': {
          'onclick': refresh,
        },
        'removeAll': {
          'onclick': removeAll,
        },
        'removeSelected': {
          'onclick': removeSelected,
        },
        'selectAll': {
          'onclick': selectAll,
        },
      },
      'keybinds': {
        82: {
          'todo': function(){
              if(document.activeElement.tagName.toLowerCase() !== 'textarea'){
                  refresh();
              }
          },
        },
      },
      'title': 'LocalStorage.htm',
    });

    refresh();
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

function selectAll(){
    const inputs = document.getElementsByTagName('input');
    for(const input in inputs){
        if(inputs[input].type === 'checkbox'){
            inputs[input].checked = true;
        }
    }
}
