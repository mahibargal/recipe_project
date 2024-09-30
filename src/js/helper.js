import { API_URL,TIMEOUT_SEC} from './config.js';

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

export const getJSON = async function (id) {
    try {
        const api = fetch(`${API_URL}${id}`)
        const res = await Promise.race([api,timeout(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res?.ok) throw new Error(`${data?.message} ${data?.status}`);
        return data;
    } catch (err) {
        throw err;
        console.log(err);
    }
}