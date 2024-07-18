import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const shuffleArray = (array: any = []) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const selectRandomArrayElements = (array: any = [], count: number) => {
  const shuffledArray = shuffleArray(array);
  const selectedElements = shuffledArray.slice(0, count);
  return selectedElements;
}

export const getAddressString = (address: any) => {
  const {
    name = '',
    phone = '',
    country = '',
    state = '',
    lineAddress1 = '',
    lineAddress2 = '',
    city = '',
    zip = ''
  } = address;

  // Create the address string
  let addressString = `${name}\n${phone}\n${lineAddress1}`;

  if (lineAddress2) {
    addressString += `\n${lineAddress2}`;
  }

  addressString += `\n${city}, ${state} ${zip}\n${country}`;

  return addressString.trim();
};

// Function to check if formData is empty
export const isFormDataEmpty = (formData: any) => {

  for (let key in formData) {
    if (formData[key].trim() !== '') {
      return false; // Found a non-empty field
    }
  }
  return true; // All fields are empty
};

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const handleAddShippingAddress = async (formData: any) => {
  const response = await fetch('/api/users', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...formData }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }
  return await response.json();
};