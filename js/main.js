'use strict';

function repo_init(){
    core_repo_init({
      'keybinds': {
        82: {
          'todo': refresh,
        },
      },
      'title': 'LocalStorage.htm',
    });

    refresh();
}
