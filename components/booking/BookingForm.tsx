import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface FormErrors {
  [key: string]: string;
}

const BookingForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9\s-()]{10,}$/;
    const cardNumberRegex = /^[0-9\s-]{13,19}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
    } else if (!expiryDateRegex.test(formData.expirationDate)) {
      newErrors.expirationDate = 'Please use MM/YY format';
    }
    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number (add spaces every 4 digits)
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ')
        .substring(0, 19) || '';
      setFormData({ ...formData, [name]: formattedValue });
    } 
    // Format expiration date (MM/YY)
    else if (name === 'expirationDate') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
      setFormData({ ...formData, [name]: formattedValue });
    }
    // Format CVV (limit to 4 digits)
    else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      setFormData({ ...formData, [name]: formattedValue });
    }
    // Format phone number (basic formatting)
    else if (name === 'phoneNumber') {
      const formattedValue = value.replace(/[^0-9+\-()\s]/g, '');
      setFormData({ ...formData, [name]: formattedValue });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare the booking data
      const bookingData = {
        ...formData,
        // Add any additional data needed for the booking
        propertyId: router.query.id,
        checkInDate: new Date().toISOString(), // Replace with actual dates
        checkOutDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      };

      const response = await axios.post('/api/bookings', bookingData);
      
      if (response.data.success) {
        toast.success('Booking confirmed!');
        // Redirect to booking confirmation page
        router.push(`/booking/confirmation/${response.data.bookingId}`);
      } else {
        throw new Error(response.data.message || 'Failed to confirm booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to process booking. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ name, label, type = 'text', placeholder = '' }: { 
    name: keyof FormData; 
    label: string; 
    type?: string;
    placeholder?: string;
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {errors[name] && <span className="text-red-500 text-xs ml-2">{errors[name]}</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
      />
    </div>
  );

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Complete Your Booking</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="firstName" label="First Name" placeholder="John" />
            <InputField name="lastName" label="Last Name" placeholder="Doe" />
            <InputField name="email" type="email" label="Email Address" placeholder="john@example.com" />
            <InputField name="phoneNumber" label="Phone Number" placeholder="+1 (123) 456-7890" />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Payment Information</h3>
          <InputField 
            name="cardNumber" 
            label="Card Number" 
            placeholder="1234 5678 9012 3456"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField 
              name="expirationDate" 
              label="Expiration Date (MM/YY)" 
              placeholder="MM/YY"
            />
            <InputField 
              name="cvv" 
              label="CVV" 
              placeholder="123"
              type="password"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Billing Address</h3>
          <InputField 
            name="streetAddress" 
            label="Street Address" 
            placeholder="123 Main St"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="city" label="City" placeholder="New York" />
            <InputField name="state" label="State/Province" placeholder="NY" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField name="zipCode" label="ZIP/Postal Code" placeholder="10001" />
            <InputField name="country" label="Country" placeholder="United States" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-600 hover:bg-green-700'
          } transition-colors`}
        >
          {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;