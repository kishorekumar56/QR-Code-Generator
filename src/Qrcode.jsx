import { useState } from "react"

export const Qrcode = () => {
  const[img,setImg]=useState("");
  const[loading,setLoading]=useState(false);
  const [qrData,setQrData]=useState("");
  async function generateQR(){
    setLoading(true);
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch(error){
      console.error("Error generating QR code",error)
    } finally{
      setLoading(false);
    }
  }
  function downloadQR(){
    fetch(img).then((response)=>response.blob())
    .then((blob)=>{
      const link = document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QRcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  return (
    <div className="app-container">
    <h1>QR CODE GENERATOR</h1>
    {loading && <p>Please wait...</p>}
    {img && <img src={img} className="qr-code-image" />}
    <div>
    <label htmlFor="dataInput" className="input-label">
      Data for QR CODE:
    </label>
    <input type="text" value={qrData} id="dataInput" placeholder="Enter data for QR code" onChange={(e)=>setQrData(e.target.value)} />
    <label htmlFor="sizeInput" placeholder="Enter image size" />
    <button className="generate-button" onClick={generateQR} >
      Generate QR code</button>
      <button className="download-button" onClick={downloadQR}>Download QR Code</button>    
    </div></div>
    
  )
}
