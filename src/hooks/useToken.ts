import { useState } from 'react';

export default function useToken() {
  let map:any =  new Map();

  const getToken = () => {
    const tokenString: string = localStorage.getItem('token') || map.set("token","12345");
    const userToken: any = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken:any = (userToken:any) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}