export async function covertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = ()=>{
        resolve(fileReader.result);
      };
      fileReader.onerror = (error)=>{
        reject(error);
      }
    })
  };

 export  async function handleFileUpload(e){
    const file = e.target.files[0];
    const base64File = await covertToBase64(file);
    return base64File;
   };

