import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [divideTime, setDivideTime] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpload = (files) => {
    const filePromises = Array.from(files).map((file) => convertToBase64(file));
    Promise.all(filePromises).then((base64Files) => {
      setUploadedFiles(
        base64Files.map((base64, index) => ({
          file: files[index],
          base64,
          duration: 0,
        }))
      );
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
      const dividedDuration = Math.floor((totalDuration * 60) / uploadedFiles.length);
      return dividedDuration;
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
        imageName: image.file.name, // Use the actual file name
        imageUrl: image.base64,    // Base64-encoded string
        startDate: "2024-11-20",   // Replace with actual start date
        endDate: "2024-11-25",     // Replace with actual end date
        startTime: "08:00:00",     // Replace with actual start time
        endTime: "18:00:00",       // Replace with actual end time
        duration: divideTime ? calculateDividedDuration() : Number(image.duration), // Ensure duration is a number
      };
  
      try {
        const response = await fetch('https://ad-display-backend.onrender.com/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload), // Send single image payload
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log('Image successfully uploaded:', result);
          setMessage('Image uploaded successfully!');
        } else {
          const errorData = await response.json();
          console.error('Error uploading image:', errorData.error);
          setMessage(errorData.error || 'Failed to upload an image. Please try again.');
          break; // Stop further uploads on error
        }
      } catch (err) {
        console.error('Error:', err);
        setMessage('An error occurred while uploading an image.');
        break; // Stop further uploads on error
      }
    }
  
    setLoading(false);
    setUploadedFiles([]); // Clear all files after the upload process
  };
  
  
  

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Ad Display Portal</h1>

      {/* Section 1: Upload Files */}
      <ImageUpload onUpload={handleUpload} />

      {/* Section 2: Divide Time Duration Equally */}
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

          {/* Total Duration Input */}
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

      {/* Section 3: Uploaded Images */}
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Images</h3>
          {uploadedFiles.map((image, index) => (
            <div
              key={index}
              style={{
                flexDirection: 'row', // Row layout
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: '10px',
                gap: '10px', // Space between child views
              }}
            >
              {/* Thumbnail */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '5px',
                }}
              >
                <img
                  src={image.base64}
                  alt={image.file.name}
                  style={{
                    width: '60px', // Smaller thumbnail
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '5px',
                  }}
                />
              </div>

              {/* File Name */}
              <div
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingLeft: '5px',
                  width: 300,
                  backgroundColor: 'yellow',
                }}
              >
                <p
                  style={{
                    margin: '0',
                    fontSize: '14px',
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {image.file.name.length > 15
                    ? `${image.file.name.slice(0, 15)}...`
                    : image.file.name}
                </p>
              </div>

              {/* Duration Input */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '5px',
                }}
              >
                <input
                  type="number"
                  disabled={divideTime}
                  value={
                    divideTime
                      ? calculateDividedDuration()
                      : image.duration // Show divided duration or editable duration
                  }
                  onChange={(e) => handleDurationChange(index, e.target.value)}
                  style={{
                    width: '100px',
                    padding: '5px',
                  }}
                />
              </div>

              {/* Remove Button */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '5px',
                }}
              >
                <button
                  onClick={() => handleRemoveImage(index)}
                  style={{
                    padding: '5px 10px',
                    cursor: 'pointer',
                    color: 'white',
                    backgroundColor: 'red',
                    border: 'none',
                    borderRadius: '5px',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled() || loading}
            style={{
              padding: '10px 20px',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: 'white',
              backgroundColor: loading ? 'grey' : 'blue',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      )}

      {/* Success/Error Message */}
      {message && (
        <div style={{ marginTop: '20px', color: message.includes('successfully') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
