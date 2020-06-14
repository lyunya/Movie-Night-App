import TokenService from '../services/token-service'
import config from '../config'

const MovieListApiService = {
  getLists() {
    return fetch(`${config.API_ENDPOINT}/lists`, {
      headers: {},
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getList(listId) {
    return fetch(`${config.API_ENDPOINT}/lists/${listId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postList(listId, )
};