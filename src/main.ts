/**
 * Singleton Global class
*/

class Global {
  static instance: Global;
  

  static getInstance() {
    if (!Global.instance) {
      Global.instance = new Global();
    }
    return Global.instance;
  }
}