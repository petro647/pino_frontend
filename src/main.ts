/**
 * Singleton Global class
*/
class Global {
  static instance: Global;
  static states: Array<string> = new Array();

  static removeState(_stateToRemove: string){
    this.states = this.states.filter((_state) => {
      return _state != _stateToRemove;
    })
  }

  static addState(_stateToAdd: string){
    this.states.push(_stateToAdd);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return Global.instance;
  }
}

const container = document.querySelector('.container') as HTMLElement;

function main(_container: HTMLElement){
  if(!container){
    return;
  }

  // gestione login
  const loginInput = container.querySelector('input.login');
  const usernamePlaceholder = container.querySelector('.username-placeholder');
  if(loginInput){
    loginInput.addEventListener('focus', () => {
      usernamePlaceholder.setAttribute('data-typing-username', 'true');
    })

    loginInput.addEventListener('blur', () => {
      usernamePlaceholder.setAttribute('data-typing-username', 'false');
    })
  }

  // click handler
  container.addEventListener('click', _clickHandler);
}

function _clickHandler(e: MouseEvent){
  const target = e.target as HTMLElement;
}
main(container);