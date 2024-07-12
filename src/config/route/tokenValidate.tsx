import {SetItemLocalStorage, GetItemLocalStorage} from '../../helper/localStorage'
// auth.ts
export const validateToken = async (token: string): Promise<boolean> => {
    try {
    
        const raw = JSON.stringify({
            token: token
        })
        
      const response = await fetch('https://api-pi-senac.azurewebsites.net/api/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: raw
      });
  
      if (!response.ok) {
        return false;
      }
  
      const data = await response.json();
      if(!GetItemLocalStorage('user')) {
        SetItemLocalStorage('user', JSON.stringify(data.decoded.data))
      }
      return data.valid; // Supondo que a API retorna um objeto { valid: true/false }
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };
  