import axios from 'axios';
import store from '../App/reducks/store';

const headersConf = () => {
  const session = store.getState().session;
  return {
    Authorization: session.token,
  };
};

const host = 'http://localhost:8080';

const GET = (url, body) => {
  const headers = headersConf();
  return axios({
    url: host + url,
    method: 'GET',
    params: body,
    headers,
  });
};

const POST = (url, body) => {
  const headers = headersConf();
  return axios({
    url: host + url,
    method: 'POST',
    body,
    headers,
  });
};

const PUT = (url, body) => {
  const headers = headersConf();
  return axios({
    url: host + url,
    method: 'PUT',
    body,
    headers,
  });
};

const DELETE = (url, body) => {
  const headers = headersConf();
  return axios({
    url: host + url,
    method: 'DELETE',
    params: body,
    headers,
  });
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
