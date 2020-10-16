export const getNumbers = (httpClient) => {
    return httpClient.get('/getNumbers')
        .then(response => response.data);
};