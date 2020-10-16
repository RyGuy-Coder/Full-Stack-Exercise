export const saveForms = (httpClient, requestBody) => {
    
    return httpClient.post(`${process.env.REACT_APP_API_URL}/saveForms`, requestBody)
        .then(response => {
            console.log('response: ', response)
            return response.data
        });
};