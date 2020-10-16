export const login = (httpClient, requestBody) => {

    return httpClient.get(`${process.env.REACT_APP_API_URL}/getAdmin`, requestBody)
        .then(response => {
            console.log('response: ', response)
            return response.data
        });
};