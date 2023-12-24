/**
 * Singleton Global class
*/
class Global {
  static instance: Global;
  static state: string = 'login';

  static setState(_stateToAdd: string){
    this.state = _stateToAdd;
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
  if(Global.state == 'login'){
    setUpLogin(container);
  }

  // click handler
  container.addEventListener('click', _clickHandler);
  container.addEventListener('input', _inputHandler);
}

function setUpLogin(container: HTMLElement){
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

  if(target.matches('.input-wrapper .icon-wrapper')){
    const input = target.parentElement?.querySelector('input');
    const showHide = target.querySelector('img');
    if(!showHide || !input) return;

    if (input.getAttribute("type") === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }

    showHide.classList.toggle('show-password');
  }
}

function _inputHandler(e: Event){
  const target = e.target as HTMLInputElement;

  if(target.matches('input.login[name="password"]')){
    const showHide = target.parentElement?.querySelector('img');
    if(!showHide) return;

    if(target.value == ''){
      showHide.classList.toggle('show-img', false);
      return;
    }
    showHide.classList.toggle('show-img', true);
  }
}

main(container);