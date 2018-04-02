import axios from 'axios';
import config from '../../config';
import store from '../App/reducks/store';

const headersConf = others => {
  const session = store.getState().session;
  if (others)
    return {
      ...others,
      Authorization: session.token,
    };
  return {
    Authorization: session.token,
  };
};

const host = config.host;

const GET = (url, data, _headers) => {
  const headers = headersConf(_headers);
  return axios({
    url: host + url,
    method: 'GET',
    params: data,
    headers,
  });
};

const POST = (url, data, _headers) => {
  const headers = headersConf(_headers);
  return axios({
    url: host + url,
    method: 'POST',
    data,
    headers,
  });
};

const PUT = (url, data, _headers) => {
  const headers = headersConf(_headers);
  return axios({
    url: host + url,
    method: 'PUT',
    data,
    headers,
  });
};

const DELETE = (url, data, _headers) => {
  const headers = headersConf(_headers);
  return axios({
    url: host + url,
    method: 'DELETE',
    params: data,
    headers,
  });
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
