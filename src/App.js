import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import Resizer from 'react-image-file-resizer';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [divideTime, setDivideTime] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const resizeImage = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        800,
        800,
        'JPEG',
        90,
        0,
        (uri) => resolve(uri),
        'base64'
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

  const handleSubmit = async () => {
    // Handle submission logic here
    console.log('Submitting:', uploadedFiles, startDate, endDate, startTime, endTime);
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>Ad Display Portal</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Choose Images
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          List Images
        </button>
      </div>

      <div>
        <h3>Uploaded Image(s) List</h3>
        <div
          style={{
            border: '1px solid black',
            height: '100px',
            overflowY: 'scroll',
            marginBottom: '20px',
          }}
        >
          {uploadedFiles.map((file, index) => (
            <p key={index} style={{ padding: '5px' }}>
              {file.file.name}
            </p>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
        <div>
          <h3>Common Start/End Dates and Times</h3>
          <div>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <div>
            <label>
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <div>
            <label>
              End Time:
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={divideTime}
                onChange={(e) => setDivideTime(e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              Divide Time Duration Equally
            </label>
          </div>
          {divideTime && (
            <div>
              <label>
                Duration in Minutes:
                <input
                  type="number"
                  value={totalDuration}
                  onChange={(e) => setTotalDuration(e.target.value)}
                  style={{ marginLeft: '10px' }}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid black',
          padding: '10px',
        }}
      >
        {uploadedFiles.map((image, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'red',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                Thumbnail
              </div>
              <p>{image.file.name}</p>
            </div>
            <input
              type="number"
              placeholder="Duration in seconds"
              value={divideTime ? calculateDividedDuration() : image.duration}
              onChange={(e) => handleDurationChange(index, e.target.value)}
              disabled={divideTime}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
