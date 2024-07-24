import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { europeanCountriesWithStates, FormData } from './data'

interface Props {
  formData: FormData;
  setFormData?: Dispatch<SetStateAction<FormData>>;
  readOnly?: boolean;
}

const UserAddressForm: FC<Props> = (props) => {
  const { formData, setFormData, readOnly = false } = props;
  const [phoneSample, setPhoneSample] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const selectedCountryStates = formData?.country && (europeanCountriesWithStates?.find(country => country.value === formData.country)?.states || []) || [];
  
  useEffect(() => {
    const country = europeanCountriesWithStates.find(c => c.value === formData.country);
    if (country) {
      setPhoneSample(country.phoneSample || '');
    } else {
      setPhoneSample('');
    }
  }, [formData.country]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = 'Receiver Name is required';
    if (!formData.phone) newErrors.phone = 'Receiver Phone is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (selectedCountryStates.length > 0 && !formData.state) newErrors.state = 'State is required';
    if (!formData.lineAddress1) newErrors.lineAddress1 = 'Address Line 1 is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zip) newErrors.zip = 'Zip is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <div className="">
      <div className={`flex flex-col ${readOnly && 'lg:flex-row'} mt-4 gap-4`}>
        <div className='w-full'>
          <label htmlFor="name" className="block text-sm font-medium">
            Receiver Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              value={formData?.name}
              name="name"
              className={`block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.name && 'border-red-500'}`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="phone" className="block text-sm font-medium">
            Receiver Phone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              required
              disabled={readOnly}
              placeholder={phoneSample}
              type='string'
              value={formData?.phone}
              name="phone"
              className={`block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.phone && 'border-red-500'}`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-4 lg:flex-row'>
        <div className='w-full'>
          <label htmlFor="country" className="block text-sm font-medium">
            Country
          </label>
          <div className="relative mt-1">
            <select
              disabled={readOnly}
              id="country"
              name="country"
              value={formData?.country}
              className={`${readOnly && 'bg-[#efefef4d]'} focus:shadow-outline-blue mt-1 block h-[40px] w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none dark:bg-[#3b3b3b4d] sm:text-sm ${errors.country && 'border-red-500'}`}
              onChange={(e) => {
                setFormData?.(prev => ({ ...prev, country: e.target.value }));
                setFormData?.(prev => ({ ...prev, state: '' }))
              }}
            >
              {europeanCountriesWithStates?.map(({ value, label, disabled = false }) =>
                <option key={value + label} disabled={disabled} value={value}>{label}</option>)}
            </select>
          </div>
          {errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
        </div>
        <div className='w-full'>
          <label htmlFor="state" className="block text-sm font-medium">
            State
          </label>
          <div className="relative mt-1">
            <select
              disabled={readOnly}
              id="state"
              name="state"
              value={formData?.state}
              className={`${readOnly && 'bg-[#efefef4d]'} focus:shadow-outline-blue mt-1 block h-[40px] w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none dark:bg-[#3b3b3b4d] sm:text-sm ${errors.state && 'border-red-500'}`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, state: e.target.value }))}
            >
              {
                selectedCountryStates?.map(({ value, label, disabled = false }) =>
                  <option key={value + label} disabled={disabled} value={value}>{label}</option>)}
            </select>
          </div>
          {errors.state && <p className="mt-2 text-sm text-red-600">{errors.state}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="lineAddress1" className="block text-sm font-medium">
          Address Line 1
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            disabled={readOnly}
            value={formData?.lineAddress1}
            name="lineAddress1"
            className={`block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.lineAddress1 && 'border-red-500'}`}
            onChange={(e) => setFormData?.(prev => ({ ...prev, lineAddress1: e.target.value }))}
          />
        </div>
        {errors.lineAddress1 && <p className="mt-2 text-sm text-red-600">{errors.lineAddress1}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="lineAddress2" className="block text-sm font-medium">
          Address Line 2
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            disabled={readOnly}
            value={formData?.lineAddress2}
            name="lineAddress2"
            className="block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setFormData?.(prev => ({ ...prev, lineAddress2: e.target.value }))}
          />
        </div>
      </div>
      <div className='mt-4 flex w-full items-center gap-4'>
        <div className="w-full">
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              value={formData?.city}
              name="city"
              className={`block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.city && 'border-red-500'}`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
          {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
        </div>
        <div className="w-full">
          <label htmlFor="zip" className="block text-sm font-medium">
            Zip
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              value={formData?.zip}
              name="zip"
              className={`block h-[40px] w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.zip && 'border-red-500'}`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, zip: e.target.value }))}
            />
          </div>
          {errors.zip && <p className="mt-2 text-sm text-red-600">{errors.zip}</p>}
        </div>
      </div>
    </div>
  )
}

export default UserAddressForm
