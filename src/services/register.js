export const register = (httpClient, requestBody) => {
    
    return httpClient.post(`${process.env.REACT_APP_API_URL}/saveAdmin`, requestBody)
        .then(response => {
            console.log('response: ', response)
            return response.data
        });
};