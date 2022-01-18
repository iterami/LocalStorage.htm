'use strict';

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
          'todo': refresh,
        },
      },
      'title': 'LocalStorage.htm',
    });

    refresh();
}
