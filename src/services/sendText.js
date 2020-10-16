export const sendText = (httpClient, requestBody) => {
    const token = localStorage.getItem('paToken');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    return httpClient.post(`${process.env.REACT_APP_API_URL}/getNumbers`, requestBody, config)
        .then(response => {
            console.log('response: ', response)
            return response.data
        });
};