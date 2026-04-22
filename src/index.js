/**
 * index.js - Entry point của ứng dụng React Quiz
 * 
 * File này là điểm khởi đầu của ứng dụng, nó sẽ:
 * 1. Import React và các thư viện cần thiết
 * 2. Tìm phần tử root trong file index.html
 * 3. Render component App vào root element
 */

// Import React core - bắt buộc để sử dụng JSX
import React from 'react';

// Import ReactDOM để render React components vào DOM
import ReactDOM from 'react-dom/client';

// Import component App chính của ứng dụng
import App from './App';

// === TẠO ROOT ELEMENT ===
// Lấy phần tử HTML có id="root" từ file public/index.html
// Phần tử này là nơi toàn bộ ứng dụng React sẽ được gắn vào
const root = ReactDOM.createRoot(document.getElementById('root'));

// === RENDER ỨNG DỤNG ===
// render() sẽ hiển thị component App lên màn hình
// React.StrictMode là một wrapper giúp phát hiện các vấn đề tiềm ẩn trong code
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);