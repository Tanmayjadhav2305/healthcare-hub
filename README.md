# HealthCare Hub - Hospital Management System

A comprehensive healthcare management system built with React and Material-UI that provides information about medicines, diseases, and healthcare services. This system serves as a one-stop solution for both healthcare providers and patients, offering features for medicine management, disease information, and patient care.

## 🌟 Key Features

### For Patients
- **Medicine Catalog**: Browse and search for various medicines with detailed information
  - Search by name, category, or manufacturer
  - View detailed medicine information including dosage and side effects
  - Read user reviews and ratings
  - Add medicines to cart for purchase

- **Disease Information**: Comprehensive database of diseases with:
  - Detailed symptoms and causes
  - Treatment options and prevention methods
  - Severity indicators
  - Contagious status warnings
  - Category-based organization

- **Shopping Cart**: 
  - Add/remove medicines
  - Quantity management
  - Price calculation
  - Checkout process

- **Profile Management**:
  - View and edit personal information
  - Track order history
  - Manage prescriptions
  - Save favorite medicines

### For Doctors
- **Doctor Dashboard**:
  - Patient management
  - Prescription creation
  - Appointment scheduling
  - Medical history access

- **Prescription Management**:
  - Create digital prescriptions
  - Track patient medication history
  - Set dosage instructions
  - Add notes and recommendations

## 🛠️ Technologies Used

- **Frontend Framework**: React.js
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v6
- **State Management**: React Context API
- **Styling**: 
  - Material-UI components
  - Custom CSS-in-JS
  - Responsive design principles

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthcare-hub.git
```

2. Navigate to the project directory:
```bash
cd healthcare-hub
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Navbar.js
│   ├── Footer.js
│   └── ProtectedRoute.js
├── context/       # Context providers for state management
│   ├── AuthContext.js
│   └── CartContext.js
├── data/          # Static data
│   ├── medicines.js
│   └── diseases.js
├── pages/         # Page components
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── MedicineCatalog.js
│   ├── MedicineDetails.js
│   ├── Cart.js
│   ├── DoctorDashboard.js
│   ├── PatientDashboard.js
│   ├── Diseases.js
│   ├── Profile.js
│   └── EditProfile.js
└── App.js         # Main application component
```

## 🔒 Security Features

- Role-based access control (Doctor/Patient)
- Protected routes
- Secure authentication
- Data validation
- Input sanitization

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Modern and clean interface
- Intuitive navigation
- Loading states and error handling
- Smooth animations and transitions
- Accessible components

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

Tanmay Jadhav - [tanmayjadhav2305@gmail.com](mailto:tanmayjadhav2305@gmail.com)

Project Link: [https://github.com/Tanmayjadhav2305/healthcare-hub](https://github.com/Tanmayjadhav2305/healthcare-hub)

## 🙏 Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors and supporters

## 📝 Deployment

This project is configured for deployment on Vercel.

### 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_ALLOWED_DOMAINS=*
REACT_APP_MAX_LOGIN_ATTEMPTS=10
REACT_APP_SESSION_TIMEOUT=7200
REACT_APP_API_URL=http://localhost:3000
REACT_APP_ENABLE_IP_RESTRICTION=false
```
