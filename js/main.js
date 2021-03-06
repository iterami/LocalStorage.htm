'use strict';

function repo_init(){
    core_repo_init({
      'events': {
        'add': {
          'onclick': add,
        },
        'checkAll': {
          'onclick': checkAll,
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
        'removeChecked': {
          'onclick': removeChecked,
        },
      },
      'keybinds': {
        82: {
          'todo': refresh,
        },
      },
      'title': 'LocalStorage.htm',
    });

    refresh();
}
