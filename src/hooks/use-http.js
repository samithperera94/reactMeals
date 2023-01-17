import {useState,useCallback} from 'react';
const useHttp = ()=> {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const sendRequest = useCallback(async (configs) => {
        setIsLoading(true);
        console.log("onfigs.url",configs.url);
        try{
            const response = await fetch(configs.url,{
                method: configs.method ? configs.method : 'GET',
                headers: configs.headers ? configs.headers : {},
                body: configs.body ? JSON.stringify(configs.body) : null, 
            });
            if(!response.ok){
                throw new Error('request failed')
            }
            
            const data = await response.json();
            console.log(data);
            if(typeof configs.applyData == 'function'){
                configs.applyData(data);
                
            }
            setSuccess(true);
            setIsLoading(false);
            return true;
        }catch(error){
            setError(error.message || 'Something went wrong!');
            setIsLoading(false);
            return false;
        }
       
        
    },[])

    return{
        isLoading,
        error,
        success,
        sendRequest
    }

}

export default useHttp;