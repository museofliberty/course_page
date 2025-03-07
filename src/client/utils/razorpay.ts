export const loadRazorpay = (): Promise<typeof window.Razorpay> => {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        reject(new Error('Razorpay failed to load'));
      }
    };
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay script'));
    };

    document.body.appendChild(script);
  });
}; 