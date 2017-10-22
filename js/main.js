'use strict';

function repo_init(){
    core_repo_init({
      'info-events': {
        'checkAll': {
          'todo': checkAll,
        },
        'clearAll': {
          'todo': clearAll,
        },
        'refresh': {
          'todo': refresh,
        },
        'removeAll': {
          'todo': removeAll,
        },
        'removeChecked': {
          'todo': removeChecked,
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
