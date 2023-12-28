interface ObjOfElements {
  [key: string]: Element
}

/**
 * Singleton Global class
*/
class Global {
  static instance: Global;
  static state: string = 'login';

  static setState(_stateToAdd: string){
    this.state = _stateToAdd;
  }

  static elements: ObjOfElements = {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new Global();
    }
    return Global.instance;
  }
}

const container: HTMLElement | null = document.querySelector('.container');
const backendURL = "http://localhost:3000";

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

  if(target.matches('.login-page button.login')){
    const loginBox = document.querySelector('.login-page .login-box');
    const userNameInput: HTMLInputElement | null | undefined = loginBox?.querySelector('input[name="username"]');
    const passwordInput: HTMLInputElement | null | undefined = loginBox?.querySelector('input[name="password"]');
    if(!userNameInput || !passwordInput){
      return;
    }
    const userName = userNameInput.value.trim();
    const password = passwordInput.value.trim();

    fetch(`${backendURL}/login/signin?user_name=${userName}&password=${password}`)
    .then(res => {
      const status = res.status;
      console.log(status);

      // todo: implementare il fatto che il backend mi debba restituire un token quando mi loggo, e io solo con quel token posso fare le richieste successive
      // invece lato backend devo assicurarmi che dopo 5 tentativi sbagliati della password non sia possibile piu loggarsi con quell utente, a quel punto verra inviato un codice di conferma via sms da dover inserire nell app per confermare il login

      if(status != 200){
        throw new Error;
      }
      return res.json()
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.log(err);
    })
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

  if(target.matches('input.login[name="username"]')){

  }
}

main(container);