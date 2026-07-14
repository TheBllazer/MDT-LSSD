import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ImageUploader.css';

// Upload vers Firebase Storage. On ne stocke que l'URL dans Firestore,
// donc la BDD Firestore elle-même ne grossit pas avec les images.
function ImageUploader({ onImageUrlReceived, currentImageUrl = null, folder = 'uploads' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Le fichier doit être une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Le fichier ne doit pas dépasser 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const path = `${folder}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      onImageUrlReceived(url);
    } catch (err) {
      console.error('Erreur upload:', err);
      setError("Erreur lors du téléchargement. Vérifiez votre connexion et les règles Storage.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onImageUrlReceived(null);
  };

  return (
    <div className="image-uploader">
      {currentImageUrl ? (
        <div className="image-preview">
          <img src={currentImageUrl} alt="Preview" />
          <button
            className="remove-image-btn"
            onClick={handleRemoveImage}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <label className="upload-area">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
          <Upload size={32} />
          <span>{uploading ? 'Téléchargement...' : 'Cliquez ou glissez une image'}</span>
        </label>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ImageUploader;
