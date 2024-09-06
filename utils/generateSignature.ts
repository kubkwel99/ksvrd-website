export function generateSignature(callback: (arg0: any) => void, paramsToSign: any) {
   fetch(`/api/sign`, {
     method: "POST",
     body: JSON.stringify({
       paramsToSign,
     }),
   })
     .then((r) => r.json())
     .then(({ signature }) => {
       callback(signature);
     });
 }
 
 