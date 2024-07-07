import { siteConfig } from '@/config/site'

const PurchaseProcess = () => {
  return (
    <div className="px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig?.name}</h1>
      <div className="mx-auto mt-4 max-w-3xl text-base">
        <h2 style={{ textDecoration: 'underline' }}> Purchase Process:</h2>
        <ol>
          <li>Select the model you want to purchase and pay for it using Stripe.</li>
          <li>I will send you an email or a message to your phone as soon as your selected model is ready.</li>
          <li style={{ fontWeight: 'bold' }}>If you can only pay by paypal, write me an e-mail and I will prepare the paypal invoice for you</li>
          <span style={{ display: 'inline-block', marginLeft: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
          <span style={{ display: 'inline-block', marginRight: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
          <li style={{ fontWeight: 'bold' }}>You can find the complete list of the models I have and what I can create at the following link:</li>
          <span style={{ display: 'inline-block', marginLeft: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>
          <span style={{ display: 'inline-block', marginRight: '4px', animation: 'bounce 2s infinite' }}>&darr;</span>

          <li style={{ fontWeight: 'bold' }}>Click here for a Catalogue -{'>'} <a href="https://sites.google.com/view/modelscatalogue/" style={{ color: 'red', fontWeight: 'bold' }}>Models Catalogue</a></li>
          <li style={{ fontWeight: 'bold' }}>Click here for a DM -{'>'} <a href="https://www.facebook.com/Sultry3DPrints" style={{ color: 'red', fontWeight: 'bold' }}>Sultry3DPrints</a></li>
          <li style={{ color: 'red', fontWeight: 'bold' }}><a href="mailto:info@sultry3dprints.com" style={{ color: 'red', fontWeight: 'bold' }}>info@sultry3dprints.com</a></li>
        </ol>
      </div>
    </div>
  )
}

export default PurchaseProcess