import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../lib/api';

export default function UploadDistribute({ onDone }) {

  const [file, setFile] = useState(null);

  const onUpload = async () => {

    if (!file) return toast.error('Choose a file');

    try {
      const res = await api.uploadFile(file); 
      toast.success(`Inserted ${res.inserted}`); 
      onDone?.(); 
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    
    <div className="space-x-2">
      <input
        type="file"
        accept=".csv,.xls,.xlsx"
        onChange={e => setFile(e.target.files[0])}
      />

      <button className="btn" onClick={onUpload}>Upload</button>

      <style jsx>{`
        .btn {
          background: #111;
          color: #fff;
          padding: 4px 12px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
