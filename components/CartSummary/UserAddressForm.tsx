import { Dispatch, FC, SetStateAction } from 'react'
import { europeanCountriesWithStates, FormData } from './data'

interface Props {
  formData: FormData;
  setFormData?: Dispatch<SetStateAction<FormData>>;
  readOnly?: boolean;
}

const UserAddressForm: FC<Props> = (props) => {
  const { formData, setFormData, readOnly = false } = props;

  const selectedCountryStates = formData?.country && (europeanCountriesWithStates?.find(country => country.value === formData.country)?.states || []) || [];

  return (
    <div className="">
      <div className={`flex flex-col ${readOnly && 'lg:flex-row'} gap-4 mt-4`}>
        <div className='w-full'>
          <label htmlFor="name" className="block text-sm font-medium">
            Receiver Name
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              value={formData?.name}
              name="name"
              className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setFormData?.(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="phone" className="block text-sm font-medium">
            Receiver Phone
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              type='number'
              value={formData?.phone}
              name="phone"
              className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setFormData?.(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-4 mt-4'>
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
              className={`${readOnly && 'bg-[#efefef4d]'} dark:bg-[#3b3b3b4d] h-[40px] focus:shadow-outline-blue mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm`}
              onChange={(e) => {
                setFormData?.(prev => ({ ...prev, country: e.target.value }));
                setFormData?.(prev => ({ ...prev, state: '' }))
              }}
            >
              {europeanCountriesWithStates?.map(({ value, label, disabled = false }) =>
                <option key={value} disabled={disabled} value={value}>{label}</option>)}
            </select>
          </div>
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
              className={`${readOnly && 'bg-[#efefef4d]'} dark:bg-[#3b3b3b4d] h-[40px] focus:shadow-outline-blue mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 leading-5 transition duration-150 ease-in-out focus:border-blue-300 focus:outline-none sm:text-sm`}
              onChange={(e) => setFormData?.(prev => ({ ...prev, state: e.target.value }))}
            >
              {
                selectedCountryStates?.map(({ value, label, disabled = false }) =>
                  <option key={value} disabled={disabled} value={value}>{label}</option>)}
            </select>
          </div>
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
            className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setFormData?.(prev => ({ ...prev, lineAddress1: e.target.value }))}
          />
        </div>
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
            className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            onChange={(e) => setFormData?.(prev => ({ ...prev, lineAddress2: e.target.value }))}
          />
        </div>
      </div>
      <div className='w-full flex items-center gap-4 mt-4'>
        <div className="w-full">
          <label htmlFor="city" className="block text-sm font-medium">
            City
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              disabled={readOnly}
              value={formData?.city}
              name="city"
              className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setFormData?.(prev => ({ ...prev, city: e.target.value }))}
            />
          </div>
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
              className="h-[40px] block w-full flex-1 rounded-md border-gray-300 px-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              onChange={(e) => setFormData?.(prev => ({ ...prev, zip: e.target.value }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAddressForm