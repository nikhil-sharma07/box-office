const API_BASE_URL="https://api.tvmaze.com";

export async function apiGet(queryString){
    const response=await fetch(`${API_BASE_URL}${queryString}`).then(data => 
        data.json()
    );
    return response;
}