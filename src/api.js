export const fetchApi = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => {
        console.log(response);
        if(response.ok) {
          return response.json();
        } else {
          alert("Ошибка загрузки данных");
        }
      })
      .then(data => {
        resolve(data);
      })
      .catch((e) => {
        alert("При загрузке произошла ошибка: \n" + e);
      });
  });
}

export default class CallApi {

  static getPeopleData() {
    return fetchApi("https://api.npoint.io/324f4ca2cdd639760638");
  }

  // static getCurrencyData(){
  //   return fetchApi("http://api.exchangeratesapi.io/v1/latest?access_key=fe414feb63fe888fecfc75f6234266cb&format=1");
  // }

}