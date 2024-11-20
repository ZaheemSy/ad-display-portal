import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import Resizer from 'react-image-file-resizer';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cloudinaryImages, setCloudinaryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [divideTime, setDivideTime] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch Cloudinary Images on Load
  useEffect(() => {
    const fetchCloudinaryImages = async () => {
      try {
        const response = await fetch('https://ad-display-backend.onrender.com/api/cloudinary-images');
        const result = await response.json();
        if (result.success) {
          setCloudinaryImages(result.data);
        } else {
          console.error(result.error);
        }
      } catch (err) {
        console.error('Error fetching Cloudinary images:', err);
      }
    };

    fetchCloudinaryImages();
  }, []);

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800, // Max width
        800, // Max height
        'JPEG', // Output format
        90, // Quality (0-100)
        0, // Rotation
        (uri) => resolve(uri),
        'base64' // Output type
      );
    });

  const handleUpload = async (files) => {
    const resizedImages = await Promise.all(
      Array.from(files).map((file) => resizeImage(file))
    );
    setUploadedFiles(
      resizedImages.map((base64, index) => ({
        file: files[index],
        base64,
        duration: 0,
      }))
    );
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleDurationChange = (index, value) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles[index].duration = value;
    setUploadedFiles(updatedFiles);
  };

  const calculateDividedDuration = () => {
    if (uploadedFiles.length > 0 && totalDuration > 0) {
      return Math.floor((totalDuration * 60) / uploadedFiles.length);
    }
    return 0;
  };

  const isSubmitDisabled = () => {
    if (divideTime || uploadedFiles.length === 0) return false;
    return uploadedFiles.some((image) => image.duration === 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    for (const image of uploadedFiles) {
      const payload = {
        imageName: image.file.name,
        imageUrl: image.base64,
        startDate: '2024-11-20',
        endDate: '2024-11-25',
        startTime: '08:00:00',
        endTime: '18:00:00',
        duration: divideTime ? calculateDividedDuration() : Number(image.duration),
      };

      try {
        const response = await fetch('https://ad-display-backend.onrender.com/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`Image ${image.file.name} uploaded successfully:`, result);
          setMessage(`Image ${image.file.name} uploaded successfully!`);
        } else {
          const errorData = await response.json();
          console.error(`Error uploading ${image.file.name}:`, errorData.error);
          setMessage(errorData.error || `Failed to upload ${image.file.name}.`);
        }
      } catch (err) {
        console.error(`Error uploading ${image.file.name}:`, err);
        setMessage(`An error occurred while uploading ${image.file.name}.`);
      }
    }

    setLoading(false);
    setUploadedFiles([]); // Clear uploaded files after submission
  };

  const handleDeleteImage = async (publicId) => {
    try {
      const response = await fetch(`https://ad-display-backend.onrender.com/api/cloudinary-images/${publicId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCloudinaryImages(cloudinaryImages.filter((image) => image.public_id !== publicId));
        setMessage(`Image with Public ID ${publicId} deleted successfully!`);
      } else {
        const result = await response.json();
        console.error(result.error);
        setMessage(result.error);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const response = await fetch('https://ad-display-backend.onrender.com/api/cloudinary-images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public_ids: selectedImages }),
      });

      if (response.ok) {
        setCloudinaryImages(
          cloudinaryImages.filter((image) => !selectedImages.includes(image.public_id))
        );
        setSelectedImages([]);
        setMessage('Selected images deleted successfully!');
      } else {
        const result = await response.json();
        console.error(result.error);
        setMessage(result.error);
      }
    } catch (err) {
      console.error('Error deleting multiple images:', err);
    }
  };

  const toggleSelectImage = (publicId) => {
    setSelectedImages((prev) =>
      prev.includes(publicId) ? prev.filter((id) => id !== publicId) : [...prev, publicId]
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Ad Display Portal</h1>

      <ImageUpload onUpload={handleUpload} />

      {/* Upload Section */}
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <label>
            <input
              type="checkbox"
              checked={divideTime}
              onChange={(e) => setDivideTime(e.target.checked)}
            />
            Divide time Duration equally
          </label>

          {divideTime && (
            <div style={{ marginTop: '10px' }}>
              <label>Total Duration (in minutes): </label>
              <input
                type="number"
                value={totalDuration}
                onChange={(e) => setTotalDuration(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Cloudinary Image Management */}
      <div>
        <h2>Cloudinary Images</h2>
        {cloudinaryImages.length > 0 && (
          <div>
            <button onClick={handleBulkDelete} disabled={selectedImages.length === 0}>
              Delete Selected Images
            </button>
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedImages.length === cloudinaryImages.length}
                      onChange={() =>
                        setSelectedImages(
                          selectedImages.length === cloudinaryImages.length
                            ? []
                            : cloudinaryImages.map((img) => img.public_id)
                        )
                      }
                    />
                  </th>
                  <th>Preview</th>
                  <th>Public ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cloudinaryImages.map((image) => (
                  <tr key={image.public_id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.public_id)}
                        onChange={() => toggleSelectImage(image.public_id)}
                      />
                    </td>
                    <td>
                      <img src={image.url} alt={image.public_id} style={{ width: '100px' }} />
                    </td>
                    <td>{image.public_id}</td>
                    <td>
                      <button onClick={() => handleDeleteImage(image.public_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitDisabled() || loading}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'blue', color: 'white' }}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>

      {/* Message */}
      {message && <p style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
}

export default App;
