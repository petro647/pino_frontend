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

const container: HTMLElement | null = document.querySelector('.container');

function main(_container: HTMLElement | null){
  if(!container){
    return;
  }

  // controllo nei cookie se l'utente ha gia fatto l'accesso nel breve termine, in caso negativo passo al login di sotto
      // ...controllo

  // gestione login
  setUpLogin();

  // click handler
  container.addEventListener('click', _clickHandler);
}

function setUpLogin(){
  const loginInputWrappers: NodeListOf<HTMLElement> | null = container.querySelectorAll('.input-wrapper');

  if(loginInputWrappers){
    loginInputWrappers.forEach(wrapper => {
      const placeholder = wrapper.querySelector('.placeholder');
      const input = wrapper.querySelector('input');

      if(!placeholder || !input) return;

      input.addEventListener('focus', () => {
        placeholder.setAttribute('data-typing', 'true');
      })

      input.addEventListener('blur', () => {
        if(input.value != '') return;
        placeholder.setAttribute('data-typing', 'false');
      })
    })
  }
}

function _clickHandler(e: MouseEvent){
  const target = e.target as HTMLElement;
}
main(container);