const stateURL =  'http://127.0.0.1:8000/keeper/';

class API {

  static createState() {
    return fetch(stateURL, {
      method: 'POST'
    }).then((res) => {
      return res.json();
    });
  };

  static getState() {
    if (!standaloneMode) {
      return fetch(stateURL + '?key=' + localStorage.getItem('mockupGUID'))
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return {'result': 'not ok'};
          }
        });
    } else {
      return Promise.resolve({'result': {'result': JSON.parse(localStorage.getItem('localState'))}});
    }
  };

  static setState(replacementPage={}) {
    if (!standaloneMode) {
      return fetch(stateURL, {
        method: 'PUT', body: JSON.stringify({
          key: localStorage.getItem('mockupGUID'), 'state': getState(true, replacementPage)
        }).replaceAll('\\"', '&quot;')
      });
    } else {
      localStorage.setItem(
        'localState',
        JSON.stringify(getState(true, replacementPage))
        .replaceAll('\\"', '&quot;'));
      return Promise.resolve();
    }
  }

  static startVisioFileGeneration() {
    return fetch(stateURL + 'makevsdx/?key=' + localStorage.getItem('mockupGUID'))
      .then(res => res.ok);
  };
}
