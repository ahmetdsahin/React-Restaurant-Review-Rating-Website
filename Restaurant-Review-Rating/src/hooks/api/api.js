import { API_BASE_URL, BEARER_TOKEN } from "./config";
import queryString from 'query-string';

// 'get' fonksiyonunu tanımlıyor
export function get(path, queryParams) {
  // Sorgu parametrelerini birleştiriyor
  const query = queryString.stringify(queryParams);
  
  // Fetch API ile GET isteği yapıyor
  return fetch(`${API_BASE_URL}${path}?${query}`, {
    headers: {
      // Yetkilendirme başlığına Bearer token ekliyorum
      Authorization: `Bearer ${BEARER_TOKEN}`,
      // İstek kaynağını belirtiyor
      Origin: 'localhost',
      // Kimlik bilgilerini dahil ediyor
      withCredentials: true, 
    }
  });
}
